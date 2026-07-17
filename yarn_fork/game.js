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
    citra: {
      id: "citra",
      locationName: "Cabang PNM Sukamaju",
      isGroup: false,
      recruitsCount: 0,
      dialogues: [
        {
          speaker: "CITRA (KUM)",
          portraitId: "citra",
          objection: "Selamat pagi! Selamat datang di Kantor Cabang PNM Sukamaju. Saya Citra, Ketua Unit Mekaar (KUM) di sini.",
          options: [{ text: "Lanjut", isCorrect: true }],
          correctResponse: ""
        },
        {
          speaker: "CITRA (KUM)",
          portraitId: "citra",
          objection: "Hari ini adalah tugas pertamamu sebagai Account Officer (AO) untuk melakukan sosialisasi dan rekrutmen nasabah di Desa Sukamaju.",
          options: [{ text: "Lanjut", isCorrect: true }],
          correctResponse: ""
        },
        {
          speaker: "CITRA (KUM)",
          portraitId: "citra",
          objection: "Sebelum berangkat ke desa, kamu harus bersiap-siap dan membawa perlengkapan berkendara yang aman dan sesuai standar safety riding kita.",
          options: [{ text: "Lanjut", isCorrect: true }],
          correctResponse: ""
        },
        {
          speaker: "CITRA (KUM)",
          portraitId: "citra",
          objection: "Pastikan kamu membawa barang wajib seperti Helm SNI, Jaket/Body Protect, Ransel, Dompet, dan HP. Jangan membawa barang berlebih atau perhiasan mencolok ya!",
          options: [{ text: "Lanjut", isCorrect: true }],
          correctResponse: ""
        },
        {
          speaker: "CITRA (KUM)",
          portraitId: "citra",
          objection: "Sekarang, silakan keluar melalui pintu di sebelah kiri untuk mempersiapkan perlengkapan Safety Riding kamu. Semangat bertugas!",
          options: [{ text: "Lanjut", isCorrect: true }],
          correctResponse: ""
        }
      ]
    },
    pakrt: {
      id: "pakrt",
      locationName: "Kantor Pak RT",
      isGroup: false,
      recruitsCount: 0,
      dialogues: [
        {
          speaker: "PAK RT",
          portraitId: "pakrt",
          objection: "Selamat siang, Neng. Ada perlu apa ya datang ke desa kami?",
          options: [
            { text: "Saya dari PNM Mekaar, mau izin untuk mensosialisasikan program pemberdayaan kelompok khusus ibu-ibu prasejahtera, Pak.", isCorrect: true },
            { text: "Saya mau menawarkan pinjaman perorangan dengan bunga harian untuk warga bapak, Pak.", isCorrect: false },
            { text: "Saya mau bagi-bagi hadiah gratis dari pemerintah tanpa syarat apa pun, Pak.", isCorrect: false }
          ],
          correctResponse: "Oh, program PNM Mekaar khusus ibu-ibu untuk pemberdayaan usaha ya? Bagus sekali itu. Kebetulan banyak warga saya yang butuh modal usaha. Silakan neng, saya izinkan bersosialisasi dengan warga!",
          incorrectResponse: "Wah, kalau pinjaman bunga harian atau bagi-bagi gratis yang tidak mendidik mah saya kurang setuju neng."
        }
      ]
    },
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

const LEVEL_CONFIGS = {
  1: {
    totalNasabahGoal: 10,
    encounters: null
  },
  2: {
    totalNasabahGoal: 3,
    encounters: {
      citra: {
        id: "citra",
        locationName: "Cabang PNM Sukamaju",
        isGroup: false,
        recruitsCount: 0,
        dialogues: [
          {
            speaker: "CITRA (KUM)",
            portraitId: "citra",
            objection: "Selamat pagi {playername}! Hari ini tugasmu adalah melakukan Uji Kelayakan & Verifikasi terhadap calon nasabah baru kita, Bu Lia.",
            options: [{ text: "Lanjut", isCorrect: true }],
            correctResponse: ""
          },
          {
            speaker: "CITRA (KUM)",
            portraitId: "citra",
            objection: "Kemarin Bu Lia mendaftar, namun saya belum tahu letak pasti rumahnya di Desa Sukamaju. Kamu harus mencari petunjuk di desa terlebih dahulu.",
            options: [{ text: "Lanjut", isCorrect: true }],
            correctResponse: ""
          },
          {
            speaker: "CITRA (KUM)",
            portraitId: "citra",
            objection: "Tanyakan petunjuk ke Kerumunan Ibu-ibu di desa dan salah satu Rumah Warga. Setelah letaknya terkonfirmasi, segera kunjungi Rumah Bu Lia untuk verifikasi.",
            options: [{ text: "Lanjut", isCorrect: true }],
            correctResponse: ""
          },
          {
            speaker: "CITRA (KUM)",
            portraitId: "citra",
            objection: "Pastikan safety riding-mu siap, lalu berangkatlah. Selamat bertugas!",
            options: [{ text: "Lanjut", isCorrect: true }],
            correctResponse: ""
          }
        ]
      },
      pakrt: {
        id: "pakrt",
        locationName: "Kantor Pak RT",
        isGroup: false,
        recruitsCount: 0,
        dialogues: [
          {
            speaker: "PAK RT",
            portraitId: "pakrt",
            objection: "Selamat pagi, Neng {playername}. Mau mencari rumah warga untuk Uji Kelayakan ya? Silakan tanya ke ibu-ibu yang sedang berkumpul di warung atau rumah warga lainnya.",
            options: [
              { text: "Terima kasih Pak RT, saya akan mencari informasi terlebih dahulu.", isCorrect: true },
              { text: "Iya Pak, saya langsung cari sendiri saja tanpa petunjuk.", isCorrect: false }
            ],
            correctResponse: "Bagus, semoga cepat ketemu rumahnya ya Neng.",
            incorrectResponse: "Waduh, desa ini cukup luas lho Neng, lebih baik tanya petunjuk warga dulu biar tidak tersesat."
          }
        ]
      },
      warung: {
        id: "warung",
        locationName: "Kerumunan Ibu-Ibu",
        isGroup: false,
        recruitsCount: 1,
        dialogues: [
          {
            speaker: "IBU INDAH",
            portraitId: 1,
            objection: "Eh ada petugas Mekaar. Ada perlu apa ke desa kami hari ini, Mbak?",
            options: [
              { text: "Saya mencari rumah Bu Lia untuk melakukan Uji Kelayakan Mekaar. Apakah Ibu-ibu tahu lokasinya?", isCorrect: true },
              { text: "Saya cuma lewat saja Bu, mau keliling-keliling jalan desa.", isCorrect: false },
              { text: "Saya mau membagikan bantuan gratis dari kantor cabang.", isCorrect: false }
            ],
            correctResponse: "Oh, Bu Lia! Rumahnya itu yang di sebelah timur dekat gerobak sayur, Neng. Tapi letak pastinya coba tanya warga di rumah sebelah barat.",
            incorrectResponse: "Oh kalau cuma jalan-jalan silakan Neng, hati-hati di jalan ya."
          }
        ]
      },
      sayur: {
        id: "sayur",
        locationName: "Rumah Warga",
        isGroup: false,
        recruitsCount: 1,
        dialogues: [
          {
            speaker: "IBU ANI",
            portraitId: 5,
            objection: "Selamat pagi Mbak. Ada yang bisa saya bantu?",
            options: [
              { text: "Pagi Bu. Saya mencari rumah Bu Lia untuk proses verifikasi kelayakan Mekaar. Apakah Ibu tahu jalurnya?", isCorrect: true },
              { text: "Tidak ada Bu, saya cuma mau berteduh di depan rumah Ibu.", isCorrect: false },
              { text: "Saya mau meminjam peralatan kebun Ibu.", isCorrect: false }
            ],
            correctResponse: "Oh rumah Bu Lia? Rumahnya yang gerbang kayu cokelat dekat kandang ayam di sebelah timur sana, Dek.",
            incorrectResponse: "Oh silakan saja Mbak berteduh, cuaca memang cukup terik."
          }
        ]
      },
      lia: {
        id: "lia",
        locationName: "Rumah Bu Lia",
        isGroup: true,
        recruitsCount: 1,
        dialogues: [
          // STEP 1 Choice
          {
            speaker: "Narator",
            portraitId: 9,
            objection: "Kamu sudah menemukan rumah Bu Lia. Apa yang pertama kamu lakukan?",
            options: [
              { text: "Tunggu Bu Lia keluar rumah.", isCorrect: false },
              { text: "Langsung masuk tanpa izin.", isCorrect: false },
              { text: "Mengetuk pintu dan mengucapkan salam.", isCorrect: true }
            ],
            incorrectResponse: "Kurang tepat. Sebagai Account Officer yang profesional dan sopan, ketuklah pintu terlebih dahulu, ucapkan salam, dan perkenalkan diri dengan jelas."
          },
          // STEP 1 Normal Dialogue Lines
          {
            speaker: "AMINAH",
            portraitId: 9,
            objection: "Assalamualaikum, permisi Ibu Lia... Selamat siang.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Waalaikumsalam, eh ada Mbak Aminah. Mari Mbak, silakan masuk dulu ke dalam.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },

          // STEP 2 Choice
          {
            speaker: "Narator",
            portraitId: 9,
            objection: "Apa yang kamu lakukan selanjutnya?",
            options: [
              { text: "Langsung proses tanpa konfirmasi penanggung jawab.", isCorrect: false },
              { text: "Tanyakan dengan sopan apakah suami Ibu bisa hadir.", isCorrect: true },
              { text: "Minta Bu Lia menandatangani semua dokumen sendirian.", isCorrect: false }
            ],
            incorrectResponse: "Kurang tepat. Kehadiran dan persetujuan suami/penanggung jawab sangat penting untuk keabsahan proses pembiayaan."
          },
          // STEP 2 Normal Dialogue Lines
          {
            speaker: "AMINAH",
            portraitId: 9,
            objection: "Mohon maaf Bu Lia, apakah hari ini Bapak ada di rumah? Untuk proses pembiayaan, suami Ibu perlu hadir sebagai penanggung jawab.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Ada kok Mbak, kebetulan lagi santai di belakang. Sebentar ya, saya panggilkan dulu bapaknya.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },

          // STEP 3 Choice
          {
            speaker: "Narator",
            portraitId: 9,
            objection: "Suami Bu Lia telah datang menemui kamu. Apa yang kamu lakukan selanjutnya?",
            options: [
              { text: "Lewati perkenalan dan langsung mulai wawancara.", isCorrect: false },
              { text: "Perkenalkan diri dengan jelas dan jelaskan tujuan survei.", isCorrect: true },
              { text: "Langsung bertanya kepada suami mengenai penghasilan.", isCorrect: false }
            ],
            incorrectResponse: "Kurang tepat. Selalu perkenalkan diri dengan sopan dan jelaskan maksud kedatangan serta tujuan survei kepada suami selaku penanggung jawab."
          },
          // STEP 3 Normal Dialogue Lines
          {
            speaker: "AMINAH",
            portraitId: 9,
            objection: "Izin ya Bapak, perkenalkan saya Aminah dari Unit Mekaar Sukamaju. Maksud kedatangan saya hari ini untuk melakukan survei Uji Kelayakan terhadap Ibu Lia.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BAPAK",
            portraitId: 9,
            objection: "Oh iya Mbak Aminah, silakan dilanjutkan saja. Saya setuju dan siap bertanggung jawab sebagai penanggung jawab istri saya.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "AMINAH",
            portraitId: 9,
            objection: "Baik, terima kasih. Sebelum kita mulai mengisi formulir, mohon izin saya melihat-lihat dan mengambil beberapa foto kondisi rumah terlebih dahulu untuk kelengkapan berkas.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Silakan, Mbak.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },

          // MINIGAME INTRO STEP
          {
            speaker: "Narator",
            portraitId: 9,
            objection: "Suami sudah menyetujui. Sekarang kamu mulai wawancara Bu Ina untuk mengisi formulir UK.",
            options: [{ text: "Mulai Wawancara", isCorrect: true }]
          },

          // STEP 4 Choice
          {
            speaker: "Narator",
            portraitId: 9,
            objection: "Survei dan pemeriksaan fisik telah selesai dilakukan. Apa yang kamu lakukan selanjutnya?",
            options: [
              { text: "Tunda sinkronisasi data dan selesaikan nanti di kantor saja.", isCorrect: false },
              { text: "Langsung pergi tanpa melakukan sinkronisasi data.", isCorrect: false },
              { text: "Lakukan sinkronisasi di aplikasi Mekaar Digi.", isCorrect: true }
            ],
            incorrectResponse: "Kurang tepat. Setelah selesai melakukan verifikasi fisik, segera lakukan sinkronisasi data di aplikasi Mekaar Digi agar data terkirim ke kantor."
          },
          // STEP 4 Normal Dialogue Lines
          {
            speaker: "AMINAH",
            portraitId: 9,
            objection: "Semua data sudah saya catat dan hasilnya sudah sesuai. Terima kasih Bu Lia dan Bapak. Proses selanjutnya adalah verifikasi oleh SAO atau Kepala Unit saya ya, Bu.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Iya, sama-sama Mbak. Alhamdulillah kalau semuanya lancar.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "Narator",
            portraitId: 9,
            objection: "Kamu adalah KUM (Ketua Unit Mekaar) yang bertugas melakukan verifikasi. Kamu telah tiba di rumah Bu Ina.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "Assalamualaikum Bu Lia, perkenalkan saya Citra, KUM dari Kuningan Mulia. Kedatangan saya untuk memverifikasi data pengajuan pembiayaan Ibu.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Oh iya, Mbak. Silakan masuk.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "Apa benar ini dengan Ibu Ina? Saya mau memastikan data hasil survei atau Uji Kelayakan kemarin yang dilakukan oleh Mbak Aminah.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Iya betul, Mbak. Ada yang perlu saya siapkan?",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "Yang perlu disiapkan itu...",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "KTP, KK asli, serta surat domisili aktif jika alamat Ibu tidak sesuai dengan KTP ya, Bu.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Oke, saya siapkan dan ambil ya, Mbak. Sebentar ya.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "Baik, Bu. Saya cek dulu berkasnya ya.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Silakan, Mbak Citra.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "Baik, dokumennya sudah saya cek kembali dan sudah sesuai ya, Bu.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "BU LIA",
            portraitId: 9,
            objection: "Alhamdulillah. Terima kasih, Mbak Citra. Cairnya kapan ya, Mbak? Hehe.",
            options: [{ text: "Lanjut", isCorrect: true }]
          },
          {
            speaker: "KUM CITRA",
            portraitId: 9,
            objection: "Insya Allah tidak lama, Bu. Setelah seluruh proses verifikasi dan persetujuan selesai, kami akan segera menghubungi Ibu.",
            options: [{ text: "Selesai", isCorrect: true }]
          }
        ]
      }
    }
  },
  3: {
    totalNasabahGoal: 12,
    encounters: null
  }
};

const PKM_CONFIG = {
  nasabah: [
    { id: "siti", name: "Siti Nurhaliza", portrait: "pkm/nasabahPKM/SITI NURHALIZA.png", subgroup: "A" },
    { id: "ijah", name: "Ijah Fatiha", portrait: "pkm/nasabahPKM/IJAH FATIHA.png", subgroup: "A" },
    { id: "indah", name: "Indah Sari", portrait: "pkm/nasabahPKM/INDAH SARI.png", subgroup: "A" },
    { id: "rini", name: "Rini Kartika", portrait: "pkm/nasabahPKM/RINI KARTIKA.png", subgroup: "A" },
    { id: "lastri", name: "Lastri Endang", portrait: "pkm/nasabahPKM/LASTRI ENDANG.png", subgroup: "B" },
    { id: "ningsih", name: "Ningsih Wulandari", portrait: "pkm/nasabahPKM/NINGSIH WULANDARI.png", subgroup: "B" },
    { id: "ratna", name: "Ratna Dwi", portrait: "pkm/nasabahPKM/RATNA DWI.png", subgroup: "B" },
    { id: "yanti", name: "Yanti Susilo", portrait: "pkm/nasabahPKM/YANTI SUSILO.png", subgroup: "B" },
    { id: "desi", name: "Desi Manik", portrait: "pkm/nasabahPKM/DESI MANIK.png", subgroup: "C" },
    { id: "lia", name: "Lia Munaroh", portrait: "pkm/nasabahPKM/LIA MUNAROH.png", subgroup: "C" },
    { id: "nur", name: "Nur Rahmawati", portrait: "pkm/nasabahPKM/NUR RAHMAWATI.png", subgroup: "C" },
    { id: "yulia", name: "Yuliawati", portrait: "pkm/nasabahPKM/YULIAWATI.png", subgroup: "C" }
  ],
  attendanceCodes: {
    1: "Hadir & Bayar",
    2: "Tidak Hadir",
    3: "Hadir, Belum Bayar"
  },
  installmentPerPerson: 200000,
  denominations: [100000, 50000, 20000, 10000],
  groupLeader: "lia"
};

const PKM_DIALOGUES = {
  0: [
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmintro.jpeg",
      text: "Assalamu'alaikum ibu-ibu! Selamat datang di Pertemuan Kelompok Mingguan atau PKM perdana kita hari ini! Saya {playername}, Account Officer dari PNM Mekaar yang akan mendampingi ibu-ibu ke depannya. Senang sekali bisa bertemu semua!"
    },
    {
      speaker: "BU LIA (Ketua Kelompok)",
      portrait: "pkm/pkmintro.jpeg",
      text: "Wa'alaikumussalam, Mbak {playername}. Kami juga senang sekali didampingi oleh Mbak {playername} yang ramah ini. Semoga kelompok kita selalu lancar ya, Bu."
    },
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmintro.jpeg",
      text: "Aamiin Yaa Rabbal 'Aalamiin. Terima kasih Ibu Lia. Sebelum kita memulai, silakan Ibu-ibu duduk di sub-kelompoknya masing-masing terlebih dahulu ya. Mari kita rapihkan posisi duduknya!"
    }
  ],
  2: [
    {
      speaker: "BU LIA (Ketua Kelompok)",
      portrait: "pkm/pkmsceneliatalk.jpeg",
      text: "Baiklah Ibu-ibu, sebelum memulai acara hari ini, mari kita bersama-sama berdoa terlebih dahulu agar pertemuan kita berjalan dengan lancar dan mendatangkan keberkahan. Berdoa dimulai..."
    },
    {
      speaker: "Narator",
      portrait: "pkm/pkmscene1.png",
      text: "Ibu-ibu berdoa bersama dengan khidmat selama beberapa saat..."
    },
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmsceneplayertalk.jpeg",
      text: "Terima kasih Ibu Lia. Sekarang, mari kita bersama-sama membacakan Ikrar Account Officer PNM Mekaar dengan lantang dan penuh komitmen!"
    },
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmsceneplayertalk.jpeg",
      text: "Ikrar Account Officer PNM Mekaar: Kami Account Officer Mekaar, berjanji senantiasa jujur, disiplin, dan bertanggung jawab. Siap mendampingi kelompok ibu-ibu prasejahtera demi masa depan yang lebih baik!"
    }
  ],
  "3_intro": [
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmsceneplayertalk.jpeg",
      text: "Bagus sekali Ibu-ibu. Sekarang kita masuk ke agenda penting berikutnya, yaitu pencatatan absensi dan uang jaga-jaga (tabungan darurat). Silakan Ibu-ibu angkat uang jaga-jaganya tinggi-tinggi ya!"
    }
  ],
  "4_intro": [
    {
      speaker: "BU LIA (Ketua Kelompok)",
      portrait: "pkm/pkmsceneliatalk.jpeg",
      text: "Ini Mbak {playername}, uang angsuran dari seluruh sub-kelompok hari ini. Total semuanya Rp2.400.000, tolong dihitung kembali ya Mbak."
    },
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmsceneplayertalk.jpeg",
      text: "Baik Ibu Lia, terima kasih. Saya akan menghitung uang angsuran ini secara terbuka di depan Ibu-ibu sekalian agar transparan. Mari kita hitung bersama ya!"
    }
  ],
  5: [
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmsceneplayertalk.jpeg",
      text: "Alhamdulillah, seluruh uang angsuran telah dihitung secara transparan dan nominalnya tepat Rp2.400.000. Saya tandatangani berita acaranya ya."
    },
    {
      speaker: "BU LIA (Ketua Kelompok)",
      portrait: "pkm/pkmsceneliatalk.jpeg",
      text: "Alhamdulillah. Sebagai penutup, mari kita membacakan doa penutup dan Janji Nasabah bersama-sama."
    },
    {
      speaker: "Semua Nasabah",
      portrait: "pkm/pkmscene1.png",
      text: "Janji Nasabah PNM Mekaar: Kami nasabah PNM Mekaar berjanji: Hadir tepat waktu, Membayar angsuran tepat waktu, Menggunakan modal untuk usaha, Saling membantu sesama anggota kelompok!"
    },
    {
      speaker: "AO {playername}",
      portrait: "pkm/pkmsceneplayertalk.jpeg",
      text: "Terima kasih Ibu-ibu. Jangan lupa hadir lagi di pertemuan berikutnya ya, Bu. Bagi yang tidak hadir hari ini, tolong diminta hadir untuk pertemuan selanjutnya. Dan jangan lupa membawa angsurannya ya, Bu."
    }
  ]
};

