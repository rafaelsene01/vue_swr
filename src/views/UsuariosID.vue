<template>
  <div>
    <div v-if="!data">Loading...</div>
    <div v-else class="center">
      <div>
        <tr>
          <th>Nome</th>
          <th>Produtos</th>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              autocomplete="off"
              ref="nome"
              :value="`${data.nome}`"
            />
          </td>
          <td>{{ data.produtos }}</td>
          <td>
            <button type="button" @click="salvar(data)">
              <i v-if="save" class="fa fa-spinner fa-spin mr"></i>
              {{ save ? "Loading" : "Salvar" }}
            </button>
          </td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import http, { cache, AxiosRequestConfig } from "@/service/axios.service";
import useSWRV, { mutate } from "swrv";

export default {
  data: () => ({
    save: false,
  }),

  setup(props: any, vue: any) {
    const { id } = vue.root.$route.params;
    // const config: AxiosRequestConfig | any = { params: { id: 1 } };
    const config: AxiosRequestConfig | any = null;
    const { data, error } = useSWRV(
      [`usuarios/${id}`, config?.params],
      () =>
        http
          .get(`${process.env.VUE_APP_API_URL}/usuarios/${id}`, config)
          .then((res) => res.data),
      {
        cache,
      }
    );

    const { data: usuarios } = useSWRV(["usuarios", config?.params], null, {
      cache,
    });

    function salvar(item: any) {
      const newItem = {
        ...item,
        nome: vue.refs.nome.value,
      };

      try {
        http.put(
          `${process.env.VUE_APP_API_URL}/usuarios/${newItem.id}`,
          newItem
        );
        mutate(
          ["usuarios", config?.params],
          usuarios.value.map((i: any) => {
            if (i.id === newItem.id) {
              return newItem;
            }
            return i;
          }),
          cache
        );
        mutate([`usuarios/${id}`, config?.params], newItem, cache);
      } catch (err) {
        //
      }
    }

    return { salvar, data, error };
  },
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mr {
  margin-right: 4px;
}
</style>
