/* PNM MEKAAR JOURNEY - GAME ENGINE */

// Initialize dynamic viewport height for mobile browsers
function initVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', initVH);
window.addEventListener('orientationchange', initVH);
initVH();

// Game Configuration & State
const CONFIG = {
  totalNasabahGoal: 10,
  encounters: {
    warung: {
      id: "warung",
      locationName: "Warung Sedap",
      isGroup: true,
      recruitsCount: 3,
      dialogues: [
        {
          speaker: "IBU INDAH",
          portraitId: 1, // nasabah1
          objection: "Waalaikumsalam. Oh, dari PNM Mekaar? Itu teh apa ya Neng? Semacam bank keliling yang bunganya harian gitu?",
          options: [
            { text: "PNM Mekaar itu layanan permodalan dan pemberdayaan kelompok khusus ibu-ibu prasejahtera untuk membantu usaha.", isCorrect: true },
            { text: "Ini bank keliling biasa Bu, yang penting Ibu pinjam uang dan bayar bunga tiap minggu secara perorangan.", isCorrect: false },
            { text: "Ini program bantuan sosial gratis dari pemerintah, jadi Ibu tidak perlu mengembalikan uangnya sama sekali.", isCorrect: false }
          ],
          correctResponse: "Oh begitu, jadi berbasis kelompok khusus ibu-ibu ya? Menarik juga, bukan bank keliling liar yang bunganya harian.",
          incorrectResponse: "Wah, kalau bank keliling mah bunganya mencekik neng, saya takut kelilit utang keliling."
        },
        {
          speaker: "IBU RITA",
          portraitId: 2, // nasabah2
          objection: "Tapi Neng, kalau mau pinjam di Mekaar, jaminannya apa ya? Harus pakai sertifikat tanah atau BPKB motor tidak?",
          options: [
            { text: "Harus ada jaminan emas minimal 5 gram atau BPKB motor yang masih aktif ya, Bu.", isCorrect: false },
            { text: "Tidak perlu jaminan surat berharga, Bu. Jaminannya adalah komitmen kelompok dan tanggung renteng.", isCorrect: true },
            { text: "Tidak ada jaminan sama sekali dan kalau tidak bayar juga tidak akan ditagih, Bu.", isCorrect: false }
          ],
          correctResponse: "Wah, bagus sekali! Kebetulan saya tidak punya surat berharga untuk dijaminkan. Jadi lebih tenang.",
          incorrectResponse: "Aduh, berat sekali kalau harus pakai sertifikat. Saya kan cuma jualan kecil-kecilan di depan rumah."
        },
        {
          speaker: "IBU SUMI",
          portraitId: 3, // nasabah3
          objection: "Kelompok? Berarti saya harus cari ibu-ibu lain ya? Berapa orang minimal dalam satu kelompok, Neng?",
          options: [
            { text: "Cukup berdua saja dengan tetangga sebelah sudah bisa buat kelompok kok, Bu.", isCorrect: false },
            { text: "Harus minimal 100 orang biar ramai sekampung, Bu.", isCorrect: false },
            { text: "Satu kelompok Mekaar biasanya terdiri dari minimal 10 hingga 30 orang ibu-ibu di sekitar sini.", isCorrect: true }
          ],
          correctResponse: "Oh, 10 sampai 30 orang. Baik, nanti saya ajak ibu-ibu pengajian di sebelah, mereka banyak yang punya usaha.",
          incorrectResponse: "Masa cuma berdua neng? Kurang ramai dong. Atau kalau 100 orang kebanyakan, susah carinya."
        }
      ]
    },
    sayur: {
      id: "sayur",
      locationName: "Gerobak Sayur",
      isGroup: true,
      recruitsCount: 3,
      dialogues: [
        {
          speaker: "IBU YATI",
          portraitId: 4, // nasabah4
          objection: "Neng, kalau nanti ada salah satu anggota kelompok yang tidak bisa bayar angsuran karena sakit atau usahanya sepi, bagaimana?",
          options: [
            { text: "Di Mekaar ada sistem tanggung renteng, Bu. Anggota kelompok lain membantu menutupi angsuran anggota yang kesulitan.", isCorrect: true },
            { text: "Petugas PNM akan menyita barang-barang di rumah anggota yang sakit tersebut sampai lunas.", isCorrect: false },
            { text: "Angsuran yang macet itu akan kami anggap lunas dan diputihkan begitu saja tanpa masalah.", isCorrect: false }
          ],
          correctResponse: "Oh, sistem gotong royong ya. Baguslah neng, jadi kita saling membantu sesama tetangga di kala susah.",
          incorrectResponse: "Hii.. serem banget kalau disita mah! Saya jadi takut ikutan neng, nanti malah musuhan sama tetangga."
        },
        {
          speaker: "IBU ANI",
          portraitId: 5, // nasabah5
          objection: "Neng, suami saya kerjanya serabutan. Apa saya harus minta izin suami dulu untuk gabung Mekaar?",
          options: [
            { text: "Sangat penting, Bu. Salah satu syarat bergabung Mekaar adalah mendapatkan persetujuan dari suami/keluarga.", isCorrect: true },
            { text: "Tidak perlu Bu, diam-diam saja biar suami tidak tahu kalau Ibu punya pinjaman tambahan.", isCorrect: false },
            { text: "Tergantung Bu, kalau suami galak baru minta izin, kalau tidak galak langsung daftar saja.", isCorrect: false }
          ],
          correctResponse: "Benar juga ya, biar berkah usahanya dan tidak jadi ribut di rumah tangga kalau suami tahu belakangan.",
          incorrectResponse: "Nanti kalau ketahuan diam-diam malah jadi masalah besar di rumah, saya tidak mau neng."
        },
        {
          speaker: "IBU SRI",
          portraitId: 6, // nasabah6
          objection: "Uang pinjamannya nanti boleh dipakai untuk beli handphone baru anak saya tidak, Neng? Dia merengek terus.",
          options: [
            { text: "Boleh sekali Bu, yang penting angsurannya lancar tiap minggu.", isCorrect: false },
            { text: "Maaf Bu, pinjaman Mekaar hanya boleh digunakan untuk modal usaha produktif, bukan kebutuhan konsumtif.", isCorrect: true },
            { text: "Boleh untuk beli handphone, asal handphone-nya dipakai untuk main game Mekaar ini bersama anak.", isCorrect: false }
          ],
          correctResponse: "Oh begitu ya. Ya sudah, uangnya saya pakai untuk beli mesin jahit baru saja biar pesanan baju lancar.",
          incorrectResponse: "Kalau buat beli HP boleh sih senang anaknya, tapi usahanya tidak berkembang dong ya, neng."
        }
      ]
    },
    siti: {
      id: "siti",
      locationName: "Toko Kelontong Ibu Siti",
      isGroup: false,
      recruitsCount: 1,
      dialogues: [
        {
          speaker: "IBU SITI",
          portraitId: 7, // nasabah7
          objection: "Neng, saya dengar ada pertemuan tiap minggu ya? Wajib datang kah? Saya sibuk sekali jaga warung kelontong.",
          options: [
            { text: "Tidak wajib datang kok Bu, titip uangnya saja ke ketua kelompok setiap minggu.", isCorrect: false },
            { text: "Wajib datang Bu, Pertemuan Kelompok Mingguan (PKM) hanya 30 menit untuk bayar angsuran & dapat pembinaan usaha.", isCorrect: true },
            { text: "Wajib datang dari pagi sampai sore untuk membantu petugas bersih-bersih kantor PNM cabang.", isCorrect: false }
          ],
          correctResponse: "Oh, cuma 30 menit ya dan ada pembinaan usahanya juga. Baiklah kalau begitu saya luangkan waktu.",
          incorrectResponse: "Ah, kalau titip-titip nanti uangnya terselip atau hilang malah repot neng. Mending datang langsung."
        }
      ]
    },
    tini: {
      id: "tini",
      locationName: "Ibu Tini Penjual Ikan",
      isGroup: false,
      recruitsCount: 1,
      dialogues: [
        {
          speaker: "IBU TINI",
          portraitId: 8, // nasabah8
          objection: "Neng, tetangga saya ada laki-laki yang punya usaha bengkel, dia mau gabung juga. Boleh tidak dia ikut kelompok kami?",
          options: [
            { text: "Mohon maaf Bu, program PNM Mekaar ini khusus ditujukan untuk kaum perempuan/ibu-ibu prasejahtera saja.", isCorrect: true },
            { text: "Boleh saja Bu, asalkan dia memakai daster saat pertemuan kelompok agar seragam.", isCorrect: false },
            { text: "Tentu boleh Bu, laki-laki atau perempuan semuanya boleh bergabung asal punya KTP.", isCorrect: false }
          ],
          correctResponse: "Oh khusus perempuan ya. Nanti saya sampaikan ke dia untuk cari program pinjaman yang lain di PNM.",
          incorrectResponse: "Nanti kalau dicampur bapak-bapak, kami ibu-ibu malah jadi sungkan mau diskusi kelompok neng."
        }
      ]
    },
    wati: {
      id: "wati",
      locationName: "Kandang Ayam Ibu Wati",
      isGroup: false,
      recruitsCount: 1,
      dialogues: [
        {
          speaker: "IBU WATI",
          portraitId: 9, // nasabah9
          objection: "Neng, apa setelah dapat pinjaman kita dibiarkan begitu saja, atau ada bimbingan untuk usaha ternak ayam saya?",
          options: [
            { text: "Kami hanya meminjamkan uang saja Bu, setelah itu urusan sukses atau bangkrut ditanggung masing-masing.", isCorrect: false },
            { text: "PNM memberikan pelatihan dan pendampingan usaha berkala untuk membantu ibu-ibu mengembangkan usahanya.", isCorrect: true },
            { text: "Nanti petugas kami yang akan menjalankan usaha Ibu, Ibu tinggal terima bagi hasil bersih saja.", isCorrect: false }
          ],
          correctResponse: "Wah hebat ya, tidak cuma dikasih modal tapi diajari juga cara berbisnis yang baik! Sangat membantu.",
          incorrectResponse: "Yaa kalau dibiarkan begitu saja takutnya saya salah kelola modal malah merugi."
        }
      ]
    },
    minah: {
      id: "minah",
      locationName: "Gerobak Bakso Ibu Minah",
      isGroup: false,
      recruitsCount: 1,
      dialogues: [
        {
          speaker: "IBU MINAH",
          portraitId: 10, // nasabah10
          objection: "Neng, proses pencairan uangnya nanti di mana ya? Apakah petugas datang bawa uang tunai banyak ke rumah?",
          options: [
            { text: "Pencairan dana dilakukan secara nontunai melalui rekening bank transfer demi keamanan dan kenyamanan ibu-ibu.", isCorrect: true },
            { text: "Pencairan secara tunai di balai desa pada malam hari biar tidak ketahuan warga lain.", isCorrect: false },
            { text: "Petugas akan mengantar uang tunai langsung ke rumah masing-masing anggota secara sembunyi-sembunyi.", isCorrect: false }
          ],
          correctResponse: "Oh lewat transfer bank ya, aman dari copet neng, dan uangnya bisa langsung disimpan sebagian.",
          incorrectResponse: "Ngeri juga kalau petugas bawa uang tunai keliling desa, rawan kejahatan di jalan neng."
        }
      ]
    }
  }
};

