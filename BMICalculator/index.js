let form = document.getElementById("form");
let resultsContainer = document.getElementById('results');

document.getElementById("submit").addEventListener("click", validateForm);
document.getElementById("clear").addEventListener("click", resetForm);

function validateForm() {
    let errorMessage = checkValidations();
    if (errorMessage) {
        alert(errorMessage);
    } else {
        countBmi();
    }
}

function checkValidations() {
    if (!form.age.value || !form.height.value || !form.weight.value || (!form.male.checked && !form.female.checked)) {
        return 'Please fill in all of the fields! All Fields are required!';
    }
    if (form.age.value <= 0 || form.height.value <= 0 || form.weight.value <= 0) {
        return 'Fields cannot have negative or zero values';
    }
    if (form.age.value < 18) {
        return 'You must be 18 years old or above';
    }
    return null;
}

function clearResults() {
    resultsContainer.innerHTML = '';
}

function resetForm() {
    form.reset();
    clearResults();
}

function countBmi() {
    clearResults();
    let age = Number(form.age.value);
    let height = Number(form.height.value) / 100; // Convert height to meters
    let weight = Number(form.weight.value);
    let gender = form.male.checked ? "male" : "female"; // Not used in BMI calculation but could be for future use

    let bmi = weight / (height * height);
    displayResults(bmi);
}

function displayResults(bmi) {
    let resultMessage = getBmiMessage(bmi);
    let bmiText = `BMI: ${parseFloat(bmi).toFixed(2)}`;
    
    resultsContainer.innerHTML = `<h1>${resultMessage}</h1><h2>${bmiText}</h2>`;
}

function getBmiMessage(bmi) {
    if (bmi < 18.5) {
        return 'You are Underweight! In order to maintain a healthy BMI try to add more nutrient-rich food to your diet';
    } else if (bmi < 25) {
        return 'Congrats, You are Healthy! To maintain a healthy BMI, keep exercising and have a balanced diet';
    } else if (bmi < 30) {
        return 'You are Overweight! Try eating less processed food and begin a healthy diet and exercise more';
    } else if (bmi < 35) {
        return 'You are Obese! You should start having a balanced diet, avoid processed foods, and exercise more';
    } else {
        return 'You are Extremely Obese! This is dangerous for your health. Please seek support from a doctor';
    }
}
