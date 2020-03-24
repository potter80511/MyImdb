<template>
  <div class="tools">
    <div class="filter desktop">
      <div class="conditions">
        <div class="label">
          <span>地區</span>
          <font-awesome-icon icon="angle-double-right" />
        </div>
        <div class="contents">
          <span v-for="filterArea in filterAreas" :key="filterArea.index">
            <span :class="{'active': currentSelectedArea === filterArea.keyName}" @click="filterAreaMethod(filterArea.keyName)">{{ filterArea.keyName }}</span>
          </span>
        </div>
      </div>
      <div class="conditions">
        <div class="label">
          <span>種類</span>
          <font-awesome-icon icon="angle-double-right" />
        </div>
        <div class="contents">
          <span v-for="filterCate in filterCates" :key="filterCate.id">
            <span :class="{'active': currentSelectedCategory === filterCate.key}" @click="filterCategory(filterCate.key)">{{ filterCate.keyName }}</span>
          </span>
        </div>
      </div>
      <div class="conditions">
        <div class="label">
          <span>年份</span>
          <font-awesome-icon icon="angle-double-right" />
        </div>
        <div class="contents">
          <span v-for="filterYear in filterYears" :key="filterYear.index">
            <span :class="{'active': currentSelectedYear === filterYear}" @click="filterYearMethod(filterYear)">{{ filterYear }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="filter mobile" id="filterMobile">
      <div class="tags">
        <button
          v-for="filterType in filterTypes"
          :key="filterType.id"
          :data-id="filterType.id"
          @click="showFilter"
          class="tag"
        >
            {{filterType.type}}
          </button>
      </div>
      <div class="filter_content">
        <ul id="area" class="mobile_contents">
          <li v-for="filterArea in filterAreas" :key="filterArea.index">
            <span :class="{'active': currentSelectedArea === filterArea.keyName}" @click="filterAreaMethod(filterArea.keyName)">{{ filterArea.keyName }}</span>
          </li>
        </ul>
        <ul id="cate" class="mobile_contents">
          <li v-for="filterCate in filterCates" :key="filterCate.id">
            <span :class="{'active': currentSelectedCategory === filterCate.key}" @click="filterCategory(filterCate.key)">{{ filterCate.keyName }}</span>
          </li>
        </ul>
        <ul id="year" class="mobile_contents">
          <li v-for="filterYear in filterYears" :key="filterYear.index">
            <span :class="{'active': currentSelectedYear === filterYear}" @click="filterYearMethod(filterYear)">{{ filterYear }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="sort">
      <select :value="sortBy" @input="$emit('input', $event.target.value)">
        <option value="imdbRates">以IMDB評分排序</option>
        <option value="myRates">以我的評分排序</option>
      </select>
      <font-awesome-icon icon="chevron-down" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      currentSelectedArea: {
        type: String,
      },
      currentSelectedCategory: {
        type: String,
      },
      currentSelectedYear: {
        type: [Number, String,]
      },
      sortBy: {
        type: String,
      },
      filterAreaMethod: {
        type: Function,
      },
      filterCategory: {
        type: Function,
      },
      filterYearMethod: {
        type: Function,
      },
    },
    data() {
      return {
        filterAreas: [
          {
            keyName: '全部',
            key: '00'
          },
          {
            keyName: '美國',
            key: '01'
          },
          {
            keyName: '英國',
          },
          {
            keyName: '韓國',
          },
          {
            keyName: '泰國',
          },
          {
            keyName: '日本',
          },
          {
            keyName: '印度',
          },
          {
            keyName: '西班牙',
          },
        ],
        filterCates: [
          {
            keyName: '全部',
            key: '00'
          },
          {
            keyName: '動作',
            key: '01'
          },
          {
            keyName: '犯罪',
            key: '02'
          },
          {
            keyName: '愛情',
            key: '03'
          },
          {
            keyName: '科幻',
            key: '04'
          },
          {
            keyName: '驚悚',
            key: '05'
          },
          {
            keyName: '恐怖',
            key: '06'
          },
          {
            keyName: '劇情',
            key: '07'
          },
          {
            keyName: '喜劇',
            key: '08'
          },
          {
            keyName: '家庭',
            key: '09'
          },
          {
            keyName: '戰爭',
            key: '10'
          },
          {
            keyName: '傳記',
            key: '11'
          },
          {
            keyName: '動畫',
            key: '12'
          },
          {
            keyName: '音樂',
            key: '13'
          },
          {
            keyName: '奇幻',
            key: '14'
          },
          {
            keyName: '溫馨',
            key: '15'
          },
        ],
        filterYears: [
          '全部',
          2019,
          2018,
          2017,
          2016,
          2015,
          2014,
          2013,
          1994,
        ],
        filterTypes: [
          {
            id: "area",
            type: '地區',
          },
          {
            id: "cate",
            type: '種類',
          },
          {
            id: "year",
            type: '年份',
          },
        ],
      }
    },
    methods: {
      showFilter(e) {
        const dataId = e.target.getAttribute("data-id");
        let tag = document.getElementsByClassName('tag');
        let mobileConents = document.getElementsByClassName('mobile_contents');
        for (let i=0; i<tag.length; i++) {
          tag[i].classList.remove('active')
          mobileConents[i].classList.remove('slide-down')
        }
        e.target.classList.add('active');
        document.getElementById(dataId).classList.add('slide-down');
      }
    },
    mounted() {
      document.addEventListener("click", (e) => {
        let filterMobile = document.getElementById('filterMobile');
        let tag = document.querySelectorAll('#filterMobile .tags button')
        let mobileConents = document.querySelectorAll('.mobile_contents')

        for (let i=0; i<tag.length; i++) {
          if(e.target !== tag[i]) {
            tag[i].classList.remove('active')
            mobileConents[i].classList.remove('slide-down')
          }
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/filter.scss";
</style>