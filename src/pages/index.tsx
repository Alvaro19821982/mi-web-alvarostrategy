// src/pages/index.tsx (Código completo con memoización de componentes)
import React, { useState, useEffect, useCallback, useMemo, useRef, memo } from "react";
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, CheckCircle, Target, Users, TrendingUp, Zap, Shield, Award, Star,
  Clock, Lightbulb, Rocket, Trophy, Heart, AlertTriangle,
  HelpCircle, TrendingDown, Briefcase, Speaker, Brain, BookOpen, UserCircle, MessageCircle, Loader2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SeoTags from "@/components/SeoTags";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlogPosts, BlogPost as BlogPostType } from "@/lib/blogData";
import { routesConfig } from '../routes';

const fadeInUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }};
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: "easeOut" } }};
const fadeInLeft: Variants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }};
const fadeInRight: Variants = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }};
const scaleUp: Variants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }};
type StepColor = "blue" | "indigo" | "purple" | "pink" | "red" | "orange";
const activeButtonThemeClasses: Record<StepColor, string> = { blue: "bg-blue-600 text-white ring-blue-400", indigo: "bg-indigo-600 text-white ring-indigo-400", purple: "bg-purple-600 text-white ring-purple-400", pink: "bg-pink-600 text-white ring-pink-400", red: "bg-red-600 text-white ring-red-400", orange: "bg-orange-600 text-white ring-orange-400", };
const stepColorRelatedClasses: Record<StepColor, { border: string; bgIcon: string; textIcon: string; textSubtitle: string }> = { blue: { border: "border-blue-500", bgIcon: "bg-blue-100", textIcon: "text-blue-600", textSubtitle: "text-blue-600" }, indigo: { border: "border-indigo-500", bgIcon: "bg-indigo-100", textIcon: "text-indigo-600", textSubtitle: "text-indigo-600" }, purple: { border: "border-purple-500", bgIcon: "bg-purple-100", textIcon: "text-purple-600", textSubtitle: "text-purple-600" }, pink: { border: "border-pink-500", bgIcon: "bg-pink-100", textIcon: "text-pink-600", textSubtitle: "text-pink-600" }, red: { border: "border-red-500", bgIcon: "bg-red-100", textIcon: "text-red-600", textSubtitle: "text-red-600" }, orange: { border: "border-orange-500", bgIcon: "bg-orange-100", textIcon: "text-orange-600", textSubtitle: "text-orange-600" }, };

// MODIFICACIÓN: Envolver en React.memo para prevenir re-renders innecesarios
const ResultChart = memo(() => {
  const { t } = useTranslation();
  const growthData = [
    { month: 'Ene', before: 20, after: 45, projection: 55 },
    { month: 'Feb', before: 25, after: 52, projection: 68 },
    { month: 'Mar', before: 22, after: 68, projection: 85 },
    { month: 'Abr', before: 28, after: 78, projection: 95 },
    { month: 'May', before: 30, after: 95, projection: 120 },
    { month: 'Jun', before: 35, after: 120, projection: 145 }
  ];
  return (
    <div className="bg-white/80 backdrop-blur-md p-3 xxs:p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/50 hover:shadow-2xl sm:hover:shadow-3xl transition-shadow duration-500">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-md sm:text-xl lg:text-2xl font-bold text-gray-900">{t('charts.results')}</h3>
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-600">{t('charts.live')}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <defs>
            <>
              <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                <>
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </>
              </linearGradient>
              <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                <>
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </>
              </linearGradient>
            </>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickMargin={5}/>
          <YAxis stroke="#6b7280" fontSize={12} tickMargin={5}/>
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 4px 10px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
          <Area type="monotone" dataKey="before" stroke="#f87171" fillOpacity={1} fill="url(#colorBefore)" strokeWidth={2} name={t('charts.before')} />
          <Area type="monotone" dataKey="after" stroke="#60a5fa" fillOpacity={1} fill="url(#colorAfter)" strokeWidth={2.5} name={t('charts.with_strategy')} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-between items-center mt-4 text-[9px] xxs:text-[10px] sm:text-xs">
        <div className="flex items-center mb-1 sm:mb-0">
          <div className="w-2.5 h-0.5 sm:w-3 bg-red-400 mr-1 sm:mr-1.5"></div>
          <span className="text-gray-600">{t('charts.traditional_marketing')}</span>
        </div>
        <div className="flex items-center mb-1 sm:mb-0">
          <div className="w-2.5 h-0.5 sm:w-3 bg-blue-400 mr-1 sm:mr-1.5"></div>
          <span className="text-gray-600">{t('charts.with_strategy')}</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-0.5 sm:w-3 bg-green-400 mr-1 sm:mr-1.5"></div>
          <span className="text-gray-600">{t('charts.projection')}</span>
        </div>
      </div>
    </div>
  );
});
ResultChart.displayName = "ResultChart";