const STATE = {
  screen: "menu", // menu, level_select, map, dialogue, victory
  collectedCount: 0,
  firstTryCorrect: 0,
  soundEnabled: true,
  completedEncounters: new Set(),
  activeEncounterId: null,
  dialogueIndex: 0,
  isFirstTry: true,
  audioCtx: null
};

// Handle Portrait Asset Filename Typos
function getPortraitUrl(id, state) {
  // Special overrides for typos
  let expression = state; // idle, talk, think, laugh
  
  if (id === 5 && expression === "idle") {
    // nasabah5idle.png is actually nasabah5dle.png
    expression = "dle";
  }
  
  let prefix = `nasabah${id}`;
  if (id === 2 && expression === "laugh") {
    // nasbah2laugh.png (missing 'a' in nasabah)
    prefix = "nasbah2";
  }
  
  return `nasabah/${prefix}${expression}.png`;
}

// Synthesize Sounds using Web Audio API
function initAudio() {
  if (!STATE.audioCtx) {
    STATE.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!STATE.soundEnabled) return;
  initAudio();
  if (!STATE.audioCtx) return;

  const ctx = STATE.audioCtx;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  const now = ctx.currentTime;

  if (type === "tap") {
    // Quick click sound
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.08);
    osc.start(now);
    osc.stop(now + 0.08);
  } 
  else if (type === "correct") {
    // Uplifting arpeggio chime (C5 -> E5 -> G5 -> C6)
    osc.type = "sine";
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
    
    notes.forEach((freq, idx) => {
      osc.frequency.setValueAtTime(freq, now + (idx * 0.08));
    });
    
    osc.start(now);
    osc.stop(now + 0.4);
  } 
  else if (type === "incorrect") {
    // Buzz sound slide down
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.35);
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.2);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.35);
    
    // Add low pass filter to make it buzzier and less harsh
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, now);
    
    osc.disconnect(gainNode);
    osc.connect(filter);
    filter.connect(gainNode);
    
    osc.start(now);
    osc.stop(now + 0.35);
  } 
  else if (type === "victory") {
    // Festive Fanfare (C5 -> G5 -> C6)
    osc.type = "triangle";
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.6);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
    
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(783.99, now + 0.15); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
    
    osc.start(now);
    osc.stop(now + 0.8);
  }
}

