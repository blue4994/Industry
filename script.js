/**
 * 대한민국 산업통상자원부 (MOTIE) 웹 앱 스크립트
 * - 순수 바닐라 JS (No Framework, 더블클릭 로컬 실행 완벽 지원)
 * - 탭 전환, 퀴즈 시스템, 최신 뉴스 필터링 인터랙션
 */

// 1. 최신 정책 뉴스 및 보도자료 데이터베이스
const newsData = [
  {
    id: 1,
    category: "반도체/AI",
    title: "용인 첨단 반도체 클러스터 팹 가동 시기 단축 및 인프라 전폭 지원",
    desc: "산업부는 AI 수요 급증에 대응해 용인 국가산단의 토지보상 및 전력·용수 공급망을 선제 구축하여 클러스터 조성에 총력을 기울입니다.",
    date: "2025.03 / 정책브리핑",
    source: "대한민국 정책브리핑",
    url: "https://www.korea.kr"
  },
  {
    id: 2,
    category: "반도체/AI",
    title: "제조업 AI 전환(AX) 본격화… 스마트 팩토리 및 휴머노이드 로봇 실증",
    desc: "철강, 반도체 등 핵심 제조업 현장에 숙련공 지식을 담은 산업 AI 모델을 배포하고 고위험 공정의 로봇 자동화를 추진합니다.",
    date: "2025.02 / 산업부 발표",
    source: "산업통상자원부",
    url: "https://www.motie.go.kr"
  },
  {
    id: 3,
    category: "수출/통상",
    title: "대한민국 수출 호조세 지속… 반도체·자동차 글로벌 무역 5강 정조준",
    desc: "월간 수출 실적이 견조한 흑자 기조를 이어가며 반도체 중심의 'K-수출 원팀' 마케팅 및 무역금융 지원을 확대합니다.",
    date: "2025.03 / 무역통계",
    source: "관세청·산업부",
    url: "https://www.korea.kr"
  },
  {
    id: 4,
    category: "수출/통상",
    title: "글로벌 통상 불확실성 대응 민관 합동 전략회의 개최",
    desc: "글로벌 보호무역주의 및 주요국 통상 규제 강화에 맞서 기업 맞춤형 긴급 통상 지원센터와 공급망 모니터링을 상시 가동합니다.",
    date: "2025.01 / 통상교섭본부",
    source: "통상교섭본부",
    url: "https://www.motie.go.kr"
  },
  {
    id: 5,
    category: "에너지",
    title: "AI 및 데이터센터 전력 수요 대응을 위한 국가 전력망 확충 로드맵",
    desc: "초고속으로 늘어나는 첨단 산업 전력 수요를 뒷받침하기 위해 동서축 초고압 직류 송전선로(HVDC) 등 국가 전력망을 선제 구축합니다.",
    date: "2025.02 / 에너지정책",
    source: "대한민국 정책브리핑",
    url: "https://www.korea.kr"
  },
  {
    id: 6,
    category: "에너지",
    title: "체코 신규 원전 수주 본계약 체결 및 팀코리아 에너지 영토 확장",
    desc: "한국형 원전(APR1400)의 우수한 기술력과 시공 능력을 세계적으로 공인받으며 K-에너지의 유럽 및 글로벌 진출을 본격화합니다.",
    date: "2025.03 / 원전수출추진단",
    source: "산업통상자원부",
    url: "https://www.motie.go.kr"
  }
];

