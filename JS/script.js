document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            nama: "Kopi Gayo",
            kategori: "kuliner",
            daerah: "Aceh",
            harga: "Rp 75.000",
            deskripsi: "Kopi arabika berkualitas tinggi dengan aroma khas dan cita rasa yang kompleks.",
            gambar: "Images/kopi-gayo.jpg",
            produsen: "Gayo Mountain Coffee"
        },
        {
            nama: "Batik Pekalongan",
            kategori: "fashion",
            daerah: "Pekalongan",
            harga: "Rp 250.000",
            deskripsi: "Kain batik tulis dengan motif pesisir yang cerah dan detail yang halus.",
            gambar: "Images/batik-pekalongan.jpg",
            produsen: "Pesisir Art Batik"
        },
        {
            nama: "Keripik Apel",
            kategori: "kuliner",
            daerah: "Malang",
            harga: "Rp 30.000",
            deskripsi: "Camilan renyah dan sehat yang terbuat dari apel segar pilihan dari perkebunan Malang.",
            gambar: "Images/keripik-apel.jpg",
            produsen: "Malang Snack"
        },
        {
            nama: "Madu Hutan",
            kategori: "kuliner",
            daerah: "Sumbawa",
            harga: "Rp 150.000",
            deskripsi: "Madu murni yang dipanen secara lestari dari hutan Sumbawa, kaya akan nutrisi.",
            gambar: "Images/madu-hutan.jpg",
            produsen: "Sumbawa Honey"
        },
        {
            nama: "Tenun Ikat",
            kategori: "fashion",
            daerah: "Sumba",
            harga: "Rp 850.000",
            deskripsi: "Kain tenun tangan tradisional dengan motif dan pewarnaan alami yang khas.",
            gambar: "Images/tenun-ikat.jpeg",
            produsen: "Sumba Weavers"
        },
        {
            nama: "Kursi Rotan",
            kategori: "perabotan",
            daerah: "Cirebon",
            harga: "Rp 750.000",
            deskripsi: "Kursi santai yang terbuat dari anyaman rotan alami, kuat dan estetik.",
            gambar: "Images/kursi-rotan.jpg",
            produsen: "Cirebon Rattan"
        },
        {
            nama: "Kerajinan Perak",
            kategori: "kerajinan",
            daerah: "Yogyakarta",
            harga: "Rp 400.000",
            deskripsi: "Perhiasan perak murni buatan tangan dengan desain elegan khas Kotagede.",
            gambar: "Images/kerajinan-perak.webp",
            produsen: "Silver Art Kotagede"
        },
        {
            nama: "Gula Aren",
            kategori: "kuliner",
            daerah: "Banten",
            harga: "Rp 50.000",
            deskripsi: "Gula aren organik murni dengan indeks glikemik rendah dan aroma yang khas.",
            gambar: "Images/gula-aren.webp",
            produsen: "Banten Palm Sugar"
        },
         {
            nama: "Kain Ulos",
            kategori: "fashion",
            daerah: "Sumatera Utara",
            harga: "Rp 600.000",
            deskripsi: "Kain tradisional Batak yang memiliki makna simbolis dalam setiap motifnya.",
            gambar: "Images/kain-ulos.jpeg",
            produsen: "Toba Creations"
        },
        {
            nama: "Topeng Kayu",
            kategori: "kerajinan",
            daerah: "Bali",
            harga: "Rp 180.000",
            deskripsi: "Topeng ukiran kayu dengan detail artistik yang merepresentasikan budaya Bali.",
            gambar: "Images/topeng-kayu.webp",
            produsen: "Bali Carvers"
        },
        {
            nama: "Keramik Kasongan",
            kategori: "perabotan",
            daerah: "Bantul",
            harga: "Rp 120.000",
            deskripsi: "Gerabah dan keramik hias dengan desain unik yang dibuat secara tradisional.",
            gambar: "Images/keramik-kasongan.jpg",
            produsen: "Kasongan Ceramic"
        },
        {
            nama: "Teh Kayu Aro",
            kategori: "kuliner",
            daerah: "Jambi",
            harga: "Rp 65.000",
            deskripsi: "Teh hitam dari perkebunan teh tertinggi di Indonesia, aroma kuat dan rasa pekat.",
            gambar: "Images/tehkayuaro.jpg",
            produsen: "Kayu Aro Tea"
        }
    ];

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

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = filterContainer.querySelector('.filter-btn.active').dataset.category;

        let filteredProducts = products;

        if (activeCategory !== 'semua') {
            filteredProducts = filteredProducts.filter(product => product.kategori === activeCategory);
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.nama.toLowerCase().includes(searchTerm) ||
                product.daerah.toLowerCase().includes(searchTerm) ||
                product.produsen.toLowerCase().includes(searchTerm)
            );
        }

        setupProductDisplay(filteredProducts);
    }

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

    function setupProductDisplay(productsToDisplay) {
        currentFilteredProducts = productsToDisplay;
        productList.innerHTML = '';
        itemsCurrentlyShown = 0;
        loadMoreProducts();
    }

    searchInput.addEventListener('input', applyFilters);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });

    loadMoreBtn.addEventListener('click', loadMoreProducts);

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

    applyFilters();

});