const STATE = {
  currentLevel: 1,
  cluesFound: { ibu: false, house: false },
  photoMinigame: {
    captured: {
      left: false,
      center: false,
      right: false
    },
    currentX: 0,
    activeTarget: null
  },
  screen: "menu", // menu, level_select, map, dialogue, victory
  collectedCount: 0,
  firstTryCorrect: 0,
  soundEnabled: true,
  completedEncounters: new Set(),
  activeEncounterId: null,
  dialogueIndex: 0,
  isFirstTry: true,
  audioCtx: null,
  hasPermission: false,
  selectedPrepItems: new Set(),
  highScoreStars: parseInt(localStorage.getItem("mekaar_journey_level_1_stars")) || 0,
  typewriterIntervalId: null,
  typewriterFullText: "",
  isTypewriterRunning: false,
  pendingHUDAnimation: null,
  cabangDialogueIndex: 0,
  hasTalkedToCitra: false,
  cabangDialogueActive: false,
  savedCabangScrollLeft: null,
  cabangSwipeScrollHandler: null,
  cabangSwipeHintShown: false,
  cabangSwipeRightShown: false,
  cabangIdleTimerId: null,
  cabangSwipeDirection: null,
  cutsceneTransitioning: false,
  cabangScrollTeaseTimerId: null,
  cabangScrollLoopId: null,
  cabangIsTeasing: false,

  // Yarn Spinner integration variables
  useYarnDialogue: false,
  currentYarnParentNode: "",
  yarnVariables: {
    BuIndah: false,
    BuIndahWrong: false,
    Warung: false,
    Warungwrong: false,
    BuLastri: false,
    BuLastriWrong: false,
    BuTitin: false,
    BuTitinWrong: false,
    BuWati: false,
    BuWatiWrong: false,
    BuIjah: false,
    BuIjahWrong: false,
    IzinRT: false,
    acceptQuest1: false,
    sudahtanyajual: false
  },
  yarnSteps: [],
  yarnStepIndex: 0,
  currentEncounterCorrect: false,
  currentEncounterIncorrect: false,
  pendingRecruits: 0,
  currentAvatar: "",
  currentExpression: "idle",
  
  // PKM Level 3 State
  pkmStage: 0,
  pkmDialogueIndex: 0,
  pkmSeatingCorrect: 0,
  pkmAttendanceCorrect: 0,
  pkmAttendanceConditions: [],
  pkmMoneyBills: [],
  pkmMoneySorted: 0,
  pkmTotalCounted: 0
};

// Safety Riding Equipment Configuration
const PREP_ITEMS = {
  required: new Set(["helm", "bodyprotect", "ransel", "dompet", "hp"]),
  forbidden: new Set(["totebg", "makeup", "kacamata", "necklace"])
};

// Citra KUM Guidance Dialogues
const CITRA_DIALOGUE = [
  "Selamat pagi! Selamat datang di Kantor Cabang PNM Sukamaju. Saya Citra, Ketua Unit Mekaar (KUM) di sini.",
  "Hari ini adalah tugas pertamamu sebagai Account Officer (AO) untuk melakukan sosialisasi dan rekrutmen nasabah di Desa Sukamaju.",
  "Sebelum berangkat ke desa, kamu harus bersiap-siap dan membawa perlengkapan berkendara yang aman dan sesuai standar safety riding kita.",
  "Pastikan kamu membawa barang wajib seperti Helm SNI, Jaket/Body Protect, Ransel, Dompet, dan HP. Jangan membawa barang berlebih atau perhiasan mencolok ya!",
  "Sekarang, silakan keluar melalui pintu di sebelah kiri untuk mempersiapkan perlengkapan Safety Riding kamu. Semangat bertugas!"
];

// Update Star icon in level selector card to match current progress (0 stars initially)
// Backup Level 1 encounters on first load
let CONFIG_LEVEL_1_BACKUP_ENCOUNTERS = null;

// Update Star icon in level selector card to match current progress (0 stars initially)
function updateLevelDetailStars() {
  const starImg = document.getElementById("star-rating-img");
  const levelId = STATE.currentLevel || 1;
  const score = parseInt(localStorage.getItem(`mekaar_journey_level_${levelId}_stars`)) || 0;
  if (starImg) {
    if (score > 0) {
      starImg.src = `${score}star.png`;
      starImg.style.filter = "none";
      starImg.style.opacity = "1";
    } else {
      starImg.src = "1star.png";
      starImg.style.filter = "grayscale(100%)";
      starImg.style.opacity = "0.35"; // Grayscale + opacity represents 0 stars
    }
  }
}

// Load Level Configuration
function loadLevelConfig(levelId) {
  STATE.currentLevel = levelId;

  if (!CONFIG_LEVEL_1_BACKUP_ENCOUNTERS) {
    CONFIG_LEVEL_1_BACKUP_ENCOUNTERS = CONFIG.encounters;
  }

  const levelData = LEVEL_CONFIGS[levelId];
  CONFIG.totalNasabahGoal = levelData.totalNasabahGoal;

  if (levelId === 1) {
    CONFIG.encounters = CONFIG_LEVEL_1_BACKUP_ENCOUNTERS;
    if (STATE.useYarnDialogue) {
      CONFIG.totalNasabahGoal = 8;
    }
  } else {
    CONFIG.encounters = levelData.encounters;
  }

  STATE.highScoreStars = parseInt(localStorage.getItem(`mekaar_journey_level_${levelId}_stars`)) || 0;
}

// Update Level Selector Screen buttons based on completion stars
function updateLevelSelectionUI() {
  const btnLvl1 = document.getElementById("btn-level-sosialisasi");
  const btnLvl2 = document.getElementById("btn-level-kelayakan");
  const btnLvl3 = document.getElementById("btn-level-pkm");
  if (!btnLvl1 || !btnLvl2) return;

  let starsLvl1 = parseInt(localStorage.getItem("mekaar_journey_level_1_stars")) || 0;
  let starsLvl2 = parseInt(localStorage.getItem("mekaar_journey_level_2_stars")) || 0;
  let starsLvl3 = parseInt(localStorage.getItem("mekaar_journey_level_3_stars")) || 0;

  if (window.location.search.includes("unlock=all") || localStorage.getItem("mekaar_cheat_unlock") === "true") {
    if (starsLvl1 === 0) starsLvl1 = 3;
    if (starsLvl2 === 0) starsLvl2 = 3;
  }

  // Level 1: always open
  const badgeLvl1 = btnLvl1.querySelector(".level-status-badge");
  if (badgeLvl1) {
    if (starsLvl1 > 0) {
      badgeLvl1.innerText = `${starsLvl1} ★`;
      badgeLvl1.className = "level-status-badge open";
      badgeLvl1.style.backgroundColor = "var(--gold)";
      badgeLvl1.style.color = "var(--text-dark)";
    } else {
      badgeLvl1.innerText = "BUKA";
      badgeLvl1.className = "level-status-badge open";
      badgeLvl1.style.backgroundColor = "";
      badgeLvl1.style.color = "";
    }
  }

  // Level 2: unlocked if Level 1 cleared
  if (starsLvl1 > 0) {
    btnLvl2.className = "level-select-btn active";
    const badgeLvl2 = btnLvl2.querySelector(".level-status-badge");
    if (badgeLvl2) {
      if (starsLvl2 > 0) {
        badgeLvl2.innerText = `${starsLvl2} ★`;
        badgeLvl2.className = "level-status-badge open";
        badgeLvl2.style.backgroundColor = "var(--gold)";
        badgeLvl2.style.color = "var(--text-dark)";
      } else {
        badgeLvl2.innerText = "BUKA";
        badgeLvl2.className = "level-status-badge open";
        badgeLvl2.style.backgroundColor = "";
        badgeLvl2.style.color = "";
      }
    }
  } else {
    btnLvl2.className = "level-select-btn locked";
    const badgeLvl2 = btnLvl2.querySelector(".level-status-badge");
    if (badgeLvl2) {
      badgeLvl2.innerText = "KUNCI";
      badgeLvl2.className = "level-status-badge dev";
      badgeLvl2.style.backgroundColor = "";
      badgeLvl2.style.color = "";
    }
  }

  // Level 3: unlocked if Level 2 cleared
  if (btnLvl3) {
    if (starsLvl2 > 0) {
      btnLvl3.className = "level-select-btn active";
      const badgeLvl3 = btnLvl3.querySelector(".level-status-badge");
      if (badgeLvl3) {
        if (starsLvl3 > 0) {
          badgeLvl3.innerText = `${starsLvl3} ★`;
          badgeLvl3.className = "level-status-badge open";
          badgeLvl3.style.backgroundColor = "var(--gold)";
          badgeLvl3.style.color = "var(--text-dark)";
        } else {
          badgeLvl3.innerText = "BUKA";
          badgeLvl3.className = "level-status-badge open";
          badgeLvl3.style.backgroundColor = "";
          badgeLvl3.style.color = "";
        }
      }
    } else {
      btnLvl3.className = "level-select-btn locked";
      const badgeLvl3 = btnLvl3.querySelector(".level-status-badge");
      if (badgeLvl3) {
        badgeLvl3.innerText = "KUNCI";
        badgeLvl3.className = "level-status-badge dev";
        badgeLvl3.style.backgroundColor = "";
        badgeLvl3.style.color = "";
      }
    }
  }
}

// Update Level Detail Modal fields dynamically
function updateLevelDetailModal(levelId) {
  const detailTitle = document.querySelector("#level-detail-overlay .wood-banner h2");
  const detailDesc = document.querySelector("#level-detail-overlay .level-desc");
  const starImg = document.getElementById("star-rating-img");

  if (levelId === 1) {
    if (detailTitle) detailTitle.innerText = "SOSIALISASI";
    if (detailDesc) detailDesc.innerHTML = "Level 1: Sosialisasi<br>Dapatkan izin Pak RT terlebih dahulu, lalu kumpulkan 10 Nasabah dengan memberikan penjelasan yang tepat!";
  } else if (levelId === 2) {
    if (detailTitle) detailTitle.innerText = "UJI KELAYAKAN";
    if (detailDesc) detailDesc.innerHTML = "Level 2: Uji Kelayakan & Verifikasi<br>Temui calon nasabah, verifikasi usaha dan komitmen kelompok mereka, lalu putuskan kelayakan mereka!";
  } else if (levelId === 3) {
    if (detailTitle) detailTitle.innerText = "PKM";
    if (detailDesc) detailDesc.innerHTML = "Level 3: Pertemuan Kelompok Mingguan<br>Dampingi kelompok nasabah Mekaar perdana: susun kelompok, kelola absensi di Mekar Digi, dan hitung uang angsuran secara transparan!";
  }

  // Update stars rating
  const score = parseInt(localStorage.getItem(`mekaar_journey_level_${levelId}_stars`)) || 0;
  if (starImg) {
    if (score > 0) {
      starImg.src = `${score}star.png`;
      starImg.style.filter = "none";
      starImg.style.opacity = "1";
    } else {
      starImg.src = "1star.png";
      starImg.style.filter = "grayscale(100%)";
      starImg.style.opacity = "0.35";
    }
  }
}

// Dynamically populate map location tags and sprites for current level
function initMapForCurrentLevel() {
  // Update screen header title
  const titleEl = document.querySelector("#map-screen .top-header-title");
  if (titleEl) {
    titleEl.innerText = STATE.currentLevel === 1 ? "Sosialisasi" : "Uji Kelayakan";
  }

  // Update progress HUD label
  const hudLabel = document.querySelector("#map-screen .hud-progress-label");
  if (hudLabel) {
    hudLabel.innerText = STATE.currentLevel === 1 ? "Nasabah Terkumpul:" : "Nasabah Diverifikasi:";
  }

  // Update individual interactive markers
  document.querySelectorAll(".map-encounter").forEach(el => {
    let encId = el.getAttribute("data-id");
    if (STATE.currentLevel === 2 && encId === "wati") {
      encId = "lia";
    }
    const encData = CONFIG.encounters[encId];

    // If encounter is not part of this level's config, hide it
    if (!encData) {
      el.style.display = "none";
      return;
    }

    // Level 2 special map visibility rules:
    if (STATE.currentLevel === 2) {
      if (encId === "lia") {
        // Bu Lia's house is only shown if both clues are found!
        if (STATE.cluesFound.ibu && STATE.cluesFound.house) {
          el.style.display = "flex";
          el.classList.add("blinking");
        } else {
          el.style.display = "none";
          el.classList.remove("blinking");
        }
      } else if (encId === "warung" || encId === "sayur" || encId === "pakrt") {
        el.style.display = "flex";
        el.classList.remove("blinking");
      } else {
        el.style.display = "none";
        el.classList.remove("blinking");
      }
    } else {
      // Level 1: show all configured encounters
      el.style.display = "flex";
      el.classList.remove("blinking");
    }

    // Set location tag
    const tag = el.querySelector(".location-tag");
    if (tag) {
      let tagText = encData.locationName;
      if (encData.isGroup && encData.recruitsCount > 1) {
        tagText += ` (${encData.recruitsCount} Orang)`;
      }
      tag.innerText = tagText;
    }

    // Set map character sprite and class (group / single)
    const wrapper = el.querySelector(".npc-character-wrapper");
    const singleChar = el.querySelector(":scope > .npc-character");

    if (wrapper && singleChar) {
      const isGroupEncounter = encData.isGroup && encData.recruitsCount > 1;

      if (isGroupEncounter) {
        wrapper.style.display = "flex";
        singleChar.style.display = "none";
        const m1 = wrapper.querySelector(".member-1");
        const m2 = wrapper.querySelector(".member-2");
        const m3 = wrapper.querySelector(".member-3");

        if (STATE.currentLevel === 1 && STATE.useYarnDialogue) {
          if (encId === "warung") {
            if (m1) m1.style.backgroundImage = "url('nasabah/nasabah2idle.png')"; // Bu Ratna
            if (m2) m2.style.backgroundImage = "url('nasabah/nasabah3idle.png')"; // Bu Nur
            if (m3) m3.style.backgroundImage = "url('nasabah/nasabah10idle.png')"; // Bu Yanti
          }
        } else {
          // Standard / Non-yarn mode: load distinct portraits from dialogues
          if (encData.dialogues && encData.dialogues.length >= 3) {
            if (m1) m1.style.backgroundImage = `url('${getPortraitUrl(encData.dialogues[0].portraitId, "idle")}')`;
            if (m2) m2.style.backgroundImage = `url('${getPortraitUrl(encData.dialogues[1].portraitId, "idle")}')`;
            if (m3) m3.style.backgroundImage = `url('${getPortraitUrl(encData.dialogues[2].portraitId, "idle")}')`;
          }
        }
      } else {
        wrapper.style.display = "none";
        singleChar.style.display = "block";
        if (STATE.currentLevel === 1 && STATE.useYarnDialogue) {
          if (encId === "sayur") {
            singleChar.style.backgroundImage = "url('nasabah/nasabah1idle.png')"; // Bu Indah (yarn)
            if (tag) tag.innerText = encData.locationName; // "Rumah Warga" in yarn config
          }
        }
      }
    }

    const charSprite = (wrapper && wrapper.style.display === "flex") ? null : singleChar;
    if (charSprite) {
      if (encData.isGroup && encData.recruitsCount > 1) {
        charSprite.classList.add("npc-group");
      } else {
        charSprite.classList.remove("npc-group");
      }

      if (STATE.currentLevel === 1 && STATE.useYarnDialogue) {
        let imgUrl = "";
        if (encId === "citra") imgUrl = "npc/citraidle.png";
        else if (encId === "pakrt") imgUrl = "npc/pakrtneutral.png";
        else if (encId === "warung") imgUrl = "nasabah/nasabah2idle.png"; // Bu Ratna
        else if (encId === "siti") imgUrl = "nasabah/nasabah4idle.png"; // Bu Lastri
        else if (encId === "tini") imgUrl = "nasabah/nasabah5dle.png"; // Bu Titin
        else if (encId === "wati") imgUrl = "nasabah/nasabah9idle.png"; // Bu Wati
        else if (encId === "minah") imgUrl = "nasabah/nasabah6idle.png"; // Bu Ijah

        if (imgUrl) {
          charSprite.style.backgroundImage = `url('${imgUrl}')`;
        }
      } else {
        const dialogue = encData.dialogues[0];
        if (dialogue) {
          charSprite.style.backgroundImage = `url('${getPortraitUrl(dialogue.portraitId, "idle")}')`;
        }
      }
    }
  });
}

// Reset Riding Prep Screen
function resetPrepScreen() {
  STATE.selectedPrepItems.clear();
  document.querySelectorAll(".prep-item-card").forEach(card => {
    card.classList.remove("selected");
  });
}

// Preload Assets Configuration
const ASSETS_TO_PRELOAD = [
  // UI & General
  "titlenew.png",
  "play.png",
  "options.png",
  "1star.png",
  "2star.png",
  "3star.png",
  "bgnew.png",
  "bgsos.png",
  "mapenviroment2.jpeg",
  "bg-enviroment.png",
  "bgcabang.png",

  // Safety Riding Prep
  "motor.png",
  "player/femaleplayer.png",
  "player/femaleplayerblink.png",
  "player/femaileplayerhappy.png",
  "player/femaleplayerexplain.png",
  "player/femaleplayerexplain1.png",
  "backpack-safetyriding/helm.png",
  "backpack-safetyriding/totebg.png",
  "backpack-safetyriding/dompet.png",
  "backpack-safetyriding/ransel.png",
  "backpack-safetyriding/makeup.png",
  "backpack-safetyriding/bodyprotect.png",
  "backpack-safetyriding/kacamata.png",
  "backpack-safetyriding/hp.png",
  "backpack-safetyriding/necklace.png",

  // NPC sprites
  "npc/pakrtneutral.png",
  "npc/pakrthappy.png",
  "npc/citraidle.png",
  "npc/citratalk1.png",
  "npc/citratalk2.png",

  // Level 2 Slides
  "ujikelayakan&verif/ukmeet1.jpeg",
  "ujikelayakan&verif/ukmeet2.jpg",
  "ujikelayakan&verif/ukmeet3.jpeg",
  "ujikelayakan&verif/ukmeet4.jpg",
  "ujikelayakan&verif/ukmeet5.jpg",
  "ujikelayakan&verif/ukmeet6.jpeg",

  // Level 3 PKM
  "pkm/pkmintro.jpeg",
  "pkm/pkmscene1.png",
  "pkm/pkmsceneminigame.png",
  "pkm/pkmsceneliatalk.jpeg",
  "pkm/pkmsceneplayertalk.jpeg",
  "pkm/nasabahPKM/DESI MANIK.png",
  "pkm/nasabahPKM/IJAH FATIHA.png",
  "pkm/nasabahPKM/INDAH SARI.png",
  "pkm/nasabahPKM/LASTRI ENDANG.png",
  "pkm/nasabahPKM/LIA MUNAROH.png",
  "pkm/nasabahPKM/NINGSIH WULANDARI.png",
  "pkm/nasabahPKM/NUR RAHMAWATI.png",
  "pkm/nasabahPKM/RATNA DWI.png",
  "pkm/nasabahPKM/RINI KARTIKA.png",
  "pkm/nasabahPKM/SITI NURHALIZA.png",
  "pkm/nasabahPKM/YANTI SUSILO.png",
  "pkm/nasabahPKM/YULIAWATI.png"
];

// Dynamically generate all NPC dialogue sprites for preloading
for (let id = 1; id <= 10; id++) {
  if (id === 5) {
    ASSETS_TO_PRELOAD.push("nasabah/nasabah5dle.png");
  } else {
    ASSETS_TO_PRELOAD.push(`nasabah/nasabah${id}idle.png`);
  }

  ASSETS_TO_PRELOAD.push(`nasabah/nasabah${id}talk.png`);
  ASSETS_TO_PRELOAD.push(`nasabah/nasabah${id}think.png`);

  if (id === 2) {
    ASSETS_TO_PRELOAD.push("nasabah/nasbah2laugh.png");
  } else {
    ASSETS_TO_PRELOAD.push(`nasabah/nasabah${id}laugh.png`);
  }
}

let assetsPreloaded = false;

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(url); // Always resolve to avoid hanging if one asset fails
    img.src = url;
  });
}

function preloadAllGameAssets(onProgress) {
  let loadedCount = 0;
  const totalCount = ASSETS_TO_PRELOAD.length;

  const promises = ASSETS_TO_PRELOAD.map(url => {
    return preloadImage(url).then(resUrl => {
      loadedCount++;
      if (onProgress) {
        onProgress(loadedCount, totalCount);
      }
      return resUrl;
    });
  });

  return Promise.all(promises);
}

// Trigger Mockup Loading Screen
function triggerLoadingScreen(targetScreenId, durationMs = 2500) {
  // Hide all screens
  document.querySelectorAll(".game-screen").forEach(s => s.classList.remove("active"));

  // Show loading screen
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.classList.add("active");
  }
  STATE.screen = "loading";

  // Hide global HUD sound toggle during loading
  const soundToggleBtn = document.getElementById("sound-toggle");
  if (soundToggleBtn) soundToggleBtn.style.display = "none";

  const titleEl = document.querySelector(".loading-title");
  const originalTitle = titleEl ? titleEl.innerText : "Menuju Desa...";

  // Minimum wait timer promise
  const timerPromise = new Promise(resolve => setTimeout(resolve, durationMs));

  // Asynchronous preload promise
  let preloadPromise;
  if (!assetsPreloaded) {
    preloadPromise = preloadAllGameAssets((loaded, total) => {
      if (titleEl) {
        const percent = Math.round((loaded / total) * 100);
        titleEl.innerText = `${originalTitle} (${percent}%)`;
      }
    }).then(() => {
      assetsPreloaded = true;
      if (titleEl) titleEl.innerText = originalTitle;
    });
  } else {
    preloadPromise = Promise.resolve();
  }

  // Wait for both minimum timer and preloading to complete
  Promise.all([timerPromise, preloadPromise]).then(() => {
    if (loadingScreen) {
      loadingScreen.classList.remove("active");
    }
    showScreen(targetScreenId);
  }).catch(err => {
    console.error("Preload error", err);
    if (loadingScreen) {
      loadingScreen.classList.remove("active");
    }
    showScreen(targetScreenId);
  });
}

// Play Cutscene Video before transitioning to Map
function playCutsceneVideo() {
  const video = document.getElementById("cutscene-video");
  const cutsceneScreen = document.getElementById("cutscene-screen");

  if (!video || !cutsceneScreen) {
    showScreen("map");
    return;
  }

  // Set muted state based on sound settings
  video.muted = !STATE.soundEnabled;

  // Reset any previous transition state
  cutsceneScreen.classList.remove("fade-out");
  STATE.cutsceneTransitioning = false;

  showScreen("cutscene");

  video.currentTime = 0;
  video.play().catch(err => {
    console.warn("Video play failed, trying muted autoplay:", err);
    video.muted = true;
    video.play().catch(playErr => {
      console.error("Autoplay failed completely, skipping cutscene", playErr);
      showScreen("map");
    });
  });
}

