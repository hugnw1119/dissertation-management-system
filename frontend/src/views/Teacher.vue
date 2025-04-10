<template>
    <div id="app">
            <div v-if="showForm" class="form-overlay">
            <div class="form">
                <h3>Grading</h3>
                  <table class="grade">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Progress Report</th>
                            <th>Final Report</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row, index) in student" :key="index">   
                        <td v-if="row.pggrade == 'N/A' && row.finalgrade == 'N/A'">{{ row.name }}</td>
                        <td v-if="row.pggrade == 'N/A' && row.finalgrade == 'N/A'">
                        <select v-model="modifiedStudent[index].pggrade">
                            <option v-for="option in grades" :key="option" :value="option">
                            {{ option }}
                            </option>
                        </select>
                        </td>
                        <td v-if="row.pggrade == 'N/A' && row.finalgrade == 'N/A'">
                        <select v-model="modifiedStudent[index].finalgrade">
                            <option v-for="option in grades" :key="option" :value="option">
                            {{ option }}
                            </option>
                        </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit" @click="submitAssign" class="btn btn-success">Submit</button>
                <button @click="showForm = false" class="btn btn-secondary">Close</button>
            </div>
        </div>
        <div>
            <button @click="showForm = true" class="btn btn-primary">Grading</button>
        </div>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade of progress report</th>
            <th>Grade of final report</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in showStudentList" :key="index">
            <td>{{ row.name }}</td>
            <td>{{ row.pggrade }}</td>
            <td>{{ row.finalgrade }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button @click="logout" class="logout">Logout</button>
      </div>
    </div>
  </template>
<script setup>
import { ref, onMounted } from 'vue';
import router from '../router';
import axios from 'axios';

const grades = ['A','B','C','D','F'];
const user_id = JSON.parse(localStorage.getItem('user_id'));
const showForm = ref(false)
const showStudentList = ref([])
const student = ref([]);
const modifiedStudent = ref([]);

function areAllGradesValid(students) {
  return students.every(student => student.pggrade !== 'N/A' && student.finalgrade !== 'N/A');
}

const submitAssign = async () => {
    try{
        if(areAllGradesValid(modifiedStudent.value) == false){
            alert('Please Enter All Grade');
            return;
        }
        const isConfirmed = window.confirm("Are you sure all the grade is finalized?");

        if (isConfirmed) {
            const response = await axios.put('/api/gradeAssign', {student: modifiedStudent.value}).then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
            });
            if (response.data.status === true) {
                alert('Grading successful!');
                await getStudent();
                showForm.value = false
            } else {
                alert('Grading Failed!');
            }
        } else {
            return
        }
    } catch(err) {
        console.log(err)
    }
}

const getStudent = async () => {
    try {
        const response = await axios.get(`/api/getStudentByTeacher/${user_id}`).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
        
        if(response.data.status === true ){
            showStudentList.value = response.data.student
            student.value = response.data.student
                .filter(student => student.pggrade === 'N/A' && student.finalgrade === 'N/A')
                .map(student => ({
                    ...student
                }));
            modifiedStudent.value = JSON.parse(JSON.stringify(student.value));
        }
    } catch (err){
        console.log(err)
    }
}

onMounted(async () => {
    let promise = [
        getStudent(),
    ];
    Promise.all(promise)
});

const logout = () => {
    localStorage.removeItem('user_id');
    router.push('/login')
}


</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Box */
.form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  text-align: center;
}

.input {
    padding: 10px;
    margin-top: 0.4rem;
    border-radius: 5px;
}

.grade {
    color: #414d5a;
}

.logout {
    margin-top: 80px;
}


/* Button Styling */
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: background-color 0.3s, transform 0.2s;
  margin: 5px;
  background-color: #61acfc;
}

h3{
    color: #61acfc;
}

h4{
    color: #61acfc;
}

</style>