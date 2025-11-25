import AnimationFeatures from "./AnimationFeatures";
import { features } from "../constants/counst";

export default function Features() {
  return (
    <AnimationFeatures type="fade" className="flex flex-col gap-8">
      <AnimationFeatures type="fade" className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-l from-white to-blue-100 bg-clip-text text-transparent">
          امکانات سیستم
        </h2>
      </AnimationFeatures>

      <AnimationFeatures
        type="stagger"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, index) => (
          <AnimationFeatures
            key={index}
            type="item"
            motionProps={{
              whileHover: { y: -8, scale: 1.02 },
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
          >
            <div className="relative group">
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/15 rounded-4xl p-8 sm:p-9 shadow-xl hover:shadow-2xl">
                <div className="flex items-start gap-5">
                  <AnimationFeatures
                    type="fade"
                    motionProps={{
                      whileHover: { rotate: 360, scale: 1.1 },
                      transition: { duration: 0.6 },
                    }}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/20 transition-all duration-300 shadow-lg"
                  >
                    <feature.icon className="w-8 h-8 text-white drop-shadow-md" />
                  </AnimationFeatures>

                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300/90 leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimationFeatures>
        ))}
      </AnimationFeatures>
    </AnimationFeatures>
  );
}