function handleCutsceneEnd() {
  if (STATE.cutsceneTransitioning) return;
  STATE.cutsceneTransitioning = true;

  const cutsceneScreen = document.getElementById("cutscene-screen");
  if (cutsceneScreen) {
    cutsceneScreen.classList.add("fade-out");
  }

  setTimeout(() => {
    const video = document.getElementById("cutscene-video");
    if (video) {
      video.pause();
    }
    showScreen("map");
    if (cutsceneScreen) {
      cutsceneScreen.classList.remove("fade-out");
    }
    STATE.cutsceneTransitioning = false;
  }, 500); // match CSS transition duration
}

// Show Prep Feedback Modal with educational text
function showPrepFeedbackModal(isSuccess, message, submessage) {
  const modal = document.getElementById("prep-feedback-modal");
  const banner = document.getElementById("prep-feedback-banner");
  const title = document.getElementById("prep-feedback-title");
  const textEl = document.getElementById("prep-feedback-text");
  const subtextEl = document.getElementById("prep-feedback-subtext");
  const iconContainer = document.getElementById("prep-feedback-icon-container");
  const closeBtn = document.getElementById("btn-close-prep-feedback");

  // Set messages
  textEl.innerText = message;
  subtextEl.innerText = submessage;

  if (isSuccess) {
    playSound("correct");
    title.innerText = "PERSIAPAN SIAP";
    banner.style.background = "var(--pnm-green) linear-gradient(180deg, var(--pnm-green), var(--pnm-green-dark))";
    banner.style.borderBottom = "4px solid var(--pnm-green-dark)";

    // Success Icon
    iconContainer.innerHTML = `
      <div class="feedback-icon correct" style="width: 54px; height: 54px; margin: 0 auto; background-color: var(--pnm-green);"></div>
    `;

    closeBtn.innerText = "BERANGKAT!";
    closeBtn.onclick = () => {
      playSound("tap");
      modal.classList.remove("active");
      playCutsceneVideo();
    };
  } else {
    playSound("incorrect");
    title.innerText = "PERIKSA PERSIAPAN";
    banner.style.background = "#c34a26 linear-gradient(180deg, #d35400, #c0392b)";
    banner.style.borderBottom = "4px solid #e74c3c";

    // Warning Icon
    iconContainer.innerHTML = `
      <div class="feedback-icon incorrect" style="width: 54px; height: 54px; margin: 0 auto; background-color: #d32f2f;"></div>
    `;

    closeBtn.innerText = "SESUAIKAN KEMBALI";
    closeBtn.onclick = () => {
      playSound("tap");
      modal.classList.remove("active");
    };
  }

  modal.classList.add("active");
}

// Validate Selected Items
function validateRidingPrep() {
  const missing = [...PREP_ITEMS.required].filter(item => !STATE.selectedPrepItems.has(item));
  const extra = [...PREP_ITEMS.forbidden].filter(item => STATE.selectedPrepItems.has(item));

  if (missing.length === 0 && extra.length === 0) {
    // Success! Perfect safety preparation
    showPrepFeedbackModal(
      true,
      "Luar Biasa! Persiapan Selesai.",
      "Semua perlengkapan safety riding Anda lengkap dan aman. Mari berangkat menuju Desa!"
    );
  } else {
    // Failure!
    let msg = "Persiapan berkendara Anda belum tepat!";
    let subMsg = "";

    if (missing.length > 0 && extra.length > 0) {
      subMsg = "Helm SNI, Jaket Pelindung, Tas Ransel, Dompet & Surat, serta Handphone wajib dibawa demi keselamatan. Barang pelengkap seperti Totebag, Makeup, Kacamata Gaya, dan Kalung tidak perlu dibawa.";
    } else if (missing.length > 0) {
      const missingNames = missing.map(m => {
        if (m === "helm") return "Helm SNI";
        if (m === "bodyprotect") return "Jaket Pelindung";
        if (m === "ransel") return "Tas Ransel";
        if (m === "dompet") return "Dompet & Surat";
        if (m === "hp") return "Handphone";
        return m;
      }).join(", ");
      subMsg = `Ada perlengkapan wajib keselamatan yang belum Anda bawa: ${missingNames}. Pastikan untuk melengkapinya.`;
    } else if (extra.length > 0) {
      const extraNames = extra.map(e => {
        if (e === "totebg") return "Totebag";
        if (e === "makeup") return "Makeup Kit";
        if (e === "kacamata") return "Kacamata Gaya";
        if (e === "necklace") return "Kalung Emas";
        return e;
      }).join(", ");
      subMsg = `Anda membawa barang yang tidak perlu dibawa berkendara: ${extraNames}. Silakan tinggalkan di kantor demi kepraktisan dan keselamatan berkendara.`;
    }

    showPrepFeedbackModal(false, msg, subMsg);
  }
}

// Replace {playername} placeholder with user custom name
function replacePlayerName(text) {
  if (!text) return text;
  const name = localStorage.getItem("mekaar_player_name") || "Aminah";
  let processed = text.replace(/\{playername\}/gi, name);
  processed = processed.replace(/Aminah/gi, name);
  return processed;
}

// Handle Portrait Asset Filename Typos
function getPortraitUrl(id, state) {
  // Special overrides for typos
  let expression = state; // idle, talk, think, laugh

  if (id === "citra") {
    if (expression === "talk") {
      return Math.random() > 0.5 ? "npc/citratalk1.png" : "npc/citratalk2.png";
    }
    return "npc/citraidle.png";
  }

  if (id === "pakrt") {
    return expression === "laugh" ? "npc/pakrthappy.png" : "npc/pakrtneutral.png";
  }

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
  else if (type === "beep") {
    // Synthetic short focus beep
    osc.type = "sine";
    osc.frequency.setValueAtTime(1000, now);
    gainNode.gain.setValueAtTime(0.12, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  }
  else if (type === "shutter") {
    // Synthetic shutter sound: rapid high click + slide
    osc.type = "sine";
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
    gainNode.gain.setValueAtTime(0.35, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);

    // Add a second noise-like click using bandpass-filtered triangle wave
    const osc2 = ctx.createOscillator();
    const gainNode2 = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(150, now);
    osc2.frequency.exponentialRampToValueAtTime(10, now + 0.1);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1000, now);

    osc2.connect(filter);
    filter.connect(gainNode2);
    gainNode2.connect(ctx.destination);

    gainNode2.gain.setValueAtTime(0.25, now);
    gainNode2.gain.linearRampToValueAtTime(0, now + 0.1);

    osc2.start(now);
    osc2.stop(now + 0.1);
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

// Typewriter Effect for NPC Objections
function runTypewriter(text) {
  const textEl = document.getElementById("dialogue-text");
  if (!textEl) return;
  textEl.textContent = "";
  let charIndex = 0;

  // Replace player name placeholder
  text = replacePlayerName(text);

  // Hide options container initially
  const optionsContainer = document.querySelector(".options-container");
  if (optionsContainer) {
    optionsContainer.style.display = "none";
  }

  // Clear any existing typewriter interval
  if (STATE.typewriterIntervalId) {
    clearInterval(STATE.typewriterIntervalId);
  }

  STATE.isTypewriterRunning = true;
  STATE.typewriterFullText = text;

  // Print characters one by one using substring to avoid space-collapse issues
  const charSpeed = 25; // 25ms per char

  STATE.typewriterIntervalId = setInterval(() => {
    if (charIndex < text.length) {
      charIndex++;
      textEl.textContent = text.substring(0, charIndex);
    } else {
      finishTypewriter();
    }
  }, charSpeed);
}

function finishTypewriter() {
  if (STATE.typewriterIntervalId) {
    clearInterval(STATE.typewriterIntervalId);
    STATE.typewriterIntervalId = null;
  }

  const textEl = document.getElementById("dialogue-text");
  if (textEl) {
    textEl.textContent = STATE.typewriterFullText;
  }

  STATE.isTypewriterRunning = false;

  // Change portrait to idle when NPC finishes talking (no wobble)
  if (STATE.useYarnDialogue) {
    updateYarnPortraits();
  } else {
    const encData = CONFIG.encounters[STATE.activeEncounterId];
    const dialogue = encData ? encData.dialogues[STATE.dialogueIndex] : null;
    const portraitImg = document.getElementById("npc-portrait");
    if (portraitImg && dialogue) {
      if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
        portraitImg.className = "npc-portrait-img scene-mode";
      } else {
        portraitImg.src = getPortraitUrl(dialogue.portraitId, "idle");
        portraitImg.className = "npc-portrait-img"; // Keep class clean, no wobble
      }
    }
  }

  // Show options container
  const optionsContainer = document.querySelector(".options-container");
  if (optionsContainer) {
    optionsContainer.style.display = "flex";
  }
}

// Screen Navigation
function showScreen(screenId) {
  playSound("tap");
  document.querySelectorAll(".game-screen").forEach(s => s.classList.remove("active"));
  document.getElementById(`${screenId}-screen`).classList.add("active");
  STATE.screen = screenId;

  if (screenId === "cabang") {
    const viewport = document.getElementById("cabang-viewport");
    if (viewport) {
      if (STATE.savedCabangScrollLeft !== null) {
        viewport.scrollLeft = STATE.savedCabangScrollLeft;
        STATE.savedCabangScrollLeft = null;
      } else {
        viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      }
    }
    // Synchronize objective state and glowing state
    if (!STATE.hasTalkedToCitra) {
      initCabangObjectiveState();
    } else {
      const objText = document.getElementById("cabang-objective-text");
      if (objText) {
        objText.innerText = "Tugas: Keluar kantor cabang menuju persiapan berkendara";
      }
      const objProgress = document.getElementById("cabang-objective-progress");
      if (objProgress) {
        objProgress.style.width = "50%";
      }
      const citra = document.getElementById("npc-citra");
      if (citra) {
        citra.classList.remove("glowing-objective");
        const indicator = citra.querySelector(".speech-bubble-indicator");
        if (indicator) {
          indicator.style.display = "none";
        }
      }
    }
    // Show appropriate swipe hint after a short delay
    setTimeout(() => {
      if (!STATE.hasTalkedToCitra && !STATE.cabangSwipeHintShown) {
        showCabangSwipeHint("left");
      }
    }, 600);
    resetCabangScrollTeaseTimer(true);
  } else {
    // Clear Cabang scroll tease timers when leaving
    if (STATE.cabangScrollTeaseTimerId) {
      clearTimeout(STATE.cabangScrollTeaseTimerId);
      STATE.cabangScrollTeaseTimerId = null;
    }
    stopContinuousAutoScroll();
  }

  // Clear typewriter when leaving the dialogue screen
  if (screenId !== "dialogue") {
    if (STATE.typewriterIntervalId) {
      clearInterval(STATE.typewriterIntervalId);
      STATE.typewriterIntervalId = null;
    }
    STATE.isTypewriterRunning = false;
  }

  // Toggle global settings gear button visibility (show ONLY on map screen)
  const soundToggleBtn = document.getElementById("sound-toggle");
  if (soundToggleBtn) {
    if (screenId === "map") {
      soundToggleBtn.style.display = "flex";
    } else {
      soundToggleBtn.style.display = "none";
    }
  }

  // Toggle RT permission guide visibility
  const rtGuide = document.getElementById("rt-permission-guide");
  if (rtGuide) {
    if (screenId === "map" && !STATE.hasPermission) {
      rtGuide.style.display = "flex";
    } else {
      rtGuide.style.display = "none";
    }
  }

  // Extra logic for specific screens
  if (screenId === "map") {
    initMapForCurrentLevel();
    if (STATE.pendingHUDAnimation) {
      const animData = STATE.pendingHUDAnimation;
      STATE.pendingHUDAnimation = null;
      triggerHUDAnimation(animData.oldCount, animData.newCount);
    } else {
      updateMapHUD();
    }
    setTimeout(centerMap, 50);
  }
}

// Animate progress HUD values and add glow effect
function triggerHUDAnimation(oldCount, newCount) {
  const countEl = document.getElementById("collected-count");
  const fillEl = document.getElementById("hud-progress-bar-fill");
  const hudCard = document.querySelector("#map-screen .top-header-card");

  // 1. Set initial display (old state before dialog completion)
  if (countEl) {
    countEl.innerText = `${oldCount} / ${CONFIG.totalNasabahGoal}`;
  }
  if (fillEl) {
    fillEl.style.width = `${(oldCount / CONFIG.totalNasabahGoal) * 100}%`;
  }

  // 2. Add glow & bounce animation class
  if (hudCard) {
    hudCard.classList.remove("hud-glow"); // Force class reset if it was left over
    void hudCard.offsetWidth; // Trigger reflow
    hudCard.classList.add("hud-glow");
  }

  // 3. Trigger width and number increment animations after a short delay so the screen transition is done
  setTimeout(() => {
    if (fillEl) {
      fillEl.style.width = `${(newCount / CONFIG.totalNasabahGoal) * 100}%`;
    }

    // Number count-up animation
    let currentCount = oldCount;
    if (currentCount < newCount) {
      const duration = 750; // Total count up time in ms
      const steps = newCount - oldCount;
      const stepTime = Math.max(80, Math.floor(duration / steps));

      const timer = setInterval(() => {
        if (currentCount < newCount) {
          currentCount++;
          if (countEl) {
            countEl.innerText = `${currentCount} / ${CONFIG.totalNasabahGoal}`;
          }
        } else {
          clearInterval(timer);
        }
      }, stepTime);
    }
  }, 350); // Start after fade-in animation completes (~350-400ms)

  // 4. Remove glow class when completed and update locations status on the map
  setTimeout(() => {
    if (hudCard) {
      hudCard.classList.remove("hud-glow");
    }
    // Update map locations completed class/markers cleanly
    updateMapHUD();
  }, 1400);
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
      el.querySelector(".speech-bubble").innerText = (encId === "pakrt") ? "!" : "...";
    }
  });
}

const ENCOUNTER_TO_YARN_NODE = {
  citra: "Citra",
  pakrt: "PakRT",
  warung: "Warung",
  sayur: "BuIndah",   // Gerobak Sayur -> BuIndah
  siti: "BuLastri",    // Ibu Siti -> BuLastri
  tini: "BuTitin",     // Ibu Tini -> BuTitin
  wati: "BuWati",     // Ibu Wati -> BuWati
  minah: "BuIjah",     // Gerobak Bakso -> BuIjah
};

let YARN_DIALOGUES = [];

// Load yarn dialogues from olddialogue.json
function loadYarnDialogues() {
  return fetch('yarn_fork/olddialogue.json')
    .then(res => res.json())
    .then(data => {
      YARN_DIALOGUES = data;
      console.log("Loaded Yarn Dialogues:", YARN_DIALOGUES.length);
    })
    .catch(err => {
      console.error("Failed to load Yarn dialogues:", err);
    });
}

function evaluateCondition(condStr) {
  condStr = condStr.trim();
  if (condStr.startsWith("$")) {
    const match = condStr.match(/^\$([a-zA-Z0-9_]+)\s*(==|!=|=)\s*(true|false|[0-9]+)/);
    if (match) {
      const varName = match[1];
      const op = match[2];
      const valStr = match[3];
      const actualVal = STATE.yarnVariables[varName];
      let compareVal = valStr === "true" ? true : valStr === "false" ? false : parseInt(valStr);
      if (op === "==" || op === "=") {
        return actualVal === compareVal;
      } else if (op === "!=") {
        return actualVal !== compareVal;
      }
    }
    const varName = condStr.substring(1).trim();
    return !!STATE.yarnVariables[varName];
  }
  return false;
}

function preprocessDialogueBody(bodyText) {
  const lines = bodyText.split("\n");
  const resultLines = [];
  let showCurrentBlock = true;
  let ifStack = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("<<if ")) {
      const cond = trimmed.substring(5, trimmed.length - 2);
      const isTrue = evaluateCondition(cond);
      ifStack.push({ hasTrue: isTrue, active: isTrue });
      showCurrentBlock = isTrue;
    } else if (trimmed.startsWith("<<elseif ")) {
      const cond = trimmed.substring(9, trimmed.length - 2);
      const frame = ifStack[ifStack.length - 1];
      if (frame.hasTrue) {
        frame.active = false;
      } else {
        const isTrue = evaluateCondition(cond);
        frame.active = isTrue;
        if (isTrue) frame.hasTrue = true;
      }
      showCurrentBlock = frame.active;
    } else if (trimmed.startsWith("<<else>>")) {
      const frame = ifStack[ifStack.length - 1];
      frame.active = !frame.hasTrue;
      showCurrentBlock = frame.active;
    } else if (trimmed.startsWith("<<endif>>")) {
      ifStack.pop();
      showCurrentBlock = ifStack.length > 0 ? ifStack[ifStack.length - 1].active : true;
    } else {
      if (showCurrentBlock) {
        resultLines.push(line);
      }
    }
  }
  return resultLines.join("\n");
}

function parseStepsFromText(text) {
  const steps = [];
  const lines = text.split("\n");
  let currentStep = {
    commands: [],
    text: "",
    options: []
  };

  for (let line of lines) {
    let trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("[[") && trimmed.endsWith("]]")) {
      const optionContent = trimmed.substring(2, trimmed.length - 2);
      const parts = optionContent.split("|");
      const text = parts[0].trim();
      const target = parts[1] ? parts[1].trim() : text;
      currentStep.options.push({ text, target });
      continue;
    }

    const commands = [];
    const cmdRegex = /<<([^>]+)>>/g;
    let match;
    let lastIndex = 0;
    let lineText = "";

    while ((match = cmdRegex.exec(line)) !== null) {
      lineText += line.substring(lastIndex, match.index);
      commands.push(match[1].trim());
      lastIndex = cmdRegex.lastIndex;
    }
    lineText += line.substring(lastIndex);
    lineText = lineText.trim();

    if (commands.length > 0) {
      const hasNewAvatar = commands.some(c => c.startsWith("avatar "));
      if (hasNewAvatar && currentStep.text) {
        steps.push(currentStep);
        currentStep = {
          commands: [...commands],
          text: lineText,
          options: []
        };
      } else {
        currentStep.commands.push(...commands);
        if (lineText) {
          if (currentStep.text) currentStep.text += "\n" + lineText;
          else currentStep.text = lineText;
        }
      }
    } else {
      if (lineText) {
        if (currentStep.text) currentStep.text += "\n" + lineText;
        else currentStep.text = lineText;
      }
    }
  }

  if (currentStep.text || currentStep.options.length > 0) {
    steps.push(currentStep);
  }

  return steps;
}

function getYarnPortraitUrl(avatarName, expression) {
  expression = expression || "idle";
  if (expression === "neutral") expression = "idle";
  if (expression === "talking") expression = "talk";
  if (expression === "happy") expression = "laugh";
  if (expression === "confused") expression = "think";

  const nameLower = avatarName.toLowerCase();
  if (nameLower.includes("aminah")) {
    if (expression === "laugh") {
      return "player/femaileplayerhappy.png";
    } else if (expression === "talk" || expression === "explain") {
      return "player/femaleplayerexplain.png";
    } else if (expression === "explain1") {
      return "player/femaleplayerexplain1.png";
    }
    return "player/femaleplayer.png";
  }
  if (nameLower.includes("citra")) {
    if (expression === "talk") {
      return "npc/citratalk1.png";
    }
    return "npc/citraidle.png";
  }
  if (nameLower.includes("pak rt")) {
    return expression === "laugh" ? "npc/pakrthappy.png" : "npc/pakrtneutral.png";
  }

  let nasabahId = 1;
  if (nameLower.includes("indah")) nasabahId = 1;
  else if (nameLower.includes("ratna")) nasabahId = 2;
  else if (nameLower.includes("nur")) nasabahId = 3;
  else if (nameLower.includes("lastri")) nasabahId = 4;
  else if (nameLower.includes("titin")) nasabahId = 5;
  else if (nameLower.includes("ijah")) nasabahId = 6;
  else if (nameLower.includes("yanti")) nasabahId = 7;
  else if (nameLower.includes("penjual")) nasabahId = 8;
  else if (nameLower.includes("wati")) nasabahId = 9;
  else nasabahId = 1;

  let prefix = `nasabah${nasabahId}`;
  if (nasabahId === 2 && expression === "laugh") {
    prefix = "nasbah2";
  }
  let exprFile = expression;
  if (nasabahId === 5 && expression === "idle") {
    exprFile = "dle";
  }

  return `nasabah/${prefix}${exprFile}.png`;
}

function updateYarnPortraits() {
  const portraitImg = document.getElementById("npc-portrait");
  const portraitBg = document.querySelector(".dialogue-portrait-bg");
  if (!portraitImg || !portraitBg) return;

  let multiContainer = document.getElementById("multi-portraits-container");
  if (multiContainer) {
    multiContainer.style.display = "none";
  }

  portraitImg.style.display = "block";
  portraitImg.src = getYarnPortraitUrl(STATE.currentAvatar || "Aminah", STATE.currentExpression);

  portraitImg.className = "npc-portrait-img";
  if (STATE.currentExpression === "happy") {
    portraitImg.classList.add("happy");
  } else if (STATE.currentExpression === "confused" || STATE.currentExpression === "think") {
    portraitImg.classList.add("incorrect");
  }
}

function triggerVignetteFlash(type) {
  const overlay = document.getElementById("dialogue-vignette-overlay");
  if (!overlay) return;

  overlay.className = "vignette-overlay";
  void overlay.offsetWidth; // Force reflow

  if (type === "correct") {
    overlay.classList.add("vignette-correct");
  } else if (type === "incorrect") {
    overlay.classList.add("vignette-incorrect");
  }
}

