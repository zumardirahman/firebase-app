
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCJ2DKv-T0XguzJJXQCrvmfYCg4p3REZdY",
      authDomain: "fir-app-zum4r.firebaseapp.com",
      databaseURL: "https://fir-app-zum4r-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "fir-app-zum4r",
      storageBucket: "fir-app-zum4r.appspot.com",
      messagingSenderId: "566814725124",
      appId: "1:566814725124:web:5aa60cdd098e8bc1b8d151"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    import { getDatabase, ref, set, get, child, update, remove, onValue} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

    const db = getDatabase();

    // refereces database
    var rollbox = document.getElementById("Rollbox");
    var namebox = document.getElementById("Namebox");
    var secbox = document.getElementById("Secbox");
    var genbox = document.getElementById("Genbox");

    var insBtn = document.getElementById("Insbtn");
    var selBtn = document.getElementById("Selbtn");
    var updBtn = document.getElementById("Updbtn");
    var delBtn = document.getElementById("Delbtn");


    // insert data func
    function InsertData() {
      set(ref(db, "TheStudents/" + rollbox.value), {
        RollNo: rollbox.value,
        NameOfStd: namebox.value,
        Section: secbox.value,
        Gender: genbox.value,
      })
        .then(() => {
          alert("data stored successfully");
        }).catch((error) => {
          alert("unsuccessfully created, error " + error);
        });
    }

    // update data func
    function UpdateData() {
      update(ref(db, "TheStudents/" + rollbox.value), {
        NameOfStd: namebox.value,
        Section: secbox.value,
        Gender: genbox.value,
      })
        .then(() => {
          alert("data updated successfully");
        }).catch((error) => {
          alert("unsuccessfully update, error " + error);
        });
    }

    // delete data func
    function DeleteData() {
      remove(ref(db, "TheStudents/" + rollbox.value))
        .then(() => {
          alert("data deleted successfully");
        }).catch((error) => {
          alert("unsuccessfully delete, error " + error);
        });
    }

    // select data function
    function SelectData() {
      const dbref = ref(db)

      get(child(dbref, "TheStudents/" + rollbox.value))
        .then((snapshot) => {
          if (snapshot.exists()) {
            namebox.value = snapshot.val().NameOfStd,
              secbox.value = snapshot.val().Section,
              genbox.value = snapshot.val().Gender
            alert("get data founded")
          } else {
            alert("no data found")
          }
        }).catch((error) => {
          alert("unsuccessfully get data, error " + error);
        });

    }

    // assign event to btn
    insBtn.addEventListener('click', InsertData);
    selBtn.addEventListener('click', SelectData);
    updBtn.addEventListener('click', UpdateData);
    delBtn.addEventListener('click', DeleteData);


    // fethe all data -------------------------------------------------------

    var stdNo = 0
    var tbody = document.getElementById('tbody1')

    function AddItemTotable(name, roll, sec, gen) {
      let trow = document.createElement("tr")
      let td1 = document.createElement("td")
      let td2 = document.createElement("td")
      let td3 = document.createElement("td")
      let td4 = document.createElement("td")
      let td5 = document.createElement("td")

      td1.innerHTML = ++stdNo
      td2.innerHTML = roll
      td3.innerHTML = name
      td4.innerHTML = sec
      td5.innerHTML = gen

      trow.appendChild(td1)
      trow.appendChild(td2)
      trow.appendChild(td3)
      trow.appendChild(td4)
      trow.appendChild(td5)

      tbody.appendChild(trow)
    }

    function AddAllItemsToTable(TheStudent) {
      const stdNo = 0
      tbody.innerHTML = ""

      TheStudent.forEach(element => {
        AddItemTotable(element.NameOfStd, element.RollNo, element.Section, element.Gender)
      });

    }

    // getting all data

    function GetAllDataOnce() {
      const dbref = ref(db)

      get(child(dbref, "TheStudents"))
        .then((snapshot) => {
          var students = []

          snapshot.forEach(childSnapshot => {
            students.push(childSnapshot.val())
          })

          AddAllItemsToTable(students)


        });
    }

    //getting data real time   
    function GetAllDataRealTime() {
      const dbref = ref(db, "TheStudents")

      onValue(dbref, (snapshot) => {
        var students = []

        snapshot.forEach(childSnapshot => {
          students.push(childSnapshot.val())
        })

        AddAllItemsToTable(students)


      });
    }

    // window.onload = GetAllDataOnce
    window.onload = GetAllDataRealTime