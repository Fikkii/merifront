<template>
    <div>
        <h2 class="text-3xl font-bold mb-14 text-gray-900 text-center">Why MeriLearn Works for Real Learning</h2>
        <div class="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 max-w-[300] mx-auto">

            <!-- Image Slider -->
            <div class="relative w-full md:w-1/3 aspect-video overflow-hidden rounded-xl shadow-lg">
                <img :src="images[currentIndex]" class="w-full h-full object-cover" />

                <!-- Prev Button -->
                <button
                        @click="prev"
                        class="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-black p-3 rounded-full shadow hover:bg-white transition"
                        >
                        ⟨
                </button>

                    <!-- Next Button -->
                    <button
                            @click="next"
                            class="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm text-black p-3 rounded-full shadow hover:bg-white transition"
                            >
                            ⟩
                    </button>
            </div>

            <slot />

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentIndex: 0,
                images: [
                    '/kk.png',
                    'https://via.placeholder.com/600x300?text=Slide+2',
                    'https://via.placeholder.com/600x300?text=Slide+3'
                ]
            };
        },
        methods: {
            next() {
                this.currentIndex = (this.currentIndex + 1) % this.images.length;
            },
            prev() {
                this.currentIndex =
                    (this.currentIndex - 1 + this.images.length) % this.images.length;
            }
        }
    };
</script>

