<template>
  <div v-if="auth != undefined">
    <v-app id="keep">
      <v-app-bar app clipped-left color="amber">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <span class="title ml-3 mr-5">
         TAKE&nbsp;
          <span class="font-weight-light">TAXI</span>
        </span>
        <v-text-field solo-inverted flat hide-details label="Поиск по CRM" />

        <v-spacer />
        <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on">
        <v-avatar color="orange" size="45">
      <span class="white--text">АД</span>
    </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>
                    <v-btn text @click="logout">Выйти</v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
        
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
        <v-list dense class="grey lighten-4">
          <template>
            <v-list-item v-for="item in main" :key="item.i" router :to="item.route">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="black--text">{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-group prepend-icon="directions_car">
            <template v-slot:activator>
              <v-list-item-title>Автомобили</v-list-item-title>
            </template>

            <template>
              <v-list-item v-for="item in cars" :key="item.i" router :to="item.route">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <template>
            <v-list-item v-for="item in conatactAll" :key="item.i" router :to="item.route">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="black--text">{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-group prepend-icon="people_alt">
            <template v-slot:activator>
              <v-list-item-title>Пользователи</v-list-item-title>
            </template>

            <template>
              <v-list-item v-for="item in users" :key="item.i" router :to="item.route">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-group prepend-icon="attach_money">
            <template v-slot:activator>
              <v-list-item-title>Касса</v-list-item-title>
            </template>

            <template>
              <v-list-item v-for="item in cashbox" :key="item.i" router :to="item.route">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-group prepend-icon="scatter_plot">
            <template v-slot:activator>
              <v-list-item-title>Билдинг</v-list-item-title>
            </template>

            <template>
              <v-list-item v-for="item in billing" :key="item.i" router :to="item.route">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-group prepend-icon="local_convenience_store">
            <template v-slot:activator>
              <v-list-item-title>Гараж</v-list-item-title>
            </template>

            <template>
              <v-list-item v-for="item in warehouse" :key="item.i" router :to="item.route">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-group prepend-icon="show_chart">
            <template v-slot:activator>
              <v-list-item-title>Статистика</v-list-item-title>
            </template>

            <template>
              <v-list-item v-for="item in charts" :key="item.i" router :to="item.route">
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>

          <template>
            <v-list-item v-for="item in items" :key="item.i" router :to="item.route">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="black--text">{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <router-view></router-view>
      </v-content>
  </v-app>
  </div>
  <div v-else>
    <v-app id="inspire">
      <v-content>
         <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "App",
  props: {
    source: String
  },
  data: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    ip: "",
    select: null,
    checkbox: false,
    drawer: null,
    auth: localStorage.auth,
    cars: [
      {
        route: "/admin/Vehicle/all",
        text: "Автомобили",
        icon: ""
      },
      {
        route: "/admin/VehicleMaintenance/all",
        text: "Техобслуживание",
        icon: ""
      },
      {
        route: "/admin/VehicleOwner/all",
        text: "Владельцы",
        icon: ""
      }
    ],
    conatactAll: [
      {
        route: "/admin/ContractAll",
        text: "Договоры аренды",
        icon: "markunread_mailbox"
      }
    ],
    users: [
      {
        route: "/admin/UserDriverProfile/all",
        text: "Водители",
        icon: ""
      },
      {
        route: "/admin/UserProfile/all",
        text: "Сотрудники",
        icon: ""
      },
      {
        route: "/admin/UserComment/all",
        text: "Комментарии",
        icon: ""
      },
      {
        route: "/admin/UserSms/all",
        text: "История SMS",
        icon: ""
      }
    ],
    cashbox: [
      {
        route: "/admin/Account/all",
        text: "Счета",
        icon: ""
      },
      {
        route: "/admin/AccountBill/all",
        text: "Приход-расход",
        icon: ""
      },
      {
        route: "/admin/AccountBillItem/all",
        text: "Статьи",
        icon: ""
      }
    ],
    billing: [
      {
        route: "/admin/Bill/all",
        text: "Транзакции",
        icon: ""
      },
      {
        route: "/admin/FineBillGrid/all",
        text: "Неоплаченые штрафы",
        icon: ""
      },
      {
        route: "/admin/BillItem/RentBillItemGrid/all",
        text: "Тарифы",
        icon: ""
      }
    ],
    warehouse: [
      {
        route: "/admin/Stock/all",
        text: "Запчасти (склад)",
        icon: ""
      },
      {
        route: "/admin/StockSupplier/all",
        text: "Контрагенты",
        icon: ""
      },
      {
        route: "/admin/StockInvoice/PurchaseInvoiceGrid/all",
        text: "Накладные приходные",
        icon: ""
      },
      {
        route: "/admin/StockInvoice/SalesInvoiceGrid/all",
        text: "Накладные расходные",
        icon: ""
      }
    ],
    charts: [
      {
        route: "/admin/reports/MainReport",
        text: "Отчёт общий",
        icon: ""
      },
      {
        route: "/admin/reports/VehicleDriverReport",
        text: "Отчет по выручке в разрезе по водителям",
        icon: ""
      },
      {
        route: "/admin/reports/VehicleReport",
        text: "Отчет по автомобилям",
        icon: ""
      },
      {
        route: "/admin/reports/DriverReport",
        text: "Отчет по водителям",
        icon: ""
      },
      {
        route: "/admin/reports/StockReport",
        text: "Отчёт по складу",
        icon: ""
      },
      {
        route: "/admin/reports/accountReport",
        text: "По кассовым счетам",
        icon: ""
      }
    ],
    main: [
      {
        route: "/admin/main",
        text: "Главная",
        icon: "home"
      }
    ],
    items: [
      {
        route: "/admin/gps_map",
        text: "Карта",
        icon: "map"
      },
      {
        route: "/admin/UserCompanyBill/all",
        text: "Платежи",
        icon: "credit_card"
      },
      {
        route: "/admin/UserCompany/",
        text: "Настройки",
        icon: "build"
      },
      {
        route: "/admin/content/support",
        text: "Поддержка",
        icon: "feedback"
      }
    ]
  }),
  
  mounted() {
    if (localStorage.auth) {
      this.auth = localStorage.auth
    }
  },
  created() {
   if(this.auth === null || this.auth == '' || this.auth === undefined){
     localStorage.auth = ''
     this.$router.push('auth')
   }
  },
  watch: {
    auth(token) {
      localStorage.auth = token
    }
  },
  methods:{
    logout(){
      delete localStorage.auth 
      location.href="/admin/auth"
    }
  }
}
</script>
<style scoped>
#keep .v-navigation-drawer__border {
  display: none;
}
.search {
    border: 0!important;
    border-radius: 0!important;
    width: 331px;
    box-shadow: none;
}
</style>
<style>
.bottom-block-success {
    position: fixed;
    bottom: 5px;
    right: 25px;
}
</style>

