const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element and render cafe
function renderCafe (doc){
    let li = document.createElement('li');
    let customer = document.createElement('span');
    let note = document.createElement('span');
    let partner = document.createElement('span');
    let date = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    customer.textContent = doc.data().customer;
    note.textContent = doc.data().note;
    partner.textContent = doc.data().partner;
    let itemDate = doc.data().date.toDate();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = itemDate.toLocaleDateString(options);

    cross.textContent = 'X';  

    li.appendChild(customer);
    li.appendChild(partner);
    li.appendChild(date);
    li.appendChild(note);
    li.appendChild(cross);

    cafeList.appendChild(li);
  
    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        // let id = e.target.parentElement.getAttribute('data-id');
        let id = doc.id;
        db.collection('ziyaret').doc(id).delete();
    })
}

// getting data
// db.collection('cafes').where('city', '==', 'Istanbul').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     }) 
// })

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('ziyaret').add({
        customer: form.customer.value,
        note: form.note.value,
        partner: form.partner.value,
        date: firebase.firestore.FieldValue.serverTimestamp()
    });
    form.customer.value = '';
    form.note.value = '';
    form.partner.value = '';
    form.date.timestamp = '';   
})


// real-time listener
db.collection('ziyaret').orderBy('date', 'desc').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {   
        if (change.type == 'added') {
            renderCafe(change.doc);            
        } else if(change.type == 'removed') {
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        } else if (change.type == 'modified') {
            renderCafe(change.doc);           
        }
    })
})

