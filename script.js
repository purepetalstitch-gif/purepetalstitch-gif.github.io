document.addEventListener('DOMContentLoaded', () => {

    // ---------------- Slideshow part (sirf home page pe chalne wala) ----------------
    try {
        if (document.querySelector('.mySlides') || document.querySelector('.slideshow-container')) {

            let slideIndex = 1;
            let prevIndex = 1;

            showSlides(slideIndex);

            function plusSlides(n) {
                prevIndex = slideIndex;
                slideIndex += n;
                showSlides(slideIndex);
            }

            function currentSlide(n) {
                prevIndex = slideIndex;
                slideIndex = n;
                showSlides(slideIndex);
            }

            function showSlides(n) {
                let i;
                let slides = document.getElementsByClassName("mySlides");
                let dots = document.getElementsByClassName("dot");

                if (n > slides.length) { slideIndex = 1; }
                if (n < 1) { slideIndex = slides.length; }

                for (i = 0; i < slides.length; i++) {
                    slides[i].classList.remove("active", "prev");
                }

                slides[slideIndex - 1].classList.add("active");

                if (prevIndex !== slideIndex) {
                    slides[prevIndex - 1].classList.add("prev");
                }

                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                dots[slideIndex - 1].className += " active";
            }

            setInterval(() => plusSlides(1), 5000);
        }
    } catch (err) {
        console.warn("Slideshow skipped (not on this page):", err);
    }


    // ---------------- Hamburger toggle (har page pe chalega) ----------------
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');

    if (hamburger && nav) {
        console.log("Hamburger elements mil gaye!");  // test ke liye – baad mein hata sakte ho

        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Links click pe menu band
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    } else {
        console.warn("Hamburger ya nav nahi mila is page pe");
    }


    // ---------------- Contact Form SweetAlert (sirf contact page pe chalega) ----------------
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Browser ka default submit rok do

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: "Thank You!",
                        text: "Your message has been sent successfully. We'll reply within 24 hours.",
                        icon: "success",
                        confirmButtonColor: "#ff9fb5",
                        confirmButtonText: "OK"
                    });

                    contactForm.reset(); // Form fields clear kar do
                } else {
                    Swal.fire({
                        title: "Oops!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                        confirmButtonColor: "#ff9fb5"
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: "Network error. Please check your connection.",
                    icon: "error",
                    confirmButtonColor: "#ff9fb5"
                });
            });
        });
    }

});