import AnimationAboutSection from "./AnimationAboutSection";

export default function AboutSection() {
  return (
    <AnimationAboutSection>
      <div className="backdrop-blur-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-[2rem] shadow-2xl p-10 sm:p-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
          سیستم مدیریت موجودی انبار
        </h2>
        <p className="text-gray-300/90 leading-[1.9] mb-3 text-base sm:text-lg">
          ما یک سیستم جامع و کاربرپسند برای مدیریت موجودی انبار ارائه می‌دهیم که
          به کسب‌وکارها کمک می‌کند فرآیند ثبت، پیگیری و مدیریت کالاهای ورودی را
          به صورت دیجیتال، دقیق و سریع انجام دهند.
        </p>
        <p className="text-gray-300/90 leading-[1.9] text-base sm:text-lg">
          هر محصول یک QR Code اختصاصی دریافت می‌کند که دسترسی به اطلاعات آن را
          در کوتاه‌ترین زمان ممکن فراهم می‌سازد. این سیستم برای انبارداران،
          مدیران موجودی و کسب‌وکارهایی که نیاز به نظم و کارایی بالا دارند طراحی
          شده است.
        </p>
      </div>
    </AnimationAboutSection>
  );
}
