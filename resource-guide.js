/* ─────────────────────────────────────────────────────
   TWAP — resource-guide.js
   Embedded AI Assistant: TWAP Resource Guide widget
   ───────────────────────────────────────────────────── */

(function () {
  // Inject widget CSS styles
  const styles = `
    /* Floating action button */
    #twap-chat-trigger {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      height: 52px;
      padding: 0 20px;
      background-color: #6b1f3f; /* Deep rose/ink */
      color: #ffffff !important;
      border: none;
      border-radius: 26px;
      box-shadow: 0 4px 16px rgba(107, 31, 63, 0.28), 0 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.01em;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s ease, box-shadow 0.2s ease;
      will-change: transform;
    }
    #twap-chat-trigger:hover {
      transform: scale(1.05);
      background-color: #551832;
      box-shadow: 0 6px 20px rgba(107, 31, 63, 0.36), 0 3px 8px rgba(0, 0, 0, 0.12);
    }
    #twap-chat-trigger svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Collapsible chat drawer */
    #twap-chat-panel {
      position: fixed;
      bottom: 90px;
      right: 24px;
      z-index: 9999;
      width: 375px;
      height: 540px;
      max-height: 75vh;
      display: flex;
      flex-direction: column;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      box-shadow: 0 12px 36px rgba(107, 31, 63, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 14px;
      color: #1e293b;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
      will-change: transform, opacity;
    }
    #twap-chat-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Chat header */
    .twap-chat-header {
      background-color: #6b1f3f;
      color: #ffffff;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .twap-chat-title-group h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .twap-chat-title-group p {
      margin: 2px 0 0;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.7);
    }
    .twap-chat-close-btn {
      color: rgba(255, 255, 255, 0.75);
      font-size: 22px;
      border: none;
      background: none;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      transition: color 0.15s ease, transform 0.15s ease;
    }
    .twap-chat-close-btn:hover {
      color: #ffffff;
      transform: scale(1.1);
    }

    /* Message log area */
    .twap-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background-color: #fcfcfd;
      scroll-behavior: smooth;
    }

    /* Message bubbles */
    .twap-msg {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 14px;
      line-height: 1.5;
      font-size: 13.5px;
      white-space: pre-wrap;
    }
    .twap-msg-assistant {
      align-self: flex-start;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      color: #1e293b;
      border-top-left-radius: 2px;
    }
    .twap-msg-user {
      align-self: flex-end;
      background-color: #fce7f3; /* Soft pink */
      color: #6b1f3f;
      border-top-right-radius: 2px;
      font-weight: 500;
    }

    /* Links and structures inside response format */
    .twap-msg-assistant strong {
      color: #6b1f3f;
      display: block;
      margin-bottom: 4px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .twap-msg-assistant ul {
      margin: 8px 0;
      padding-left: 16px;
      list-style-type: disc;
    }
    .twap-msg-assistant li {
      margin-bottom: 6px;
    }
    .twap-msg-assistant a {
      color: #6b1f3f;
      text-decoration: underline;
      font-weight: 500;
      transition: color 0.15s ease;
    }
    .twap-msg-assistant a:hover {
      color: #b02f67;
    }
    .twap-msg-exercise {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed #e2e8f0;
      font-size: 12.5px;
      color: #475569;
    }

    /* Typing animation bubble */
    .twap-typing-bubble {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px !important;
    }
    .twap-dot {
      width: 6px;
      height: 6px;
      background-color: #94a3b8;
      border-radius: 50%;
      animation: twapBounce 1.4s infinite ease-in-out both;
    }
    .twap-dot:nth-child(1) { animation-delay: -0.32s; }
    .twap-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes twapBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1.0); }
    }

    /* Quick pills tray */
    .twap-chat-pills {
      padding: 10px 16px;
      background-color: #ffffff;
      border-top: 1px solid #f1f5f9;
      display: flex;
      gap: 8px;
      overflow-x: auto;
      scrollbar-width: none; /* Hide scrollbar Firefox */
    }
    .twap-chat-pills::-webkit-scrollbar {
      display: none; /* Hide scrollbar Chrome/Safari */
    }
    .twap-pill {
      flex-shrink: 0;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 500;
      color: #6b1f3f;
      background-color: #ffffff;
      border: 1px solid #f9a8d4;
      border-radius: 14px;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
    }
    .twap-pill:hover {
      background-color: #fce7f3;
      transform: translateY(-1px);
    }
    .twap-pill:active {
      transform: translateY(0);
    }

    /* Chat input form container */
    .twap-chat-input-form {
      display: flex;
      padding: 12px 16px;
      background-color: #ffffff;
      border-top: 1px solid #e2e8f0;
      gap: 10px;
    }
    .twap-chat-input {
      flex: 1;
      height: 38px;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      padding: 0 16px;
      font-size: 13.5px;
      font-family: inherit;
      color: #1e293b;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .twap-chat-input:focus {
      border-color: #6b1f3f;
      box-shadow: 0 0 0 2px rgba(107, 31, 63, 0.12);
    }
    .twap-chat-submit {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: #6b1f3f;
      color: #ffffff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.15s ease, transform 0.15s ease;
    }
    .twap-chat-submit:hover {
      background-color: #551832;
      transform: scale(1.05);
    }
    .twap-chat-submit svg {
      width: 16px;
      height: 16px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Mobile Responsive Layout overrides */
    @media (max-width: 600px) {
      #twap-chat-trigger {
        width: 52px;
        height: 52px;
        padding: 0;
        bottom: 16px;
        right: 16px;
        border-radius: 50%;
      }
      #twap-chat-trigger span {
        display: none;
      }
      #twap-chat-panel {
        width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
        border: none !important;
      }
    }
  `;

  // Dynamic injection of styles
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);

  // Dynamic injection of DOM widget components
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'twap-resource-guide-widget';
  widgetContainer.innerHTML = `
    <!-- Trigger Button -->
    <button id="twap-chat-trigger" aria-label="Open TWAP resource helper" aria-expanded="false">
      <svg viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Chat for Resources</span>
    </button>

    <!-- Chat drawer panel -->
    <div id="twap-chat-panel" aria-hidden="true">
      <div class="twap-chat-header">
        <div class="twap-chat-title-group">
          <h3>TWAP Resource Guide</h3>
          <p>Find tools for what you’re feeling</p>
        </div>
        <button class="twap-chat-close-btn" aria-label="Close panel">&times;</button>
      </div>

      <div class="twap-chat-messages">
        <!-- Messages appended dynamically -->
      </div>

      <div class="twap-chat-pills">
        <button class="twap-pill" data-category="burnout">Burnout</button>
        <button class="twap-pill" data-category="performance_anxiety">Anxiety</button>
        <button class="twap-pill" data-category="confidence">Confidence</button>
        <button class="twap-pill" data-category="injury_recovery">Injury</button>
      </div>

      <form class="twap-chat-input-form" action="#" autocomplete="off">
        <input type="text" class="twap-chat-input" placeholder="Type what you're dealing with..." aria-label="Chat input" required />
        <button type="submit" class="twap-chat-submit" aria-label="Send message">
          <svg viewBox="0 0 24 24">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  // Widget DOM References
  const triggerBtn  = document.getElementById('twap-chat-trigger');
  const chatPanel   = document.getElementById('twap-chat-panel');
  const closeBtn    = chatPanel.querySelector('.twap-chat-close-btn');
  const messagesLog = chatPanel.querySelector('.twap-chat-messages');
  const inputForm   = chatPanel.querySelector('.twap-chat-input-form');
  const chatInput   = chatPanel.querySelector('.twap-chat-input');
  const pillsTray   = chatPanel.querySelector('.twap-chat-pills');

  let hasGreeted = false;

  // Toggle Widget Panel open/close
  function openPanel() {
    chatPanel.classList.add('open');
    triggerBtn.setAttribute('aria-expanded', 'true');
    chatPanel.setAttribute('aria-hidden', 'false');
    chatInput.focus();
    
    if (!hasGreeted) {
      addAssistantMessage("Hi there! I am the TWAP Resource Guide. What are you dealing with today?");
      hasGreeted = true;
    }
  }

  // Minimize back to floating button
  function closePanel() {
    chatPanel.classList.remove('open');
    triggerBtn.setAttribute('aria-expanded', 'false');
    chatPanel.setAttribute('aria-hidden', 'true');
    triggerBtn.focus();
  }

  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (chatPanel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closePanel();
  });

  // ESC Key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatPanel.classList.contains('open')) {
      closePanel();
    }
  });

  // Click outside collapse
  document.addEventListener('click', (e) => {
    if (chatPanel.classList.contains('open')) {
      if (!chatPanel.contains(e.target) && e.target !== triggerBtn && !triggerBtn.contains(e.target)) {
        closePanel();
      }
    }
  });

  // Append a bubble helper
  function addMessageBubble(text, isUser = false) {
    const bubble = document.createElement('div');
    bubble.className = `twap-msg ${isUser ? 'twap-msg-user' : 'twap-msg-assistant'}`;
    bubble.innerHTML = text;
    messagesLog.appendChild(bubble);
    messagesLog.scrollTop = messagesLog.scrollHeight;
    return bubble;
  }

  function addAssistantMessage(htmlContent) {
    return addMessageBubble(htmlContent, false);
  }

  // Predefined external resource repository mappings based on categories
  const resourceDirectory = {
    performance_anxiety: {
      label: "performance_anxiety",
      resources: [
        { title: "Association for Applied Sport Psychology (AASP)", url: "https://appliedsportpsych.org", desc: "Professional resources on managing pre-competition performance anxiety and focus" },
        { title: "Headspace: Sport Psychology", url: "https://www.headspace.com", desc: "Articles on using mindfulness and breathing techniques to manage performance anxiety" },
        { title: "NCAA Mind, Body and Sport", url: "https://www.ncaa.org", desc: "Guide on understanding and managing student-athlete anxiety and mental health" }
      ],
      exercise: "<strong>Try this Box Breathing Exercise (30s):</strong><br/>1. Inhale slowly for 4 seconds.<br/>2. Hold your breath for 4 seconds.<br/>3. Exhale fully for 4 seconds.<br/>4. Pause empty for 4 seconds.<br/>Repeat this cycle twice to lower your heart rate instantly."
    },
    burnout: {
      label: "burnout",
      resources: [
        { title: "Mind UK: Guide to Burnout", url: "https://www.mind.org.uk", desc: "Trusted articles explaining the signs of physical and mental exhaustion and how to recover" },
        { title: "Athletes for Hope", url: "https://www.athletesforhope.org", desc: "Mental health resources and support networks specifically for active athletes dealing with burnout and fatigue" },
        { title: "NCAA Student-Athlete Burnout Guide", url: "https://www.ncaa.org", desc: "Educational materials on managing training loads, balance, and preventing burnout" }
      ],
      exercise: "<strong>Try a 5-4-3-2-1 Sensory Reset (45s):</strong><br/>Name in your head: 5 things you can see, 4 things you can touch, 3 things you hear, 2 things you smell, and 1 positive affirmation (e.g. 'I am resting to recharge')."
    },
    injury_recovery: {
      label: "injury_recovery",
      resources: [
        { title: "Association for Applied Sport Psychology: Injury Recovery", url: "https://appliedsportpsych.org", desc: "Sports psychology resources focusing on the mental challenges of injury and rehab" },
        { title: "NCAA Mental Health and Injury Guide", url: "https://www.ncaa.org", desc: "Official student-athlete guide on navigating emotional recovery while sidelined" },
        { title: "American Psychological Association (APA)", url: "https://www.apa.org", desc: "Articles on sports injury rehabilitation and the psychological impact of rehab" }
      ],
      exercise: "<strong>Try a Body Compassion Scan (30s):</strong><br/>Close your eyes and breathe deep. Direct calm thoughts to your recovery area. Acknowledge your body is doing its best to heal, and let go of tension in your neck and shoulders."
    },
    confidence: {
      label: "confidence",
      resources: [
        { title: "Association for Applied Sport Psychology (AASP)", url: "https://appliedsportpsych.org", desc: "Mindset techniques for building self-belief and positive self-talk" },
        { title: "Headspace: Mental Training", url: "https://www.headspace.com", desc: "Guides on visualization and developing confidence in your athletic abilities" },
        { title: "NCAA Sport Psychology Resources", url: "https://www.ncaa.org", desc: "Materials for boosting student-athlete motivation and self-efficacy" }
      ],
      exercise: "<strong>Try this Strength Focus Drill (30s):</strong><br/>Recall one moment where you felt fully capable, strong, or proud. Recall the exact sights and feelings of that success. Breathe it in for 3 breaths."
    },
    motivation: {
      label: "motivation",
      resources: [
        { title: "Association for Applied Sport Psychology (AASP)", url: "https://appliedsportpsych.org", desc: "Resources on goal-setting, intrinsic motivation, and finding joy in training" },
        { title: "Athletes for Hope", url: "https://www.athletesforhope.org", desc: "Community stories and tools to stay motivated and balance life as an athlete" },
        { title: "Mind UK: Motivation and Mood", url: "https://www.mind.org.uk", desc: "Practical tips to restart your drive when feeling stuck or low" }
      ],
      exercise: "<strong>Try the 5-Second Rule:</strong><br/>Count backwards: 5-4-3-2-1. On '1', take just one physical action (e.g., packing your gear bag, standing up) without letting your brain overthink."
    },
    stress: {
      label: "stress",
      resources: [
        { title: "Mind UK: Managing Stress", url: "https://www.mind.org.uk", desc: "Comprehensive guidelines on recognizing and releasing mental stress" },
        { title: "NHS Mental Health Services", url: "https://www.nhs.uk", desc: "Self-help guides and stress-busting exercises from the UK National Health Service" },
        { title: "Athletes for Hope", url: "https://www.athletesforhope.org", desc: "Mental health resources for managing academic and athletic stress loads" }
      ],
      exercise: "<strong>Try shoulder-release tension release (30s):</strong><br/>Tense your shoulders up to your ears as hard as you can for 5 seconds. Exhale and drop them completely. Repeat twice to drop physical stress."
    },
    pressure_perfectionism: {
      label: "pressure_perfectionism",
      resources: [
        { title: "American Psychological Association (APA)", url: "https://www.apa.org", desc: "Insightful resources on perfectionism, athletic pressure, and performance expectations" },
        { title: "Association for Applied Sport Psychology (AASP)", url: "https://appliedsportpsych.org", desc: "Techniques on shifting from outcome-based perfectionism to process-based growth" },
        { title: "Mind UK", url: "https://www.mind.org.uk", desc: "Support pages for dealing with high performance standards and pressure" }
      ],
      exercise: "<strong>Try a Self-Worth Reset:</strong><br/>Place a hand on your chest and take a deep breath. Exhale and repeat: 'My value is not determined by a scoreboard or a clean sheet. I am human, and that is enough.'"
    },
    team_conflict: {
      label: "team_conflict",
      resources: [
        { title: "Association for Applied Sport Psychology (AASP)", url: "https://appliedsportpsych.org", desc: "Practical articles on communication and resolving conflict with teammates and coaches" },
        { title: "NCAA Coach-Athlete Relationships Guide", url: "https://www.ncaa.org", desc: "Conflict resolution and communication advice within college sports" },
        { title: "Mind UK: Dealing with Conflict", url: "https://www.mind.org.uk", desc: "Tips on setting boundaries and having difficult conversations" }
      ],
      exercise: "<strong>Try a Grounding Perspective Shift (45s):</strong><br/>Breathe. Observe the conflict silently in your mind as if watching it on a screen. Distinguish what the other person did from your choice of response. Focus on your reaction."
    },
    general_mental_health: {
      label: "general_mental_health",
      resources: [
        { title: "Mental Health America (MHA)", url: "https://mhanational.org", desc: "General mental health resources, screening tools, and community support" },
        { title: "Mind UK", url: "https://www.mind.org.uk", desc: "Direct support, resources, and helpline guides for mental health wellbeing" },
        { title: "Athletes for Hope", url: "https://www.athletesforhope.org", desc: "Mental health resource directory tailored specifically to athletes" }
      ],
      exercise: "<strong>Try a 3-Step Gratitude Check (30s):</strong><br/>List 3 things you are glad for today that have absolutely nothing to do with your sport. Re-anchors your happiness outside athlete expectations."
    }
  };

  // Rule-based classification engine
  function classifyInput(msgText) {
    const text = msgText.toLowerCase();

    if (text.includes("anx") || text.includes("nervous") || text.includes("jitters") || text.includes("shake") || text.includes("choke") || text.includes("game today") || text.includes("scared") || text.includes("pressure") || text.includes("match") || text.includes("compete") || text.includes("panic")) {
      return "performance_anxiety";
    }
    if (text.includes("burnout") || text.includes("tired") || text.includes("quit") || text.includes("exhausted") || text.includes("drain") || text.includes("weary") || text.includes("overwhelmed") || text.includes("no energy") || text.includes("fatigue") || text.includes("sick of")) {
      return "burnout";
    }
    if (text.includes("injur") || text.includes("hurt") || text.includes("rehab") || text.includes("sprain") || text.includes("tear") || text.includes("cast") || text.includes("pain") || text.includes("sidelined") || text.includes("comeback")) {
      return "injury_recovery";
    }
    if (text.includes("confidence") || text.includes("doubt") || text.includes("suck") || text.includes("fail") || text.includes("bad at") || text.includes("impostor") || text.includes("not good") || text.includes("mistake")) {
      return "confidence";
    }
    if (text.includes("motivat") || text.includes("lazy") || text.includes("care") || text.includes("bored") || text.includes("uninspired") || text.includes("why bother") || text.includes("slump")) {
      return "motivation";
    }
    if (text.includes("stress") || text.includes("exam") || text.includes("school") || text.includes("grade") || text.includes("study") || text.includes("busy") || text.includes("time")) {
      return "stress";
    }
    if (text.includes("perfect") || text.includes("100") || text.includes("standard") || text.includes("fault") || text.includes("disappoint") || text.includes("expectations")) {
      return "pressure_perfectionism";
    }
    if (text.includes("team") || text.includes("coach") || text.includes("conflict") || text.includes("fight") || text.includes("playing time") || text.includes("bench") || text.includes("drama") || text.includes("argue")) {
      return "team_conflict";
    }

    return "general_mental_health"; // Default fallback
  }

  // Handle user input
  function handleInput(text) {
    if (!text.trim()) return;

    // Show user message bubble
    addMessageBubble(text, true);
    chatInput.value = '';

    // Append Typing Animation
    const typingBubble = document.createElement('div');
    typingBubble.className = 'twap-msg twap-msg-assistant twap-typing-bubble';
    typingBubble.innerHTML = `
      <div class="twap-dot"></div>
      <div class="twap-dot"></div>
      <div class="twap-dot"></div>
    `;
    messagesLog.appendChild(typingBubble);
    messagesLog.scrollTop = messagesLog.scrollHeight;

    // Classify and respond after a slight 1s delay (feels responsive but human-like)
    setTimeout(() => {
      // Remove typing indicator
      typingBubble.remove();

      const categoryId = classifyInput(text);
      const data = resourceDirectory[categoryId];

      // Build output matching the strict guidelines
      let outputHTML = `Category: ${data.label}<br/><br/>`;
      outputHTML += `Helpful external resources:<br/><br/>`;
      data.resources.forEach(res => {
        outputHTML += `${res.title} — ${res.desc} — <a href="${res.url}" target="_blank" rel="noopener noreferrer">${res.url}</a><br/><br/>`;
      });

      if (data.exercise) {
        outputHTML += `<div class="twap-msg-exercise">Try this (optional):<br/>${data.exercise}</div>`;
      }

      addAssistantMessage(outputHTML);
    }, 1000);
  }

  // Handle forms
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleInput(chatInput.value);
  });

  // Handle quick action pills
  pillsTray.addEventListener('click', (e) => {
    const pill = e.target.closest('.twap-pill');
    if (!pill) return;
    const cat = pill.dataset.category;
    
    // Simulates user entering the keyword
    let promptText = "";
    if (cat === 'burnout') promptText = "I need help with burnout and physical fatigue.";
    if (cat === 'performance_anxiety') promptText = "I'm dealing with performance anxiety before my game.";
    if (cat === 'confidence') promptText = "I want to improve my confidence and self-belief.";
    if (cat === 'injury_recovery') promptText = "How do I handle injury recovery and rehabilitation?";

    handleInput(promptText);
  });
})();