// Screen Navigation
function showScreen(screenId) {
  playSound("tap");
  document.querySelectorAll(".game-screen").forEach(s => s.classList.remove("active"));
  document.getElementById(`${screenId}-screen`).classList.add("active");
  STATE.screen = screenId;

  // Extra logic for specific screens
  if (screenId === "map") {
    updateMapHUD();
  }
}

// Update Map HUD values
function updateMapHUD() {
  document.getElementById("collected-count").innerText = `${STATE.collectedCount} / ${CONFIG.totalNasabahGoal}`;
  const percentage = (STATE.collectedCount / CONFIG.totalNasabahGoal) * 100;
  document.getElementById("hud-progress-bar-fill").style.width = `${percentage}%`;

  // Update classes on map locations
  document.querySelectorAll(".map-encounter").forEach(el => {
    const encId = el.getAttribute("data-id");
    if (STATE.completedEncounters.has(encId)) {
      el.classList.add("completed");
      el.querySelector(".speech-bubble").innerText = "✓";
    } else {
      el.classList.remove("completed");
      el.querySelector(".speech-bubble").innerText = "...";
    }
  });
}

// Start Encounter
function startEncounter(encounterId) {
  if (STATE.completedEncounters.has(encounterId)) {
    return; // Already completed
  }
  
  STATE.activeEncounterId = encounterId;
  STATE.dialogueIndex = 0;
  STATE.isFirstTry = true;
  
  const encData = CONFIG.encounters[encounterId];
  
  // Set headers
  document.getElementById("dialogue-location-name").innerText = encData.locationName;
  if (encData.isGroup) {
    document.getElementById("group-progress").style.display = "inline-block";
    document.getElementById("group-progress").innerText = `1/${encData.dialogues.length}`;
  } else {
    document.getElementById("group-progress").style.display = "none";
  }
  
  showScreen("dialogue");
  loadDialogueStep();
}

