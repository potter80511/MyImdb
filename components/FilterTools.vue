<template>
  <div class="tools">
    <div class="filter desktop">
      <div class="conditions">
        <div class="label">
          <span>地區</span>
          <font-awesome-icon icon="angle-double-right" />
        </div>
        <div class="contents">
          <span>
            <span :class="{'active': currentSelectedArea === ''}" @click="filterAreaMethod('')">全部</span>
          </span>
          <span v-for="filterArea in filterAreas" :key="filterArea.index">
            <span :class="{'active': currentSelectedArea === filterArea.id}" @click="filterAreaMethod(filterArea.id)">{{ filterArea.name }}</span>
          </span>
        </div>
      </div>
      <div class="conditions">
        <div class="label">
          <span>種類</span>
          <font-awesome-icon icon="angle-double-right" />
        </div>
        <div class="contents">
          <span>
            <span :class="{'active': currentSelectedCategory === ''}" @click="filterCategory('')">全部</span>
          </span>
          <span v-for="filterCate in filterCates" :key="filterCate.id">
            <span :class="{'active': currentSelectedCategory === filterCate.id}" @click="filterCategory(filterCate.id)">{{ filterCate.name }}</span>
          </span>
        </div>
      </div>
      <div class="conditions">
        <div class="label">
          <span>發行商</span>
          <font-awesome-icon icon="angle-double-right" />
        </div>
        <div class="contents">
          <span>
            <span :class="{'active': currentSelectedProd === ''}" @click="filterProdMethod('')">全部</span>
          </span>
          <span v-for="prod in filterProd" :key="prod.id">
            <span :class="{'active': currentSelectedProd === prod.id}" @click="filterProdMethod(prod.id)">{{ prod.tw_name }}</span>
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
            <span :class="{'active': currentSelectedArea === filterArea.id}" @click="filterAreaMethod(filterArea.id)">{{ filterArea.name }}</span>
          </li>
        </ul>
        <ul id="cate" class="mobile_contents">
          <li v-for="filterCate in filterCates" :key="filterCate.id">
            <span :class="{'active': currentSelectedCategory === filterCate.id}" @click="filterCategory(filterCate.id)">{{ filterCate.name }}</span>
          </li>
        </ul>
        <ul id="prod" class="mobile_contents">
          <li v-for="prod in filterProd" :key="prod.id">
            <span :class="{'active': currentSelectedProd === filterProd}" @click="filterProdMethod(prod.id)">{{ prod.tw_name }}</span>
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
      filterAreas: {
        type: Array,
      },
      filterCates: {
        type: Array,
      },
      filterProd: {
        type: Array,
      },
      currentSelectedArea: {
        type: String,
      },
      currentSelectedCategory: {
        type: String,
      },
      currentSelectedProd: {
        type: String,
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
      filterProdMethod: {
        type: Function,
      },
    },
    data() {
      return {
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
            id: "prod",
            type: '製片商',
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