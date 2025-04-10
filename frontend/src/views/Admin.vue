<template>
    <div id="app">
        <!-- Add Student Form (Popup) -->
        <div v-if="showModal" class="form-overlay">
            <div class="form">
                <h3>Add Student Form</h3>
                <div v-for="index in rownum" :key="index" class="row-form">
                <h4>Student {{ index }}
                    <input class="input" v-model="AddStudentData[index-1]" type="text" placeholder="Student Name" required />
                </h4>
            </div>
            <button type="button" @click="addRow" class="btn btn-secondary">Add Student</button>
            <button type="submit" @click="submit" class="btn btn-success">Submit All</button>
                <button @click="closeModal" class="btn btn-secondary">Close</button>
            </div>
        </div>
            <div v-if="showAssignment" class="form-overlay">
            <div class="form">
                <h3>Teacher Assignment</h3>
                  <table class="assign">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    <tr v-for="(row, index) in student" :key="index">   
                        <td v-if="row.pggrade == 'N/A' && row.finalgrade == 'N/A'">{{ row.name }}</td>
                        <td v-if="row.pggrade == 'N/A' && row.finalgrade == 'N/A'">
                        <select v-model="row.user_id">
                            <option v-for="option in teacher" :key="option.name" :value="option.user_id">
                            {{ option.name }}
                            </option>
                        </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit" @click="submitAssign" class="btn btn-success">Submit</button>
                <button @click="showAssignment = false" class="btn btn-secondary">Close</button>
            </div>
        </div>
        <div>
            <button @click="showModal = true" class="btn btn-primary">Add Student</button>
            <button @click="showAssignment = true">Assign Student</button>
        </div>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade of progress report</th>
            <th>Grade of final report</th>
            <th>Assigned Teacher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in student" :key="index">
            <td>{{ row.name }}</td>
            <td>{{ row.pggrade }}</td>
            <td>{{ row.finalgrade }}</td>
            <td>{{ row.TeacherName }}</td>
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
import axios from 'axios';
import router from '../router';

const showModal = ref(false)
const showAssignment = ref(false)
var rownum = ref(1)
const AddStudentData = ref([]);
const student = ref([]);
const teacher = ref([]);


const addRow = () => {
    rownum.value += 1;
    AddStudentData.value.push('')
}

const closeModal = () => {
    showModal.value = false
}

const submit = async () =>{
    if(AddStudentData.value.length > 0){
        try {
        const response = await axios.post('/api/addStudent', {student: AddStudentData.value}).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
        if (response.data.status === true) {
            alert('Insert successful!');
            showModal.value = false;
            await getStudent();
            await getTeacher();
        } else {

        }
      } catch (error) {
        console.error(error);
      }
    }
}

const submitAssign = async () => {
    try{
        const filteredStudents = student.value
        .filter(student => student.pggrade === 'N/A' && student.finalgrade === 'N/A')
        .map(student => ({
            student_id: student.student_id,
            assignTeacher: student.user_id,
        })); 
        const response = await axios.put('/api/assignTeacher', {student: filteredStudents}).then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
        if (response.data.status === true) {
            alert('Update successful!');
            showAssignment.value = false;
            await getStudent();
            await getTeacher();
        } else {
            alert('Update Failed!');
        }
    } catch(err) {
        console.log(err)
    }
}

const logout = () => {
    localStorage.removeItem('user_id');
    router.push('/login')
}


const getStudent = async () => {
    try {
        const response = await axios.get('/api/getStudent').then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
        
        if(response.data.status === true ){
            student.value = response.data.student;
        }
    } catch (err){
        console.log(err)
    }
}

const getTeacher = async() =>{
    try{
        const response = await axios.get('/api/getTeacher').then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
            });
            if(response.data.status === true){
                teacher.value = response.data.teacher;
            }
    } catch(err){
        console.log(err)
    }
}

onMounted(async () => {
    const promise = [
        getStudent(),
        getTeacher(),
    ];
    Promise.all(promise)
});


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

.assign {
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