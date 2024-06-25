document.addEventListener('DOMContentLoaded', function() {

    const nuevoDiv = document.createElement('div');
    nuevoDiv.classList.add('flex', 'flex-col', 'space-y-2');

    const nuevoLabel = document.createElement('label');
    nuevoLabel.setAttribute('for', 'cc');
    nuevoLabel.classList.add('font-regular', 'font-medium');
    nuevoLabel.innerHTML = '<p> CC: </p>'

    const nuevoImput = document.createElement('input');
    nuevoImput.setAttribute('id', 'cc');
    nuevoImput.type = 'email';
    nuevoImput.setAttribute('name', 'cc')
    nuevoImput.placeholder = 'Otros destinatarios';
    nuevoImput.classList.add('border', 'border-grey-300', 'px-3', 'py-2', 'rounded-lg');


    nuevoDiv.appendChild(nuevoLabel);
    nuevoDiv.appendChild(nuevoImput);

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    formulario.insertBefore(nuevoDiv, formulario.children[1]);

    const divCc = document.querySelector('#cc');

    // EventListeners
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    divCc.addEventListener('input', validarCc);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        // Reiniciar el formulario
        resetearFormulario()
    })


    // Funciones
    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto email
        comprobarEmail();
    }
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetearFormulario()

            //Crear una alerta de exito
            const exito = document.createElement('p');
            exito.textContent = 'Email enviado exitosamente';
            exito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            formulario.appendChild(exito);
            setTimeout(() => {
                exito.remove();
            }, 2000);
        }, 2000);
    }


    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-center', 'p-2', 'text-white');
        
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

        const resultado = regex.test(email);
        return resultado;
    }
    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false;

    }
    function resetearFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

    function validarCc(e) {
        email[e.target.name] = e.target.value.trim().toLowerCase();

        if(!validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
        } else {
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
        }
        if(e.target.value === '') {
            delete email.cc;
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
            return;
        }
    }
})