// 2. 상식 퀴즈 데이터
const quizData = [
  {
    question: "Q. 산업통상자원부(MOTIE)의 3대 핵심 업무 영역이 아닌 것은 무엇일까요?",
    options: [
      "1. 첨단산업 및 제조업 육성",
      "2. 수출 진흥 및 통상 협상",
      "3. 국가 문화재 발굴 및 보존",
      "4. 안정적 에너지 및 전력 공급"
    ],
    answer: 2, // 3번 (문화재는 문화재청/국가유산청 업무)
    explanation: "정답은 3번입니다! 국가 문화재 보존은 국가유산청 소관이며, 산업통상자원부는 '산업', '통상', '에너지'를 관할합니다."
  },
  {
    question: "Q. 산업통상자원부가 주력으로 추진하는 차세대 메가 반도체 클러스터 조성 지역은?",
    options: [
      "1. 경기도 용인시 일대",
      "2. 제주특별자치도 서귀포",
      "3. 강원도 평창군",
      "4. 울릉도 및 독도"
    ],
    answer: 0,
    explanation: "정답은 1번입니다! 정부는 경기도 용인 일대에 대규모 반도체 메가 클러스터를 조성하고 있습니다."
  },
  {
    question: "Q. 국민들이 에너지 비용 부담을 덜 수 있도록 취약계층에 지급하는 지원책은?",
    options: [
      "1. 문화누리카드",
      "2. 에너지바우처",
      "3. 국민행복카드",
      "4. 평생배움패스"
    ],
    answer: 1,
    explanation: "정답은 2번입니다! 산업통상자원부는 취약계층을 위해 냉·난방비를 지원하는 '에너지바우처' 제도를 운영하고 있습니다."
  }
];

let currentQuizIndex = 0;

// DOM 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initNewsFilter();
  renderNews("all");
  loadQuiz(currentQuizIndex);
  initPolicyFinder(); // 맞춤 지원 체크리스트 초기화
});

// [탭 기능] 국민 체감 정책 탭 전환
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetId = btn.getAttribute("data-tab");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