function executeYarnCommand(cmd) {
  cmd = cmd.trim();
  const lower = cmd.toLowerCase();

  if (lower.startsWith("avatar ")) {
    const avatarName = cmd.substring(7).trim();
    STATE.currentAvatar = avatarName;
    const speakerEl = document.getElementById("speaker-name");
    if (speakerEl) speakerEl.innerText = avatarName.toUpperCase();
    updateYarnPortraits();
  } else if (["neutral", "talking", "happy", "think", "confused", "explain", "explain1"].includes(lower)) {
    STATE.currentExpression = lower;
    updateYarnPortraits();
  } else if (lower.startsWith("set ")) {
    const setContent = cmd.substring(4).trim();
    const parts = setContent.split(/\s+to\s+|\s*=\s*/i);
    if (parts.length === 2) {
      const varName = parts[0].trim().replace(/^\$/, "");
      const valStr = parts[1].trim();
      let value = valStr === "true" ? true : valStr === "false" ? false : parseInt(valStr);
      STATE.yarnVariables[varName] = value;
    }
  } else if (lower === "correct") {
    playSound("correct");
    STATE.currentEncounterCorrect = true;
    triggerVignetteFlash("correct");
  } else if (lower === "false") {
    playSound("incorrect");
    STATE.currentEncounterIncorrect = true;
    triggerVignetteFlash("incorrect");
  } else if (lower === "nasabahdone") {
    STATE.pendingRecruits = 1;
  } else if (lower === "nasabahdonewarung") {
    STATE.pendingRecruits = 3;
  } else if (lower === "misikumpulnasabah") {
    STATE.hasPermission = true;
  }
}

function playYarnNode(nodeTitle) {
  const node = YARN_DIALOGUES.find(n => n.title === nodeTitle);
  if (!node) {
    console.error("Yarn node not found:", nodeTitle);
    showScreen("map");
    return;
  }

  const preprocessedText = preprocessDialogueBody(node.body);
  const steps = parseStepsFromText(preprocessedText);

  STATE.yarnSteps = steps;
  STATE.yarnStepIndex = 0;
  STATE.currentEncounterCorrect = false;
  STATE.currentEncounterIncorrect = false;
  STATE.pendingRecruits = 0;
  STATE.currentAvatar = "";
  STATE.currentExpression = "idle";

  const encData = CONFIG.encounters[STATE.activeEncounterId];
  document.getElementById("dialogue-location-name").innerText = encData ? encData.locationName : nodeTitle;
  document.getElementById("group-progress").style.display = "none";

  showScreen("dialogue");
  loadYarnStep();
}

function loadYarnStep() {
  if (!STATE.yarnSteps || STATE.yarnSteps.length === 0) {
    showScreen("map");
    return;
  }

  const step = STATE.yarnSteps[STATE.yarnStepIndex];

  step.commands.forEach(cmd => {
    executeYarnCommand(cmd);
  });

  updateYarnPortraits();

  runTypewriter(step.text);

  if (STATE.currentAvatar) {
    document.getElementById("speaker-name").innerText = STATE.currentAvatar.toUpperCase();
  }

  const backBtn = document.getElementById("btn-dialogue-back");
  if (backBtn) {
    if (STATE.activeEncounterId === "citra") {
      backBtn.style.display = "none";
    } else {
      backBtn.style.display = "flex";
    }
  }

  const portraitBg = document.querySelector(".dialogue-portrait-bg");
  if (portraitBg) {
    if (STATE.activeEncounterId === "citra") {
      portraitBg.style.background = "url('bgcabang.png') no-repeat center bottom";
      portraitBg.style.backgroundSize = "cover";
    } else {
      portraitBg.style.background = "url('bg-enviroment.png') no-repeat center bottom";
      portraitBg.style.backgroundSize = "cover";
    }
  }

  const optionsList = document.getElementById("options-list");
  if (optionsList) {
    optionsList.innerHTML = "";

    let optionsToRender = [...step.options];
    if (optionsToRender.length === 0) {
      if (STATE.yarnStepIndex < STATE.yarnSteps.length - 1) {
        optionsToRender.push({ text: "Lanjut", target: "next_step" });
      } else {
        if (STATE.currentEncounterIncorrect) {
          optionsToRender.push({ text: "Kembali", target: "retry_encounter" });
        } else {
          optionsToRender.push({ text: "Selesai", target: "complete_encounter" });
        }
      }
    }

    optionsToRender.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      if (opt.text.toLowerCase() === "lanjut") {
        btn.classList.add("green");
      }
      btn.innerText = replacePlayerName(opt.text);
      btn.addEventListener("click", () => handleYarnOptionSelect(opt));
      optionsList.appendChild(btn);
    });
  }

  const feedbackPanel = document.getElementById("dialogue-feedback");
  if (feedbackPanel) {
    feedbackPanel.classList.add("hidden");
  }
}

function handleYarnOptionSelect(option) {
  playSound("tap");

  if (option.target === "next_step") {
    STATE.yarnStepIndex++;
    loadYarnStep();
  } else if (option.target === "retry_encounter") {
    STATE.currentEncounterIncorrect = false;
    showScreen("map");
  } else if (option.target === "complete_encounter") {
    STATE.completedEncounters.add(STATE.activeEncounterId);

    if (STATE.activeEncounterId === "citra") {
      endCabangDialogue();
      return;
    }

    if (STATE.activeEncounterId === "pakrt") {
      STATE.hasPermission = true;
      const rMarker = document.querySelector("#encounter-pakrt .speech-bubble");
      if (rMarker) rMarker.innerText = "✓";
      showScreen("map");
      return;
    }

    const oldCount = STATE.collectedCount;
    const recruits = STATE.pendingRecruits || 1;
    STATE.collectedCount += recruits;

    if (STATE.collectedCount >= CONFIG.totalNasabahGoal) {
      triggerVictory();
    } else {
      STATE.pendingHUDAnimation = { oldCount: oldCount, newCount: STATE.collectedCount };
      showScreen("map");
    }
  } else {
    playYarnNode(option.target);
  }
}

// Start Encounter
function startEncounter(encounterId) {
  if (STATE.currentLevel === 2 && encounterId === "wati") {
    encounterId = "lia";
  }
  // Clear any existing vignette animation class
  const overlay = document.getElementById("dialogue-vignette-overlay");
  if (overlay) {
    overlay.className = "vignette-overlay";
  }

  if (STATE.completedEncounters.has(encounterId)) {
    return; // Already completed
  }

  // Check if player has permission from Pak RT
  if (encounterId !== "pakrt" && encounterId !== "citra" && !STATE.hasPermission) {
    showPermissionRequiredModal();
    return;
  }

  // Save cabang viewport scroll position before entering Citra dialogue
  if (encounterId === "citra") {
    const cabangViewport = document.getElementById("cabang-viewport");
    if (cabangViewport) {
      STATE.savedCabangScrollLeft = cabangViewport.scrollLeft;
      // Clean up swipe hints and idle timer
      cleanupCabangSwipeHint(cabangViewport);
    }
    const leftHint = document.getElementById("cabang-swipe-left-hint");
    if (leftHint) leftHint.classList.remove("visible");
  }

  STATE.activeEncounterId = encounterId;
  STATE.dialogueIndex = 0;
  STATE.isFirstTry = true;

  // Set people count badge
  const countText = document.getElementById("people-count-text");
  if (countText) {
    const peopleCount = (encounterId === "warung" && STATE.currentLevel === 1) ? 3 : 1;
    countText.innerText = peopleCount;
  }

  const nodeTitle = ENCOUNTER_TO_YARN_NODE[encounterId];
  const yarnNode = YARN_DIALOGUES.find(n => n.title === nodeTitle);

  if (yarnNode && STATE.currentLevel === 1) {
    STATE.useYarnDialogue = true;
    STATE.currentYarnParentNode = nodeTitle;
    playYarnNode(nodeTitle);
  } else {
    STATE.useYarnDialogue = false;
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
}

// Load Dialogue Step
function loadDialogueStep() {
  const encData = CONFIG.encounters[STATE.activeEncounterId];
  const dialogue = encData.dialogues[STATE.dialogueIndex];

  // Update POV Badge dynamically
  const povBadge = document.getElementById("dialogue-pov-badge");
  if (povBadge) {
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
      povBadge.classList.remove("hidden");
      if (STATE.dialogueIndex >= 15) {
        povBadge.innerText = "KUM CITRA";
        povBadge.className = "pov-badge kum";
      } else {
        povBadge.innerText = "AO AMINAH";
        povBadge.className = "pov-badge ao";
      }
    } else {
      povBadge.classList.add("hidden");
    }
  }

  // Set speaker name
  document.getElementById("speaker-name").innerText = dialogue.speaker;

  // Start typewriter effect instead of setting instantly
  runTypewriter(dialogue.objection);

  // Set character portrait to "talk" mode initially
  const portraitImg = document.getElementById("npc-portrait");
  if (portraitImg) {
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
      portraitImg.className = "npc-portrait-img scene-mode";
      const idx = STATE.dialogueIndex;
      if (idx >= 0 && idx <= 1) {
        portraitImg.src = "ujikelayakan&verif/ukmeet1.jpeg";
      } else if (idx === 2) {
        portraitImg.src = "ujikelayakan&verif/ukmeet2.jpg";
      } else if (idx >= 3 && idx <= 5) {
        portraitImg.src = "ujikelayakan&verif/ukmeet3.jpeg";
      } else if (idx === 6 || idx === 7) {
        portraitImg.src = "ujikelayakan&verif/ukmeet4.jpg";
      } else if (idx === 8) {
        portraitImg.src = "ujikelayakan&verif/ukmeet5.jpg";
      } else if (idx >= 9 && idx <= 14) {
        portraitImg.src = "ujikelayakan&verif/ukmeet4.jpg";
      } else if (idx >= 15 && idx <= 17) {
        portraitImg.src = "ujikelayakan&verif/verif1.jpeg";
      } else if (idx >= 18 && idx <= 22) {
        portraitImg.src = "ujikelayakan&verif/verif2.jpeg";
      } else if (idx >= 23 && idx <= 24) {
        portraitImg.src = "ujikelayakan&verif/verif3.jpeg";
      } else if (idx >= 25 && idx <= 27) {
        portraitImg.src = "ujikelayakan&verif/verif4.jpeg";
      }
    } else {
      portraitImg.classList.remove("scene-mode");
      portraitImg.src = getPortraitUrl(dialogue.portraitId, "talk");
      portraitImg.className = "npc-portrait-img"; // reset animations
    }
  }

  // Adjust dialogue portrait background based on encounter
  const portraitBg = document.querySelector(".dialogue-portrait-bg");
  if (portraitBg) {
    if (STATE.activeEncounterId === "citra") {
      portraitBg.style.background = "url('bgcabang.png') no-repeat center bottom";
      portraitBg.style.backgroundSize = "cover";
    } else {
      portraitBg.style.background = "url('bg-enviroment.png') no-repeat center bottom";
      portraitBg.style.backgroundSize = "cover";
    }
  }

  // Adjust option title visibility
  const optionsTitle = document.querySelector(".options-title");
  if (optionsTitle) {
    if (STATE.activeEncounterId === "citra") {
      optionsTitle.style.display = "none";
    } else {
      optionsTitle.style.display = "block";
      if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
        const hasOnlyLanjut = dialogue.options && dialogue.options.length === 1 && dialogue.options[0].text.toLowerCase() === "lanjut";
        if (hasOnlyLanjut) {
          optionsTitle.style.display = "none";
        } else {
          optionsTitle.innerText = "Pilih Tindakan yang tepat!";
        }
      } else {
        optionsTitle.innerText = "Pilih Respon yang tepat!";
      }
    }
  }

  // Adjust back button visibility (hide on cabang Citra dialogue)
  const backBtn = document.getElementById("btn-dialogue-back");
  if (backBtn) {
    if (STATE.activeEncounterId === "citra") {
      backBtn.style.display = "none";
    } else {
      backBtn.style.display = "flex";
    }
  }

  // Populate options list
  const optionsList = document.getElementById("options-list");
  if (optionsList) {
    optionsList.innerHTML = "";
    dialogue.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      if (opt.text.toLowerCase() === "lanjut") {
        btn.classList.add("green");
      }
      btn.innerText = replacePlayerName(opt.text);
      btn.addEventListener("click", () => handleOptionSelect(opt, btn));
      optionsList.appendChild(btn);
    });
  }

  // Hide feedback panel
  const feedbackPanel = document.getElementById("dialogue-feedback");
  if (feedbackPanel) {
    feedbackPanel.classList.add("hidden");
  }
}

// Handle Option Selection
function handleOptionSelect(option, buttonEl) {
  const encData = CONFIG.encounters[STATE.activeEncounterId];
  const dialogue = encData.dialogues[STATE.dialogueIndex];

  if (STATE.activeEncounterId === "citra" || (dialogue.options && dialogue.options.length === 1)) {
    playSound("tap");
    if (option.text === "Mulai Wawancara") {
      startInterviewMinigame();
      return;
    }
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia" &&
      (STATE.dialogueIndex === 10 || (dialogue.objection === "Silakan, Mbak." && dialogue.speaker === "BU LIA"))) {
      startPhotoMinigame();
      return;
    }
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia" &&
      (STATE.dialogueIndex === 14 || dialogue.objection.includes("Alhamdulillah kalau semuanya lancar"))) {
      console.log("TRANSITION TRIGGERED at dialogueIndex:", STATE.dialogueIndex);
      triggerTimeSkipTransition(() => {
        advanceDialogue();
      });
      return;
    }
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia" &&
      (STATE.dialogueIndex === 20 || dialogue.objection.includes("Yang perlu disiapkan itu"))) {
      startVerifDocsMinigame();
      return;
    }
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia" &&
      (STATE.dialogueIndex === 24 || (dialogue.objection === "Silakan, Mbak Citra." && dialogue.speaker === "BU LIA"))) {
      startMirrorDocsMinigame();
      return;
    }
    advanceDialogue();
    return;
  }

  const portraitImg = document.getElementById("npc-portrait");
  const feedbackPanel = document.getElementById("dialogue-feedback");
  const feedbackIcon = document.getElementById("feedback-icon");
  const feedbackTitle = document.getElementById("feedback-title");
  const feedbackResponse = document.getElementById("feedback-response");

  if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
    portraitImg.className = "npc-portrait-img scene-mode";
  } else {
    portraitImg.className = "npc-portrait-img"; // reset animations
  }

  if (option.isCorrect) {
    playSound("correct");
    triggerVignetteFlash("correct");

    // Track stats (excluding Pak RT)
    if (STATE.isFirstTry && STATE.activeEncounterId !== "pakrt") {
      STATE.firstTryCorrect++;
    }

    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
      advanceDialogue();
    } else {
      // Add success animations
      portraitImg.src = getPortraitUrl(dialogue.portraitId, "laugh");
      portraitImg.classList.add("happy");

      // Show correct feedback
      feedbackIcon.className = "feedback-icon correct";
      feedbackTitle.innerText = "Tepat Sekali!";
      feedbackTitle.className = "feedback-title correct";
      feedbackResponse.innerText = replacePlayerName(dialogue.correctResponse);

      // Setup Next button
      const btnNext = document.getElementById("btn-feedback-next");
      btnNext.innerText = "LANJUT";
      btnNext.onclick = () => {
        playSound("tap");
        advanceDialogue();
      };

      feedbackPanel.classList.remove("hidden");
    }
  } else {
    playSound("incorrect");
    triggerVignetteFlash("incorrect");

    // Mark as failed first try
    STATE.isFirstTry = false;

    // Add error animations
    if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
      // Do not shake/move/bounce or change source for artwork sprite
    } else {
      portraitImg.src = getPortraitUrl(dialogue.portraitId, "think");
      portraitImg.classList.add("incorrect");
    }

    // Show incorrect feedback
    feedbackIcon.className = "feedback-icon incorrect";
    feedbackTitle.innerText = "Kurang Tepat!";
    feedbackTitle.className = "feedback-title incorrect";
    feedbackResponse.innerText = replacePlayerName(dialogue.incorrectResponse);

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
      if (STATE.currentLevel === 2 && STATE.activeEncounterId === "lia") {
        // Do not change the artwork portrait src or class
      } else {
        portraitImg.src = getPortraitUrl(dialogue.portraitId, "think");
        portraitImg.classList.remove("incorrect");
      }
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
    // Group/Individual encounter fully complete!
    STATE.completedEncounters.add(STATE.activeEncounterId);

    if (STATE.currentLevel === 2) {
      if (STATE.activeEncounterId === "warung") {
        STATE.cluesFound.ibu = true;
      } else if (STATE.activeEncounterId === "sayur") {
        STATE.cluesFound.house = true;
      }
      if (STATE.cluesFound.ibu && STATE.cluesFound.house) {
        playSound("correct");
      }
    }

    if (STATE.activeEncounterId === "citra") {
      endCabangDialogue();
      return;
    }

    if (STATE.activeEncounterId === "pakrt") {
      STATE.hasPermission = true;
      // Change speech bubble to checkmark
      const rMarker = document.querySelector("#encounter-pakrt .speech-bubble");
      if (rMarker) rMarker.innerText = "✓";

      showScreen("map");
      return;
    }

    const oldCount = STATE.collectedCount;
    STATE.collectedCount += encData.recruitsCount;

    // Check win condition
    if (STATE.collectedCount >= CONFIG.totalNasabahGoal) {
      triggerVictory();
    } else {
      // Set pending HUD animation data
      STATE.pendingHUDAnimation = { oldCount: oldCount, newCount: STATE.collectedCount };
      // Go back to map
      showScreen("map");
    }
  }
}

// Victory Event
function triggerVictory() {
  playSound("victory");

  // Calculate final score stars dynamically
  const maxScore = CONFIG.totalNasabahGoal;
  const starRatingImg = document.getElementById("victory-stars-img");
  const ratingTextEl = document.getElementById("victory-rating-text");

  let starsEarned = 1;
  if (STATE.currentLevel === 2) {
    const minigameCorrect = STATE.minigameCorrect || 0;
    if (minigameCorrect >= 8) {
      starsEarned = 3;
    } else if (minigameCorrect >= 6) {
      starsEarned = 2;
    } else {
      starsEarned = 1;
    }
  } else {
    if (STATE.firstTryCorrect === maxScore) {
      starsEarned = 3;
    } else if (STATE.firstTryCorrect >= Math.ceil(maxScore * 0.8)) {
      starsEarned = 2;
    } else {
      starsEarned = 1;
    }
  }

  if (starsEarned === 3) {
    starRatingImg.src = "3star.png";
    ratingTextEl.innerText = "Sangat Kompeten! (3 Bintang)";
    ratingTextEl.className = "stat-value text-gold";
  } else if (starsEarned === 2) {
    starRatingImg.src = "2star.png";
    ratingTextEl.innerText = "Cukup Kompeten (2 Bintang)";
    ratingTextEl.className = "stat-value text-green";
  } else {
    starRatingImg.src = "1star.png";
    ratingTextEl.innerText = "Perlu Belajar Lagi (1 Bintang)";
    ratingTextEl.className = "stat-value text-dark";
  }

  // Save score to browser localStorage if it is higher than previous high score
  const scoreKey = `mekaar_journey_level_${STATE.currentLevel}_stars`;
  const existingScore = parseInt(localStorage.getItem(scoreKey)) || 0;
  if (starsEarned > existingScore) {
    localStorage.setItem(scoreKey, starsEarned.toString());
    if (STATE.currentLevel === 1) {
      STATE.highScoreStars = starsEarned;
    }
  }

  // Update stats
  if (STATE.currentLevel === 2) {
    document.getElementById("victory-correct-answers").innerText = `${STATE.minigameCorrect || 0} / 9`;
    const labelAnswers = document.querySelector("#victory-screen .stat-row:nth-child(1) .stat-label");
    if (labelAnswers) {
      labelAnswers.innerText = "Data Relevan Dicatat:";
    }
  } else {
    document.getElementById("victory-correct-answers").innerText = `${STATE.firstTryCorrect} / ${maxScore}`;
    const labelAnswers = document.querySelector("#victory-screen .stat-row:nth-child(1) .stat-label");
    if (labelAnswers) {
      labelAnswers.innerText = "Jawaban Benar:";
    }
  }

  const recruitsLabel = document.getElementById("victory-stat-label-recruits");
  const recruitsVal = document.getElementById("victory-stat-value-recruits");
  if (recruitsLabel) {
    recruitsLabel.innerText = STATE.currentLevel === 1 ? "Nasabah Direkrut:" : "Nasabah Diverifikasi:";
  }
  if (recruitsVal) {
    recruitsVal.innerText = `${STATE.collectedCount} / ${maxScore}`;
  }

  // Launch Confetti Particles
  launchConfetti();

  showScreen("victory");
}