// Load Dialogue Step
function loadDialogueStep() {
  const encData = CONFIG.encounters[STATE.activeEncounterId];
  const dialogue = encData.dialogues[STATE.dialogueIndex];
  
  // Set speaker name
  document.getElementById("speaker-name").innerText = dialogue.speaker;
  
  // Set dialogue objection text
  document.getElementById("dialogue-text").innerText = dialogue.objection;
  
  // Set character portrait to "talk" mode initially
  const portraitImg = document.getElementById("npc-portrait");
  portraitImg.src = getPortraitUrl(dialogue.portraitId, "talk");
  portraitImg.className = "npc-portrait-img"; // reset animations
  
  // Populate options list
  const optionsList = document.getElementById("options-list");
  optionsList.innerHTML = "";
  
  dialogue.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt.text;
    btn.addEventListener("click", () => handleOptionSelect(opt, btn));
    optionsList.appendChild(btn);
  });
  
  // Hide feedback panel
  document.getElementById("dialogue-feedback").classList.add("hidden");
}

// Handle Option Selection
function handleOptionSelect(option, buttonEl) {
  const encData = CONFIG.encounters[STATE.activeEncounterId];
  const dialogue = encData.dialogues[STATE.dialogueIndex];
  const portraitImg = document.getElementById("npc-portrait");
  const feedbackPanel = document.getElementById("dialogue-feedback");
  const feedbackIcon = document.getElementById("feedback-icon");
  const feedbackTitle = document.getElementById("feedback-title");
  const feedbackResponse = document.getElementById("feedback-response");
  
  portraitImg.className = "npc-portrait-img"; // reset animations
  
  if (option.isCorrect) {
    playSound("correct");
    
    // Add success animations
    portraitImg.src = getPortraitUrl(dialogue.portraitId, "laugh");
    portraitImg.classList.add("happy");
    
    // Show correct feedback
    feedbackIcon.className = "feedback-icon correct";
    feedbackTitle.innerText = "Tepat Sekali!";
    feedbackTitle.className = "feedback-title correct";
    feedbackResponse.innerText = dialogue.correctResponse;
    
    // Track stats
    if (STATE.isFirstTry) {
      STATE.firstTryCorrect++;
    }
    
    // Setup Next button
    const btnNext = document.getElementById("btn-feedback-next");
    btnNext.innerText = "LANJUT";
    btnNext.onclick = () => {
      playSound("tap");
      advanceDialogue();
    };
    
    feedbackPanel.classList.remove("hidden");
  } else {
    playSound("incorrect");
    
    // Mark as failed first try
    STATE.isFirstTry = false;
    
    // Add error animations
    portraitImg.src = getPortraitUrl(dialogue.portraitId, "think");
    portraitImg.classList.add("incorrect");
    
    // Show incorrect feedback
    feedbackIcon.className = "feedback-icon incorrect";
    feedbackTitle.innerText = "Kurang Tepat!";
    feedbackTitle.className = "feedback-title incorrect";
    feedbackResponse.innerText = dialogue.incorrectResponse;
    
    // Disable this option button to prevent re-clicks
    buttonEl.style.opacity = "0.5";
    buttonEl.disabled = true;
    buttonEl.style.border = "2px solid #ffcdd2";
    buttonEl.style.backgroundColor = "#ffebee";
    
    // Setup Retry button
    const btnNext = document.getElementById("btn-feedback-next");
    btnNext.innerText = "COBA LAGI";
    btnNext.onclick = () => {
      playSound("tap");
      feedbackPanel.classList.add("hidden");
      // Put character back to think/idle state
      portraitImg.src = getPortraitUrl(dialogue.portraitId, "think");
      portraitImg.classList.remove("incorrect");
    };
    
    feedbackPanel.classList.remove("hidden");
  }
}