// [뉴스 기능] 뉴스 목록 렌더링
function renderNews(filter) {
  const container = document.getElementById("news-grid");
  if (!container) return;

  container.innerHTML = "";

  const filteredNews = filter === "all" 
    ? newsData 
    : newsData.filter(item => item.category === filter);

  filteredNews.forEach(item => {
    const card = document.createElement("a");
    card.className = "news-card";
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.title = "클릭 시 공식 원문으로 이동합니다";

    card.innerHTML = `
      <div class="news-meta">
        <span class="news-tag">${item.category}</span>
        <span class="news-date">${item.date}</span>
      </div>
      <h3 class="news-title">${item.title}</h3>
      <p class="news-desc">${item.desc}</p>
      <div class="news-footer">
        <span class="news-source">출처: ${item.source}</span>
        <span class="news-link-text">원문 보기 ↗</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// [뉴스 필터] 카테고리 필터 클릭 이벤트
function initNewsFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");
      renderNews(category);
    });
  });
}

// [퀴즈 기능] 퀴즈 표시
function loadQuiz(index) {
  const qData = quizData[index];
  const qTitle = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const feedback = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("next-quiz-btn");

  if (!qTitle || !optionsContainer) return;

  qTitle.textContent = qData.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "quiz-feedback";
  nextBtn.style.display = "none";

  qData.options.forEach((optText, optIdx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt-btn";
    btn.textContent = optText;
    btn.addEventListener("click", () => handleAnswer(optIdx, qData.answer, qData.explanation, btn));
    optionsContainer.appendChild(btn);
  });
}

// 퀴즈 정답 검증
function handleAnswer(selectedIndex, correctIndex, explanation, clickedBtn) {
  const optionButtons = document.querySelectorAll(".quiz-opt-btn");
  const feedback = document.getElementById("quiz-feedback");
  const nextBtn = document.getElementById("next-quiz-btn");

  // 모든 버튼 비활성화
  optionButtons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    clickedBtn.classList.add("correct");
    feedback.textContent = "🎉 정답입니다! " + explanation;
    feedback.className = "quiz-feedback success";
  } else {
    clickedBtn.classList.add("wrong");
    optionButtons[correctIndex].classList.add("correct");
    feedback.textContent = "❌ 아쉽네요! " + explanation;
    feedback.className = "quiz-feedback fail";
  }

  // 다음 문제 버튼 활성화
  nextBtn.style.display = "inline-block";
  nextBtn.onclick = () => {
    currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
    loadQuiz(currentQuizIndex);
  };
}

// ==========================================================
// 3. [신규 기능] "나는 어떤 도움을 받을 수 있을까?" 맞춤 지원 체크리스트
// ==========================================================

// 유형별 체크리스트 문항 및 연결 정책 매핑 데이터
const finderQuestionsData = {
  citizen: [
    {
      id: "c1",
      title: "겨울철 난방비 또는 여름철 냉방비 부담이 큰 편인가요? (취약계층/다자녀)",
      desc: "기초생활수급자, 차상위계층, 한부모가정, 다자녀 가구 등",
      policyId: "p_energy_voucher"
    },
    {
      id: "c2",
      title: "에너지 소비효율 1등급 가전제품(냉장고, 세탁기 등)을 새로 구매할 예정인가요?",
      desc: "고효율 가전 구매비용 환급 혜택 대상 여부 확인",
      policyId: "p_appliance_rebate"
    },
    {
      id: "c3",
      title: "전기차, 수소차 등 친환경 자동차를 구매하거나 충전 인프라 지원이 필요한가요?",
      desc: "친환경차 보조금, 세제 감면 및 가정/공동주택 충전기 설치 지원",
      policyId: "p_ev_support"
    },
    {
      id: "c4",
      title: "어린이 용품, 가전, 생활화학제품 등의 안전성 및 리콜 정보가 궁금하신가요?",
      desc: "KC인증 마크 확인, 유해 물질 검출 불법제품 신고 및 피해 예방",
      policyId: "p_kc_safety"
    },
    {
      id: "c5",
      title: "단독주택이나 아파트 베란다에 태양광 발전기 설치를 고민 중이신가요?",
      desc: "신재생에너지 주택지원사업 (설치 보조금 최대 50% 지원)",
      policyId: "p_home_solar"
    }
  ],
  business: [
    {
      id: "b1",
      title: "해외 수출을 희망하거나 해외 마케팅, 전시회, 물류비 지원이 필요한가요?",
      desc: "중소·중견기업 맞춤형 수출바우처 및 글로벌 바이어 매칭",
      policyId: "p_export_voucher"
    },
    {
      id: "b2",
      title: "미국 통상규제, EU 탄소국경조정제도(CBAM), 원산지 증명 등 통상 애로가 있나요?",
      desc: "글로벌 통상 분쟁 법률 컨설팅 및 해외 규제 원스톱 대응 지원단",
      policyId: "p_trade_consulting"
    },
    {
      id: "b3",
      title: "제조 공장에 AI 솔루션, 산업용 로봇, 스마트 공장 시스템을 도입하고 싶으신가요?",
      desc: "스마트 제조혁신 지원사업 및 제조업 AX(AI대전환) 실증 자금",
      policyId: "p_smart_factory"
    },
    {
      id: "b4",
      title: "반도체, 배터리, 로봇, 바이오 등 미래 첨단전략기술 소부장 R&D 자금이 필요한가요?",
      desc: "국가전략기술 R&D 정부 출연금 및 저금리 정책금융 융자",
      policyId: "p_tech_rnd"
    },
    {
      id: "b5",
      title: "산업단지 입주, 공장 인허가 규제 완화 또는 에너지 효율 개선 융자가 필요한가요?",
      desc: "산업단지 킬러규제 혁파 및 중소기업 에너지 진단/효율설비 교체 지원",
      policyId: "p_factory_energy"
    }
  ],
  youth: [
    {
      id: "y1",
      title: "반도체, 이차전지, 바이오 등 첨단 유망 산업 실무 교육을 받고 취업하고 싶나요?",
      desc: "전액 국비 무료 첨단산업 부트캠프 및 특성화대학원 실무 연수",
      policyId: "y_semi_bootcamp"
    },
    {
      id: "y2",
      title: "친환경 신재생에너지, 기후테크, AI 솔루션 분야에서 스타트업 창업을 준비 중인가요?",
      desc: "에너지 혁신기업 창업 패키지, 시제품 제작비 및 R&D 멘토링",
      policyId: "y_climate_startup"
    },
    {
      id: "y3",
      title: "청년 친화적 복합문화 산업단지에서 쾌적하게 근무하고 싶나요?",
      desc: "청년 문화센터, 카페, 주거가 결합된 '스마트 문화산단' 입주기업 취업 연계",
      policyId: "y_smart_industrial_park"
    },
    {
      id: "y4",
      title: "글로벌 무역 전문가, FTA 통상 실무 마스터 과정을 이수하고 해외 취업을 원하나요?",
      desc: "청년 지역특화청년무역전문가양성(GTEP) 및 해외 통상 인턴십",
      policyId: "y_trade_gtep"
    }
  ]
};

// 정책 상세 안내 데이터베이스 (지원 내용, 대상, 신청 링크)
const policiesDatabase = {
  p_energy_voucher: {
    tag: "에너지 복지",
    title: "에너지바우처 지원제도",
    desc: "기초생활수급가구 등 취약계층의 냉·난방비 부담을 덜어드리기 위해 전기, 도시가스, 연탄, 등유 등을 구매할 수 있는 전자바우처를 지급합니다.",
    target: "소득기준(국민기초생활보장 수급자) 및 세대원 특성(노인, 장애인, 영유아, 임산부, 한부모가정 등) 충족 가구",
    benefit: "가구원 수에 따라 하절기(최대 4만 원대) 및 동절기(최대 30만 원 이상) 차등 지급",
    applyHow: "주민등록상 거주지 읍·면·동 행정복지센터 방문 또는 복지로(bokjiro.go.kr) 온라인 신청",
    url: "https://www.energyv.or.kr"
  },
  p_appliance_rebate: {
    tag: "가정 에너지 효율",
    title: "한전 고효율 가전제품 구매비용 지원사업",
    desc: "에너지 효율이 높은 1등급 가전제품을 구매할 때 구매 가격의 일부(10~20%)를 현금으로 돌려받을 수 있는 국민 지원 정책입니다.",
    target: "전기요금 복지할인 가구 (다자녀, 대가족, 출산가구, 장애인 등)",
    benefit: "가구당 최대 30만 원 한도 내에서 구매 금액의 10%~20% 환급",
    applyHow: "한전 고효율 가전 구매비용 지원사업 누리집에서 영수증 및 효율라벨 업로드",
    url: "https://en-ter.co.kr"
  },
  p_ev_support: {
    tag: "친환경 모빌리티",
    title: "친환경차(전기·수소차) 보급 및 충전 인프라 지원",
    desc: "국민의 온실가스 저감 참여를 유도하고 미래차 전환을 가속화하기 위해 친환경차 구매 보조금 및 주거지 충전기 설치를 지원합니다.",
    target: "전기차 및 수소차를 구매하거나 충전기 설치를 희망하는 국민/공동주택 입주자대표회의",
    benefit: "차종별 국비+지방비 구매보조금 지급, 개별소비세·취득세 등 세제 감면 혜택",
    applyHow: "무공해차 통합누리집(ev.or.kr)에서 차종별 보조금 신청 및 충전기 신청",
    url: "https://www.ev.or.kr"
  },
  p_kc_safety: {
    tag: "생활 안전",
    title: "제품안전정보센터(KATS) 및 불법·유해제품 리콜 확인",
    desc: "어린이 완구, 배터리, 전자제품의 안전 기준(KC인증)을 확인하고, 유해성분이 검출된 불량 제품의 리콜 조치를 실시간 조회할 수 있습니다.",
    target: "안전한 소비재 사용을 원하는 모든 국민 및 학부모",
    benefit: "위해상품 판매차단 시스템 가동 현황 무료 조회, 불법제품 온라인 신고 포상",
    applyHow: "산업부 국가기술표준원 '제품안전정보센터' 사이트에서 상시 조회 가능",
    url: "https://www.safetykorea.kr"
  },
  p_home_solar: {
    tag: "신재생 에너지",
    title: "신재생에너지 주택지원사업 (가정용 태양광 설치)",
    desc: "단독주택 또는 공동주택에 태양광(3kW), 지열 등 신재생에너지 발전설비를 설치할 때 설치비의 최대 50% 수준을 정부 보조금으로 지원합니다.",
    target: "건축물대장상 주택 소유자 또는 입주 예정자",
    benefit: "설치비 국비 지원 및 월 전기요금 대폭 절감 효과",
    applyHow: "한국에너지공단 신재생에너지센터 그린홈(greenhome.kemco.or.kr)에서 온라인 접수",
    url: "https://greenhome.kemco.or.kr"
  },
  p_export_voucher: {
    tag: "수출 지원",
    title: "중소·중견기업 수출바우처 사업",
    desc: "중소기업이 해외 진출에 필요한 마케팅, 외국어 통번역, 해외 규격 인증, 물류 등 메뉴판식 서비스를 바우처 형태로 자유롭게 선택해 지원받습니다.",
    target: "해외 수출을 준비 중이거나 수출 실적을 확대하고자 하는 중소·중견 제조기업",
    benefit: "기업 규모별 최대 3천만 원 ~ 1억 원 한도 바우처 발급 (정부보조율 50~70%)",
    applyHow: "수출바우처 매칭 포털(exportvoucher.com) 연 2회 온라인 정기 신청",
    url: "https://www.exportvoucher.com"
  },
  p_trade_consulting: {
    tag: "통상 대응",
    title: "글로벌 통상애로 해소 및 해외 규제 컨설팅",
    desc: "미국의 인플레이션감축법(IRA), EU 탄소국경세(CBAM), 반덤핑 제재 등 복잡해지는 글로벌 무역 규제에 대해 전문가가 1:1 대응 솔루션을 제공합니다.",
    target: "수출 과정에서 비관세 장벽이나 해외 규제 애로를 겪는 국내 기업",
    benefit: "전문 변호사·회계사 1:1 무료 법률 자문, 탄소배출량 산정 검증 비용 지원",
    applyHow: "통상교섭본부 긴급 통상대응센터 및 무역협회 TradeSOS 신청",
    url: "https://www.motie.go.kr"
  },
  p_smart_factory: {
    tag: "제조 AI(AX)",
    title: "중소 제조기업 AI 자율제조 및 스마트공장 보급사업",
    desc: "생산 공정에 IoT 센서, 머신비전, 산업용 로봇, AI 품질 예측 솔루션을 도입하여 불량률을 획기적으로 낮추고 생산성을 극대화하도록 돕습니다.",
    target: "제조업 등록 중소·중견기업",
    benefit: "스마트공장 고도화 구축비 최대 2억 원 지원, 전문 DX 컨설턴트 파견",
    applyHow: "스마트공장 사업관리시스템(smart-factory.kr) 온라인 접수",
    url: "https://www.smart-factory.kr"
  },
  p_tech_rnd: {
    tag: "기술 혁신",
    title: "국가 첨단전략산업 초격차 R&D 지원 및 정책금융",
    desc: "반도체, 배터리, 미래 모빌리티 등 초격차 국가 핵심전략기술을 연구개발하는 기업에 정부 연구개발비와 저금리 설비투자 융자를 공급합니다.",
    target: "소부장 전문기업, 첨단전략산업 분야 중소·중견 혁신 R&D 기업",
    benefit: "과제당 연간 수억~수십억 원 R&D 자금 출연 및 세제 혜택(최대 50% 세액공제)",
    applyHow: "한국산업기술기획평가원(KEIT) 범부처통합연구지원시스템(IRIS)",
    url: "https://www.iris.go.kr"
  },
  p_factory_energy: {
    tag: "산업 에너지",
    title: "공장 에너지효율향상(EE) 설비개체 융자 지원",
    desc: "산업현장의 노후 보일러, 컴프레셔, 인버터 등 에너지를 많이 소비하는 노후 설비를 고효율 기기로 교체하는 비용을 저금리로 융자 지원합니다.",
    target: "에너지 다소비 사업장 및 산업단지 입주 제조기업",
    benefit: "정책자금 3년 거치 5년 분할 상환, 연 1~2%대 초저금리 정책자금 융자",
    applyHow: "한국에너지공단 에너지이용합리화자금 지원사업 접수",
    url: "https://www.energy.or.kr"
  },
  y_semi_bootcamp: {
    tag: "청년 인재양성",
    title: "반도체·배터리 첨단산업 부트캠프 & 특성화대학원",
    desc: "비전공자도 1~2년 내 첨단 팹 공정, 회로설계, 배터리 셀 실무 능력을 갖추도록 전액 무료 교육과 장학금을 지원하는 국비 프로그램입니다.",
    target: "이공계/인문사회 대학 재학생, 졸업예정자 및 첨단산업 취업준비 청년",
    benefit: "수강료 전액 국비 무료, 월 훈련장려금 지급, 삼성·SK하이닉스 등 채용 연계",
    applyHow: "각 참여 대학 반도체사업단 또는 한국산업기술진흥원(KIAT) 공고 확인",
    url: "https://www.kiat.or.kr"
  },
  y_climate_startup: {
    tag: "청년 창업",
    title: "기후테크 & 에너지 신산업 청년 스타트업 육성",
    desc: "탄소중립, 재생에너지 소프트웨어, 분산전원 등 기후·에너지 분야에서 창업을 희망하는 청년들에게 시제품 제작비와 실증 인프라를 원스톱 지원합니다.",
    target: "만 39세 이하 예비 창업자 및 3년 미만 신생 기후테크 창업기업",
    benefit: "최대 1억 원의 사업화 자금, 공공기관 보유 시험설비 무료 개방",
    applyHow: "K-Startup 창업마당 누리집에서 '에너지 신산업' 공모 접수",
    url: "https://www.k-startup.go.kr"
  },
  y_smart_industrial_park: {
    tag: "청년 산단",
    title: "청년친화형 스마트 문화 산업단지 취업 지원",
    desc: "과거 삭막했던 공장 밀집지역을 문화거리, 청년 문화센터, 공유오피스가 들어선 복합 산업캠퍼스로 혁신하여 청년 근로자들의 워라밸을 지원합니다.",
    target: "스마트 그린 산업단지 입주기업 취업 희망 청년",
    benefit: "청년 근로자 교통비(월 5만 원) 지원, 산업단지형 행복주택 우선 공급",
    applyHow: "한국산업단지공단(KICOX) 청년지원사업 포털",
    url: "https://www.kicox.or.kr"
  },
  y_trade_gtep: {
    tag: "글로벌 무역",
    title: "지역특화 청년무역전문가 양성사업 (GTEP)",
    desc: "전국 주요 대학 청년들이 무역 이론과 해외 박람회 부스 운영, 수출 통상 협상을 직접 실전으로 배우는 국내 최고 수준의 무역 인재 코스입니다.",
    target: "전국 GTEP 운영 20개 대학교 3~4학년 재학생",
    benefit: "해외 유수 전시회 참가비 전액 지원, 산자부 장관 표창 및 무역상사 추천 채용",
    applyHow: "소속 대학 GTEP 사업단 매년 초 모집 공고 지원",
    url: "https://www.motie.go.kr"
  }
};

let currentFinderType = "citizen";

function initPolicyFinder() {
  const typeButtons = document.querySelectorAll(".type-btn");
  const findBtn = document.getElementById("btn-find-benefits");
  const resetBtn = document.getElementById("btn-reset-finder");

  if (!typeButtons.length || !findBtn) return;

  // 1. 유형 선택 버튼 이벤트
  typeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      typeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFinderType = btn.getAttribute("data-type");
      renderChecklist(currentFinderType);
      
      // 결과 박스는 숨김 처리
      const resultBox = document.getElementById("finder-results");
      if (resultBox) resultBox.style.display = "none";
    });
  });

  // 2. 결과 도출 버튼 클릭 이벤트
  findBtn.addEventListener("click", handleFindBenefits);

  // 3. 초기화 버튼 이벤트
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      renderChecklist(currentFinderType);
      const resultBox = document.getElementById("finder-results");
      if (resultBox) resultBox.style.display = "none";
    });
  }

  // 초기 렌더링 (일반 국민 기본)
  renderChecklist("citizen");
}

// 체크리스트 문항 렌더링
function renderChecklist(type) {
  const container = document.getElementById("finder-checklist");
  if (!container) return;

  container.innerHTML = "";
  const questions = finderQuestionsData[type] || [];

  questions.forEach(q => {
    const itemLabel = document.createElement("label");
    itemLabel.className = "check-item";
    itemLabel.htmlFor = q.id;

    itemLabel.innerHTML = `
      <input type="checkbox" id="${q.id}" data-policy="${q.policyId}">
      <div class="check-info">
        <span class="check-title">${q.title}</span>
        <span class="check-desc">${q.desc}</span>
      </div>
    `;

    // 체크박스 클릭 스타일 반응
    const checkbox = itemLabel.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        itemLabel.classList.add("selected");
      } else {
        itemLabel.classList.remove("selected");
      }
    });

    container.appendChild(itemLabel);
  });
}

// 맞춤 혜택 도출 로직
function handleFindBenefits() {
  const selectedCheckboxes = document.querySelectorAll("#finder-checklist input[type='checkbox']:checked");
  const resultBox = document.getElementById("finder-results");
  const resultCountTitle = document.getElementById("result-count-title");
  const cardsContainer = document.getElementById("result-cards-container");

  if (!resultBox || !cardsContainer) return;

  cardsContainer.innerHTML = "";
  resultBox.style.display = "block";

  let matchedPolicies = [];

  // 1) 체크된 항목에서 정책 ID 추출
  selectedCheckboxes.forEach(cb => {
    const policyId = cb.getAttribute("data-policy");
    if (policyId && policiesDatabase[policyId]) {
      matchedPolicies.push(policiesDatabase[policyId]);
    }
  });

  // 2) 만약 아무것도 체크하지 않은 경우: 해당 유형의 대표 추천 정책 2종 기본 안내
  if (matchedPolicies.length === 0) {
    const defaultIds = {
      citizen: ["p_energy_voucher", "p_kc_safety"],
      business: ["p_export_voucher", "p_smart_factory"],
      youth: ["y_semi_bootcamp", "y_climate_startup"]
    };
    const defaults = defaultIds[currentFinderType] || [];
    defaults.forEach(id => {
      if (policiesDatabase[id]) matchedPolicies.push(policiesDatabase[id]);
    });

    resultCountTitle.innerHTML = `선택된 항목이 없어 <span style="color:#0066cc;">[${getTypeName(currentFinderType)} 대표 주요 정책 2선]</span>을 안내해 드립니다!`;
  } else {
    resultCountTitle.innerHTML = `체크하신 상황에 꼭 맞는 <span style="color:#0066cc;">${matchedPolicies.length}개</span>의 맞춤형 지원 정책을 찾았습니다!`;
  }

  // 3) 카드 렌더링
  matchedPolicies.forEach(policy => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <span class="res-tag">${policy.tag}</span>
      <h4>${policy.title}</h4>
      <p class="res-desc">${policy.desc}</p>
      <div class="res-details">
        <p><strong>🎯 지원 대상:</strong> ${policy.target}</p>
        <p><strong>🎁 핵심 혜택:</strong> ${policy.benefit}</p>
        <p><strong>📝 신청 방법:</strong> ${policy.applyHow}</p>
      </div>
      <a href="${policy.url}" target="_blank" rel="noopener noreferrer" class="btn-apply-link">
        공식 신청 및 안내 사이트 바로가기 ↗
      </a>
    `;
    cardsContainer.appendChild(card);
  });

  // 부드럽게 결과 위치로 스크롤 이동
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getTypeName(type) {
  if (type === "citizen") return "일반 국민/가구";
  if (type === "business") return "기업/스타트업";
  if (type === "youth") return "청년/구직자";
  return "국민";
}