// MODIFICACIÓN: Envolver en React.memo para prevenir re-renders innecesarios
const MethodStep = memo(({ step, index, active, onClick }: { step: { title: string; color: StepColor }; index: number; active: boolean; onClick: (index: number) => void }) => { return ( <button onClick={() => onClick(index)} className={` px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold tracking-tight transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 whitespace-nowrap ${active ? `${activeButtonThemeClasses[step.color]} shadow-xl ring-2 ring-offset-2 ring-offset-slate-50` : `bg-blue-50 text-blue-700 border-2 border-blue-300 hover:bg-blue-100 hover:border-blue-500 focus:ring-blue-300`} `} aria-label={`Paso ${index + 1}: ${step.title}`} > {step.title.toUpperCase()} </button> ); });
MethodStep.displayName = "MethodStep";

const Index = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMethodStep, setActiveMethodStep] = useState(0);
  const methodIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  const getPath = (routeKey: string, params?: Record<string, string>) => {
    const routeConf = routesConfig.find(r => r.key === routeKey);
    if (!routeConf) {
      console.warn(`Route with key "${routeKey}" not found in routesConfig.`);
      const fallbackKey = t(`routes.${routeKey}`, { lng: currentLang, defaultValue: routeKey });
      return `/${currentLang}/${fallbackKey}`;
    }

    let pathSegment = routeConf.paths[currentLang as keyof typeof routeConf.paths];
    if (!pathSegment) {
        console.warn(`Path for language "${currentLang}" not found for route key "${routeKey}".`);
        const fallbackKey = t(`routes.${routeKey}`, { lng: currentLang, defaultValue: routeKey });
        return `/${currentLang}/${fallbackKey}`;
    }

    if (params) {
      Object.keys(params).forEach(paramName => {
        pathSegment = pathSegment.replace(`:${paramName}`, params[paramName]);
      });
    }
    return `/${currentLang}/${pathSegment}`;
  };

  const interactiveSteps = useMemo(() => [
    { key: "step1", color: "blue" as StepColor, image: "photo-1486718448742-163732cd1544", icon: <Lightbulb className="w-6 h-6" /> },
    { key: "step2", color: "indigo" as StepColor, image: "photo-1493397212122-2b85dda8106b", icon: <Target className="w-6 h-6" /> },
    { key: "step3", color: "purple" as StepColor, image: "photo-1649972904349-6e44c42644a7", icon: <TrendingUp className="w-6 h-6" /> },
    { key: "step4", color: "pink" as StepColor, image: "photo-1581091226825-a6a2a5aee158", icon: <Trophy className="w-6 h-6" /> },
    { key: "step5", color: "red" as StepColor, image: "photo-1488590528505-98d2b5aba04b", icon: <Heart className="w-6 h-6" /> },
    { key: "step6", color: "orange" as StepColor, image: "photo-1487058792275-0ad4aaf24ca7", icon: <Rocket className="w-6 h-6" /> }
  ].map(step => ({ ...step, title: t(`method.${step.key}_title`), subtitle: t(`method.${step.key}_subtitle`), description: t(`method.${step.key}_desc`) })), [t]);

  const problemsData = useMemo(() => [
    { key: "problem1", icon: <TrendingDown className="w-8 h-8 sm:w-10 md:w-12" /> },
    { key: "problem2", icon: <Users className="w-8 h-8 sm:w-10 md:w-12 opacity-50" /> },
    { key: "problem3", icon: <AlertTriangle className="w-8 h-8 sm:w-10 md:w-12" /> },
    { key: "problem4", icon: <Zap className="w-8 h-8 sm:w-10 md:w-12" /> },
    { key: "problem5", icon: <Shield className="w-8 h-8 sm:w-10 md:w-12 opacity-60" /> },
    { key: "problem6", icon: <HelpCircle className="w-8 h-8 sm:w-10 md:w-12" /> },
  ].map(p => ({...p, title: t(`problems.${p.key}_title`), description: t(`problems.${p.key}_desc`)})), [t]);

  const whyTrustUsData = useMemo(() => [
    { icon: <MessageCircle className="w-6 h-6 text-blue-600" />, titleKey: "whyTrustUs.item1_title", descKey: "whyTrustUs.item1_desc" },
    { icon: <Award className="w-6 h-6 text-blue-600" />, titleKey: "whyTrustUs.item2_title", descKey: "whyTrustUs.item2_desc" },
    { icon: <Star className="w-6 h-6 text-blue-600" />, titleKey: "whyTrustUs.item3_title", descKey: "whyTrustUs.item3_desc" },
    { icon: <Heart className="w-6 h-6 text-blue-600" />, titleKey: "whyTrustUs.item4_title", descKey: "whyTrustUs.item4_desc" },
    { icon: <Zap className="w-6 h-6 text-blue-600" />, titleKey: "whyTrustUs.item5_title", descKey: "whyTrustUs.item5_desc" },
    { icon: <TrendingUp className="w-6 h-6 text-blue-600" />, titleKey: "whyTrustUs.item6_title", descKey: "whyTrustUs.item6_desc" }
  ], []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setBlogLoading(true);
      try {
        const posts = await getBlogPosts(currentLang);
        setBlogPosts(posts.slice(0, 2));
      } catch (error) {
        console.error("Error fetching blog posts for Index page:", error);
        setBlogPosts([]);
      } finally {
        setBlogLoading(false);
      }
    };
    fetchBlogPosts();
  }, [currentLang]);

  const startMethodCarousel = useCallback(() => {
    if (methodIntervalRef.current) clearInterval(methodIntervalRef.current);
    methodIntervalRef.current = setInterval(() => {
      setActiveMethodStep(prev => (prev + 1) % interactiveSteps.length);
    }, 7000);
  }, [interactiveSteps.length]);

  const handleMethodStepClick = useCallback((index: number) => {
    setActiveMethodStep(index);
    startMethodCarousel();
  }, [startMethodCarousel]);

  useEffect(() => {
    startMethodCarousel();
    return () => {
      if (methodIntervalRef.current) clearInterval(methodIntervalRef.current);
    };
  }, [startMethodCarousel]);

  const getUnsplashImageUrl = (photoId: string, width: number = 800, height: number = 400) => {
    return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=75&auto=format&fm=webp`;
  };

  const currentStep = useMemo(() => interactiveSteps[activeMethodStep], [activeMethodStep, interactiveSteps]);
  const currentStepClasses = useMemo(() => stepColorRelatedClasses[currentStep.color], [currentStep]);

  const resultsData = [
    { name: t('charts.web_traffic'), value: 150, color: '#3b82f6', description: t('method.results_traffic') },
    { name: t('charts.conversions'), value: 230, color: '#22d3ee', description: t('method.results_conversions') },
    { name: 'ROI', value: 180, color: '#8b5cf6', description: t('method.results_roi') }
  ];

  return (
    <>
      <SeoTags
        title={t('meta.title')}
        description={t('meta.description')}
        pathname={location.pathname}
      />

      {/* Hero Section */}
      <section id="inicio" className="pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-20 relative bg-gradient-to-br from-slate-100 via-blue-50/30 to-indigo-100/20">
        <div className="absolute inset-0 opacity-30 sm:opacity-50">
          <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-60 h-60 sm:w-96 sm:h-96 bg-purple-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
          <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-spin-slow"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 order-1 lg:order-1 text-center sm:text-left overflow-hidden">
              <motion.p
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-blue-600 bg-blue-100/70 px-4 py-2 rounded-lg inline-block shadow-sm"
              >
                {t('hero.preTitle')}
              </motion.p>
              <motion.h1
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                className="text-4xl leading-none sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-black mb-4 sm:mb-5 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent"
              >
                {t('hero.title')}
              </motion.h1>

              <motion.p
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                className="text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>
              <motion.div
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.1}}
                className="space-y-3 mb-6 sm:mb-8 text-sm sm:text-base text-gray-700"
              >
                <motion.div variants={fadeInUp} className="flex items-start text-left sm:space-x-3">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5 mr-2 sm:mr-0 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">{t('hero.point1_strong')}</strong>
                    <span className="text-gray-600"> {t('hero.point1_text')}</span>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start text-left sm:space-x-3">
                  <Rocket className="w-5 h-5 text-blue-600 mt-0.5 mr-2 sm:mr-0 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">{t('hero.point2_strong')}</strong>
                    <span className="text-gray-600"> {t('hero.point2_text')}</span>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start text-left sm:space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 mr-2 sm:mr-0 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold">{t('hero.point3_strong')}</strong>
                    <span className="text-gray-600"> {t('hero.point3_text')}</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col sm:flex-row justify-center sm:justify-start"
              >
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-100 w-full sm:w-auto"
                  onClick={() => navigate(getPath('contact'), { state: { subject: "Solicitud de Sesión Estratégica Gratuita (Desde Hero)" } })}
                >
                  <>
                    {t('hero.ctaButton')}
                    <ArrowRight className="ml-2 w-5 h-5 sm:ml-2.5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
                  </>
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
              className="relative lg:col-span-2 order-2 lg:order-2 mx-auto w-full sm:max-w-md lg:max-w-none mt-10 lg:mt-0"
            >
              <ResultChart />
              <div className="absolute -top-1 right-1 xxs:-top-2 xxs:right-0 sm:-top-3 sm:-right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1 xxs:p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg animate-bounce">
                <div className="text-sm xxs:text-base sm:text-xl font-bold">+230%</div>
                <div className="text-[7px] xxs:text-[9px] sm:text-xs">ROI Promedio</div>
              </div>
              <div className="absolute -bottom-1 left-1 xxs:-bottom-2 xxs:left-0 sm:-bottom-2 sm:-left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1.5 xxs:p-2 sm:p-3 rounded-md sm:rounded-lg shadow-md animate-pulse-slow">
                <Clock className="w-3 h-3 xxs:w-4 xxs:h-4 sm:w-6 sm:h-6" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            <Badge className="mb-5 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold rounded-lg shadow-lg cursor-default">
              {t('problems.badge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] font-black mb-5 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              {t('problems.title')}
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              {t('problems.subtitle')}
            </p>
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            {problemsData.map((problem, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group p-6 sm:p-8 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-blue-400/60 flex flex-col h-full">
                  <CardContent className="p-0 text-center flex flex-col flex-grow items-center">
                    <div className="flex justify-center mb-5 sm:mb-6 p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(problem.icon, {
                        className: `w-8 h-8 sm:w-10 text-white transition-colors duration-300 ${problem.icon.props.className?.replace(/text-\w+-\d+/g, '') || ''}`
                      })}
                    </div>
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">
                      {problem.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodo" className="py-16 sm:py-20 lg:py-28 bg-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg shadow-md">
              {t('method.badge')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              {t('method.title')}
            </h2>
            <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4 mb-8 sm:mb-10">
              {t('method.subtitle')}
            </p>
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-10 sm:mb-14" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          >
            {interactiveSteps.map((step, index) => (
              <MethodStep
                key={step.title + index}
                step={{ title: step.title, color: step.color }}
                index={index}
                active={activeMethodStep === index}
                onClick={handleMethodStepClick}
              />
            ))}
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto min-h-[480px] sm:min-h-[500px] md:min-h-[450px]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={scaleUp}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMethodStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full z-10"
              >
                <div className={`bg-white p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-t-4 ${currentStepClasses.border}`}>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
                    <div className="order-2 md:order-1">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className={`p-1.5 sm:p-2 ${currentStepClasses.bgIcon} ${currentStepClasses.textIcon} rounded-lg mr-2 sm:mr-3 flex-shrink-0`}>
                          {React.cloneElement(currentStep.icon, {className: `w-5 h-5 sm:w-6 sm:h-6 ${currentStepClasses.textIcon}`})}
                        </div>
                        <div>
                          <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-800`}>{currentStep.title}</h3>
                          <p className={`text-sm sm:text-md md:text-lg font-semibold ${currentStepClasses.textSubtitle}`}>{currentStep.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-xs xxs:text-sm sm:text-sm md:text-base">
                        {currentStep.description}
                      </p>
                    </div>
                    <div className="order-1 md:order-2">
                      <img
                        loading="lazy"
                        decoding="async"
                        width="500"
                        height="350"
                        src={getUnsplashImageUrl(currentStep.image, 500, 350)}
                        alt={currentStep.title}
                        className="w-full h-48 xxs:h-56 sm:h-64 md:h-[350px] object-cover rounded-lg sm:rounded-xl shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto mt-16 sm:mt-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp}
          >
              <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/70">
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-8 sm:mb-12 text-center bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  {t('method.results_title')}
                </h2>
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
                  <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={resultsData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={13} dy={5} interval={0} />
                      <YAxis stroke="#6b7280" fontSize={13} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(5px)', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 5px 15px -5px rgba(0,0,0,0.1)', fontSize: '14px', padding: '10px 14px' }}
                        cursor={{ fill: 'rgba(230, 240, 254, 0.6)' }}
                        itemStyle={{ fontWeight: 500 }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={55}>
                        {resultsData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.color} /> ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="space-y-3 sm:space-y-5 mt-6 lg:mt-0">
                    {resultsData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 sm:p-5 bg-gradient-to-r from-slate-100 via-blue-50/50 to-indigo-50/30 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center space-x-2.5 sm:space-x-4">
                          <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full shadow-inner flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                          <span className="font-semibold text-gray-800 text-sm sm:text-lg">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg sm:text-2xl font-bold text-gray-800">+{item.value}%</div>
                          <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </motion.div>
          <motion.div
            className="text-center mt-12 sm:mt-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
          >
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full sm:w-auto"
              onClick={() => navigate(getPath('contact'), { state: { subject: "Interesado en Estrategia Digital Integral" }})}
            >
              <>
                {t('method.ctaButton')}
                <ArrowRight className="ml-2 w-5 h-5 sm:ml-2.5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
              </>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              {t('whyTrustUs.title')}
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
          >
            {whyTrustUsData.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl border-2 border-slate-200 h-full">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-600">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{t(item.titleKey)}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
                className="text-center mb-10"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
            >
                <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md">
                    <>
                        <UserCircle className="w-4 h-4 mr-2" />
                        {t('aboutMe.badge')}
                    </>
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{t('aboutMe.title')}</h2>
            </motion.div>
            <motion.div
                className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={scaleUp}
            >
                <Avatar className="w-32 h-32 md:w-48 md:h-48 border-4 border-blue-300 shadow-lg flex-shrink-0">
                    <AvatarImage src="/images/Alvaro%20Fernandez%20de%20Celis.webp" alt="Álvaro Fernández de Celis" />
                    <AvatarFallback>AFC</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">{t('aboutMe.text')}</p>
                    <Button asChild size="lg" className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-6 py-3 font-semibold">
                        <Link to={getPath('whoAmI')}>
                           <>
                                {t('aboutMe.button')}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                           </>
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md">
              <>
                <BookOpen className="w-4 h-4 mr-2" />
                {t('blogSection.badge')}
              </>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">{t('blogSection.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('blogSection.subtitle')}</p>
          </motion.div>

          {blogLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600"/>
            </div>
          ) : blogPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}
            >
              {blogPosts.map((post, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                    <CardContent className="p-0 flex-grow flex flex-col">
                      <Link to={getPath('blogPost', { slug: post.slug })} className="block">
                        <img src={post.image} alt={post.imageAlt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="800" height="600"/>
                      </Link>
                      <div className="p-6 flex flex-col flex-grow">
                        <Link to={getPath('blogCategory', { categoriaSlug: post.category.toLowerCase().replace(/\s+/g, '-') })}>
                            <Badge variant="secondary" className="mb-3 w-fit cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800/60">
                                {post.category}
                            </Badge>
                        </Link>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 flex-grow">
                          <Link to={getPath('blogPost', { slug: post.slug })} className="hover:text-blue-600 transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                        <Link to={getPath('blogPost', { slug: post.slug })} className="mt-auto font-semibold text-blue-600 hover:text-blue-700 group/link inline-flex items-center w-fit">
                          {t('blogSection.read_article')} <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-gray-500 py-10">{t('blogSection.no_articles')}</p>
          )}

          <motion.div
            className="text-center mt-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}
          >
            <Button asChild size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 font-bold text-base">
              <Link to={getPath('blog')}>
                <>
                  {t('blogSection.ctaButton')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;