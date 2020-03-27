// Class

class Budget {

    constructor(budget){
       this.budget = budget;
       this.budgetLeft = this.budget;
    }

    newLeftBudget(amount)
    {
      return this.budgetLeft -= amount;    
    }

}

class HTML{

  insertBudget(amount)
  {
   
     budgetTotal.innerHTML = `${amount}`;
     budgetLeft.innerHTML = `${amount}`; 
  }

  printMessage(message,className)
  {

  const messageWrapper = document.createElement('div');    
  messageWrapper.classList.add('text-center','alert',className);    
  messageWrapper.appendChild(document.createTextNode(message));

  
  document.querySelector('.primary').insertBefore(messageWrapper,addExpenseForm); 
  
  setTimeout(function(){
     
    document.querySelector('.primary .alert').remove();
    addExpenseForm.reset();
     
  },3000);

  }


  addexpenseToList(name,amount)
  {
    const expnseList = document.querySelector('#expenses ul');  
   
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      ${name} 
       <span class="badge badge-primary badge-pill">$ ${amount}</span>    
    `;

    expnseList.appendChild(li); 

  }

  trackBudget(amount){

   const BUdgetLeftD = budget.newLeftBudget(amount);
   budgetLeft.innerHTML = `${BUdgetLeftD}`;

   if( (budget.budget / 4) > BUdgetLeftD)
     {
      budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
      budgetLeft.parentElement.parentElement.classList.add('alert-danger');
     }
   else if((budget.budget / 2) > BUdgetLeftD)
     {
       budgetLeft.parentElement.parentElement.classList.remove('alert-success');
       budgetLeft.parentElement.parentElement.classList.add('alert-warning');     
     }
   else
     {
         budgetLeft.parentElement.parentElement.classList.add('alert-success');
     }
  }
 

}


// Variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');

let budget,userBudget;


const html = new HTML();


// event Listners

eventListener();

function eventListener()
{

   // ON load 
    document.addEventListener('DOMContentLoaded',function(){
        userBudget = prompt('What\'s your budget this week?');

        if(userBudget === null || userBudget === '' || userBudget === '0')
        {
            window.location.reload();
        }
        else
        {
            budget = new Budget(userBudget);
        } 
            
    html.insertBudget(budget.budget);   
    });
    

   // When expense is added 
    addExpenseForm.addEventListener('submit',function(e){
        e.preventDefault();

      const expenseName = document.querySelector('#expense').value;
      const amount = document.querySelector('#amount').value;  

      if(expenseName == '' || amount == '')
       {
           html.printMessage('Error occured, All fields are mandatory!','alert-danger');
           
       }else{
           
           html.addexpenseToList(expenseName,amount);
           html.trackBudget(amount);
           html.printMessage('Expense added','alert-success');
       }


    });

}