// Reset Game to replay
function resetGame() {
  STATE.collectedCount = 0;
  STATE.firstTryCorrect = 0;
  STATE.minigameCorrect = 0;
  STATE.minigameIncorrect = 0;
  STATE.completedEncounters.clear();
  STATE.activeEncounterId = null;
  STATE.dialogueIndex = 0;
  STATE.isFirstTry = true;
  STATE.hasPermission = false; // Reset permission status
  STATE.cluesFound = { ibu: false, house: false };

  // Reset Yarn integration variables
  STATE.currentYarnParentNode = "";
  STATE.yarnVariables = {
    BuIndah: false,
    BuIndahWrong: false,
    Warung: false,
    Warungwrong: false,
    BuLastri: false,
    BuLastriWrong: false,
    BuTitin: false,
    BuTitinWrong: false,
    BuWati: false,
    BuWatiWrong: false,
    BuIjah: false,
    BuIjahWrong: false,
    IzinRT: false,
    acceptQuest1: false,
    sudahtanyajual: false
  };
  STATE.yarnSteps = [];
  STATE.yarnStepIndex = 0;
  STATE.currentEncounterCorrect = false;
  STATE.currentEncounterIncorrect = false;
  STATE.pendingRecruits = 0;
  STATE.currentAvatar = "";
  STATE.currentExpression = "idle";

  // Reset PKM Level 3 states
  STATE.pkmStage = 0;
  STATE.pkmDialogueIndex = 0;
  STATE.pkmSeatingCorrect = 0;
  STATE.pkmAttendanceCorrect = 0;
  STATE.pkmAttendanceConditions = [];
  STATE.pkmMoneyBills = [];
  STATE.pkmMoneySorted = 0;
  STATE.pkmTotalCounted = 0;

  // Set star icon in level selector card to match current progress
  updateLevelDetailStars();

  // Reset Pak RT marker
  const rMarker = document.querySelector("#encounter-pakrt .speech-bubble");
  if (rMarker) rMarker.innerText = "!";

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
    globalBtn.className = "top-circle-btn sound-on";
    if (pauseBtn) {
      pauseBtn.innerText = "SUARA: AKTIF";
      pauseBtn.className = "btn btn-primary";
    }
  } else {
    globalBtn.className = "top-circle-btn sound-off";
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

// Center Map Viewport to middle of map-content
function centerMap() {
  const viewport = document.getElementById("map-viewport");
  const content = document.getElementById("map-content");
  if (viewport && content) {
    const scrollX = (content.clientWidth - viewport.clientWidth) / 2;
    const scrollY = (content.clientHeight - viewport.clientHeight) / 2;
    viewport.scrollLeft = scrollX;
    viewport.scrollTop = scrollY;
  }
}

// Open settings (pause) modal dynamically
function openSettingsModal(fromMainMenu = false) {
  updateSoundUI();
  const titleEl = document.getElementById("pause-modal-title");
  if (titleEl) {
    titleEl.innerText = fromMainMenu ? "PENGATURAN" : "GAME JEDA";
  }

  const btnResume = document.getElementById("btn-pause-resume");
  if (btnResume) {
    btnResume.innerText = fromMainMenu ? "KEMBALI" : "LANJUTKAN GAME";
  }

  const nameSettingRow = document.getElementById("settings-player-name-row");
  if (nameSettingRow) {
    nameSettingRow.style.display = fromMainMenu ? "flex" : "none";
  }

  const nameInput = document.getElementById("settings-player-name-input");
  if (nameInput) {
    nameInput.value = localStorage.getItem("mekaar_player_name") || "Aminah";
  }

  const currentSavedGender = localStorage.getItem("mekaar_player_gender") || "female";
  STATE.tempSettingsGender = currentSavedGender;

  const femaleCard = document.getElementById("settings-gender-female");
  const maleCard = document.getElementById("settings-gender-male");
  if (femaleCard && maleCard) {
    if (currentSavedGender === "female") {
      femaleCard.classList.add("active");
      femaleCard.style.borderColor = "var(--pnm-green)";
      maleCard.classList.remove("active");
      maleCard.style.borderColor = "var(--wood-light)";
    } else {
      maleCard.classList.add("active");
      maleCard.style.borderColor = "var(--pnm-green)";
      femaleCard.classList.remove("active");
      femaleCard.style.borderColor = "var(--wood-light)";
    }
  }

  const btnMenu = document.getElementById("btn-pause-menu");
  if (btnMenu) {
    btnMenu.style.display = fromMainMenu ? "none" : "block";
  }

  document.getElementById("pause-modal").classList.add("active");
  playSound("tap");
}

// Initialize cabang viewport scroll/drag mechanics
function initCabangScreenDragScroll() {
  const viewport = document.getElementById("cabang-viewport");
  if (!viewport) return;

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  const dragThreshold = 6;
  let dragDetected = false;

  viewport.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragDetected = false;
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  viewport.addEventListener("mouseup", () => {
    isDragging = false;
  });

  viewport.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walkX = x - startX;
    if (Math.abs(walkX) > dragThreshold) {
      dragDetected = true;
    }
    viewport.scrollLeft = scrollLeft - walkX;
  });

  // Touch events for mobile dragging detection
  viewport.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      dragDetected = false;
      startX = e.touches[0].pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
    }
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    isDragging = false;
  });

  viewport.addEventListener("touchmove", (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const x = e.touches[0].pageX - viewport.offsetLeft;
    const walkX = x - startX;
    if (Math.abs(walkX) > dragThreshold) {
      dragDetected = true;
    }
    viewport.scrollLeft = scrollLeft - walkX;
  });

  // Export dragDetected check to be used in clicks
  viewport.addEventListener("click", (e) => {
    if (dragDetected) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Reset scroll tease timer on interaction
  viewport.addEventListener("mousedown", () => resetCabangScrollTeaseTimer(true), { passive: true });
  viewport.addEventListener("touchstart", () => resetCabangScrollTeaseTimer(true), { passive: true });
  viewport.addEventListener("mousemove", () => {
    if (isDragging) resetCabangScrollTeaseTimer(true);
  }, { passive: true });
  viewport.addEventListener("touchmove", () => {
    if (isDragging) resetCabangScrollTeaseTimer(true);
  }, { passive: true });
}



// End dialogue with KUM Citra
function endCabangDialogue() {
  STATE.hasTalkedToCitra = true;
  playSound("correct");

  // Return to cabang screen
  showScreen("cabang");

  // Unlock exit door!
  const door = document.getElementById("cabang-exit-door");
  if (door) {
    door.classList.remove("locked");
  }

  // Remove glowing objective class and hide exclamation mark from Citra
  const citra = document.getElementById("npc-citra");
  if (citra) {
    citra.classList.remove("glowing-objective");
    const indicator = citra.querySelector(".speech-bubble-indicator");
    if (indicator) {
      indicator.style.display = "none";
    }
  }

  // Update top objective text and progress bar (Talked to Citra -> Exit Cabang)
  const objText = document.getElementById("cabang-objective-text");
  if (objText) {
    objText.innerText = "Tugas: Keluar kantor cabang menuju persiapan berkendara";
  }
  const objProgress = document.getElementById("cabang-objective-progress");
  if (objProgress) {
    objProgress.style.width = "50%";
  }

  // Show swipe right hint after a short delay
  setTimeout(() => {
    if (!STATE.cabangSwipeRightShown) {
      showCabangSwipeHint("right");
    }
  }, 800);
}

// Cabang Swipe Hint System
function showCabangSwipeHint(direction) {
  const viewport = document.getElementById("cabang-viewport");
  const leftHint = document.getElementById("cabang-swipe-left-hint");
  const rightHint = document.getElementById("cabang-swipe-right-hint");
  if (!viewport || !leftHint || !rightHint) return;

  // Clean up any existing scroll handler and idle timer
  cleanupCabangSwipeHint(viewport);

  // Hide both first
  leftHint.classList.remove("visible");
  rightHint.classList.remove("visible");

  const activeHint = direction === "left" ? leftHint : rightHint;
  const targetId = direction === "left" ? "npc-citra" : "cabang-exit-door";

  if (direction === "left") {
    STATE.cabangSwipeHintShown = true;
  } else {
    STATE.cabangSwipeRightShown = true;
  }

  // Track the current direction so idle timer knows what to restore
  STATE.cabangSwipeDirection = direction;

  // Show the hint
  activeHint.classList.add("visible");

  // Check if target is already visible (e.g. after returning from Citra dialogue at the same scroll position)
  const targetEl = document.getElementById(targetId);
  if (targetEl && isElementVisibleInViewport(viewport, targetEl)) {
    activeHint.classList.remove("visible");
    startCabangIdleTimer(viewport);
    return;
  }

  // Scroll handler: hide hint when target becomes visible, then start idle watch
  STATE.cabangSwipeScrollHandler = function () {
    const el = document.getElementById(targetId);
    const isVisible = el && isElementVisibleInViewport(viewport, el);

    if (isVisible && activeHint.classList.contains("visible")) {
      // Target is now visible — fade out the hint
      activeHint.classList.remove("visible");
    }

    // Reset idle timer on every scroll
    resetCabangIdleTimer(viewport);
  };
  viewport.addEventListener("scroll", STATE.cabangSwipeScrollHandler);
}

// Start an idle timer that re-shows the swipe hint after 4 seconds of no scrolling
function startCabangIdleTimer(viewport) {
  clearCabangIdleTimer();

  STATE.cabangIdleTimerId = setTimeout(() => {
    // Only re-show if still on cabang screen and target isn't visible
    if (STATE.screen !== "cabang") return;

    const direction = STATE.cabangSwipeDirection;
    if (!direction) return;

    const targetId = direction === "left" ? "npc-citra" : "cabang-exit-door";
    const hintId = direction === "left" ? "cabang-swipe-left-hint" : "cabang-swipe-right-hint";
    const targetEl = document.getElementById(targetId);
    const hintEl = document.getElementById(hintId);

    if (hintEl && targetEl && !isElementVisibleInViewport(viewport, targetEl)) {
      hintEl.classList.add("visible");
    }
  }, 4000);
}

function resetCabangIdleTimer(viewport) {
  clearCabangIdleTimer();
  startCabangIdleTimer(viewport);
  resetCabangScrollTeaseTimer(false);
}

function clearCabangIdleTimer() {
  if (STATE.cabangIdleTimerId) {
    clearTimeout(STATE.cabangIdleTimerId);
    STATE.cabangIdleTimerId = null;
  }
}

function cleanupCabangSwipeHint(viewport) {
  if (STATE.cabangSwipeScrollHandler && viewport) {
    viewport.removeEventListener("scroll", STATE.cabangSwipeScrollHandler);
    STATE.cabangSwipeScrollHandler = null;
  }
  clearCabangIdleTimer();

  if (STATE.cabangScrollTeaseTimerId) {
    clearTimeout(STATE.cabangScrollTeaseTimerId);
    STATE.cabangScrollTeaseTimerId = null;
  }
  stopContinuousAutoScroll();
}

// Initialize/Reset Cabang Objective UI and NPC Citra Glowing State
function initCabangObjectiveState() {
  const citra = document.getElementById("npc-citra");
  if (citra) {
    citra.classList.add("glowing-objective");
    const indicator = citra.querySelector(".speech-bubble-indicator");
    if (indicator) {
      indicator.style.display = "block";
      indicator.innerText = "!";
    }
  }

  const objText = document.getElementById("cabang-objective-text");
  if (objText) {
    objText.innerText = "Tugas: Temui & dapatkan pengarahan dari KUM Citra";
  }

  const objProgress = document.getElementById("cabang-objective-progress");
  if (objProgress) {
    objProgress.style.width = "0%";
  }
}

// Stop the continuous auto-scroll loops
function stopContinuousAutoScroll() {
  STATE.cabangIsTeasing = false;
  if (STATE.cabangScrollLoopId) {
    cancelAnimationFrame(STATE.cabangScrollLoopId);
    STATE.cabangScrollLoopId = null;
  }
}

// Start continuous smooth auto-scrolling in the correct target direction
function startContinuousAutoScroll() {
  stopContinuousAutoScroll();

  const viewport = document.getElementById("cabang-viewport");
  if (!viewport || STATE.screen !== "cabang" || STATE.cabangDialogueActive) return;

  STATE.cabangIsTeasing = true;

  // Speed of scroll (pixels per animation frame)
  // 0.8px is slow, smooth, and easily interruptible by user scroll/touch.
  const scrollSpeed = 0.8;

  function scrollLoop() {
    if (!STATE.cabangIsTeasing || STATE.screen !== "cabang" || STATE.cabangDialogueActive) {
      stopContinuousAutoScroll();
      return;
    }

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (maxScroll <= 0) {
      stopContinuousAutoScroll();
      return;
    }

    if (!STATE.hasTalkedToCitra) {
      // Need to scroll right (towards Citra)
      if (viewport.scrollLeft < maxScroll) {
        viewport.scrollLeft += scrollSpeed;
        STATE.cabangScrollLoopId = requestAnimationFrame(scrollLoop);
      } else {
        stopContinuousAutoScroll();
      }
    } else {
      // Need to scroll left (towards exit door)
      if (viewport.scrollLeft > 0) {
        viewport.scrollLeft -= scrollSpeed;
        STATE.cabangScrollLoopId = requestAnimationFrame(scrollLoop);
      } else {
        stopContinuousAutoScroll();
      }
    }
  }

  STATE.cabangScrollLoopId = requestAnimationFrame(scrollLoop);
}

// Reset Cabang scroll tease timer
function resetCabangScrollTeaseTimer(isUserInteraction = false) {
  // If the user manually interacts or scrolls, stop the auto-scroll immediately
  if (isUserInteraction) {
    stopContinuousAutoScroll();
  } else if (STATE.cabangIsTeasing) {
    // If this is a scroll event and we are currently auto-scrolling, ignore it to prevent looping
    return;
  }

  if (STATE.cabangScrollTeaseTimerId) {
    clearTimeout(STATE.cabangScrollTeaseTimerId);
    STATE.cabangScrollTeaseTimerId = null;
  }

  if (STATE.screen !== "cabang" || STATE.cabangDialogueActive) return;

  STATE.cabangScrollTeaseTimerId = setTimeout(() => {
    startContinuousAutoScroll();
  }, 3000); // 3 seconds of idle starts auto scroll
}

// Check if an element inside a scrollable container is at least partially visible
function isElementVisibleInViewport(scrollContainer, element) {
  const containerRect = scrollContainer.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  // Element is visible if its left edge is within the container's visible area
  return elementRect.left < containerRect.right && elementRect.right > containerRect.left;
}

// Handle exit door click
function handleCabangExit() {
  if (!STATE.hasTalkedToCitra) {
    playSound("incorrect");

    const panel = document.getElementById("cabang-dialogue-panel");
    const avatarImg = document.getElementById("cabang-dialogue-avatar-img");
    const speakerName = document.querySelector(".cabang-speaker-name");
    const textEl = document.getElementById("cabang-dialogue-text");

    if (panel && textEl) {
      if (avatarImg) avatarImg.src = "npc/citraidle.png";
      if (speakerName) speakerName.innerText = "PANDUAN";
      textEl.innerText = "Temui dan berbicaralah dengan Ibu Citra (KUM) di ujung kanan terlebih dahulu untuk mendapatkan arahan!";
      panel.classList.remove("hidden");

      // Auto-hide system guide message after 4 seconds
      setTimeout(() => {
        if (!STATE.cabangDialogueActive && !STATE.hasTalkedToCitra) {
          panel.classList.add("hidden");
        }
      }, 4000);
    }
    return;
  }

  // Transition to safety riding
  resetPrepScreen();
  showScreen("prep");
}

// ==========================================================================
// PHOTO MINIGAME LOGIC (CAMERA SCRIPT)
// ==========================================================================

const PHOTO_TARGETS = {
  left: 220,
  center: 688,
  right: 1156
};

function startPhotoMinigame() {
  STATE.screen = "photominigame";
  showScreen("photominigame");

  // Reset captured state
  STATE.photoMinigame = {
    captured: {
      left: false,
      center: false,
      right: false
    },
    currentX: 0,
    activeTarget: null
  };

  // Reset HUD badges to locked
  const targets = ["left", "center", "right"];
  targets.forEach(t => {
    const badge = document.getElementById(`thumb-${t}`);
    if (badge) {
      badge.className = "photo-thumb-badge locked";
    }
  });

  // Reset panorama position
  const panoramaImgEl = document.getElementById("photo-panorama-img");
  if (panoramaImgEl) {
    panoramaImgEl.style.transform = "translateX(0px)";
  }

  // Hide transition complete overlay
  const overlay = document.getElementById("photo-transition-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }

  // Reset hints
  const hintEl = document.getElementById("camera-hint-text");
  if (hintEl) {
    hintEl.innerText = "Geser layar ke kiri atau kanan untuk mencari sudut ruangan";
    hintEl.style.opacity = "0.8";
  }

  // Initialize drag events
  initPhotoMinigameDragHandlers();

  // Initial target proximity check after minor layout render delay
  setTimeout(() => {
    checkTargetProximity();
  }, 100);
}

let photoMinigameDragInitialized = false;
function initPhotoMinigameDragHandlers() {
  if (photoMinigameDragInitialized) return;
  photoMinigameDragInitialized = true;

  const viewfinderEl = document.getElementById("photo-viewfinder");
  const panoramaImgEl = document.getElementById("photo-panorama-img");
  const shutterBtn = document.getElementById("btn-shutter");

  if (shutterBtn) {
    shutterBtn.addEventListener("click", handleShutterClick);
  }

  let isDragging = false;
  let startX = 0;
  let startScrollX = 0;
  let velocity = 0;
  let lastTime = 0;
  let lastClientX = 0;
  let momentumId = null;

  function onStart(e) {
    if (STATE.screen !== "photominigame") return;
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    startScrollX = STATE.photoMinigame.currentX;
    lastTime = performance.now();
    lastClientX = startX;
    velocity = 0;

    if (momentumId) {
      cancelAnimationFrame(momentumId);
      momentumId = null;
    }

    // Fade in hint text slightly on drag
    const hint = document.getElementById("camera-hint-text");
    if (hint) {
      hint.style.opacity = "0.5";
    }
  }

  function onMove(e) {
    if (!isDragging || STATE.screen !== "photominigame") return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;

    // Track speed for inertia
    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const dx = clientX - lastClientX;
      velocity = -dx / dt; // drag scroll direction speed
      lastTime = now;
      lastClientX = clientX;
    }

    // Dragging left (negative deltaX) moves the panorama to the right (increases scroll/currentX)
    let nextX = startScrollX - deltaX;

    const V = viewfinderEl.clientWidth;
    const W = panoramaImgEl.clientWidth;
    const maxScrollX = Math.max(0, W - V);

    STATE.photoMinigame.currentX = Math.max(0, Math.min(nextX, maxScrollX));
    panoramaImgEl.style.transform = `translateX(${-STATE.photoMinigame.currentX}px)`;

    checkTargetProximity();
  }

  function onEnd() {
    isDragging = false;

    // Trigger inertia scroll if released with velocity
    if (Math.abs(velocity) > 0.05) {
      const friction = 0.95;
      const momentumStep = () => {
        if (isDragging || STATE.screen !== "photominigame") return;
        velocity *= friction;

        const V = viewfinderEl.clientWidth;
        const W = panoramaImgEl.clientWidth;
        const maxScrollX = Math.max(0, W - V);

        STATE.photoMinigame.currentX += velocity * 16.6;
        STATE.photoMinigame.currentX = Math.max(0, Math.min(STATE.photoMinigame.currentX, maxScrollX));
        panoramaImgEl.style.transform = `translateX(${-STATE.photoMinigame.currentX}px)`;

        checkTargetProximity();

        if (Math.abs(velocity) > 0.01) {
          momentumId = requestAnimationFrame(momentumStep);
        } else {
          momentumId = null;
        }
      };
      momentumId = requestAnimationFrame(momentumStep);
    }
  }

  // Mouse Listeners
  viewfinderEl.addEventListener("mousedown", onStart);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onEnd);

  // Touch Listeners
  viewfinderEl.addEventListener("touchstart", onStart, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onEnd);

  // Keyboard shortcuts for testing the photo minigame
  window.addEventListener("keydown", (e) => {
    if (STATE.screen !== "photominigame") return;
    const key = e.key.toLowerCase();
    if (["l", "c", "r", "s"].includes(key)) {
      const V = viewfinderEl.clientWidth;
      const W = panoramaImgEl.clientWidth;
      const scale = W / 1376;
      const maxScrollX = Math.max(0, W - V);

      if (key === "l") {
        STATE.photoMinigame.currentX = Math.max(0, Math.min(PHOTO_TARGETS.left * scale - V / 2, maxScrollX));
      } else if (key === "c") {
        STATE.photoMinigame.currentX = Math.max(0, Math.min(PHOTO_TARGETS.center * scale - V / 2, maxScrollX));
      } else if (key === "r") {
        STATE.photoMinigame.currentX = Math.max(0, Math.min(PHOTO_TARGETS.right * scale - V / 2, maxScrollX));
      } else if (key === "s") {
        handleShutterClick();
        return;
      }

      panoramaImgEl.style.transform = `translateX(${-STATE.photoMinigame.currentX}px)`;
      checkTargetProximity();
    }
  });
}

function checkTargetProximity() {
  const viewfinderEl = document.getElementById("photo-viewfinder");
  const panoramaImgEl = document.getElementById("photo-panorama-img");
  const reticleEl = document.getElementById("camera-reticle");
  const reticleText = document.getElementById("reticle-text");

  if (!viewfinderEl || !panoramaImgEl || !reticleEl) return;

  const V = viewfinderEl.clientWidth;
  const W = panoramaImgEl.clientWidth;
  if (W === 0) return;

  const scale = W / 1376;
  const pointingX = STATE.photoMinigame.currentX + V / 2;
  const tolerance = 45; // range in pixels on rendered image

  let activeTarget = null;
  for (const [key, targetPx] of Object.entries(PHOTO_TARGETS)) {
    const targetRenderedX = targetPx * scale;
    if (Math.abs(pointingX - targetRenderedX) < tolerance) {
      activeTarget = key;
      break;
    }
  }

  // Play focus lock beep sound
  if (activeTarget && !STATE.photoMinigame.captured[activeTarget] && STATE.photoMinigame.lastActiveTarget !== activeTarget) {
    playSound("beep");
  }
  STATE.photoMinigame.lastActiveTarget = activeTarget;

  STATE.photoMinigame.activeTarget = activeTarget;

  if (activeTarget) {
    reticleEl.classList.add("capturable");
    if (STATE.photoMinigame.captured[activeTarget]) {
      reticleText.innerText = "SUDUT TERGAMBAR";
      reticleEl.classList.add("already-captured");
    } else {
      reticleText.innerText = "SIAP AMBIL FOTO!";
      reticleEl.classList.remove("already-captured");
    }
  } else {
    reticleEl.className = "camera-reticle";
    reticleText.innerText = "MENCARI SUDUT...";
  }

  // Update directional helper arrows
  let hasLeftUncaptured = false;
  let hasRightUncaptured = false;
  for (const [key, targetPx] of Object.entries(PHOTO_TARGETS)) {
    if (!STATE.photoMinigame.captured[key]) {
      const targetRenderedX = targetPx * scale;
      if (targetRenderedX < pointingX - 60) {
        hasLeftUncaptured = true;
      }
      if (targetRenderedX > pointingX + 60) {
        hasRightUncaptured = true;
      }
    }
  }
  const arrowLeft = document.getElementById("camera-arrow-left");
  const arrowRight = document.getElementById("camera-arrow-right");
  if (arrowLeft) {
    arrowLeft.classList.toggle("active", hasLeftUncaptured);
  }
  if (arrowRight) {
    arrowRight.classList.toggle("active", hasRightUncaptured);
  }
}