// Advance Dialogue Step
function advanceDialogue() {
  const encData = CONFIG.encounters[STATE.activeEncounterId];
  
  // Increment sub-dialogue index
  STATE.dialogueIndex++;
  
  if (STATE.dialogueIndex < encData.dialogues.length) {
    // Load next dialog in this group
    document.getElementById("group-progress").innerText = `${STATE.dialogueIndex + 1}/${encData.dialogues.length}`;
    STATE.isFirstTry = true;
    loadDialogueStep();
  } else {
    // Group encounter fully complete!
    STATE.completedEncounters.add(STATE.activeEncounterId);
    STATE.collectedCount += encData.recruitsCount;
    
    // Check win condition
    if (STATE.collectedCount >= CONFIG.totalNasabahGoal) {
      triggerVictory();
    } else {
      // Go back to map
      showScreen("map");
    }
  }
}

// Victory Event
function triggerVictory() {
  playSound("victory");
  
  // Calculate final score stars
  // Total questions is 10.
  // 10 correct = 3 stars, 8-9 correct = 2 stars, < 8 correct = 1 star.
  const starRatingImg = document.getElementById("victory-stars-img");
  const ratingTextEl = document.getElementById("victory-rating-text");
  
  if (STATE.firstTryCorrect === 10) {
    starRatingImg.src = "3star.png";
    ratingTextEl.innerText = "Sangat Kompeten! (3 Bintang)";
    ratingTextEl.className = "stat-value text-gold";
  } else if (STATE.firstTryCorrect >= 8) {
    starRatingImg.src = "2star.png";
    ratingTextEl.innerText = "Cukup Kompeten (2 Bintang)";
    ratingTextEl.className = "stat-value text-green";
  } else {
    starRatingImg.src = "1star.png";
    ratingTextEl.innerText = "Perlu Belajar Lagi (1 Bintang)";
    ratingTextEl.className = "stat-value text-dark";
  }
  
  // Update stats
  document.getElementById("victory-correct-answers").innerText = `${STATE.firstTryCorrect} / 10`;
  
  // Launch Confetti Particles
  launchConfetti();
  
  showScreen("victory");
}

