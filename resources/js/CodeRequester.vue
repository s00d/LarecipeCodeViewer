<template>
  <form>
    <label>
      URL:
      <input type="text" v-model="url" />
    </label>
    <label>
      Body:
      <textarea v-model="body"></textarea>
    </label>
    <label>
      Params:
      <textarea v-model="params"></textarea>
    </label>
    <label>
      Method:
      <select v-model="method">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>
    </label>
    <button type="button" @click="sendRequest">{{ buttonLabel }}</button>
  </form>
</template>

<script>
export default {
  name: 'larecipe-code-requester',
  props: {
    baseUrl: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'GET',
      validator: value => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(value.toUpperCase())
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    body: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Array,
      default: () => [],
    },
    buttonLabel: {
      type: String,
      default: 'Send',
    },
  },
  data() {
    return {
      responseData: null,
    };
  },
  methods: {
    async sendRequest() {
      try {
        const requestOptions = {
          method: this.method.toUpperCase(),
          headers: this.headers,
          body: null
        };

        if (this.body.length) {
          requestOptions.body = JSON.stringify(this.body);
        }

        let url = `${this.baseUrl}${this.url}`;
        if (this.params.length) {
          url += `?${new URLSearchParams(this.params).toString()}`;
        }

        const response = await fetch(url, requestOptions);
        this.responseData = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label > input,
label > textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  border: none;
  background-color: #008cba;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #006f8f;
}
</style>
