import React from 'react';
import PageWrapper from './pagewrapper';

const testimonials = [
  {
    name: 'Cameron Williamson',
    title: 'Ceo & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: `The most advanced revenue than this. I will refer everyone I like Level more and more each day because it makes my easier. It really saves me time and effort. Level is exactly business has been lacking.`,
  },
  {
    name: 'Cameron Williamson',
    title: 'Ceo & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    quote: `The most advanced revenue than this. I will refer everyone I like Level more and more each day because it makes my easier. It really saves me time and effort. Level is exactly business has been lacking.`,
  },
  {
    name: 'Cameron Williamson',
    title: 'Ceo & Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: `The most advanced revenue than this. I will refer everyone I like Level more and more each day because it makes my easier. It really saves me time and effort. Level is exactly business has been lacking.`,
  },
  {
    name: 'Cameron Williamson',
    title: 'Ceo & Founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    quote: `The most advanced revenue than this. I will refer everyone I like Level more and more each day because it makes my easier. It really saves me time and effort. Level is exactly business has been lacking.`,
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get testimonials to display (2 on desktop, 1 on mobile)
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  return (
    <PageWrapper>
   <section className="bg-gray-50 py-3 py-md-5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-12 lg:mb-16">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 text-blue fw-semibold robot-text-style fs-60px" data-aos="fade-up">
        Find Client's Feedback
      </h1>
    </div>

    {/* Testimonials Container */}
    <div className="relative max-w-6xl mx-auto">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-105 border-radius-25px"
        aria-label="Previous testimonial" data-aos="fade-right"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 transform hover:scale-105 border-radius-25px"
        aria-label="Next testimonial"data-aos="fade-left"
      >
        <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 px-8 lg:px-16" data-aos="fade-up">
        {/* Mobile View */}
        <div className="lg:hidden">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 lg:p-8 relative min-h-[280px] lg:min-h-[320px]">
            {/* Custom SVG Quote Icon */}
            <div className="absolute top-4 lg:top-6 right-6 lg:right-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#ffd53a">
                <path d="M7 7h3v6H5V9l2-2zm7 0h3v6h-5V9l2-2z" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Profile Section */}
              <div className="flex items-center mb-6 p-30px">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-100 flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg lg:text-xl fw-bold text-gray-900 mb-1 ms-4 font-poppins">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-blue text-sm lg:text-base font-medium mb-0 ms-4 fw-semibold font-poppins">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed p-4-custom font-poppins" >
                {testimonials[currentIndex].quote}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:contents">
          {getVisibleTestimonials().map((testimonial, index) => (
            <div key={`${currentIndex}-${index}`} className="bg-white rounded-2xl lg:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 lg:p-8 relative min-h-[280px] lg:min-h-[320px]">
              {/* Custom SVG Quote Icon */}
              <div className="absolute top-4 lg:top-6 right-6 lg:right-8">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="100" viewBox="0 0 24 24" fill="#ffd53a">
                  <path d="M7 7h3v6H5V9l2-2zm7 0h3v6h-5V9l2-2z" />
                </svg>
              </div>

              <div className="relative z-10">
                {/* Profile Section */}
                <div className="flex items-center mb-6 p-30px">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden mr-4 border-2 border-gray-100 flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg lg:text-xl fw-bold text-gray-900 mb-1 ms-4 font-poppins">
                      {testimonial.name}
                    </h4>
                    <p className="text-blue text-sm lg:text-base font-medium mb-0 ms-4 fw-semibold font-poppins">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed p-4-custom font-poppins">
                  {testimonial.quote}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Pagination Dots */}
    <div className="flex justify-center mt-8 lg:mt-12 space-x-2 mt-30px" data-aos="fade-up">
      {testimonials.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-200 border-radius-20px ms-5px ${
            index === currentIndex 
              ? 'bg-red-500 scale-125' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>
</PageWrapper>

  );
}