function handleShutterClick() {
  if (STATE.screen !== "photominigame") return;

  // Flash white visual feedback
  const flash = document.getElementById("shutter-flash");
  if (flash) {
    flash.style.opacity = "1";
    setTimeout(() => {
      flash.style.opacity = "0";
    }, 150);
  }

  playSound("shutter");

  const target = STATE.photoMinigame.activeTarget;
  if (target) {
    if (STATE.photoMinigame.captured[target]) {
      showCameraHint("Sudut ini sudah difoto!");
      return;
    }

    // Mark as captured
    STATE.photoMinigame.captured[target] = true;

    // Visual feedback in progress HUD
    const badge = document.getElementById(`thumb-${target}`);
    if (badge) {
      badge.classList.remove("locked");
      badge.classList.add("captured");
    }

    // Pop animation on captured preview badge
    const thumbWrapper = badge ? badge.querySelector(".thumb-wrapper") : null;
    if (thumbWrapper) {
      thumbWrapper.style.transform = "scale(1.2)";
      setTimeout(() => {
        thumbWrapper.style.transform = "scale(1)";
      }, 300);
    }

    showCameraHint(`Foto sudut ${target.toUpperCase()} berhasil diambil!`);

    // Update reticle status text
    checkTargetProximity();

    // Check completion status
    const allCaptured = Object.values(STATE.photoMinigame.captured).every(v => v === true);
    if (allCaptured) {
      triggerPhotoMinigameComplete();
    }
  } else {
    showCameraHint("Sudut kurang pas, coba geser lagi!");
  }
}

function showCameraHint(msg) {
  const hintEl = document.getElementById("camera-hint-text");
  if (hintEl) {
    hintEl.innerText = msg;
    hintEl.style.opacity = "1";
    if (STATE.cameraHintTimeoutId) clearTimeout(STATE.cameraHintTimeoutId);
    STATE.cameraHintTimeoutId = setTimeout(() => {
      if (STATE.screen === "photominigame") {
        hintEl.style.opacity = "0.7";
      }
    }, 2500);
  }
}

function triggerPhotoMinigameComplete() {
  playSound("correct");

  // Show victory overlay
  const overlay = document.getElementById("photo-transition-overlay");
  if (overlay) {
    overlay.classList.add("active");
  }

  setTimeout(() => {
    if (overlay) overlay.classList.remove("active");

    STATE.screen = "dialogue";
    showScreen("dialogue");
    advanceDialogue();
  }, 2500);
}

// ==========================================================================
// TIME SKIP TRANSITION LOGIC
// ==========================================================================
function triggerTimeSkipTransition(callback) {
  const overlay = document.getElementById("time-skip-overlay");
  if (!overlay) {
    if (callback) callback();
    return;
  }
  playSound("tap");
  overlay.classList.add("active");

  setTimeout(() => {
    if (callback) callback();
    setTimeout(() => {
      overlay.classList.remove("active");
    }, 1500);
  }, 1200);
}

// Toggle minigame contents inside dialogue board
function setDialogueBoardMinigameMode(minigameId) {
  const board = document.querySelector(".dialogue-board");
  if (!board) return;

  if (minigameId) {
    board.classList.add("minigame-active");
    board.querySelectorAll(".dialogue-board-minigame").forEach(el => el.classList.add("hidden"));
    const target = document.getElementById(minigameId);
    if (target) {
      target.classList.remove("hidden");
    }
  } else {
    board.classList.remove("minigame-active");
    board.querySelectorAll(".dialogue-board-minigame").forEach(el => el.classList.add("hidden"));
  }
}

// ==========================================================================
// MINIGAME 1: CHOOSE VERIFICATION DOCUMENTS (BOARD MODE)
// ==========================================================================
let verifDocsMinigameInitialized = false;
function startVerifDocsMinigame() {
  showScreen("dialogue");
  STATE.screen = "verifdocs";
  setDialogueBoardMinigameMode("verifdocs-board");

  // Clear any previous selection
  STATE.verifDocsSelected = new Set();

  const cards = document.querySelectorAll(".verifdocs-grid-board .verifdoc-card");
  cards.forEach(card => {
    card.classList.remove("selected");
  });

  const feedbackMsg = document.getElementById("verifdocs-feedback");
  if (feedbackMsg) {
    feedbackMsg.innerText = "Pilih 3 dokumen wajib yang benar. (Terpilih: 0/3)";
    feedbackMsg.className = "verif-feedback-msg";
  }

  initVerifDocsHandlers();
}

function initVerifDocsHandlers() {
  if (verifDocsMinigameInitialized) return;
  verifDocsMinigameInitialized = true;

  const cards = document.querySelectorAll(".verifdocs-grid-board .verifdoc-card");
  const updateVerifProgress = () => {
    const feedback = document.getElementById("verifdocs-feedback");
    if (feedback) {
      const count = STATE.verifDocsSelected.size;
      feedback.innerText = `Pilih 3 dokumen wajib yang benar. (Terpilih: ${count}/3)`;
      feedback.className = "verif-feedback-msg";
    }
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (STATE.screen !== "verifdocs") return;
      playSound("tap");
      const docType = card.getAttribute("data-doc");
      if (STATE.verifDocsSelected.has(docType)) {
        STATE.verifDocsSelected.delete(docType);
        card.classList.remove("selected");
      } else {
        STATE.verifDocsSelected.add(docType);
        card.classList.add("selected");
      }
      updateVerifProgress();
    });
  });

  const btnConfirm = document.getElementById("btn-verifdocs-confirm");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", () => {
      if (STATE.screen !== "verifdocs") return;

      const feedbackMsg = document.getElementById("verifdocs-feedback");
      const container = document.getElementById("verifdocs-board");

      // Target correct set: ktp, kk, domisili
      const correctSet = new Set(["ktp", "kk", "domisili"]);

      // Check if selected matches correctSet exactly
      let isCorrect = STATE.verifDocsSelected.size === correctSet.size &&
        [...STATE.verifDocsSelected].every(x => correctSet.has(x));

      if (isCorrect) {
        playSound("correct");
        if (feedbackMsg) {
          feedbackMsg.innerText = "Tepat sekali! Memverifikasi dokumen...";
          feedbackMsg.className = "verif-feedback-msg success";
        }

        setTimeout(() => {
          setDialogueBoardMinigameMode(null);
          STATE.screen = "dialogue";
          advanceDialogue();
        }, 1500);
      } else {
        playSound("incorrect");
        triggerVignetteFlash("incorrect");
        if (feedbackMsg) {
          feedbackMsg.innerText = "Coba cek lagi, Mbak!";
          feedbackMsg.className = "verif-feedback-msg error";
        }
        if (container) {
          container.classList.add("shake-element");
          setTimeout(() => {
            container.classList.remove("shake-element");
          }, 400);
        }
      }
    });
  }
}

// ==========================================================================
// MINIGAME 2: MIRROR DATA COMPARISON (BOARD MODE)
// ==========================================================================
let mirrorDocsMinigameInitialized = false;
function startMirrorDocsMinigame() {
  showScreen("dialogue");
  STATE.screen = "mirrordocs";
  setDialogueBoardMinigameMode("mirrordocs-board");

  // Clear any previous selection
  STATE.mismatchesSelected = new Set();

  const rows = document.querySelectorAll("#mirrordocs-board .comparison-row");
  rows.forEach(row => {
    row.className = "comparison-row"; // Reset selected, error, correct classes
  });

  const feedbackMsg = document.getElementById("mirrordocs-feedback");
  if (feedbackMsg) {
    feedbackMsg.innerText = "Temukan 2 data yang tidak sesuai. (Terpilih: 0/2)";
    feedbackMsg.className = "verif-feedback-msg";
  }

  initMirrorDocsHandlers();
}

function initMirrorDocsHandlers() {
  if (mirrorDocsMinigameInitialized) return;
  mirrorDocsMinigameInitialized = true;

  const rows = document.querySelectorAll("#mirrordocs-board .comparison-row");
  const updateMirrorProgress = () => {
    const feedback = document.getElementById("mirrordocs-feedback");
    if (feedback) {
      const count = STATE.mismatchesSelected.size;
      feedback.innerText = `Temukan 2 data yang tidak sesuai. (Terpilih: ${count}/2)`;
      feedback.className = "verif-feedback-msg";
    }
  };

  rows.forEach(row => {
    row.addEventListener("click", () => {
      if (STATE.screen !== "mirrordocs") return;
      playSound("tap");
      const fieldName = row.getAttribute("data-field");

      // Clean previous error marks on this row
      row.classList.remove("error-validated");

      if (STATE.mismatchesSelected.has(fieldName)) {
        STATE.mismatchesSelected.delete(fieldName);
        row.classList.remove("selected");
      } else {
        STATE.mismatchesSelected.add(fieldName);
        row.classList.add("selected");
      }
      updateMirrorProgress();
    });
  });

  const btnConfirm = document.getElementById("btn-mirrordocs-confirm");
  if (btnConfirm) {
    btnConfirm.addEventListener("click", () => {
      if (STATE.screen !== "mirrordocs") return;

      const feedbackMsg = document.getElementById("mirrordocs-feedback");
      const container = document.getElementById("mirrordocs-board");

      // Target correct mistakes: tgl_lahir and no_kk
      const correctMismatches = new Set(["tgl_lahir", "no_kk"]);

      // Check if selected matches correctMismatches exactly
      let isCorrect = STATE.mismatchesSelected.size === correctMismatches.size &&
        [...STATE.mismatchesSelected].every(x => correctMismatches.has(x));

      if (isCorrect) {
        playSound("correct");
        if (feedbackMsg) {
          feedbackMsg.innerText = "Sempurna! Semua perbedaan data telah diidentifikasi.";
          feedbackMsg.className = "verif-feedback-msg success";
        }

        // Highlight rows green
        rows.forEach(row => {
          const field = row.getAttribute("data-field");
          if (correctMismatches.has(field)) {
            row.classList.add("correct-validated");
          }
        });

        setTimeout(() => {
          setDialogueBoardMinigameMode(null);
          STATE.screen = "dialogue";
          advanceDialogue();
        }, 1800);
      } else {
        playSound("incorrect");
        triggerVignetteFlash("incorrect");
        if (feedbackMsg) {
          feedbackMsg.innerText = "Coba periksa kembali, Mbak!";
          feedbackMsg.className = "verif-feedback-msg error";
        }

        // Visual indicator: mark selected incorrect rows with cross
        rows.forEach(row => {
          const field = row.getAttribute("data-field");
          if (STATE.mismatchesSelected.has(field)) {
            if (!correctMismatches.has(field)) {
              row.classList.add("error-validated");
            }
          }
        });

        if (container) {
          container.classList.add("shake-element");
          setTimeout(() => {
            container.classList.remove("shake-element");
          }, 400);
        }
      }
    });
  }
}

// Minigame variables
const MINIGAME_CARDS = [
  { text: "Nama lengkap saya Titin Sumarni", isRelevant: true },
  { text: "Saya lahir di Magelang", isRelevant: true },
  { text: "Tanggal lahirnya 7 September 1988", isRelevant: true },
  { text: "Weton saya itu Senin Pahing", isRelevant: false },
  { text: "Makanan favorit saya sayur lodeh", isRelevant: false },
  { text: "Alamat saya di RT 02 RW 04", isRelevant: true },
  { text: "Suami saya, Pak Bambang, yang jadi penanggung jawabnya", isRelevant: true },
  { text: "Zodiak saya mah Virgo", isRelevant: false },
  { text: "Nama panggilan saya waktu kecil itu Atin", isRelevant: false }
];

function startInterviewMinigame() {
  STATE.screen = "minigame";
  showScreen("minigame");

  STATE.minigameCardIndex = 0;
  STATE.minigameCorrect = 0;
  STATE.minigameIncorrect = 0;

  // Show swipe tutorial overlay
  const tutorial = document.getElementById("swipe-tutorial-container");
  if (tutorial) {
    tutorial.style.display = "flex";
    tutorial.style.opacity = "1";
  }

  // Set up minigame UI listeners
  initMinigameDragHandlers();

  loadMinigameCard();
}

function loadMinigameCard() {
  if (STATE.minigameTimerId) {
    clearInterval(STATE.minigameTimerId);
  }

  // Update progress bar
  const progressPercent = (STATE.minigameCardIndex / MINIGAME_CARDS.length) * 100;
  const progressFill = document.getElementById("minigame-progress-bar-fill");
  if (progressFill) {
    progressFill.style.width = `${progressPercent}%`;
  }

  // Check if finished
  if (STATE.minigameCardIndex >= MINIGAME_CARDS.length) {
    // Return to dialogue screen and advance
    STATE.screen = "dialogue";
    showScreen("dialogue");
    advanceDialogue();
    return;
  }

  const currentCard = MINIGAME_CARDS[STATE.minigameCardIndex];
  const cardEl = document.getElementById("swipe-card");
  const cardTextEl = document.getElementById("swipe-card-text");

  if (cardTextEl) {
    cardTextEl.innerText = currentCard.text;
  }

  if (cardEl) {
    cardEl.className = "swipe-card";
    cardEl.style.transform = "translate(0px, 0px) rotate(0deg)";
    cardEl.style.opacity = "1";
  }

  // Restart 15s Timer
  STATE.minigameTimeRemaining = 15;
  const timerBar = document.getElementById("minigame-timer-bar");
  const timerText = document.getElementById("minigame-timer-text");
  if (timerBar) timerBar.style.width = "100%";
  if (timerText) timerText.innerText = "15s";

  STATE.minigameTimerId = setInterval(() => {
    STATE.minigameTimeRemaining -= 0.1;
    if (STATE.minigameTimeRemaining <= 0) {
      clearInterval(STATE.minigameTimerId);
      // Timeout counts as incorrect/abalkan
      playSound("incorrect");
      STATE.minigameIncorrect++;
      STATE.minigameCardIndex++;
      loadMinigameCard();
    } else {
      if (timerBar) {
        timerBar.style.width = `${(STATE.minigameTimeRemaining / 15) * 100}%`;
      }
      if (timerText) {
        timerText.innerText = `${Math.ceil(STATE.minigameTimeRemaining)}s`;
      }
    }
  }, 100);
}

function handleMinigameSwipe(direction) {
  if (STATE.minigameTimerId) {
    clearInterval(STATE.minigameTimerId);
  }

  // Clear swipe overlays
  const overlayLeft = document.getElementById("swipe-feedback-left");
  const overlayRight = document.getElementById("swipe-feedback-right");
  if (overlayLeft) {
    overlayLeft.style.opacity = "0";
    overlayLeft.classList.remove("active");
  }
  if (overlayRight) {
    overlayRight.style.opacity = "0";
    overlayRight.classList.remove("active");
  }

  const currentCard = MINIGAME_CARDS[STATE.minigameCardIndex];
  const cardEl = document.getElementById("swipe-card");

  // Determine correctness
  // Right swipe = CATAT (Relevant)
  // Left swipe = ABAIKAN (Not Relevant)
  const swipedRight = direction === "right";
  const userChoiceCorrect = (swipedRight && currentCard.isRelevant) || (!swipedRight && !currentCard.isRelevant);

  if (userChoiceCorrect) {
    playSound("correct");
    STATE.minigameCorrect++;
  } else {
    playSound("incorrect");
    STATE.minigameIncorrect++;
  }

  // Play fly-out animation
  if (cardEl) {
    cardEl.classList.add(swipedRight ? "swiped-right" : "swiped-left");
  }

  STATE.minigameCardIndex++;
  setTimeout(() => {
    loadMinigameCard();
  }, 400);
}

let minigameDragInitialized = false;
function initMinigameDragHandlers() {
  if (minigameDragInitialized) return;
  minigameDragInitialized = true;

  const cardEl = document.getElementById("swipe-card");
  const overlayLeft = document.getElementById("swipe-feedback-left");
  const overlayRight = document.getElementById("swipe-feedback-right");

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Drag and Touch helpers
  function startDrag(e) {
    if (STATE.screen !== "minigame") return;
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;

    // Hide Lottie tutorial container when dragging starts
    const tutorial = document.getElementById("swipe-tutorial-container");
    if (tutorial) {
      tutorial.style.opacity = "0";
      setTimeout(() => {
        if (tutorial.style.opacity === "0") {
          tutorial.style.display = "none";
        }
      }, 300);
    }

    if (cardEl) {
      cardEl.classList.remove("resetting");
    }
  }

  function moveDrag(e) {
    if (!isDragging || !cardEl) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Rotate and translate card based on deltaX
    const rotation = deltaX * 0.1;
    cardEl.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;

    // Handle left/right breathing feedback overlays
    if (deltaX > 10) {
      if (overlayRight) {
        overlayRight.style.opacity = Math.min(deltaX / 120, 0.6);
        if (deltaX > 60) {
          overlayRight.classList.add("active");
        } else {
          overlayRight.classList.remove("active");
        }
      }
      if (overlayLeft) {
        overlayLeft.style.opacity = "0";
        overlayLeft.classList.remove("active");
      }
    } else if (deltaX < -10) {
      if (overlayLeft) {
        overlayLeft.style.opacity = Math.min(-deltaX / 120, 0.6);
        if (deltaX < -60) {
          overlayLeft.classList.add("active");
        } else {
          overlayLeft.classList.remove("active");
        }
      }
      if (overlayRight) {
        overlayRight.style.opacity = "0";
        overlayRight.classList.remove("active");
      }
    } else {
      if (overlayLeft) {
        overlayLeft.style.opacity = "0";
        overlayLeft.classList.remove("active");
      }
      if (overlayRight) {
        overlayRight.style.opacity = "0";
        overlayRight.classList.remove("active");
      }
    }
  }

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    // Reset overlay indicators
    if (overlayLeft) {
      overlayLeft.style.opacity = "0";
      overlayLeft.classList.remove("active");
    }
    if (overlayRight) {
      overlayRight.style.opacity = "0";
      overlayRight.classList.remove("active");
    }

    const transformMatrix = window.getComputedStyle(cardEl).transform;
    let deltaX = 0;
    if (transformMatrix && transformMatrix !== "none") {
      const values = transformMatrix.split('(')[1].split(')')[0].split(',');
      deltaX = parseFloat(values[4]) || 0;
    }

    if (deltaX > 100) {
      handleMinigameSwipe("right");
    } else if (deltaX < -100) {
      handleMinigameSwipe("left");
    } else {
      // Reset card position
      cardEl.classList.add("resetting");
      cardEl.style.transform = "translate(0px, 0px) rotate(0deg)";
    }
  }

  if (cardEl) {
    cardEl.addEventListener("mousedown", startDrag);
    cardEl.addEventListener("touchstart", startDrag, { passive: true });
  }

  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("touchmove", moveDrag, { passive: false });

  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);
}