// Reset Game to replay
function resetGame() {
  STATE.collectedCount = 0;
  STATE.firstTryCorrect = 0;
  STATE.completedEncounters.clear();
  STATE.activeEncounterId = null;
  STATE.dialogueIndex = 0;
  STATE.isFirstTry = true;
  
  // Set star icon in level selector card to match current progress (default 1 star before starting)
  document.getElementById("star-rating-img").src = "1star.png";
  
  updateMapHUD();
}

// Confetti System
function launchConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";
  
  const colors = ["#f4c430", "#008343", "#0a4f8f", "#ff5722", "#e91e63", "#4caf50"];
  
  for (let i = 0; i < 60; i++) {
    const p = document.createElement("div");
    p.className = "confetti-particle";
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${-20 - (Math.random() * 50)}px`;
    p.style.width = `${6 + Math.random() * 8}px`;
    p.style.height = `${6 + Math.random() * 8}px`;
    
    // Randomize pathing & timings
    const duration = 2.5 + Math.random() * 1.5;
    const delay = Math.random() * 2;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    
    container.appendChild(p);
  }
}

// Sound Sync Helpers
function updateSoundUI() {
  const globalBtn = document.getElementById("sound-toggle");
  const pauseBtn = document.getElementById("pause-sound-toggle");
  
  if (STATE.soundEnabled) {
    globalBtn.className = "icon-btn sound-on";
    if (pauseBtn) {
      pauseBtn.innerText = "SUARA: AKTIF";
      pauseBtn.className = "btn btn-primary";
    }
  } else {
    globalBtn.className = "icon-btn sound-off";
    if (pauseBtn) {
      pauseBtn.innerText = "SUARA: MATI";
      pauseBtn.className = "btn btn-secondary";
    }
  }
}

function toggleSound() {
  STATE.soundEnabled = !STATE.soundEnabled;
  if (STATE.soundEnabled) {
    initAudio();
  }
  updateSoundUI();
}

// Fullscreen API Helper Methods
function toggleFullscreen() {
  const doc = window.document;
  const docEl = doc.documentElement;
  
  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
  const isFS = !!(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
  
  if (!isFS) {
    if (requestFullScreen) {
      requestFullScreen.call(docEl).catch(err => {
        console.warn("Fullscreen request failed:", err);
      });
    }
  } else {
    if (cancelFullScreen) {
      cancelFullScreen.call(doc);
    }
  }
}

function updateFullscreenUI() {
  const isFS = !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
  
  const btnMM = document.getElementById("fullscreen-toggle");
  if (btnMM) {
    btnMM.querySelector("svg").innerHTML = isFS 
      ? `<path fill="currentColor" d="M10,21V19H7V16H5V21H10M17,19H14V21H19V16H17V19M17,8H19V3H14V5H17V8M10,5H7V8H5V3H10V5Z"/>`
      : `<path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"/>`;
  }
  
  const btnPause = document.getElementById("pause-fullscreen-toggle");
  if (btnPause) {
    btnPause.innerText = isFS ? "LAYAR BIASA" : "LAYAR PENUH";
    btnPause.className = isFS ? "btn btn-primary" : "btn btn-secondary";
  }
}

