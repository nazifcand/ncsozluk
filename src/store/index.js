import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    isLoggedIn: false,
    loginUser: null,
    allEntries: [],
    singleEntry: {}
  },
  getters: {
  },
  mutations: {
    setLoginState(state) {
      state.isLoggedIn = true;
    },

    setLogOutState(state) {
      state.isLoggedIn = false;
    },

    setLoginUser(state, user) {
      state.loginUser = user;
    },

    setAllEntries(state, entries) {
      state.allEntries = entries;
    },

    setSingleEntry(state, singleEntry) {
      state.singleEntry = singleEntry;
    },

    setNewEntry(state, newEntry) {
      newEntry['author'] = state.loginUser;
      state.singleEntry.comments.push(newEntry);
    }
  },
  actions: {
    logIn({ commit }) {
      commit('setLoginState');
    },

    logOut({ commit }) {
      commit('setLogOutState');
    },

    fetchLoginUser({ commit }, { token }) {
      axios.get(`/users?fakeToken=${token}`)
        .then(result => {
          if (result.data.length === 0) {
            commit('setLogOutState');
            commit('setLoginUser', null);
            localStorage.removeItem('fakeToken');
          } else {
            commit('setLoginState');
            commit('setLoginUser', result.data[0]);
          }
        })
        .catch(err => console.log(err));
    },

    async fetchAllEntries({ commit, dispatch }) {

      const allEntries = await axios.get('/entries?parentEntry=0')
        .then(result => result = result.data)
        .catch(err => console.log(err));

      const addedCommentCount = await allEntries.reduce(async (arr, entry) => {
        const entryComments = await dispatch('fetchComments', { id: entry.id });
        entry['commentCount'] = entryComments.length;
        (await arr).push(entry);
        return arr;
      }, []);

      commit('setAllEntries', addedCommentCount);
    },

    async fetchComments({ commit, dispatch }, { id }) {
      return await axios.get(`/entries?parentEntry=${id}`)
        .then(async result => {
          let comments = result.data;
          comments = await comments.reduce(async (arr, comment) => {
            comment['author'] = await dispatch('fetchAuthor', { id: comment.author });
            (await arr).push(comment);
            return arr;
          }, []);
          return comments;
        })
        .catch(err => console.log(err))
    },

    async fetchAuthor({ commit }, { id }) {
      return await axios.get(`/users/${id}`)
        .then(result => result.data)
        .catch(err => console.log(err))
    },

    async fetchSingleEntry({ commit, dispatch }, { slug }) {
      const singleEntry = await axios.get(`/entries?slug=${slug}`)
        .then(result => result.data[0])
        .catch(err => console.log(err));

      singleEntry['author'] = await dispatch('fetchAuthor', { id: singleEntry.author });
      singleEntry['comments'] = await dispatch('fetchComments', { id: singleEntry.id });

      commit('setSingleEntry', singleEntry);
    },

    addEntry({ commit, dispatch }, newEntry) {
      axios.post('/entries', newEntry)
        .then(result => {
          commit('setNewEntry', result.data);
          dispatch('fetchAllEntries');
        })
        .catch(err => console.log(err));
    }
  }
})
