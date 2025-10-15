document.addEventListener('DOMContentLoaded', function() {

    // --- DATA PRODUK (Kini dengan properti 'kategori') ---
    const products = [
        {
            nama: "Kopi Gayo",
            kategori: "kuliner",
            daerah: "Aceh",
            harga: "Rp 75.000",
            deskripsi: "Kopi arabika berkualitas tinggi dengan aroma khas dan cita rasa yang kompleks.",
            gambar: "https://via.placeholder.com/300x200/A7C7E7/FFFFFF?text=Kopi+Gayo",
            produsen: "Gayo Mountain Coffee"
        },
        {
            nama: "Batik Pekalongan",
            kategori: "fashion",
            daerah: "Pekalongan",
            harga: "Rp 250.000",
            deskripsi: "Kain batik tulis dengan motif pesisir yang cerah dan detail yang halus.",
            gambar: "https://via.placeholder.com/300x200/E7A7C7/FFFFFF?text=Batik+Pekalongan",
            produsen: "Pesisir Art Batik"
        },
        {
            nama: "Keripik Apel",
            kategori: "kuliner",
            daerah: "Malang",
            harga: "Rp 30.000",
            deskripsi: "Camilan renyah dan sehat yang terbuat dari apel segar pilihan dari perkebunan Malang.",
            gambar: "https://via.placeholder.com/300x200/C7E7A7/FFFFFF?text=Keripik+Apel",
            produsen: "Malang Snack"
        },
        {
            nama: "Madu Hutan",
            kategori: "kuliner",
            daerah: "Sumbawa",
            harga: "Rp 150.000",
            deskripsi: "Madu murni yang dipanen secara lestari dari hutan Sumbawa, kaya akan nutrisi.",
            gambar: "https://via.placeholder.com/300x200/E7C7A7/FFFFFF?text=Madu+Sumbawa",
            produsen: "Sumbawa Honey"
        },
        {
            nama: "Tenun Ikat",
            kategori: "fashion",
            daerah: "Sumba",
            harga: "Rp 850.000",
            deskripsi: "Kain tenun tangan tradisional dengan motif dan pewarnaan alami yang khas.",
            gambar: "https://via.placeholder.com/300x200/A7A7E7/FFFFFF?text=Tenun+Sumba",
            produsen: "Sumba Weavers"
        },
        {
            nama: "Kursi Rotan",
            kategori: "perabotan",
            daerah: "Cirebon",
            harga: "Rp 750.000",
            deskripsi: "Kursi santai yang terbuat dari anyaman rotan alami, kuat dan estetik.",
            gambar: "https://via.placeholder.com/300x200/DEB887/FFFFFF?text=Kursi+Rotan",
            produsen: "Cirebon Rattan"
        },
        {
            nama: "Kerajinan Perak",
            kategori: "kerajinan",
            daerah: "Yogyakarta",
            harga: "Rp 400.000",
            deskripsi: "Perhiasan perak murni buatan tangan dengan desain elegan khas Kotagede.",
            gambar: "https://via.placeholder.com/300x200/C0C0C0/FFFFFF?text=Perak+Jogja",
            produsen: "Silver Art Kotagede"
        },
        {
            nama: "Gula Aren",
            kategori: "kuliner",
            daerah: "Banten",
            harga: "Rp 50.000",
            deskripsi: "Gula aren organik murni dengan indeks glikemik rendah dan aroma yang khas.",
            gambar: "https://via.placeholder.com/300x200/D2B48C/FFFFFF?text=Gula+Aren",
            produsen: "Banten Palm Sugar"
        },
         {
            nama: "Kain Ulos",
            kategori: "fashion",
            daerah: "Sumatera Utara",
            harga: "Rp 600.000",
            deskripsi: "Kain tradisional Batak yang memiliki makna simbolis dalam setiap motifnya.",
            gambar: "https://via.placeholder.com/300x200/FF6347/FFFFFF?text=Kain+Ulos",
            produsen: "Toba Creations"
        },
        {
            nama: "Topeng Kayu",
            kategori: "kerajinan",
            daerah: "Bali",
            harga: "Rp 180.000",
            deskripsi: "Topeng ukiran kayu dengan detail artistik yang merepresentasikan budaya Bali.",
            gambar: "https://via.placeholder.com/300x200/8B4513/FFFFFF?text=Topeng+Bali",
            produsen: "Bali Carvers"
        },
        {
            nama: "Keramik Kasongan",
            kategori: "perabotan",
            daerah: "Bantul",
            harga: "Rp 120.000",
            deskripsi: "Gerabah dan keramik hias dengan desain unik yang dibuat secara tradisional.",
            gambar: "https://via.placeholder.com/300x200/A0522D/FFFFFF?text=Keramik+Kasongan",
            produsen: "Kasongan Ceramic"
        },
        {
            nama: "Teh Kayu Aro",
            kategori: "kuliner",
            daerah: "Jambi",
            harga: "Rp 65.000",
            deskripsi: "Teh hitam dari perkebunan teh tertinggi di Indonesia, aroma kuat dan rasa pekat.",
            gambar: "https://via.placeholder.com/300x200/2E8B57/FFFFFF?text=Teh+Kayu+Aro",
            produsen: "Kayu Aro Tea"
        }
    ];

    // --- Variabel Global ---
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');
    const navbar = document.getElementById('navbar');
    const toTopBtn = document.getElementById('toTopBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterContainer = document.getElementById('filterContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    const productsPerPage = 6;
    let currentFilteredProducts = [];
    let itemsCurrentlyShown = 0;

    // --- FUNGSI UTAMA UNTUK FILTER & PENCARIAN ---
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = filterContainer.querySelector('.filter-btn.active').dataset.category;

        let filteredProducts = products;

        // 1. Filter berdasarkan kategori
        if (activeCategory !== 'semua') {
            filteredProducts = filteredProducts.filter(product => product.kategori === activeCategory);
        }

        // 2. Filter berdasarkan pencarian dari hasil kategori
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.nama.toLowerCase().includes(searchTerm) ||
                product.daerah.toLowerCase().includes(searchTerm) ||
                product.produsen.toLowerCase().includes(searchTerm)
            );
        }

        // Tampilkan produk yang sudah difilter
        setupProductDisplay(filteredProducts);
    }

    // --- FUNGSI UNTUK MEMUAT LEBIH BANYAK PRODUK ---
    function loadMoreProducts() {
        const nextProducts = currentFilteredProducts.slice(itemsCurrentlyShown, itemsCurrentlyShown + productsPerPage);
        
        nextProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.gambar}" alt="${product.nama}">
                <div class="product-info">
                    <h3>${product.nama}</h3>
                    <p class="product-origin">${product.daerah}</p>
                    <p class="product-price">${product.harga}</p>
                    <p class="product-description">${product.deskripsi}</p>
                    <p class="product-producer"><strong>Produsen:</strong> ${product.produsen}</p>
                </div>
            `;
            productList.appendChild(productCard);
        });
        
        itemsCurrentlyShown += nextProducts.length;

        if (itemsCurrentlyShown >= currentFilteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // --- FUNGSI UNTUK MERESET TAMPILAN PRODUK ---
    function setupProductDisplay(productsToDisplay) {
        currentFilteredProducts = productsToDisplay;
        productList.innerHTML = '';
        itemsCurrentlyShown = 0;
        loadMoreProducts();
    }

    // --- EVENT LISTENERS ---
    searchInput.addEventListener('input', applyFilters);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });

    loadMoreBtn.addEventListener('click', loadMoreProducts);

    // --- KODE LAINNYA (TIDAK BERUBAH) ---
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    };
    
    toTopBtn.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: { delay: 5000, },
        pagination: { el: '.swiper-pagination', clickable: true, },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', },
    });

    // --- TAMPILKAN PRODUK SAAT HALAMAN PERTAMA DIBUKA ---
    applyFilters(); // Menggunakan fungsi filter utama untuk memuat awal

});