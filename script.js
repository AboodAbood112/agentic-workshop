const fs = require('fs');

const translations = {
    'ar': {
        'completed': 'مكتمل',
        'startFromLevel1': 'ابدأ من المستوى الأول',
        'levelsRemaining': 'مستوى متبقي',
        'workshopCompleted': 'أتممت الورشة كاملة!',
        'overview': 'نظرة عامة',
        'content': 'المحتوى',
        'whatYouWillLearn': 'ما ستتعلمه',
        'keyTakeaway': 'الفكرة الرئيسية',
        'markComplete': '✓ وضّع كمكتمل',
        'completedUndo': '✓ مكتمل — إلغاء',
        'explainMore': 'اشرح أكثر ↗',
        'openPage': 'افتح الصفحة ↗',
        'close': '✕ إغلاق',
        'available': 'متاح',
        'heroSubtitle': '12 مستوى — من Prime Prompt حتى نظام تطوير مستقل كامل'
    },
    'en': {
        'completed': 'completed',
        'startFromLevel1': 'Start from level 1',
        'levelsRemaining': 'levels remaining',
        'workshopCompleted': 'Workshop completed!',
        'overview': 'Overview',
        'content': 'Content',
        'whatYouWillLearn': "What you'll learn",
        'keyTakeaway': 'Key takeaway',
        'markComplete': '✓ Mark complete',
        'completedUndo': '✓ Completed — Undo',
        'explainMore': 'Explain more ↗',
        'openPage': 'Open page ↗',
        'close': '✕ Close',
        'available': 'Available',
        'heroSubtitle': '12 levels — from Prime Prompt to a fully autonomous dev system'
    }
};

