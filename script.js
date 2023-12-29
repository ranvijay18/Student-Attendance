const form = document.getElementById('form');
const studentForm = document.getElementById('students');

form.addEventListener('submit')



function showStudent(){
   var form = document.createElement('div');
   form.id = 'form';
   studentForm.appendChild(form);

   var p = document.getElementById('p');
   p.textContent = 'Ranvijay Singh';
   form.appendChild(p);

   

}