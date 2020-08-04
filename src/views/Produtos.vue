<template>
  <div>
    <div v-if="!data">Loading...</div>
    <div v-else>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Produtos</th>
      </tr>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http, { cache, AxiosRequestConfig } from "@/service/axios.service";
import useSWRV from "swrv";

export default {
  setup() {
    // const config: AxiosRequestConfig | any = { params: { id: 1 } };
    const config: AxiosRequestConfig | any = null;
    const { data, error } = useSWRV(
      ["usuarios", config?.params],
      () =>
        http
          .get(`${process.env.VUE_APP_API_URL}/usuarios`, config)
          .then((res) => res.data)
          .catch((err) => err),
      { cache }
    );
    return { data, error };
  },
};
</script>