const levels_en = {
    1: {
        'learn_en': [
            "What is AGENTS.md and why it's the most important file in the Agentic toolkit",
            "What memory files are and how they persist context across sessions",
            "The Goldilocks Zone: 30-50 lines — no more, no less",
            "Writing AGENTS.md makes the Agent instantly productive from the first session"
        ],
        'take_en': "AGENTS.md is the foundation — every other layer in the workshop is built upon it. Get this right and everything works better.",
        'sec_en': "Class 1 — Foundation",
        'content_en': '<h3>What is AGENTS.md?</h3><p>It\'s a <code>Prime Prompt</code> file that lives at the root of your project and loads automatically every session. Think of it as a briefing document for a new engineer on their first day.</p><h3>Where does it live?</h3><ul><li><code>./AGENTS.md</code> — Project root for all sessions</li><li><code>~/.pi/agent/AGENTS.md</code> — Global for all projects</li><li><code>./apps/backend/AGENTS.md</code> — Specific folder for monorepo</li></ul><h3>The Goldilocks Zone</h3><p>The goal is 30-50 lines covering 6 sections: Context, Tooling, Key Commands, Project Structure, Dev Guidelines, Important Notes.</p><div class="note">⚠️ Common mistake: writing AGENTS.md once and not updating it. An outdated file is worse than no file.</div>'
    },
    2: {
        'learn_en': [
            "What Sub-Agents are and how to create specialists for specific tasks",
            "What AI docs are and how to give the Agent deep knowledge of your system",
            "What Plan commands are and how to create reusable workflows",
            "How these tools enable expert-level parallel work"
        ],
        'take_en': "Sub-agents are specialists, AI docs are knowledge, Commands are workflows. Separation of concerns applied to Agents.",
        'sec_en': "Class 1 — Foundation",
        'content_en': '<h3>Sub-Agents</h3><p>Specialized prompt files in <code>.pi/prompts/agents/</code>. Each defines an expert with a specific goal and limited tools.</p><h3>AI Docs</h3><p>Knowledge files in <code>ai_docs/</code> — they tell the Agent how the system works internally. Difference from AGENTS.md: AGENTS.md says "how to run it", AI Docs say "how it was built and why".</p><h3>Plan Commands</h3><p>Workflows in <code>.pi/prompts/</code> invoked with <code>/</code>. Like <code>/prime</code> and <code>/quick-plan</code>.</p><div class="note">⚠️ Do not put AI Docs content in AGENTS.md — this brings you back to the harmful "encyclopedia" pattern.</div>'
    },
    3: {
        'learn_en': [
            "What Skills are and how they differ from Sub-Agents in structure and purpose",
            "What MCP servers are and how they bypass local file limits",
            "How to create custom tools just by describing the pattern in AGENTS.md",
            "How to control permissions via settings.json for security"
        ],
        'take_en': "Skills, MCPs, and Custom Tools all extend the core 4 tools. Start simple and add complexity only when needed.",
        'sec_en': "Class 1 — Foundation",
        'content_en': '<h3>Skills vs Sub-Agents</h3><p>Sub-Agent = single file, works independently. Skill = folder with templates, works within current context.</p><p>Rule: If the task is independent → Sub-Agent. If you need templates → Skill.</p><h3>MCP Servers</h3><p>External processes providing tools beyond the basics: Firecrawl for web scraping, Playwright for browser automation, Slack/GitHub for workflow integration.</p><h3>Settings.json</h3><p>Permission control: <code>allow</code> list for auto-running commands, <code>deny</code> list for permanently blocked commands.</p><div class="note">⚠️ Never save API keys in the repo. Use .mcp.json.sample without real keys.</div>'
    },
    4: {
        'learn_en': [
            "The Request/Validate/Resolve pattern for self-correcting Agents",
            "How the Agent reviews its work and categorizes issues into 4 severity levels",
            "Why more compute = higher trust and this trade-off is always worth it",
            "Building chains of Build, Review, and Fix to form a closed loop"
        ],
        'take_en': "Closed loops catch bugs before you see them. A review catching a vulnerability costs cents — the same vulnerability in production costs a fortune.",
        'sec_en': "Class 1 — Quality",
        'content_en': '<h3>Open Loop vs Closed Loop</h3><p>Open Loop: request → execute → hope it\'s right. Closed Loop: request → execute → validate → fix → confirm.</p><h3>The 3 Commands</h3><ul><li><code>/build</code> — executes the plan, runs tests mandatory</li><li><code>/review</code> — analyzes diffs, outputs PASS/FAIL</li><li><code>/fix</code> — reads review report, fixes by priority</li></ul><h3>4 Severity Levels</h3><ul><li>🚨 BLOCKER — Must fix (security flaws, API breakage)</li><li>🔴 HIGH — Must fix (performance regression, missing error handling)</li><li>🟡 MEDIUM — Fix soon (code duplication, inconsistent naming)</li><li>🟢 LOW — Nice to have (style differences)</li></ul>'
    },
    5: {
        'learn_en': [
            "Why different types of work require radically different workflows",
            "Encoding reproduction-first, spec-driven, and assessment-first methodologies",
            "How variables ($1,$2) make Templates flexible and discoverable",
            "How the Plan Template connects other applications"
        ],
        'take_en': "Bug needs reproduction first. Feature needs Spec. Chore needs assessment. Templates encode best practices — every invocation follows the same process.",
        'sec_en': "Class 1 — Quality",
        'content_en': '<h3>/bug — Reproduction First</h3><p>Steps: reproduce → isolate → fix (minimal) → validate → regression test. Strict constraint: no refactoring surrounding code.</p><h3>/feature — Spec First</h3><p>Steps: Spec → Plan → Build → Test → Review. SCOPE variable: "spec" (stop after Spec) | "plan" | "full".</p><h3>/chore — Assessment First</h3><p>Steps: Assess → Execute → Validate → Document. No visible behavior change unless that\'s the goal.</p><h3>/plan — Read-only</h3><p>Absolute constraint: never write code. Produces specs/name.md for use in /build or /feature.</p>'
    },
    6: {
        'learn_en': [
            "How to chain Slash Commands sequentially passing data between them",
            "The Composable Primitives pattern: small commands compose into powerful workflows",
            "How to use the Task Tool to spawn parallel Sub-Agents",
            "Why passing file paths keeps the context window clean"
        ],
        'take_en': "Small primitives act alone and compose into powerful workflows. Pass file paths, not their content, between steps.",
        'sec_en': "Class 1 — Composition",
        'content_en': '<h3>Composable Primitives</h3><p>Scout (searches) → Plan (designs) → Build (executes). Each acts alone or within a Chain.</p><h3>Data Passing</h3><p>Each step writes its output to a file, the next step reads only the path. This keeps the context window clean and allows re-running one step without re-doing everything.</p><h3>Parallel Scout</h3><p>3 Agents at once: Agent 1 (Glob — file structure), Agent 2 (Grep — code content), Agent 3 (Import tracing). Results merge and save in one file.</p><div class="note">⚠️ Every Sub-Agent starts from scratch — make each agent\'s prompt self-contained.</div>'
    },
    7: {
        'learn_en': [
            "How expertise.yaml encodes deep, structured knowledge about a domain",
            "Why mental models eliminate repetitive discovery from O(n) to O(1)",
            "How Self-Improvement keeps the model accurate as code evolves",
            "Building Plan-Build-Improve chains that accumulate knowledge"
        ],
        'take_en': "An expert for each domain. The mental model turns every session from discovery to instant lookup. Knowledge accumulates with every cycle.",
        'sec_en': "Class 1 — Composition",
        'content_en': '<h3>expertise.yaml — Not docs</h3><p>Structured YAML containing: file paths with line numbers, every endpoint with method/path and request/response shape, every Zod schema, every database constraint.</p><h3>Self-Improvement</h3><p>After every change: reads git diff → compares with expertise.yaml → updates file → validates YAML syntax. Knowledge accumulates and stays accurate.</p><h3>Expert per Domain</h3><p>Backend (Hono, SQLite, Zod) + Frontend (React, State, API client) + Design System (Components, Props, Variants). Each expert separate.</p><div class="note">⚠️ Max 500 lines for expertise.yaml. A file exceeding context window defeats its purpose.</div>'
    },
    8: {
        'learn_en': [
            "What Out of the Loop means and why it turns an Agent from a tool into a system",
            "The PITER framework: Prompt/Input/Transform/Execute/Report",
            "Building HTTP webhook servers in Python that run PI commands",
            "Integrating GitHub and Slack as independent automated triggers"
        ],
        'take_en': "An Agent needing your presence for every task is a tool. An Agent responding to events automatically is a system. You are the designer now, not the operator.",
        'sec_en': "Class 2 — Autonomy",
        'content_en': '<h3>In-Loop vs Out-of-Loop</h3><p>In-Loop: you → Agent → result → you review. Out-of-Loop: event → Webhook → Agent → notification.</p><h3>PITER Framework</h3><ul><li><strong>P</strong>rompt — define the task</li><li><strong>I</strong>nput — gather context</li><li><strong>T</strong>ransform — clean data for Agent</li><li><strong>E</strong>xecute — run command</li><li><strong>R</strong>eport — send result to source</li></ul><h3>Architecture</h3><p>Generic server routes + Custom handlers implement PITER. Add new workflows just by adding handlers.</p><div class="note">⚠️ Transform is the value source — raw data is noisy. Silent failure in automated systems is the most dangerous.</div>'
    },
    9: {
        'learn_en': [
            "What ADWs are: Deterministic Python wrapping non-deterministic Agent execution",
            "Why hybrid architecture beats Pure Code and Pure Agent",
            "The step lifecycle pattern: log_start → execute → log_end",
            "Composing Plan/Build/Review/Fix steps into reliable pipelines"
        ],
        'take_en': "Code controls the flow. Model controls the thinking. ADW steps are real boundaries, not just suggestions — the Agent cannot skip them.",
        'sec_en': "Class 2 — Autonomy",
        'content_en': '<h3>Why Hybrid?</h3><p>Pure Code: predictable but cannot handle novel problems. Pure Agent: creative but loses context and skips steps. ADW = best of both.</p><h3>Step Lifecycle</h3><p><code>log_step_start(name)</code> → <code>subprocess.run(["pi", "-p", cmd])</code> → <code>log_step_end(name, result)</code>. Gives full Observability + clear boundaries + ability to retry failed step.</p><h3>Workflow Compositions</h3><ul><li>Plan → Build (2 steps — for quick features)</li><li>Plan → Build → Review (3 steps — with quality assurance)</li><li>Plan → Build → Review → Fix conditional (4 steps — full automation)</li></ul><div class="note">⚠️ Set a limit for MAX_FIX_CYCLES (2-3). Without it, an infinite loop is possible.</div>'
    },
    10: {
        'learn_en': [
            "What an Orchestrator is: A central Agent that creates and manages other Agents",
            "CRUD operations on Agents as a structured management pattern",
            "The Orchestrator as a lead engineer making delegation decisions",
            "One-Shot, Scout-then-Build, and ADW Dispatch patterns"
        ],
        'take_en': "The Orchestrator is a delegator, not an executor. CRUD is the mental model. Context flows through it to connect independent Agents.",
        'sec_en': "Class 3 — Coordination",
        'content_en': '<h3>Agent CRUD</h3><ul><li>🟢 Create — spawn Agent with specific goal and tools</li><li>🔵 Read — check status, retrieve outputs</li><li>🟡 Update — send new commands, modify instructions</li><li>🔴 Delete — terminate Agent when work is done</li></ul><h3>3 Patterns</h3><p>One-Shot (simple tasks) → Scout-and-Build (complex) → ADW Dispatch (multi-step).</p><h3>Cleanup Policy</h3><p>Delete One-shot agents after completion. Keep Multi-phase agents for inspection then delete them.</p><div class="note">⚠️ The Orchestrator does not write code or modify files. If it does, you built a giant Agent, not an Orchestrator.</div>'
    },
    11: {
        'learn_en': [
            "Orchestrator drives multi-phase workflows with specialized teams",
            "Multi-level conversations: persistent context spanning short-lived Agents",
            "Designing Worker Skills with minimal, focused capabilities per job",
            "Adaptive decisions at phase boundaries based on actual outcomes"
        ],
        'take_en': "Driven workflows outperform managed Agents. Each Agent sees a curated slice — Orchestrator sees everything and summarizes, not stacks.",
        'sec_en': "Class 3 — Coordination",
        'content_en': '<h3>4 Specialized Worker Agents</h3><ul><li>🔍 Scout — read-only, light model, search and explore</li><li>📐 Planner — strong model, plan design, no execution</li><li>🔨 Builder — full tools, strongest model, executes precisely</li><li>🔎 Reviewer — read-only, independent reviewer, PASS/FAIL</li></ul><h3>5 Phases with Decision Points</h3><p>Scout → <em>decision</em> → Plan → <em>decision</em> → Build → <em>decision</em> → Review → <em>decision</em> → Fix (conditional) → Report.</p><div class="note">⚠️ Without decision points between phases you have a shell script. With them you have an adaptive smart system.</div>'
    },
    12: {
        'learn_en': [
            "Merging ADWs (L9) with Orchestrator (L10-11) into a fully autonomous system",
            "Why deterministic code yields reliable autonomy when orchestrating Agents",
            "The Trust Equation: Determinism × Observability × Validation × Recovery",
            "The complete architecture tying all 12 Levels together"
        ],
        'take_en': "The Final Form: Python controls When and Why, Agents control How. Prompts are requests. Code are contracts.",
        'sec_en': "Class 3 — Coordination",
        'content_en': '<h3>The Triad Architecture</h3><ul><li>ADW (Python) — Deterministic control: validate, checkpoint, retry</li><li>Orchestrator (Agent) — Coordination: delegates Agent teams</li><li>Sub-Agents — Specialists: Scout, Planner, Builder, Reviewer</li></ul><h3>The Trust Equation</h3><p>Determinism × Observability × Validation × Recovery. Remove any single factor → system becomes unreliable.</p><h3>3 Workflow Types</h3><ul><li><code>plan_build</code> — for simple features</li><li><code>plan_build_review</code> — standard workflow</li><li><code>plan_build_review_fix</code> — for complex features with fix loop</li></ul><div class="note">🏆 At this level you have completed building a fully autonomous dev system from scratch.</div>'
    }
};

