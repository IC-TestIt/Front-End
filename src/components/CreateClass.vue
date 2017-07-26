<template lang="html">
    <div class="createClass">
      <div class="org">
        <md-whiteframe class=" g org-item form-one">
           <span class="md-title class-title">Cadastrar Turma</span>
           <form class="form-save-class" v-on:submit="createClass()">
              <md-input-container>
                 <label>Descrição da turma</label>
                 <md-input  v-model="room.description"></md-input>
              </md-input-container>
              <md-button type="submit" class="md-raised md-primary">Salvar</md-button>
           </form>
        </md-whiteframe>
        <md-whiteframe class=" h  org-item form-two">
            <span class="md-title class-title">Adicionar Aluno</span>
            <form class="form-save-student" v-on:submit="addStudent()">
              <md-input-container>
                 <label>Nome do aluno</label>
                 <md-input v-model="student.name"></md-input>
              </md-input-container>
               <md-input-container>
                 <label>Email</label>
                 <md-input  v-model="student.email"></md-input>
               </md-input-container>
               <md-input-container>
                 <label>Identificador (Ex: RA, CPF, RG)</label>
                 <md-input   v-model="student.identifyer"></md-input>
               </md-input-container>

               <md-button type="submit" class="md-raised md-primary">Salvar</md-button>
           </form>
        </md-whiteframe>
        <md-table class="i table-class">
          <md-table-header>
            <md-table-row>
             <md-table-head>Nome</md-table-head>
             <md-table-head>Email</md-table-head>
             <md-table-head>Identificador</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body>
            <md-table-row v-for="student in students" :key="student.id" :md-item="student">
              <md-table-cell>{{student.name}}</md-table-cell>
              <md-table-cell>{{student.email}}</md-table-cell>
              <md-table-cell>{{student.identifyer}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </div>
    </div>
</template>

<script>
import baseService from '../services/baseService'

export default {
  name: 'vclass',
  data () {
    return {
      room: {
        description: null,
        teacherId: null
      },
      student: {
        email: null,
        name: null,
        identifyer: null,
        type: 2,
        password: 'senha@123',
        organizationId: 7,
        phone: '12',
        birthday: '12/12/2010'
      },
      classId: null,
      students: this.getStudents(),
      routeId: this.$route.params.id
    }
  },
  mounted () {
    this.getStudents()
  },
  methods: {
    createClass: function (e) {
      this.room.teacherId = localStorage.getItem('teacherId')
      baseService.post(`/class`, this.room).then(r => {
        if (r.status === 200) {
          this.classId = r.data.classId
          this.$router.push(this.classId)
        }
      })
    },
    addStudent: function (e) {
      baseService.get(`/student/exists/${this.student.email}`).then(r => {
        let newStudent = r.data
        console.log(newStudent)
        if (newStudent === 0) {
          baseService.post(`/user`, this.student).then(r => {
            newStudent = r.data
            baseService.post(`/class/${this.routeId}/student/${newStudent.studentId}`)
            this.getStudents()
          })
        } else {
          baseService.post(`/class/${this.routeId}/student/${newStudent}`)
          this.getStudents()
        }
      })
    },
    getStudents: function () {
      let id = this.$route.params.id
      baseService.get(`/class/${id}`).then(r => {
        this.students = r.data
      })
    }
  }
}
</script>


<style lang="css">
.createClass {
  display: flex;
  min-height: 80vh;
  min-width: 40vw;
  background-color: #ECECEC;
  height: 300px;
}

.org {
  display: grid;
  margin: 0 0 0 110px;
  grid-gap: 50px;
  grid-template-columns: 1fr 15% 150px 1fr;
  grid-template-rows: 250px 250px;
  grid-template-areas:
    'g h'
    'i i'
  ;
}

.g {
  grid-columns: g;
}

.h {
  grid-columns: h;
}

.i {
  grid-area: i;
}

.org-item {
  display: flex;
  /*justify-content: center;*/
  align-items: center;
  flex-direction: column;
  background-color: #FAFAFA;
}


.form-one {
  margin-top: 30px;
  width: 40vw;
  background: #FFF;
  overflow-x: hidden;
  /*box-shadow: 5px 5px 5px 5px grey;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.form-two {
  margin-top: 30px;
  width: 40vw;
  background: #FFF;
  overflow-x: hidden;
  /*box-shadow: 5px 5px 5px 5px grey;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.table-class {
  background: #FFF;
  width: 83.5vw;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.form-save-class {
  width: 75%;
}

.form-save-student {
  width: 450px;
  margin: auto auto auto 50px;
  padding: 20px;
}

.md-raised {
  margin: 20px auto auto auto;
}

.class-title {
  padding-top: 5%;
  color: #1a237e;
}
</style>