document.addEventListener("fullscreenchange", updateFullscreenUI);
document.addEventListener("webkitfullscreenchange", updateFullscreenUI);
document.addEventListener("mozfullscreenchange", updateFullscreenUI);
document.addEventListener("MSFullscreenChange", updateFullscreenUI);

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Fullscreen Toggle Listeners
  document.getElementById("fullscreen-toggle").addEventListener("click", () => {
    toggleFullscreen();
    playSound("tap");
  });
  document.getElementById("pause-fullscreen-toggle").addEventListener("click", () => {
    toggleFullscreen();
    playSound("tap");
  });

  // Main Menu Buttons
  document.getElementById("btn-play").addEventListener("click", () => {
    // Show level selection popup modal
    // Set level card star to match current high score star (default: check completed history)
    document.getElementById("level-select-overlay").classList.add("active");
    playSound("tap");
  });
  
  document.getElementById("btn-options").addEventListener("click", () => {
    document.getElementById("instructions-modal").classList.add("active");
    playSound("tap");
  });
  

  // Pause Modal Handlers
  document.getElementById("btn-pause-resume").addEventListener("click", () => {
    document.getElementById("pause-modal").classList.remove("active");
    playSound("tap");
  });

  document.getElementById("btn-pause-instructions").addEventListener("click", () => {
    document.getElementById("instructions-modal").classList.add("active");
    playSound("tap");
  });

  document.getElementById("btn-pause-menu").addEventListener("click", () => {
    document.getElementById("pause-modal").classList.remove("active");
    resetGame();
    showScreen("menu");
  });

  document.getElementById("pause-sound-toggle").addEventListener("click", () => {
    toggleSound();
  });

  // Level Selection Modal
  document.getElementById("btn-close-level-select").addEventListener("click", () => {
    document.getElementById("level-select-overlay").classList.remove("active");
    playSound("tap");
  });
  
  document.getElementById("btn-start-level").addEventListener("click", () => {
    document.getElementById("level-select-overlay").classList.remove("active");
    resetGame();
    showScreen("map");
  });
  
  // Close Instructions
  document.getElementById("btn-close-instructions").addEventListener("click", () => {
    document.getElementById("instructions-modal").classList.remove("active");
    playSound("tap");
  });

  // Dialogue Back Button
  document.getElementById("btn-dialogue-back").addEventListener("click", () => {
    showScreen("map");
  });
  
  // Victory Screen Buttons
  document.getElementById("btn-replay").addEventListener("click", () => {
    resetGame();
    showScreen("map");
  });
  
  document.getElementById("btn-home").addEventListener("click", () => {
    resetGame();
    showScreen("menu");
  });

  // Global Settings Gear Toggle
  document.getElementById("sound-toggle").addEventListener("click", () => {
    updateSoundUI();
    const btnMenu = document.getElementById("btn-pause-menu");
    if (STATE.screen === "menu") {
      btnMenu.style.display = "none";
    } else {
      btnMenu.style.display = "block";
    }
    document.getElementById("pause-modal").classList.add("active");
    playSound("tap");
  });

  // Setup Map Encounters click triggers
  document.querySelectorAll(".map-encounter").forEach(el => {
    el.addEventListener("click", () => {
      const encId = el.getAttribute("data-id");
      startEncounter(encId);
    });
  });
  
});