let content = fs.readFileSync('index.html', 'utf8');

// Add translations
const trans_str = JSON.stringify(translations, null, 2);
content = content.replace('const levels = [', `const translations = ${trans_str};\n\n  const levels = [`);

// Inject for each level
for (const [level_id, data] of Object.entries(levels_en)) {
    const pattern = new RegExp(`(id:\\s*${level_id},.*?)(    },)`, 's');
    
    const learn_en_str = JSON.stringify(data.learn_en);
    const take_en_str = JSON.stringify(data.take_en);
    const sec_en_str = JSON.stringify(data.sec_en);
    const content_en_str = JSON.stringify(data.content_en);
    
    const injection = `      learn_en: ${learn_en_str},
      take_en: ${take_en_str},
      sec_en: ${sec_en_str},
      content_en: ${content_en_str},
`;
    content = content.replace(pattern, `$1${injection}$2`);
}

// Replace javascript logic
const js_logic_replacement = `
  const sections_ar = [
    "Class 1 — الأساس",
    "Class 1 — الجودة",
    "Class 1 — التركيب",
    "Class 2 — الاستقلالية",
    "Class 3 — التنسيق",
  ];
  const sections_en = [
    "Class 1 — Foundation",
    "Class 1 — Quality",
    "Class 1 — Composition",
    "Class 2 — Autonomy",
    "Class 3 — Coordination"
  ];
  let done = new Set(JSON.parse(localStorage.getItem("adw_done") || "[]"));
  let cur = null;
  let lang = localStorage.getItem('workshop_lang') || 'ar';

  function toggleLang() {
    lang = lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('workshop_lang', lang);
    applyLang();
  }

  function applyLang() {
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const t = translations[lang];
    document.querySelector('.lang-toggle').textContent = lang === 'ar' ? 'EN' : 'عربي';
    document.getElementById('lbl-completed').textContent = t.completed;
    document.getElementById('lbl-hero-sub').textContent = t.heroSubtitle;
    document.getElementById('lbl-close').textContent = t.close;
    document.getElementById('lbl-overview').textContent = t.overview;
    document.getElementById('lbl-content').textContent = t.content;
    document.getElementById('lbl-learn').textContent = t.whatYouWillLearn;
    document.getElementById('lbl-take').textContent = t.keyTakeaway;
    document.getElementById('lbl-explain').textContent = t.explainMore;
    const fileLink = document.getElementById('p-file-link');
    if(fileLink) fileLink.textContent = t.openPage;

    if (cur) openPanel(cur.id);
    render();
  }

  function save() {
    try {
      localStorage.setItem("adw_done", JSON.stringify([...done]));
    } catch (e) {}
  }

  function updateProgress() {
    const p = Math.round((done.size / 12) * 100);
    document.getElementById("hfill").style.width = p + "%";
    document.getElementById("done-count").textContent = done.size;
    const t = translations[lang];
    document.getElementById("hstat").textContent =
      done.size === 12
        ? t.workshopCompleted
        : done.size === 0
          ? t.startFromLevel1
          : \`\${12 - done.size} \${t.levelsRemaining}\`;
  }

  function render() {
    const app = document.getElementById("app");
    let html = "";
    const sections = lang === 'ar' ? sections_ar : sections_en;
    const t = translations[lang];
    
    sections.forEach((sec) => {
      const grp = levels.filter((l) => (lang === 'ar' ? l.sec : l.sec_en) === sec);
      html += \`<div class="sec-label">\${sec}</div><div class="grid">\`;
      grp.forEach((l) => {
        const d = done.has(l.id),
          a = !d;
        const cc = d ? "card done" : a ? "card active" : "card";
        const nb = d ? "nb-done" : a ? "nb-active" : "nb-locked";
        const dc = d ? "d-done" : a ? "d-active" : "d-locked";
        const st = d ? t.completed : t.available;
        html += \`<div class="\${cc}" onclick="openPanel(\${l.id})">
        <div class="card-header">
          <div class="num-badge \${nb}">\${l.id}</div>
          <div class="card-info"><div class="card-class">\${l.cls}</div><div class="card-title">\${l.title}</div></div>
        </div>
        <div class="tags">\${l.tags.map((tg) => \`<span class="tag">\${tg}</span>\`).join("")}</div>
        <div class="card-footer">
          <div class="status"><div class="dot \${dc}"></div>\${st}</div>
          <button class="btn-open" onclick="event.stopPropagation();openPanel(\${l.id})">\${lang === 'ar' ? 'فتح' : 'Open'}</button>
        </div>
      </div>\`;
      });
      html += "</div>";
    });
    app.innerHTML = html;
    updateProgress();
  }

  function switchTab(name, btn) {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + name).classList.add("active");
  }

  function openPanel(id) {
    cur = levels.find((l) => l.id === id);
    if (!cur) return;
    document.getElementById("p-class").textContent = cur.cls;
    document.getElementById("p-title").textContent =
      \`Level \${cur.id}: \${cur.title}\`;
    const p_learn = lang === 'ar' ? cur.learn : cur.learn_en;
    document.getElementById("p-learn").innerHTML = p_learn
      .map((x) => \`<li>\${x}</li>\`)
      .join("");
    document.getElementById("p-take").textContent = lang === 'ar' ? cur.take : cur.take_en;
    const iframe = document.getElementById("p-content");
    const noScrollbarCSS =
      "::-webkit-scrollbar{display:none}body{scrollbar-width:none;-ms-overflow-style:none}";
    iframe.onload = function () {
      try {
        const s = iframe.contentDocument.createElement("style");
        s.textContent = noScrollbarCSS;
        iframe.contentDocument.head.appendChild(s);
      } catch (e) {}
    };
    
    const useFile = lang === 'ar' && cur.file;
    if (useFile) {
      iframe.src = cur.file;
      iframe.removeAttribute("srcdoc");
    } else {
      iframe.removeAttribute("src");
      const page_content = lang === 'ar' ? cur.content : cur.content_en;
      const html_dir = lang === 'ar' ? 'rtl' : 'ltr';
      iframe.srcdoc = \`<!DOCTYPE html><html dir="\${html_dir}"><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#0f172a;color:#94a3b8;padding:1rem;line-height:1.7;font-size:13px;scrollbar-width:none;-ms-overflow-style:none}body::-webkit-scrollbar{display:none}h3{font-size:14px;font-weight:600;color:#a78bfa;margin:1rem 0 .4rem;border-right:3px solid #7c3aed;padding-right:.5rem}p{margin-bottom:.6rem}ul{padding-right:1.2rem;margin-bottom:.6rem}li{margin:.25rem 0}code{background:#334155;padding:1px 5px;border-radius:3px;font-size:12px;color:#a3e635;font-family:monospace}.note{background:#1e293b;border-right:3px solid #f59e0b;padding:.5rem .75rem;border-radius:4px;margin:.6rem 0;font-size:12px;color:#fbbf24}</style></head><body>\${page_content}</body></html>\`;
    }
    
    updateDoneBtn();
    const link = document.getElementById("p-file-link");
    if (useFile) {
      link.href = cur.file;
      link.style.display = "";
    } else {
      link.style.display = "none";
    }
    document.querySelectorAll(".tab-btn")[0].click();
    document.getElementById("overlay").classList.add("open");
  }

  function updateDoneBtn() {
    if (!cur) return;
    const btn = document.getElementById("p-done-btn");
    const t = translations[lang];
    if (done.has(cur.id)) {
      btn.textContent = t.completedUndo;
      btn.classList.add("undone");
    } else {
      btn.textContent = t.markComplete;
      btn.classList.remove("undone");
    }
  }

  function toggleCurrentDone() {
    if (!cur) return;
    if (done.has(cur.id)) done.delete(cur.id);
    else done.add(cur.id);
    save();
    updateDoneBtn();
    render();
  }

  function askAboutCurrent() {
    if (!cur) return;
    const msg = lang === 'ar' 
        ? \`اشرحلي Level \${cur.id}: \${cur.title} من workshop agentic engineering بالتفصيل\`
        : \`Explain Level \${cur.id}: \${cur.title} from the agentic engineering workshop in detail\`;
    if(typeof sendPrompt === 'function') sendPrompt(msg);
  }

  function closePanel() {
    document.getElementById("overlay").classList.remove("open");
  }

  document.getElementById("overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("overlay")) closePanel();
  });

  applyLang();
`;

// Replace everything after `const sections = [`
const replaceRegex = /  const sections = \[[\s\S]*render\(\);\n/s;
content = content.replace(replaceRegex, js_logic_replacement);

fs.writeFileSync('index.html', content);

console.log("Updated index.html successfully.");
