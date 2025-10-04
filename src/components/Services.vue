<template>
  <section id="services" class="relative text-white mt-32">
    <SectionHeader title="My Experiences" />
    <div
      class="mt-20 py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3">
      <article class="px-[12px] mb-[24px]" v-for="element in services" :key="element.id">
        <div
          class="mt-[30px] relative flex flex-col justify-center text-center rounded-[30px] border border-secondary dark:bg-[#ffffff29] bg-primary"
          data-aos="fade-up" :data-aos-delay="element.id * 100">
          <div class="mt-[-30px] flex justify-center relative">
            <div class="mt-[-7px] p-[20px] relative bg-primary rounded-[50%]">
              <span
                class="h-[60px] w-[60px] m-auto border-[1px] border-solid border-secondary absolute top-[8px] left-[8px] rounded-[50%] inline-block z-[5]"></span>
              <img :src="element.icon" :alt="element.name + ' icon'" class="h-[35px] w-[35px] relative z-[1]" />
            </div>
          </div>
        </div>
        <div class="p-[30px]">
          <h3 class="uppercase font-bold text-lg dark:text-yellow-300 drop-shadow-md">
            {{ element.name }}
          </h3>

          <p class="text-[14px] leading-[20px] text-primary dark:text-white tracking-[0.03rem]">{{ element.description
          }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import SectionHeader from "@/components/UI/SectionHeader.vue";
const services = ref([
  {
    id: 1,
    icon: 'https://img.icons8.com/ios-filled/100/daed1a/google-code.png',
    name: 'Data Analyst',
    description: 'Developed a centralized data collection pipeline for the Finance and Operations departments, leveraging Python (pandas) to clean and transform large datasets, ensuring conistency. Created interactive dashboards to visualize insights and enhance operational efficiency.'
  },
  {
    id: 2,
    icon: 'https://img.icons8.com/ios-filled/100/daed1a/web-design.png',
    name: 'Technical Research Analyst',
    description: 'Utilized key financial metrics pulled from Bloomberg terminal to justify stock recommendations. By identifying breakout chart patterns, I validated strategies with Excel backtesting on historical data and present my findings in a structured pitch, delivering actionable insights to faculty.'
  },
  {
    id: 3,
    icon: 'https://img.icons8.com/ios-filled/100/daed1a/stocks.png',
    name: 'Trading Bot',
    description: 'Created an automated trading bot for SPY and AAPL using XGBoost, a Time Series Transformer with a 30-day lookback, and FinBERT for sentiment analysis. The system integrates real-time market data and backtesting over five years, with risk management features to optimize trading performance.'
  },



])
</script>
