<template>
  <div id="main-entry">
    <h3>
      {{ singleEntry.title }} ({{
        singleEntry.comments ? singleEntry.comments.length : "0"
      }})
    </h3>

    <div class="entry">
      <p>{{ singleEntry.entry }}</p>
      <div class="entry-details">
        <div class="votes" v-if="$store.state.isLoggedIn">
          <div class="increase" @click="like(singleEntry)">
            <span>{{ singleEntry.like }}</span>
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="decrease" @click="dislike(singleEntry)">
            <span>{{ singleEntry.dislike }}</span>
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>

        <time>{{ formatCreatedDate(singleEntry.date) }}</time>
        <router-link
          v-if="singleEntry.author"
          :to="{
            name: 'Author',
            params: {
              slug: singleEntry.author.slug,
              title: `${singleEntry.author.username} Entries`,
            },
          }"
          class="author-link"
          >@{{ singleEntry.author.username }}</router-link
        >
      </div>
    </div>

    <div
      class="entry"
      v-for="comment in singleEntry.comments"
      :key="comment.id"
    >
      <p>{{ comment.entry }}</p>
      <div class="entry-details">
        <div class="votes" v-if="$store.state.isLoggedIn">
          <div class="increase" @click="like(comment)">
            <span>{{ comment.like }}</span>
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="decrease" @click="dislike(comment)">
            <span>{{ comment.dislike }}</span>
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>

        <time>{{ formatCreatedDate(comment.date) }}</time>
        <router-link
          :to="{
            name: 'Author',
            params: {
              slug: comment.author.slug,
              title: `${comment.author.username} Entries`,
            },
          }"
          class="author-link"
          >@{{ comment.author.username }}</router-link
        >
      </div>
    </div>

    <NewEntry v-if="$store.state.isLoggedIn" />
  </div>
</template>

<style lang="scss" scoped>
#main-entry {
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 18px;
    padding: 10px;
    font-weight: bold;
    color: #fff;
    background-color: #ff9469;
    border-radius: 3px;
  }

  .entry {
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 10px;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(#ddd, 0.5);

    p {
      color: #666;
      font-size: 10px;
    }

    .entry-details {
      margin-top: 10px;
      display: flex;

      .votes {
        display: flex;

        div {
          cursor: pointer;
          transition: 300ms all ease;
          color: #777;

          &:last-child {
            margin-left: 15px;
          }

          &:hover {
            color: #ff9469;
          }

          i {
            margin-left: 3px;
          }
        }
      }

      time {
        font-size: 10px;
        margin-left: auto;
        margin-right: 10px;
        color: #777;
      }

      .author-link {
        font-weight: 500;
        color: #ff9469;
        text-decoration: none;
      }
    }
  }
}
</style>

<script>
import NewEntry from '@/components/NewEntry.vue';
import { mapState } from 'vuex';
import moment from 'moment';
import axios from 'axios';

export default {
  components: { NewEntry },
  created() {
    this.fetchSingleEntry();
  },

  computed: {
    ...mapState(['singleEntry']),
  },

  methods: {
    fetchSingleEntry() {
      this.$store.dispatch('fetchSingleEntry', { slug: this.$route.params.slug });
    },

    formatCreatedDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },

    like(entry) {
      const editEntry = {
        title: entry.title ? entry.title : null,
        slug: entry.slug ? entry.slug : null,
        entry: entry.entry,
        date: Date.now(),
        author: entry.author.id,
        like: ++entry.like,
        dislike: entry.dislike,
        parentEntry: entry.parentEntry
      }
      axios.put(`/entries/${entry.id}`, editEntry)
        .then(res => this.fetchSingleEntry())
        .catch(err => console.log(err));
    },

    dislike(entry) {
      const editEntry = {
        title: entry.title ? entry.title : null,
        slug: entry.slug ? entry.slug : null,
        entry: entry.entry,
        date: Date.now(),
        author: entry.author.id,
        like: entry.like,
        dislike: --entry.dislike,
        parentEntry: entry.parentEntry
      }
      axios.put(`/entries/${entry.id}`, editEntry)
        .then(res => this.fetchSingleEntry())
        .catch(err => console.log(err));
    }

  },

  watch: {
    $route(to, from) {
      if (to.name === 'Post' && to.params.slug !== from.params.slug) {
        this.fetchSingleEntry();
      }
    }
  }
}
</script>
