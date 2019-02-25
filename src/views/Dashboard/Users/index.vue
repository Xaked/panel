<template>
  <div class='dash-users'>
    <b-row>
      <b-col>
        <b-col md="3" class="py-1 bg-dark">
          <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
            <b-form-select dark :options="pageOptions" v-model="perPage" />
          </b-form-group>
        </b-col>
        <b-table :busy="loading" dark small responsive striped hover :items='items' :fields="fields" :current-page="currentPage" :per-page="perPage">
          <div slot="table-busy" class="text-center my-2">
            <b-spinner variant="primary" label="Spinning" />
          </div>
          <template slot="actions" slot-scope="row">
            <div class="buttons text-center">
              <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                Info
              </b-button>
              <b-button variant="warning" size="sm" class="mr-1">
                Edit
              </b-button>
              <b-button variant="danger" size="sm" class="mr-1">
                Delete
              </b-button>
            </div>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
              class="my-0"
            />
          </b-col>
        </b-row>
        <!-- Info modal -->
        <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
          <pre>{{ modalInfo.content }}</pre>
        </b-modal>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getUsers } from '@/api/users';

@Component({})
export default class Users extends Vue {
  private loading = true;
  private fields = [];
  private usersQuery = {
    token: 'admin-token',
  };
  private items = [];
  private currentPage = 1;
  private perPage = 15;
  private totalRows = 30;
  private pageOptions = [10, 15, 20];
  private modalInfo = { title: '', content: '' };

  private info(item: any, index: any, button: any) {
    this.modalInfo.title = `Row index: ${index}`
    this.modalInfo.content = JSON.stringify(item, null, 2)
    this.$root.$emit('bv::show::modal', 'modalInfo', button)
  };

  private resetModal() {
    this.modalInfo.title = ''
    this.modalInfo.content = ''
  };

  private async created() {
    this.fetchUsers();
  }

  private async fetchUsers() {
    this.loading = true;
    const response = await getUsers(this.usersQuery) || [];
    this.items = response.data.items;
    this.fields = response.data.fields;
    this.loading = false;
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/variables.scss';

.dash-users {
  width: 100%;
  height: 100%;

  .row, .col, .table-responsive {
    max-height: 100%;
  }
}
</style>
