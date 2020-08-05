<template>
  <div>
    <div v-if="!data">Loading...</div>
    <div v-else class="center">
      <div>
        <tr>
          <th>Nome</th>
          <th>Produtos</th>
        </tr>
        <tr v-for="item in data" :key="item.id">
          <td>
            <router-link :to="`usuarios/${item.id}`">{{
              item.nome
            }}</router-link>
          </td>
          <td>{{ item.produtos }}</td>
        </tr>
      </div>
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
    const { data, error } = useSWRV(["usuarios", config?.params], null, {
      cache,
    });
    return { data, error };
  },
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