// Show Permission Warning Modal
function showPermissionRequiredModal() {
  document.getElementById("permission-modal").classList.add("active");
  playSound("incorrect");
}

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Cabang Screen Mechanics
  initCabangScreenDragScroll();

  // Load Yarn dialogues for the fork
  loadYarnDialogues();

  // Initialize Level Configuration and Level Selector UI on load
  loadLevelConfig(1);
  updateLevelSelectionUI();

  // KUM Citra Click Event
  const npcCitra = document.getElementById("npc-citra");
  if (npcCitra) {
    npcCitra.addEventListener("click", () => {
      startEncounter("citra");
    });
  }

  // Exit Door Event
  const cabangExitDoor = document.getElementById("cabang-exit-door");
  if (cabangExitDoor) {
    cabangExitDoor.addEventListener("click", () => {
      handleCabangExit();
    });
  }

  // Cabang Screen Help Button
  const btnCabangHelp = document.getElementById("btn-cabang-help");
  if (btnCabangHelp) {
    btnCabangHelp.addEventListener("click", () => {
      document.getElementById("instructions-modal").classList.add("active");
      playSound("tap");
    });
  }

  // Cabang Screen Settings Button
  const btnCabangSettings = document.getElementById("btn-cabang-settings");
  if (btnCabangSettings) {
    btnCabangSettings.addEventListener("click", () => {
      openSettingsModal(false);
    });
  }

  // Fullscreen Toggle Listeners
  document.getElementById("fullscreen-toggle").addEventListener("click", () => {
    toggleFullscreen();
    playSound("tap");
  });
  document.getElementById("pause-fullscreen-toggle").addEventListener("click", () => {
    toggleFullscreen();
    playSound("tap");
  });

  // Map Dragging/Panning Detectors
  let mapIsDragging = false;
  let mapStartX = 0;
  let mapStartY = 0;
  let mapScrollLeft = 0;
  let mapScrollTop = 0;
  const dragThreshold = 6;
  let dragDetected = false;

  const viewport = document.getElementById("map-viewport");

  if (viewport) {
    // Mouse dragging
    viewport.addEventListener("mousedown", (e) => {
      mapIsDragging = true;
      dragDetected = false;
      mapStartX = e.pageX - viewport.offsetLeft;
      mapStartY = e.pageY - viewport.offsetTop;
      mapScrollLeft = viewport.scrollLeft;
      mapScrollTop = viewport.scrollTop;
    });

    viewport.addEventListener("mouseleave", () => {
      mapIsDragging = false;
    });

    viewport.addEventListener("mouseup", () => {
      mapIsDragging = false;
    });

    viewport.addEventListener("mousemove", (e) => {
      if (!mapIsDragging) return;
      e.preventDefault();

      const x = e.pageX - viewport.offsetLeft;
      const y = e.pageY - viewport.offsetTop;
      const walkX = x - mapStartX;
      const walkY = y - mapStartY;

      if (Math.abs(walkX) > dragThreshold || Math.abs(walkY) > dragThreshold) {
        dragDetected = true;
      }

      viewport.scrollLeft = mapScrollLeft - walkX;
      viewport.scrollTop = mapScrollTop - walkY;
    });

    // Touch events for mobile dragging detection (relies on browser scroll but checks for clicks)
    viewport.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        mapIsDragging = true;
        dragDetected = false;
        mapStartX = e.touches[0].pageX - viewport.offsetLeft;
        mapStartY = e.touches[0].pageY - viewport.offsetTop;
        mapScrollLeft = viewport.scrollLeft;
        mapScrollTop = viewport.scrollTop;
      }
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      mapIsDragging = false;
    });

    viewport.addEventListener("touchmove", (e) => {
      if (!mapIsDragging || e.touches.length !== 1) return;

      const x = e.touches[0].pageX - viewport.offsetLeft;
      const y = e.touches[0].pageY - viewport.offsetTop;
      const walkX = x - mapStartX;
      const walkY = y - mapStartY;

      if (Math.abs(walkX) > dragThreshold || Math.abs(walkY) > dragThreshold) {
        dragDetected = true;
      }
    }, { passive: true });
  }

  // Main Menu Buttons
  document.getElementById("btn-play").addEventListener("click", () => {
    const playerName = localStorage.getItem("mekaar_player_name");
    if (!playerName) {
      document.getElementById("name-input-modal").classList.add("active");
      playSound("tap");
    } else {
      updateLevelSelectionUI();
      document.getElementById("level-select-overlay").classList.add("active");
      playSound("tap");
    }
  });

  document.getElementById("btn-options").addEventListener("click", () => {
    openSettingsModal(true);
  });


  // Pause Modal Handlers
  document.getElementById("btn-pause-resume").addEventListener("click", () => {
    const nameInput = document.getElementById("settings-player-name-input");
    const nameSettingRow = document.getElementById("settings-player-name-row");

    // Only verify if the name input row is visible (meaning we are on Main Menu settings)
    if (nameSettingRow && nameSettingRow.style.display !== "none" && nameInput) {
      const newName = nameInput.value.trim();

      // Validation: Player cannot leave empty blank on the name input
      if (!newName) {
        nameInput.style.borderColor = "#d32f2f";
        playSound("incorrect");
        return; // prevent leaving settings
      }

      const currentSavedName = localStorage.getItem("mekaar_player_name") || "Aminah";
      const currentSavedGender = localStorage.getItem("mekaar_player_gender") || "female";
      const tempGender = STATE.tempSettingsGender || currentSavedGender;

      if ((newName && newName !== currentSavedName) || tempGender !== currentSavedGender) {
        const confirmText = document.getElementById("name-confirm-text");
        if (confirmText) {
          confirmText.innerText = "Apakah Anda yakin ingin menyimpan perubahan nama/gender?";
        }
        document.getElementById("name-confirm-modal").classList.add("active");
        playSound("tap");
        return; // wait for confirmation
      }
    }

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

  // Level Selection Modal (Level List)
  document.getElementById("btn-close-level-select").addEventListener("click", () => {
    document.getElementById("level-select-overlay").classList.remove("active");
    playSound("tap");
  });

  // Level Selection Menu Buttons (Sosialisasi, Kelayakan, PKM)
  document.getElementById("btn-level-sosialisasi").addEventListener("click", () => {
    STATE.currentLevel = 1;
    updateLevelDetailModal(1);
    document.getElementById("level-select-overlay").classList.remove("active");
    document.getElementById("level-detail-overlay").classList.add("active");
    playSound("tap");
  });

  document.getElementById("btn-level-kelayakan").addEventListener("click", () => {
    const starsLvl1 = parseInt(localStorage.getItem("mekaar_journey_level_1_stars")) || 0;
    if (starsLvl1 === 0) {
      const textEl = document.getElementById("dev-modal-text");
      if (textEl) {
        textEl.innerHTML = "LEVEL TERKUNCI<br><span style='font-size: 13px; font-weight: 400; color: #666;'>Selesaikan Level 1 (Sosialisasi) terlebih dahulu untuk membuka level ini!</span>";
      }
      const titleEl = document.querySelector("#dev-modal .wood-banner h2");
      if (titleEl) titleEl.innerText = "TERKUNCI";
      document.getElementById("dev-modal").classList.add("active");
      playSound("incorrect");
      return;
    }

    STATE.currentLevel = 2;
    updateLevelDetailModal(2);
    document.getElementById("level-select-overlay").classList.remove("active");
    document.getElementById("level-detail-overlay").classList.add("active");
    playSound("tap");
  });

  document.getElementById("btn-level-pkm").addEventListener("click", () => {
    if (document.getElementById("btn-level-pkm").classList.contains("locked")) {
      const titleEl = document.querySelector("#dev-modal .wood-banner h2");
      if (titleEl) titleEl.innerText = "TERKUNCI";
      const textEl = document.getElementById("dev-modal-text");
      if (textEl) {
        textEl.innerHTML = "Selesaikan Level 2 terlebih dahulu untuk membuka level ini!";
      }
      document.getElementById("dev-modal").classList.add("active");
      playSound("incorrect");
      return;
    }

    STATE.currentLevel = 3;
    updateLevelDetailModal(3);
    document.getElementById("level-select-overlay").classList.remove("active");
    document.getElementById("level-detail-overlay").classList.add("active");
    playSound("tap");
  });

  document.getElementById("btn-close-dev").addEventListener("click", () => {
    document.getElementById("dev-modal").classList.remove("active");
    playSound("tap");
  });

  document.getElementById("btn-close-level-detail").addEventListener("click", () => {
    document.getElementById("level-detail-overlay").classList.remove("active");
    document.getElementById("level-select-overlay").classList.add("active");
    playSound("tap");
  });

  document.getElementById("btn-close-permission").addEventListener("click", () => {
    document.getElementById("permission-modal").classList.remove("active");
    playSound("tap");
  });

  document.getElementById("btn-start-level").addEventListener("click", () => {
    document.getElementById("level-detail-overlay").classList.remove("active");
    if (STATE.currentLevel === 1) {
      STATE.useYarnDialogue = true;
    } else {
      STATE.useYarnDialogue = false;
    }
    loadLevelConfig(STATE.currentLevel);
    resetGame();
    resetPrepScreen();

    // Reset cabang-screen related states
    STATE.cabangDialogueIndex = 0;
    STATE.hasTalkedToCitra = false;
    STATE.cabangDialogueActive = false;

    // Lock exit door on load
    const door = document.getElementById("cabang-exit-door");
    if (door) {
      door.classList.add("locked");
    }

    // Hide dialogue panel
    const panel = document.getElementById("cabang-dialogue-panel");
    if (panel) {
      panel.classList.add("hidden");
    }

    const indicator = document.querySelector("#npc-citra .speech-bubble-indicator");
    if (indicator) {
      indicator.style.display = "block";
      indicator.innerText = "!";
    }

    if (STATE.currentLevel === 2) {
      STATE.hasPermission = true;
      triggerLoadingScreen("map", 2500);
    } else if (STATE.currentLevel === 3) {
      triggerLoadingScreen("pkm", 2500);
      setTimeout(startPkmLevel, 2500);
    } else {
      triggerLoadingScreen("cabang", 2500);
    }
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

  // Skip Typewriter on Screen Tap/Click
  document.getElementById("dialogue-screen").addEventListener("click", (e) => {
    if (STATE.isTypewriterRunning) {
      if (e.target.closest("button")) return; // Don't skip if clicking back button or options cog
      finishTypewriter();
    }
  });

  // Victory Screen Buttons
  document.getElementById("btn-replay").addEventListener("click", () => {
    if (STATE.currentLevel === 1) {
      STATE.useYarnDialogue = true;
    } else {
      STATE.useYarnDialogue = false;
    }
    loadLevelConfig(STATE.currentLevel);
    resetGame();
    resetPrepScreen();

    // Reset cabang-screen related states
    STATE.cabangDialogueIndex = 0;
    STATE.hasTalkedToCitra = false;
    STATE.cabangDialogueActive = false;

    // Lock exit door on load
    const door = document.getElementById("cabang-exit-door");
    if (door) {
      door.classList.add("locked");
    }

    // Hide dialogue panel
    const panel = document.getElementById("cabang-dialogue-panel");
    if (panel) {
      panel.classList.add("hidden");
    }

    const indicator = document.querySelector("#npc-citra .speech-bubble-indicator");
    if (indicator) {
      indicator.style.display = "block";
      indicator.innerText = "!";
    }

    if (STATE.currentLevel === 2) {
      STATE.hasPermission = true;
      triggerLoadingScreen("map", 2500);
    } else {
      triggerLoadingScreen("cabang", 2500);
    }
  });

  document.getElementById("btn-home").addEventListener("click", () => {
    resetGame();
    showScreen("menu");
  });

  // Riding Preparation (Safety Riding) Event Listeners
  document.querySelectorAll(".prep-item-card").forEach(card => {
    card.addEventListener("click", () => {
      const item = card.getAttribute("data-item");
      if (STATE.selectedPrepItems.has(item)) {
        STATE.selectedPrepItems.delete(item);
        card.classList.remove("selected");
      } else {
        STATE.selectedPrepItems.add(item);
        card.classList.add("selected");
      }
      playSound("tap");
      resetPrepIdleTimer(); // Reset idle timer on interaction
    });
  });

  // Prep Screen Idle Tap Hint System
  let prepIdleTimerId = null;

  function resetPrepIdleTimer() {
    // Hide the tap hint immediately
    const hint = document.getElementById("prep-tap-hint");
    if (hint) hint.style.display = "none";

    // Clear existing timer
    if (prepIdleTimerId) {
      clearTimeout(prepIdleTimerId);
      prepIdleTimerId = null;
    }

    // Only set a new timer if we're on the prep screen
    if (STATE.screen === "prep") {
      prepIdleTimerId = setTimeout(() => {
        showPrepTapHint();
      }, 3000);
    }
  }

  function showPrepTapHint() {
    if (STATE.screen !== "prep") return;

    const hint = document.getElementById("prep-tap-hint");
    if (!hint) return;

    // Find the first unselected prep-item-card
    const allCards = document.querySelectorAll(".prep-item-card");
    let targetCard = null;
    for (const card of allCards) {
      if (!card.classList.contains("selected")) {
        targetCard = card;
        break;
      }
    }

    if (!targetCard) {
      // All items selected, no hint needed
      hint.style.display = "none";
      return;
    }

    // Position the hint over the target card
    const gridPanel = document.querySelector(".prep-grid-panel");
    const panelRect = gridPanel.getBoundingClientRect();
    const cardRect = targetCard.getBoundingClientRect();

    const offsetX = cardRect.left - panelRect.left + (cardRect.width / 2) - 40;
    const offsetY = cardRect.top - panelRect.top + (cardRect.height / 2) - 40;

    hint.style.left = `${offsetX}px`;
    hint.style.top = `${offsetY}px`;
    hint.style.display = "block";
  }

  // Listen for any interaction on the prep screen to reset idle
  const prepScreen = document.getElementById("prep-screen");
  if (prepScreen) {
    prepScreen.addEventListener("click", () => {
      resetPrepIdleTimer();
    });
    prepScreen.addEventListener("touchstart", () => {
      resetPrepIdleTimer();
    }, { passive: true });
  }

  // Hook into showScreen to start/stop idle timer when entering/leaving prep
  const originalShowScreen = showScreen;
  showScreen = function (screenId) {
    originalShowScreen(screenId);
    if (screenId === "prep") {
      resetPrepIdleTimer();
    } else {
      // Clear timer when leaving prep screen
      if (prepIdleTimerId) {
        clearTimeout(prepIdleTimerId);
        prepIdleTimerId = null;
      }
      const hint = document.getElementById("prep-tap-hint");
      if (hint) hint.style.display = "none";
    }
  };

  // Cutscene Video Listeners
  const video = document.getElementById("cutscene-video");
  if (video) {
    video.addEventListener("ended", handleCutsceneEnd);
  }
  const skipBtn = document.getElementById("btn-skip-cutscene");
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      playSound("tap");
      handleCutsceneEnd();
    });
  }

  document.getElementById("btn-prep-submit").addEventListener("click", () => {
    validateRidingPrep();
  });

  document.getElementById("btn-prep-back").addEventListener("click", () => {
    resetGame();
    showScreen("menu");
  });

  document.getElementById("btn-prep-help").addEventListener("click", () => {
    document.getElementById("instructions-modal").classList.add("active");
    playSound("tap");
  });

  document.getElementById("btn-prep-settings").addEventListener("click", () => {
    openSettingsModal(false);
  });

  document.getElementById("btn-minigame-settings").addEventListener("click", () => {
    openSettingsModal(false);
  });

  document.getElementById("btn-map-help").addEventListener("click", () => {
    document.getElementById("instructions-modal").classList.add("active");
    playSound("tap");
  });

  // Global Settings Gear Toggle
  document.getElementById("sound-toggle").addEventListener("click", () => {
    openSettingsModal(false);
  });

  // Setup Map Encounters click triggers
  document.querySelectorAll(".map-encounter").forEach(el => {
    el.addEventListener("click", (e) => {
      if (dragDetected) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const encId = el.getAttribute("data-id");
      startEncounter(encId);
    });
  });

  // AO blinking animation interval
  const guideImg = document.querySelector(".guide-portrait-img");
  if (guideImg) {
    setInterval(() => {
      if (STATE.screen === "map" && !STATE.hasPermission) {
        guideImg.src = "player/femaleplayerblink.png";
        setTimeout(() => {
          guideImg.src = "player/femaleplayer.png";
        }, 150);
      }
    }, 3800);
  }

  // Initialize Level 2 Minigames Event Listeners
  initVerifDocsHandlers();
  initMirrorDocsHandlers();

  // Gender Selection State (First Time)
  let selectedGender = "female";

  const optFemale = document.getElementById("gender-option-female");
  const optMale = document.getElementById("gender-option-male");
  if (optFemale && optMale) {
    optFemale.addEventListener("click", () => {
      selectedGender = "female";
      optFemale.classList.add("active");
      optFemale.style.borderColor = "var(--pnm-green)";
      optMale.classList.remove("active");
      optMale.style.borderColor = "var(--wood-light)";
      playSound("tap");
    });
    optMale.addEventListener("click", () => {
      selectedGender = "male";
      optMale.classList.add("active");
      optMale.style.borderColor = "var(--pnm-green)";
      optFemale.classList.remove("active");
      optFemale.style.borderColor = "var(--wood-light)";
      playSound("tap");
    });
  }

  // Name Input Submissions & Listeners
  document.getElementById("btn-submit-name").addEventListener("click", () => {
    const nameInput = document.getElementById("first-time-name-input");
    const name = nameInput.value.trim();
    if (!name) {
      nameInput.style.borderColor = "#d32f2f";
      playSound("incorrect");
      return;
    }
    localStorage.setItem("mekaar_player_name", name);
    localStorage.setItem("mekaar_player_gender", selectedGender);
    document.getElementById("name-input-modal").classList.remove("active");
    playSound("tap");

    // Continue to level select
    updateLevelSelectionUI();
    document.getElementById("level-select-overlay").classList.add("active");
  });

  document.getElementById("first-time-name-input").addEventListener("input", (e) => {
    e.target.style.borderColor = "";
  });

  // Settings Gender Selection Listeners
  const setFemale = document.getElementById("settings-gender-female");
  const setMale = document.getElementById("settings-gender-male");
  if (setFemale && setMale) {
    setFemale.addEventListener("click", () => {
      STATE.tempSettingsGender = "female";
      setFemale.classList.add("active");
      setFemale.style.borderColor = "var(--pnm-green)";
      setMale.classList.remove("active");
      setMale.style.borderColor = "var(--wood-light)";
      playSound("tap");
    });
    setMale.addEventListener("click", () => {
      STATE.tempSettingsGender = "male";
      setMale.classList.add("active");
      setMale.style.borderColor = "var(--pnm-green)";
      setFemale.classList.remove("active");
      setFemale.style.borderColor = "var(--wood-light)";
      playSound("tap");
    });
  }

  document.getElementById("btn-confirm-name-yes").addEventListener("click", () => {
    const nameInput = document.getElementById("settings-player-name-input");
    if (nameInput) {
      const newName = nameInput.value.trim();
      if (newName) {
        localStorage.setItem("mekaar_player_name", newName);
      }
    }
    if (STATE.tempSettingsGender) {
      localStorage.setItem("mekaar_player_gender", STATE.tempSettingsGender);
    }
    document.getElementById("name-confirm-modal").classList.remove("active");
    document.getElementById("pause-modal").classList.remove("active");
    playSound("tap");
  });

  document.getElementById("btn-confirm-name-no").addEventListener("click", () => {
    const nameInput = document.getElementById("settings-player-name-input");
    if (nameInput) {
      nameInput.value = localStorage.getItem("mekaar_player_name") || "Aminah";
      nameInput.style.borderColor = "";
    }
    STATE.tempSettingsGender = localStorage.getItem("mekaar_player_gender") || "female";
    document.getElementById("name-confirm-modal").classList.remove("active");
    document.getElementById("pause-modal").classList.remove("active");
    playSound("tap");
  });

  const settingsPlayerNameInput = document.getElementById("settings-player-name-input");
  if (settingsPlayerNameInput) {
    settingsPlayerNameInput.addEventListener("input", (e) => {
      e.target.style.borderColor = "";
    });
  }

  // Initialize star score presentation on first load
  updateLevelDetailStars();

  // Attach tap-to-skip typewriter on dialogue click inside PKM Dialogue board
  const pkmDialoguePanel = document.getElementById("pkm-dialogue-panel");
  if (pkmDialoguePanel) {
    pkmDialoguePanel.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      if (STATE.pkmTypewriterRunning) {
        finishPkmTypewriter();
      }
    });
  }
});

// ==========================================================================
// LEVEL 3: PKM LEVEL IMPLEMENTATION
// ==========================================================================

