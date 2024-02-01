
        function openModal(media) {
            const modal = document.getElementById('myModal');
            const swiperWrapper = document.getElementById('swiperWrapper');

            // Clear previous swiper slides
            swiperWrapper.innerHTML = '';

            // Add new swiper slides
            media.forEach(src => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';

                // Check if the media is an image or video
                if (src.endsWith('.mp4')) {
                    const video = document.createElement('video');
                    video.src = src;
                    video.controls = true;
                    slide.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = src;
                    slide.appendChild(img);
                }

                swiperWrapper.appendChild(slide);
            });

            // Initialize Swiper
            const swiper = new Swiper('.swiper-container', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

            modal.style.display = 'block';
        }

        // Close the modal
        function closeModal() {
            document.getElementById('myModal').style.display = 'none';
        }

        // Function to handle the "Add to Cart" button click
        function addToCart() {
            // Redirect to the specified URL
            window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd4iXWB2Tzt6pGlvdihra7FicGYKx-kyO1_5n-Fm0x93tOPgw/viewform?usp=sf_link';
        }

        // Array to store customer reviews
        let reviews = [];

        // Function to submit a review
        function submitReview() {
            const name = document.getElementById('name').value;
            const comment = document.getElementById('comment').value;

            // Check if both name and comment are provided
            if (name && comment) {
                // Add the review to the array
                const newReview = { name, comment };
                reviews.push(newReview);

                // Save reviews to localStorage
                saveReviewsToLocal();

                // Display the reviews
                displayReviews();

                // Clear the form
                document.getElementById('commentForm').reset();
            }
        }

        // Function to display reviews
        function displayReviews() {
            const commentsContainer = document.getElementById('comments');
            commentsContainer.innerHTML = '';

            // Loop through reviews and display them
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';

                // Split the comment into lines with a maximum of 15 words per line
                const words = review.comment.split(' ');
                let line = '';
                for (let i = 0; i < words.length; i++) {
                    line += words[i] + ' ';
                    if ((i + 1) % 15 === 0 || i === words.length - 1) {
                        const lineElement = document.createElement('p');
                        lineElement.innerHTML = line.trim();
                        reviewElement.appendChild(lineElement);
                        line = '';
                    }
                }

                // Display the reviewer's name
                    const headerElement = document.createElement('h3');
                    headerElement.className = 'review-header';
                    headerElement.innerText = review.name;
                    reviewElement.insertBefore(headerElement, reviewElement.firstChild);

                    commentsContainer.appendChild(reviewElement);
                });
        }

        // Function to save reviews to localStorage
        function saveReviewsToLocal() {
            localStorage.setItem('reviews', JSON.stringify(reviews));
        }

        // Function to retrieve reviews from localStorage
        function getReviewsFromLocal() {
            const storedReviews = localStorage.getItem('reviews');
            if (storedReviews) {
                reviews = JSON.parse(storedReviews);
            }
        }

        // Load reviews from localStorage on page load
        window.addEventListener('load', function () {
            getReviewsFromLocal();
            displayReviews();
        });

        // Function to clear all reviews
        function clearReviews() {
            // Reset the reviews array
            reviews = [];

            // Save the empty reviews array to localStorage
            saveReviewsToLocal();

            // Display the updated reviews (empty)
            displayReviews();
        }

        // Function to handle the "Add to Cart" button click
        function addToCart() {
            const product = document.querySelector('.product:hover');
            const inStock = product.dataset.instock === 'true';

            if (inStock) {
                window.location.href = 'https://forms.gle/wKKa7dj4GM7cEmkNA';
            } else {
                alert('This product is currently out of stock.');
            }
        }