<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title> Добавление владельца</v-toolbar-title>
        
        <v-spacer></v-spacer>
          <template>
            <v-btn color="success" class="mb-2" @click="save(0)">{{formAutoTitle}}</v-btn>
            <v-btn color="primary" class="mb-2 ml-1" @click="save(1)">{{formDriveTitle}}</v-btn>
          </template> 
    </v-toolbar>

<template>
  <v-card>
    <v-toolbar>
      <v-tabs
        slot="extension"
        v-model="tabs"
        background-color="transparent"
      >
        <v-tab> Информация </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.name"
            :counter="250"
            label="Название"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.phone"
            :counter="20"
            label="Телефон"
            required
          ></v-text-field>
        </v-col>
         <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.email"
            :counter="20"
            label="Email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.contactPerson"
            :counter="250"
            label="Контактное лицо"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.proceedings"
            :counter="100"
            label="Реквизиты"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.groundsForContract"
            :counter="300"
            label="Основание для договора"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.additionContract"
            :counter="500"
            label="Дополнительно для договора"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
                <v-toolbar-title>Условия работы</v-toolbar-title>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.percentageRevenue"
            :counter="3"
            label="% выручки"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.profitInterest"
            :counter="3"
            label="% прибыли"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.perDay"
            :counter="6"
            label="В день"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.perMounth"
            :counter="6"
            label="В месяц"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.conditionJobs"
            :counter="500"
            label="Условия работы"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
      <div class="bottom-block-success" v-show="ok">
        <v-alert type="success">
          Данные добавлены
        </v-alert>
      </div>
</template>
</div>
</template>

<script>
import axios from "axios";
  export default {
    name: 'AppVehicleId',
    data () {
      return {
        tabs: null,
        ok: false,
        status: ["Foo", "Bar", "Fizz", "Buzz"],
        dialog: false,
        editedItem: {
          name: null,
          phone: null,
          contactPerson: null,
          proceedings: null,
          groundsForContract: null,
          additionContract: null,
          percentageRevenue: null,
          profitInterest: null,
          perDay: null,
          perMounth: null,
          conditionJobs: null,
        }
      }
    },
    computed: {
      formDriveTitle () {
        return 'Сохранить и выйти'
      },
      formAutoTitle () {
        return'Сохранить'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      save (id) {
         axios({
          method: 'post',
          url: 'http://localhost:8081/insertOwnerData',
          data: {
              name: this.editedItem.name,
              phone: this.editedItem.phone,
              email: this.editedItem.email,
              contactPerson: this.editedItem.contactPerson,
              proceedings: this.editedItem.proceedings,
              groundsForContract: this.editedItem.groundsForContract,
              additionContract: this.editedItem.additionContract,
              percentageRevenue: this.editedItem.percentageRevenue,
              profitInterest: this.editedItem.profitInterest,
              perDay: this.editedItem.perDay,
              perMounth: this.editedItem.perMounth,
              conditionJobs: this.editedItem.conditionJobs,
              token: localStorage.getItem('auth'),
          }
         })
      .then(response => {
          response.data
            this.ok = true
            setTimeout(()=>{
                        this.ok = false
            }, 2000);
            if(id === 1)
            this.$router.push('/admin/UserDriverProfile/all')
        })
        .catch(error => {
            console.log(error)
        })
      },
    },
  }
</script>
<style scoped>
.bottom-block-success {
    position: fixed;
    bottom: 5px;
    right: 25px;
}
</style>