import { Transition } from "framer-motion";
import {
  MotionDiv,
  MotionContainer,
  MotionItem,
  MotionAnchor,
} from "../../common/motion/Motion";
import { contacts } from "../constants/counst";
import {
  fadeInUpVariant,
  staggerContainerVariant,
  staggerItemVariant,
} from "../constants/framerMotion";
import { Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <MotionDiv variants={fadeInUpVariant} className="relative group">
      <div className="relative backdrop-blur-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 rounded-[2rem] shadow-2xl p-10 sm:p-14 hover:border-white/30 transition-all duration-500">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-l from-white to-purple-100 bg-clip-text text-transparent">
          اطلاعات تماس
        </h2>

        <MotionContainer
          variants={staggerContainerVariant}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
        >
          {contacts.map((contact, i) => (
            <MotionItem
              key={i}
              variants={staggerItemVariant}
              whileHover={{ y: -5, scale: 1.03 }}
              className="flex flex-col items-center text-center p-7 rounded-2xl backdrop-blur-xl bg-white/[0.05] border border-white/15 hover:bg-white/[0.08] hover:border-white/25 transition-all duration-300 shadow-lg"
            >
              <MotionDiv
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 } as any}
                className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
              >
                <contact.icon className="w-8 h-8 text-white drop-shadow-md" />
              </MotionDiv>

              <h3 className="font-semibold text-lg mb-2 text-white">
                {contact.label}
              </h3>

              {contact.href ? (
                <a
                  href={contact.href}
                  className="text-gray-300/90 hover:text-blue-400 transition-colors duration-200 hover:underline underline-offset-4"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-gray-300/90">{contact.value}</p>
              )}
            </MotionItem>
          ))}
        </MotionContainer>

        <MotionDiv
          variants={fadeInUpVariant}
          className="text-center pt-10 border-t border-white/15"
        >
          <h3 className="text-2xl font-bold mb-3 text-white">
            آماده همکاری هستیم
          </h3>
          <p className="text-gray-300/90 mb-8 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            برای دریافت اطلاعات بیشتر یا مشاوره، با ما در تماس باشید
          </p>

          <MotionAnchor
            href="mailto:info@example.com"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={
              { type: "spring", stiffness: 400, damping: 17 } as Transition
            }
            className="inline-flex items-center gap-3 bg-gradient-to-l from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-10 py-4 rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border border-white/20"
          >
            <Mail className="w-5 h-5" />
            تماس با ما
          </MotionAnchor>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