function startPkmLevel() {
  STATE.screen = "pkm";
  showScreen("pkm");

  // Reset pkm states
  STATE.pkmStage = 0;
  STATE.pkmDialogueIndex = 0;
  STATE.pkmSeatingCorrect = 0;
  STATE.pkmAttendanceCorrect = 0;
  STATE.pkmMoneySorted = 0;
  STATE.pkmTotalCounted = 0;
  STATE.pkmAttendanceConditions = [];
  STATE.pkmMoneyBills = [];

  // Generate randomized attendance conditions for stage 3
  // 2 absent (code 2), 1 present but did not pay (code 3), 9 present & paid (code 1)
  const pool = [2, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  
  // Assign to nasabah
  STATE.pkmAttendanceConditions = PKM_CONFIG.nasabah.map((n, idx) => {
    return {
      id: n.id,
      name: n.name,
      portrait: n.portrait,
      subgroup: n.subgroup,
      condition: pool[idx] // 1, 2, or 3
    };
  });

  // Start stage 0
  initPkmStage(0);
}

function initPkmStage(stageNum) {
  STATE.pkmStage = stageNum;
  STATE.pkmDialogueIndex = 0;

  // Update dots HUD
  document.querySelectorAll(".pkm-dot").forEach((dot, idx) => {
    dot.classList.remove("active", "completed");
    if (idx === stageNum) {
      dot.classList.add("active");
    } else if (idx < stageNum) {
      dot.classList.add("completed");
    }
  });

  // Hide all panels initially
  document.getElementById("pkm-stage-1-zones").classList.add("hidden");
  document.getElementById("pkm-stage-1-pool").classList.add("hidden");
  document.getElementById("pkm-stage-3-indicators").classList.add("hidden");
  document.getElementById("pkm-stage-3-hud").classList.add("hidden");
  document.getElementById("pkm-stage-4-workspace").classList.add("hidden");
  document.getElementById("pkm-stage-4-dashboard").classList.add("hidden");
  document.getElementById("pkm-dialogue-panel").classList.add("hidden");

  // Stage-specific initializers
  if (stageNum === 0) {
    document.getElementById("pkm-header-sub").innerText = "Tahap 0: Pembukaan & Sambutan";
    document.getElementById("pkm-bg-img").src = "pkm/pkmintro.jpeg";
    document.getElementById("pkm-dialogue-panel").classList.remove("hidden");
    runPkmDialogueStep();
  } 
  else if (stageNum === 1) {
    document.getElementById("pkm-header-sub").innerText = "Tahap 1: Penyusunan Kelompok";
    document.getElementById("pkm-bg-img").src = "pkm/pkmsceneminigame.png";
    document.getElementById("pkm-stage-1-zones").classList.remove("hidden");
    document.getElementById("pkm-stage-1-pool").classList.remove("hidden");
    setupStage1Seating();
  } 
  else if (stageNum === 2) {
    document.getElementById("pkm-header-sub").innerText = "Tahap 2: Doa Bersama & Ikrar AO";
    document.getElementById("pkm-bg-img").src = "pkm/pkmsceneliatalk.jpeg";
    document.getElementById("pkm-dialogue-panel").classList.remove("hidden");
    runPkmDialogueStep();
  } 
  else if (stageNum === 3) {
    document.getElementById("pkm-header-sub").innerText = "Tahap 3: Uji Absensi";
    document.getElementById("pkm-bg-img").src = "pkm/pkmsceneplayertalk.jpeg";
    document.getElementById("pkm-dialogue-panel").classList.remove("hidden");
    // Run intro dialogue first
    runPkmDialogueStep();
  } 
  else if (stageNum === 4) {
    document.getElementById("pkm-header-sub").innerText = "Tahap 4: Pembayaran Angsuran";
    document.getElementById("pkm-bg-img").src = "pkm/pkmsceneplayertalk.jpeg";
    document.getElementById("pkm-dialogue-panel").classList.remove("hidden");
    // Run intro dialogue first
    runPkmDialogueStep();
  } 
  else if (stageNum === 5) {
    document.getElementById("pkm-header-sub").innerText = "Tahap 5: Doa Penutup & Janji Nasabah";
    document.getElementById("pkm-bg-img").src = "pkm/pkmscene1.png";
    document.getElementById("pkm-dialogue-panel").classList.remove("hidden");
    runPkmDialogueStep();
  }
}

// Custom PKM Dialogue Runner
function runPkmDialogueStep() {
  const stage = STATE.pkmStage;
  let dialogueData = null;

  if (stage === 0) {
    dialogueData = PKM_DIALOGUES[0];
  } else if (stage === 2) {
    dialogueData = PKM_DIALOGUES[2];
  } else if (stage === 3) {
    // Stage 3 intro dialogue
    dialogueData = PKM_DIALOGUES["3_intro"];
  } else if (stage === 4) {
    // Stage 4 intro dialogue
    dialogueData = PKM_DIALOGUES["4_intro"];
  } else if (stage === 5) {
    dialogueData = PKM_DIALOGUES[5];
  }

  if (!dialogueData) return;

  const idx = STATE.pkmDialogueIndex;
  
  // Custom check for Stage 5 signature trigger after line 1
  if (stage === 5 && idx === 2 && !STATE.pkmSignedRecord) {
    document.getElementById("pkm-dialogue-panel").classList.add("hidden");
    openPkmSignatureModal();
    return;
  }

  if (idx < dialogueData.length) {
    const line = dialogueData[idx];
    
    // Set speaker name and replace name token
    const speakerEl = document.getElementById("pkm-speaker-name");
    if (speakerEl) {
      speakerEl.innerText = replacePlayerName(line.speaker);
    }
    
    // Update portrait/scene background
    if (line.portrait) {
      document.getElementById("pkm-bg-img").src = line.portrait;
    }

    // Run typewriter
    runPkmTypewriter(line.text);

    // Setup Next Click listener
    const nextBtn = document.getElementById("btn-pkm-dialogue-next");
    nextBtn.onclick = () => {
      playSound("tap");
      STATE.pkmDialogueIndex++;
      runPkmDialogueStep();
    };
  } else {
    // Dialogue completed, proceed to next step
    if (stage === 0) {
      initPkmStage(1);
    } else if (stage === 2) {
      initPkmStage(3);
    } else if (stage === 3) {
      // Transition to actual attendance quiz UI
      document.getElementById("pkm-dialogue-panel").classList.add("hidden");
      document.getElementById("pkm-stage-3-indicators").classList.remove("hidden");
      document.getElementById("pkm-stage-3-hud").classList.remove("hidden");
      setupStage3Attendance();
    } else if (stage === 4) {
      // Transition to money sorting minigame
      document.getElementById("pkm-dialogue-panel").classList.add("hidden");
      document.getElementById("pkm-stage-4-workspace").classList.remove("hidden");
      document.getElementById("pkm-stage-4-dashboard").classList.remove("hidden");
      setupStage4MoneyCounting();
    } else if (stage === 5) {
      // PKM Level Completed! Show Victory screen
      triggerPkmVictory();
    }
  }
}

function runPkmTypewriter(text) {
  const textEl = document.getElementById("pkm-dialogue-text");
  if (!textEl) return;
  textEl.textContent = "";
  let charIndex = 0;

  text = replacePlayerName(text);

  const nextBtn = document.getElementById("btn-pkm-dialogue-next");
  if (nextBtn) nextBtn.style.visibility = "hidden";

  if (STATE.pkmTypewriterInterval) {
    clearInterval(STATE.pkmTypewriterInterval);
  }

  STATE.pkmTypewriterRunning = true;
  STATE.pkmTypewriterFullText = text;

  const charSpeed = 20;

  STATE.pkmTypewriterInterval = setInterval(() => {
    if (charIndex < text.length) {
      charIndex++;
      textEl.textContent = text.substring(0, charIndex);
    } else {
      finishPkmTypewriter();
    }
  }, charSpeed);
}

function finishPkmTypewriter() {
  if (STATE.pkmTypewriterInterval) {
    clearInterval(STATE.pkmTypewriterInterval);
    STATE.pkmTypewriterInterval = null;
  }
  const textEl = document.getElementById("pkm-dialogue-text");
  if (textEl) {
    textEl.textContent = STATE.pkmTypewriterFullText;
  }
  STATE.pkmTypewriterRunning = false;

  const nextBtn = document.getElementById("btn-pkm-dialogue-next");
  if (nextBtn) nextBtn.style.visibility = "visible";
}

// Stage 1: Seating Arrangement
let pkmSelectedSeatingCard = null;

function setupStage1Seating() {
  STATE.pkmSeatingCorrect = 0;
  pkmSelectedSeatingCard = null;

  // Clear slots in dropzones
  document.querySelectorAll(".pkm-dropzone .dropzone-slots").forEach(slot => {
    slot.innerHTML = "";
  });

  // Populate reference table rows
  const refBody = document.getElementById("pkm-ref-table-body");
  refBody.innerHTML = "";
  PKM_CONFIG.nasabah.forEach(n => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${n.name}</strong></td>
      <td style="font-weight: bold; color: var(--pnm-blue);">Sub-Kelompok ${n.subgroup}</td>
    `;
    refBody.appendChild(row);
  });

  // Shuffle customers for the draggable pool
  const poolList = [...PKM_CONFIG.nasabah];
  for (let i = poolList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [poolList[i], poolList[j]] = [poolList[j], poolList[i]];
  }

  // Populate pool grid
  const grid = document.getElementById("pkm-seating-pool-grid");
  grid.innerHTML = "";

  poolList.forEach(n => {
    const card = document.createElement("div");
    card.className = "pkm-char-card";
    card.setAttribute("draggable", "true");
    card.setAttribute("data-id", n.id);
    card.setAttribute("data-subgroup", n.subgroup);

    card.innerHTML = `
      <img src="${n.portrait}" alt="${n.name}" class="pkm-char-img">
      <span class="pkm-char-name">${n.name.split(" ")[0]}</span>
    `;

    // Standard Drag start
    card.addEventListener("dragstart", (e) => {
      card.classList.add("dragging");
      e.dataTransfer.setData("text/plain", n.id);
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });

    // Tap selection (Mobile fallback)
    card.addEventListener("click", () => {
      playSound("tap");
      document.querySelectorAll(".pkm-char-card").forEach(c => c.classList.remove("selected"));
      if (pkmSelectedSeatingCard === card) {
        pkmSelectedSeatingCard = null;
      } else {
        pkmSelectedSeatingCard = card;
        card.classList.add("selected");
      }
    });

    grid.appendChild(card);
  });

  // Setup Dropzones drag/drop listeners
  document.querySelectorAll(".pkm-dropzone").forEach(zone => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("dragover");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("dragover");
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("dragover");
      const id = e.dataTransfer.getData("text/plain");
      const card = document.querySelector(`.pkm-char-card[data-id="${id}"]`);
      if (card) {
        handleSeatingPlacement(card, zone);
      }
    });

    // Dropzone Tap Click (Mobile fallback)
    zone.addEventListener("click", () => {
      if (pkmSelectedSeatingCard) {
        handleSeatingPlacement(pkmSelectedSeatingCard, zone);
        pkmSelectedSeatingCard = null;
        document.querySelectorAll(".pkm-char-card").forEach(c => c.classList.remove("selected"));
      }
    });
  });

  // Modal reference buttons
  document.getElementById("btn-pkm-show-ref").onclick = () => {
    playSound("tap");
    document.getElementById("pkm-ref-popup").classList.add("active");
  };
  document.getElementById("btn-pkm-close-ref").onclick = () => {
    playSound("tap");
    document.getElementById("pkm-ref-popup").classList.remove("active");
  };
}

function handleSeatingPlacement(card, zone) {
  const targetSubgroup = zone.getAttribute("data-subgroup");
  const cardSubgroup = card.getAttribute("data-subgroup");

  if (targetSubgroup === cardSubgroup) {
    // Correct! Snap in
    zone.querySelector(".dropzone-slots").appendChild(card);
    card.removeAttribute("draggable");
    card.style.pointerEvents = "none";
    card.classList.add("drag-correct-pulse");
    playSound("correct");
    STATE.pkmSeatingCorrect++;

    // Check completion
    if (STATE.pkmSeatingCorrect === 12) {
      setTimeout(() => {
        // Simple success banner or animation
        const banner = document.getElementById("pkm-header-sub");
        banner.innerHTML = "✨ Penyusunan Selesai! Menuju Tahap 2... ✨";
        playSound("victory");
        setTimeout(() => {
          initPkmStage(2);
        }, 1500);
      }, 500);
    }
  } else {
    // Incorrect placement: bounce back with shake
    playSound("incorrect");
    card.style.border = "2.5px solid #f56c6c";
    card.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(0)" }
    ], {
      duration: 350,
      iterations: 1
    });
    setTimeout(() => {
      card.style.border = "";
    }, 1000);
  }
}

// Stage 3: Attendance Quiz
function setupStage3Attendance() {
  STATE.pkmAttendanceCorrect = 0;

  // Show visual layout of sitting nasabah overlays
  const indicatorsLayer = document.getElementById("pkm-stage-3-indicators");
  indicatorsLayer.innerHTML = "";

  // Render sitting indicators corresponding to group alignment
  // Layout nasabah in a 3-row grid inside screen bounds
  const subgroups = ["A", "B", "C"];
  subgroups.forEach((sg, rowIdx) => {
    const list = STATE.pkmAttendanceConditions.filter(n => n.subgroup === sg);
    list.forEach((n, colIdx) => {
      const indicator = document.createElement("div");
      indicator.className = "pkm-visual-indicator";
      
      // Layout positions: Row (top) 15%, 42%, 70%. Col (left) 12%, 35%, 58%, 81%.
      const topPct = 20 + rowIdx * 25;
      const leftPct = 12 + colIdx * 23;
      indicator.style.top = `${topPct}%`;
      indicator.style.left = `${leftPct}%`;
      indicator.style.backgroundImage = `url('${n.portrait}')`;
      indicator.style.backgroundSize = "cover";
      indicator.style.backgroundPosition = "center";
      indicator.style.border = "2px solid #fff";
      indicator.setAttribute("data-id", n.id);

      // Status badge icons (💵: present+paid, ❌: present no pay, invisible: absent)
      const badge = document.createElement("div");
      badge.style.position = "absolute";
      badge.style.bottom = "-5px";
      badge.style.right = "-5px";
      badge.style.width = "20px";
      badge.style.height = "20px";
      badge.style.borderRadius = "50%";
      badge.style.display = "flex";
      badge.style.alignItems = "center";
      badge.style.justifyContent = "center";
      badge.style.fontSize = "11px";
      badge.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";

      if (n.condition === 1) {
        // Present & Paid: Show raised cash icon
        badge.innerText = "💵";
        badge.style.backgroundColor = "#2ec971";
      } else if (n.condition === 3) {
        // Present, No Pay: Show red tag / no-money icon
        badge.innerText = "🤲";
        badge.style.backgroundColor = varColor("gold");
      } else {
        // Absent: Silhouette overlay
        indicator.style.filter = "brightness(0)";
        badge.innerText = "🪹";
        badge.style.backgroundColor = "#f56c6c";
      }

      indicator.appendChild(badge);
      indicatorsLayer.appendChild(indicator);
    });
  });

  // Populate Mekar Digi list rows
  const appList = document.getElementById("pkm-app-nasabah-list");
  appList.innerHTML = "";

  // Temporary selected codes store
  const tempSelections = {};

  STATE.pkmAttendanceConditions.forEach(n => {
    const row = document.createElement("div");
    row.className = "app-nasabah-row";
    row.setAttribute("data-id", n.id);

    row.innerHTML = `
      <div class="app-nasabah-info">
        <img src="${n.portrait}" class="app-nasabah-avatar">
        <span class="app-nasabah-name">${n.name}</span>
      </div>
      <div class="app-code-select-container">
        <button class="app-code-btn" data-code="1">1</button>
        <button class="app-code-btn" data-code="2">2</button>
        <button class="app-code-btn" data-code="3">3</button>
      </div>
    `;

    // Code button action
    row.querySelectorAll(".app-code-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("tap");
        const code = parseInt(btn.getAttribute("data-code"));
        
        row.querySelectorAll(".app-code-btn").forEach(b => b.classList.remove("selected", "wrong"));
        
        if (code === n.condition) {
          btn.classList.add("selected");
          row.classList.add("correct");
          tempSelections[n.id] = code;
          playSound("correct");
        } else {
          btn.classList.add("wrong");
          row.classList.remove("correct");
          delete tempSelections[n.id];
          playSound("incorrect");
          // Shake row
          row.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(0)" }
          ], { duration: 250 });
        }

        // Enable/Disable submit button
        const count = Object.keys(tempSelections).length;
        const submitBtn = document.getElementById("btn-pkm-submit-app");
        if (count === 12) {
          submitBtn.removeAttribute("disabled");
          submitBtn.style.opacity = "1";
        } else {
          submitBtn.setAttribute("disabled", "true");
          submitBtn.style.opacity = "0.6";
        }
      });
    });

    appList.appendChild(row);
  });

  // App Modal Handlers
  document.getElementById("btn-pkm-open-app").onclick = () => {
    playSound("tap");
    document.getElementById("pkm-app-modal").classList.add("active");
  };

  // Submit button closes app modal and advances level stage
  const submitBtn = document.getElementById("btn-pkm-submit-app");
  submitBtn.setAttribute("disabled", "true");
  submitBtn.style.opacity = "0.6";
  submitBtn.onclick = () => {
    playSound("victory");
    document.getElementById("pkm-app-modal").classList.remove("active");
    // Show success summary
    const presentPaid = STATE.pkmAttendanceConditions.filter(n => n.condition === 1).length;
    const absent = STATE.pkmAttendanceConditions.filter(n => n.condition === 2).length;
    const presentNoPay = STATE.pkmAttendanceConditions.filter(n => n.condition === 3).length;

    const banner = document.getElementById("pkm-header-sub");
    banner.innerHTML = `✨ Absensi Selesai! Hadir & Bayar: ${presentPaid}, Absen: ${absent}, Belum Bayar: ${presentNoPay} ✨`;
    
    setTimeout(() => {
      initPkmStage(4);
    }, 2000);
  };
}

function varColor(name) {
  if (name === "gold") return "#f4c430";
  return "#008343";
}

// Stage 4: Money Counting sorting minigame
let pkmSelectedBillCard = null;

function setupStage4MoneyCounting() {
  STATE.pkmMoneySorted = 0;
  STATE.pkmTotalCounted = 0;
  pkmSelectedBillCard = null;

  // Expected target total: 10 present * 200k angsuran = 2,000,000 + etc.
  // We specified target Rp2.400.000 in config. That corresponds to 12 members angsuran.
  // Wait, let's keep it matching target total of Rp2.400.000 (12 nasabah * Rp200.000).
  const targetTotalVal = PKM_CONFIG.installmentPerPerson * 12;
  document.getElementById("pkm-money-target-val").innerText = formatRupiah(targetTotalVal);
  document.getElementById("pkm-counting-bubble").innerText = "Rp0";

  // Reset target bins
  document.querySelectorAll(".money-bin").forEach(bin => {
    bin.classList.remove("dragover");
    const denom = bin.getAttribute("data-denom");
    const valEl = bin.querySelector(".bin-value");
    if (valEl) valEl.innerText = "Rp0";
    bin.setAttribute("data-sum", "0");
  });

  // Generate money bills array
  // 10 bills of 100k (1,000,000)
  // 20 bills of 50k (1,000,000)
  // 15 bills of 20k (300,000)
  // 10 bills of 10k (100,000)
  // Total = Rp2.400.000 (55 bills total)
  const bills = [];
  for (let i = 0; i < 10; i++) bills.push(100000);
  for (let i = 0; i < 20; i++) bills.push(50000);
  for (let i = 0; i < 15; i++) bills.push(20000);
  for (let i = 0; i < 10; i++) bills.push(10000);

  // Shuffle bills
  for (let i = bills.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bills[i], bills[j]] = [bills[j], bills[i]];
  }

  STATE.pkmMoneyBills = bills;
  spawnNextMoneyBill();

  // Setup bin drag/drop drop targets
  document.querySelectorAll(".money-bin").forEach(bin => {
    bin.addEventListener("dragover", (e) => {
      e.preventDefault();
      bin.classList.add("dragover");
    });

    bin.addEventListener("dragleave", () => {
      bin.classList.remove("dragover");
    });

    bin.addEventListener("drop", (e) => {
      e.preventDefault();
      bin.classList.remove("dragover");
      const id = e.dataTransfer.getData("text/plain");
      const card = document.getElementById(id);
      if (card) {
        handleMoneyPlacement(card, bin);
      }
    });

    // Tap placement fallback
    bin.addEventListener("click", () => {
      if (pkmSelectedBillCard) {
        handleMoneyPlacement(pkmSelectedBillCard, bin);
        pkmSelectedBillCard = null;
      }
    });
  });
}

function spawnNextMoneyBill() {
  const pool = document.getElementById("pkm-money-pool");
  pool.innerHTML = "";

  const idx = STATE.pkmMoneySorted;
  if (idx >= STATE.pkmMoneyBills.length) {
    // All sorted! Complete stage
    setTimeout(() => {
      const banner = document.getElementById("pkm-header-sub");
      banner.innerHTML = "✨ Uang Angsuran Selesai Dihitung! Rp2.400.000 Sesuai! ✨";
      playSound("victory");
      setTimeout(() => {
        initPkmStage(5);
      }, 2000);
    }, 500);
    return;
  }

  const denom = STATE.pkmMoneyBills[idx];
  const card = document.createElement("div");
  card.className = `money-bill denom-${denom / 1000}k`;
  card.id = `money-bill-${idx}`;
  card.setAttribute("draggable", "true");
  card.setAttribute("data-denom", denom);

  card.innerHTML = `
    <span class="money-bill-mini-label">Rupiah</span>
    <span style="font-size:12px;">${formatDenomLabel(denom)}</span>
  `;

  // Drag listeners
  card.addEventListener("dragstart", (e) => {
    card.classList.add("dragging");
    e.dataTransfer.setData("text/plain", card.id);
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  // Tap listener
  card.addEventListener("click", () => {
    playSound("tap");
    document.querySelectorAll(".money-bill").forEach(b => b.classList.remove("selected"));
    if (pkmSelectedBillCard === card) {
      pkmSelectedBillCard = null;
    } else {
      pkmSelectedBillCard = card;
      card.classList.add("selected");
    }
  });

  pool.appendChild(card);
}

function handleMoneyPlacement(card, bin) {
  const targetDenom = parseInt(bin.getAttribute("data-denom"));
  const billDenom = parseInt(card.getAttribute("data-denom"));

  if (targetDenom === billDenom) {
    // Correct! Increment values
    STATE.pkmMoneySorted++;
    STATE.pkmTotalCounted += billDenom;

    // Update bin visual total
    const currentSum = parseInt(bin.getAttribute("data-sum") || "0") + billDenom;
    bin.setAttribute("data-sum", currentSum.toString());
    bin.querySelector(".bin-value").innerText = formatRupiah(currentSum);

    // Visual snap animation
    bin.classList.add("drag-correct-pulse");
    setTimeout(() => bin.classList.remove("drag-correct-pulse"), 500);

    // Update floating counting board in scene
    document.getElementById("pkm-counting-bubble").innerText = formatRupiah(STATE.pkmTotalCounted);
    playSound("correct");

    // Spawn next
    spawnNextMoneyBill();
  } else {
    // Incorrect bin
    playSound("incorrect");
    card.style.border = "2px solid #f56c6c";
    card.animate([
      { transform: "translateX(0)" },
      { transform: "translateX(-5px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(0)" }
    ], { duration: 250 });
    setTimeout(() => {
      card.style.border = "";
    }, 1000);
  }
}

function formatDenomLabel(val) {
  if (val === 100000) return "100.000";
  if (val === 50000) return "50.000";
  if (val === 20000) return "20.000";
  if (val === 10000) return "10.000";
  return val.toString();
}

function formatRupiah(num) {
  return "Rp" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Stage 5: Signing news record
STATE.pkmSignedRecord = false;

function openPkmSignatureModal() {
  document.getElementById("pkm-sign-modal").classList.add("active");
  
  document.getElementById("btn-pkm-sign-confirm").onclick = () => {
    playSound("tap");
    // Show quick visual signature animation
    const signArea = document.querySelector(".signature-line-area");
    signArea.innerHTML = `
      <div style="font-family: 'Playpen Sans', cursive; font-size: 24px; font-weight: bold; color: var(--pnm-blue); transform: rotate(-5deg); letter-spacing: 2px;">
        ${localStorage.getItem("mekaar_player_name") || "Aminah"}
      </div>
    `;
    playSound("victory");

    setTimeout(() => {
      document.getElementById("pkm-sign-modal").classList.remove("active");
      STATE.pkmSignedRecord = true;
      document.getElementById("pkm-dialogue-panel").classList.remove("hidden");
      // Advance to stage 5 remaining lines
      runPkmDialogueStep();
    }, 1500);
  };
}

// PKM Victory Integration
function triggerPkmVictory() {
  // Clear any dialogues
  document.getElementById("pkm-dialogue-panel").classList.add("hidden");

  // Show confettis
  launchConfetti();

  // stars calculation:
  // For PKM we calculate stars based on attempts: 
  // Let's default to 3 stars since it is a completion-based level.
  const scoreKey = "mekaar_journey_level_3_stars";
  localStorage.setItem(scoreKey, "3");
  STATE.highScoreStars = 3;

  // Custom victory title/details
  const victoryTitle = document.querySelector("#victory-screen .victory-subtitle");
  if (victoryTitle) victoryTitle.innerText = "PKM Perdana Sukses!";

  const starRatingImg = document.getElementById("victory-stars-img");
  const ratingTextEl = document.getElementById("victory-rating-text");
  if (starRatingImg) starRatingImg.src = "3star.png";
  if (ratingTextEl) {
    ratingTextEl.innerText = "Sangat Kompeten! (3 Bintang)";
    ratingTextEl.className = "stat-value text-gold";
  }

  // Update Stats in victory card
  const correctCountEl = document.getElementById("victory-correct-answers");
  if (correctCountEl) correctCountEl.innerText = "12 / 12"; // seating
  const labelAnswers = document.querySelector("#victory-screen .stat-row:nth-child(2) .stat-label");
  if (labelAnswers) {
    labelAnswers.innerText = "Nasabah Hadir & Rapi:";
  }

  const recruitsLabel = document.getElementById("victory-stat-label-recruits");
  const recruitsVal = document.getElementById("victory-stat-value-recruits");
  if (recruitsLabel) recruitsLabel.innerText = "Uang Angsuran:";
  if (recruitsVal) recruitsVal.innerText = "Rp2.400.000 / Rp2.400.000";

  showScreen("victory");
}
