# Código JavaScript - app.js

```javascript
// Datos de la aplicación
var appData = {
    materias: [
        {id: 1, nombre: "Matemática", nivel: "Primario, Secundario, Universitario"},
        {id: 2, nombre: "Física", nivel: "Secundario, Universitario"},
        {id: 3, nombre: "Química", nivel: "Secundario, Universitario"},
        {id: 4, nombre: "Biología", nivel: "Secundario, Universitario"},
        {id: 5, nombre: "Historia", nivel: "Primario, Secundario"},
        {id: 6, nombre: "Geografía", nivel: "Primario, Secundario"},
        {id: 7, nombre: "Literatura", nivel: "Secundario"},
        {id: 8, nombre: "Inglés", nivel: "Todos los niveles"},
        {id: 9, nombre: "Filosofía", nivel: "Secundario"},
        {id: 10, nombre: "Economía", nivel: "Secundario, Universitario"},
        {id: 11, nombre: "Contabilidad", nivel: "Secundario, Universitario"},
        {id: 12, nombre: "Informática", nivel: "Todos los niveles"}
    ],
    testimonios: [
        {nombre: "María González", materia: "Matemática", comentario: "Excelente profesor, muy claro en sus explicaciones"},
        {nombre: "Carlos Rodríguez", materia: "Física", comentario: "Me ayudó mucho a entender conceptos difíciles"},
        {nombre: "Ana Martínez", materia: "Química", comentario: "Súper recomendado, muy paciente"},
        {nombre: "Luis Fernández", materia: "Inglés", comentario: "Metodología muy efectiva"},
        {nombre: "Sofia López", materia: "Historia", comentario: "Hace las clases muy interesantes"}
    ],
    metodologia: [
        {paso: 1, titulo: "Evaluación Inicial", descripcion: "Identificamos el nivel actual del estudiante"},
        {paso: 2, titulo: "Plan Personalizado", descripcion: "Creamos un plan adaptado a las necesidades"},
        {paso: 3, titulo: "Clases Dinámicas", descripcion: "Utilizamos metodologías activas de aprendizaje"},
        {paso: 4, titulo: "Práctica Dirigida", descripcion: "Ejercicios específicos para reforzar conceptos"},
        {paso: 5, titulo: "Seguimiento", descripcion: "Monitoreamos el progreso constantemente"},
        {paso: 6, titulo: "Evaluación Final", descripcion: "Verificamos el logro de objetivos"}
    ]
};

// Estado de la aplicación
var appState = {
    alumnos: [],
    turnos: [],
    editingAlumno: null,
    editingTurno: null,
    activeTab: 'alumnos'
};

// Funciones de utilidad
var utils = {
    // Generar ID único
    generateId: function() {
        return Date.now() + Math.random();
    },
    
    // Formatear fecha
    formatDate: function(date) {
        if (!date) return '';
        var d = new Date(date);
        var day = d.getDate().toString().padStart(2, '0');
        var month = (d.getMonth() + 1).toString().padStart(2, '0');
        var year = d.getFullYear();
        return day + '/' + month + '/' + year;
    },
    
    // Validar email
    validateEmail: function(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validar teléfono
    validatePhone: function(phone) {
        var phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
};

// Gestión de localStorage
var storage = {
    save: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    
    load: function(key) {
        try {
            var data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

// CRUD de Alumnos
var alumnosCrud = {
    // Obtener todos los alumnos
    getAll: function() {
        return appState.alumnos;
    },
    
    // Obtener alumno por ID
    getById: function(id) {
        for (var i = 0; i < appState.alumnos.length; i++) {
            if (appState.alumnos[i].id === id) {
                return appState.alumnos[i];
            }
        }
        return null;
    },
    
    // Crear nuevo alumno
    create: function(alumnoData) {
        var newAlumno = {
            id: utils.generateId(),
            nombre: alumnoData.nombre,
            email: alumnoData.email,
            telefono: alumnoData.telefono,
            materia: alumnoData.materia,
            nivel: alumnoData.nivel || '',
            fechaRegistro: new Date().toISOString()
        };
        
        appState.alumnos.push(newAlumno);
        this.saveToStorage();
        return newAlumno;
    },
    
    // Actualizar alumno
    update: function(id, alumnoData) {
        for (var i = 0; i < appState.alumnos.length; i++) {
            if (appState.alumnos[i].id === id) {
                appState.alumnos[i].nombre = alumnoData.nombre;
                appState.alumnos[i].email = alumnoData.email;
                appState.alumnos[i].telefono = alumnoData.telefono;
                appState.alumnos[i].materia = alumnoData.materia;
                appState.alumnos[i].nivel = alumnoData.nivel || '';
                this.saveToStorage();
                return appState.alumnos[i];
            }
        }
        return null;
    },
    
    // Eliminar alumno
    delete: function(id) {
        for (var i = 0; i < appState.alumnos.length; i++) {
            if (appState.alumnos[i].id === id) {
                var deletedAlumno = appState.alumnos.splice(i, 1)[0];
                this.saveToStorage();
                return deletedAlumno;
            }
        }
        return null;
    },
    
    // Guardar en localStorage
    saveToStorage: function() {
        storage.save('alumnos', appState.alumnos);
    },
    
    // Cargar desde localStorage
    loadFromStorage: function() {
        var alumnos = storage.load('alumnos');
        appState.alumnos = alumnos || [];
    }
};

// CRUD de Turnos
var turnosCrud = {
    // Obtener todos los turnos
    getAll: function() {
        return appState.turnos;
    },
    
    // Obtener turno por ID
    getById: function(id) {
        for (var i = 0; i < appState.turnos.length; i++) {
            if (appState.turnos[i].id === id) {
                return appState.turnos[i];
            }
        }
        return null;
    },
    
    // Crear nuevo turno
    create: function(turnoData) {
        var newTurno = {
            id: utils.generateId(),
            alumnoId: turnoData.alumnoId,
            alumnoNombre: turnoData.alumnoNombre,
            materia: turnoData.materia,
            fecha: turnoData.fecha,
            hora: turnoData.hora,
            duracion: parseInt(turnoData.duracion) || 60,
            notas: turnoData.notas || '',
            estado: 'programado',
            fechaCreacion: new Date().toISOString()
        };
        
        appState.turnos.push(newTurno);
        this.saveToStorage();
        return newTurno;
    },
    
    // Actualizar turno
    update: function(id, turnoData) {
        for (var i = 0; i < appState.turnos.length; i++) {
            if (appState.turnos[i].id === id) {
                appState.turnos[i].alumnoId = turnoData.alumnoId;
                appState.turnos[i].alumnoNombre = turnoData.alumnoNombre;
                appState.turnos[i].materia = turnoData.materia;
                appState.turnos[i].fecha = turnoData.fecha;
                appState.turnos[i].hora = turnoData.hora;
                appState.turnos[i].duracion = parseInt(turnoData.duracion) || 60;
                appState.turnos[i].notas = turnoData.notas || '';
                this.saveToStorage();
                return appState.turnos[i];
            }
        }
        return null;
    },
    
    // Eliminar turno
    delete: function(id) {
        for (var i = 0; i < appState.turnos.length; i++) {
            if (appState.turnos[i].id === id) {
                var deletedTurno = appState.turnos.splice(i, 1)[0];
                this.saveToStorage();
                return deletedTurno;
            }
        }
        return null;
    },
    
    // Guardar en localStorage
    saveToStorage: function() {
        storage.save('turnos', appState.turnos);
    },
    
    // Cargar desde localStorage
    loadFromStorage: function() {
        var turnos = storage.load('turnos');
        appState.turnos = turnos || [];
    }
};

// Funciones de UI
var ui = {
    // Renderizar materias
    renderMaterias: function() {
        var container = document.getElementById('materias-grid');
        if (!container) return;
        
        var html = '';
        for (var i = 0; i < appData.materias.length; i++) {
            var materia = appData.materias[i];
            html += '<div class="materia-card">';
            html += '<h3 class="materia-nombre">' + materia.nombre + '</h3>';
            html += '<p class="materia-nivel">' + materia.nivel + '</p>';
            html += '</div>';
        }
        container.innerHTML = html;
    },
    
    // Renderizar metodología
    renderMetodologia: function() {
        var container = document.getElementById('metodologia-grid');
        if (!container) return;
        
        var html = '';
        for (var i = 0; i < appData.metodologia.length; i++) {
            var item = appData.metodologia[i];
            html += '<div class="metodologia-item">';
            html += '<div class="metodologia-numero">' + item.paso + '</div>';
            html += '<h3 class="metodologia-titulo">' + item.titulo + '</h3>';
            html += '<p class="metodologia-descripcion">' + item.descripcion + '</p>';
            html += '</div>';
        }
        container.innerHTML = html;
    },
    
    // Renderizar testimonios
    renderTestimonios: function() {
        var container = document.getElementById('testimonios-grid');
        if (!container) return;
        
        var html = '';
        for (var i = 0; i < appData.testimonios.length; i++) {
            var testimonio = appData.testimonios[i];
            html += '<div class="testimonio-card">';
            html += '<p class="testimonio-comentario">' + testimonio.comentario + '</p>';
            html += '<h4 class="testimonio-autor">' + testimonio.nombre + '</h4>';
            html += '<p class="testimonio-materia">' + testimonio.materia + '</p>';
            html += '</div>';
        }
        container.innerHTML = html;
    },
    
    // Renderizar opciones de materias en selects
    renderMateriasOptions: function() {
        var selects = document.querySelectorAll('#alumno-materia, #turno-materia, #filtro-materia-alumno, #filtro-materia-turno');
        
        for (var s = 0; s < selects.length; s++) {
            var select = selects[s];
            var currentValue = select.value;
            
            // Limpiar opciones existentes excepto la primera
            var firstOption = select.children[0];
            select.innerHTML = '';
            select.appendChild(firstOption);
            
            // Agregar opciones de materias
            for (var i = 0; i < appData.materias.length; i++) {
                var materia = appData.materias[i];
                var option = document.createElement('option');
                option.value = materia.nombre;
                option.textContent = materia.nombre;
                select.appendChild(option);
            }
            
            select.value = currentValue;
        }
    },
    
    // Renderizar opciones de alumnos en select
    renderAlumnosOptions: function() {
        var select = document.getElementById('turno-alumno');
        if (!select) return;
        
        var currentValue = select.value;
        
        // Limpiar opciones existentes excepto la primera
        var firstOption = select.children[0];
        select.innerHTML = '';
        select.appendChild(firstOption);
        
        // Agregar opciones de alumnos
        var alumnos = alumnosCrud.getAll();
        for (var i = 0; i < alumnos.length; i++) {
            var alumno = alumnos[i];
            var option = document.createElement('option');
            option.value = alumno.id;
            option.textContent = alumno.nombre;
            select.appendChild(option);
        }
        
        select.value = currentValue;
    },
    
    // Renderizar tabla de alumnos
    renderTablaAlumnos: function(alumnos) {
        var tbody = document.getElementById('tabla-alumnos');
        var noData = document.getElementById('no-alumnos');
        
        if (!alumnos) {
            alumnos = alumnosCrud.getAll();
        }
        
        if (alumnos.length === 0) {
            tbody.innerHTML = '';
            noData.style.display = 'block';
            return;
        }
        
        noData.style.display = 'none';
        var html = '';
        
        for (var i = 0; i < alumnos.length; i++) {
            var alumno = alumnos[i];
            html += '<tr>';
            html += '<td>' + alumno.nombre + '</td>';
            html += '<td>' + alumno.email + '</td>';
            html += '<td>' + alumno.telefono + '</td>';
            html += '<td>' + alumno.materia + '</td>';
            html += '<td>';
            html += '<div class="action-buttons">';
            html += '<button class="btn btn-sm btn-secondary btn-editar-alumno" data-id="' + alumno.id + '">Editar</button>';
            html += '<button class="btn btn-sm btn-danger btn-eliminar-alumno" data-id="' + alumno.id + '">Eliminar</button>';
            html += '</div>';
            html += '</td>';
            html += '</tr>';
        }
        
        tbody.innerHTML = html;
    },
    
    // Renderizar tabla de turnos
    renderTablaTurnos: function(turnos) {
        var tbody = document.getElementById('tabla-turnos');
        var noData = document.getElementById('no-turnos');
        
        if (!turnos) {
            turnos = turnosCrud.getAll();
        }
        
        if (turnos.length === 0) {
            tbody.innerHTML = '';
            noData.style.display = 'block';
            return;
        }
        
        noData.style.display = 'none';
        var html = '';
        
        for (var i = 0; i < turnos.length; i++) {
            var turno = turnos[i];
            html += '<tr>';
            html += '<td>' + turno.alumnoNombre + '</td>';
            html += '<td>' + turno.materia + '</td>';
            html += '<td>' + utils.formatDate(turno.fecha) + '</td>';
            html += '<td>' + turno.hora + '</td>';
            html += '<td><span class="badge badge-' + turno.estado + '">' + turno.estado + '</span></td>';
            html += '<td>';
            html += '<div class="action-buttons">';
            html += '<button class="btn btn-sm btn-secondary btn-editar-turno" data-id="' + turno.id + '">Editar</button>';
            html += '<button class="btn btn-sm btn-danger btn-eliminar-turno" data-id="' + turno.id + '">Eliminar</button>';
            html += '</div>';
            html += '</td>';
            html += '</tr>';
        }
        
        tbody.innerHTML = html;
    }
};

// Gestión de modal
var modal = {
    open: function(title, formType) {
        var modalEl = document.getElementById('modal');
        var titleEl = document.getElementById('modal-title');
        var alumnoForm = document.getElementById('form-alumno');
        var turnoForm = document.getElementById('form-turno');
        
        titleEl.textContent = title;
        
        // Ocultar todos los formularios
        alumnoForm.style.display = 'none';
        turnoForm.style.display = 'none';
        
        // Mostrar el formulario correcto
        if (formType === 'alumno') {
            alumnoForm.style.display = 'block';
        } else if (formType === 'turno') {
            turnoForm.style.display = 'block';
        }
        
        modalEl.classList.add('active');
        
        // Focus en el primer input del formulario activo
        var activeForm = formType === 'alumno' ? alumnoForm : turnoForm;
        var firstInput = activeForm.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(function() {
                firstInput.focus();
            }, 100);
        }
    },
    
    close: function() {
        var modalEl = document.getElementById('modal');
        modalEl.classList.remove('active');
        this.clearForms();
        appState.editingAlumno = null;
        appState.editingTurno = null;
    },
    
    clearForms: function() {
        var alumnoForm = document.getElementById('form-alumno');
        var turnoForm = document.getElementById('form-turno');
        
        if (alumnoForm) alumnoForm.reset();
        if (turnoForm) turnoForm.reset();
    }
};

// Gestión de formularios CRUD
var crud = {
    // Crear nuevo alumno
    nuevoAlumno: function() {
        appState.editingAlumno = null;
        modal.open('Nuevo Alumno', 'alumno');
    },
    
    // Editar alumno
    editarAlumno: function(id) {
        var alumno = alumnosCrud.getById(id);
        if (!alumno) return;
        
        appState.editingAlumno = alumno;
        
        // Llenar formulario
        document.getElementById('alumno-nombre').value = alumno.nombre;
        document.getElementById('alumno-email').value = alumno.email;
        document.getElementById('alumno-telefono').value = alumno.telefono;
        document.getElementById('alumno-materia').value = alumno.materia;
        document.getElementById('alumno-nivel').value = alumno.nivel || '';
        
        modal.open('Editar Alumno', 'alumno');
    },
    
    // Eliminar alumno
    eliminarAlumno: function(id) {
        var alumno = alumnosCrud.getById(id);
        if (!alumno) return;
        
        if (confirm('¿Estás seguro de que quieres eliminar a ' + alumno.nombre + '?')) {
            alumnosCrud.delete(id);
            ui.renderTablaAlumnos();
            ui.renderAlumnosOptions();
            this.showNotification('Alumno eliminado correctamente', 'success');
        }
    },
    
    // Guardar alumno (crear o actualizar)
    guardarAlumno: function(event) {
        event.preventDefault();
        
        var nombre = document.getElementById('alumno-nombre').value.trim();
        var email = document.getElementById('alumno-email').value.trim();
        var telefono = document.getElementById('alumno-telefono').value.trim();
        var materia = document.getElementById('alumno-materia').value;
        var nivel = document.getElementById('alumno-nivel').value;
        
        // Validaciones
        if (!nombre || !email || !telefono || !materia) {
            this.showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        if (!utils.validateEmail(email)) {
            this.showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        if (!utils.validatePhone(telefono)) {
            this.showNotification('Por favor ingresa un teléfono válido', 'error');
            return;
        }
        
        var alumnoData = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            materia: materia,
            nivel: nivel
        };
        
        if (appState.editingAlumno) {
            // Actualizar
            alumnosCrud.update(appState.editingAlumno.id, alumnoData);
            this.showNotification('Alumno actualizado correctamente', 'success');
        } else {
            // Crear
            alumnosCrud.create(alumnoData);
            this.showNotification('Alumno creado correctamente', 'success');
        }
        
        modal.close();
        ui.renderTablaAlumnos();
        ui.renderAlumnosOptions();
        filters.applyAlumnosFilters();
    },
    
    // Crear nuevo turno
    nuevoTurno: function() {
        appState.editingTurno = null;
        modal.open('Nuevo Turno', 'turno');
        
        // Establecer fecha mínima (hoy)
        var today = new Date().toISOString().split('T')[0];
        document.getElementById('turno-fecha').min = today;
    },
    
    // Editar turno
    editarTurno: function(id) {
        var turno = turnosCrud.getById(id);
        if (!turno) return;
        
        appState.editingTurno = turno;
        
        // Llenar formulario
        document.getElementById('turno-alumno').value = turno.alumnoId;
        document.getElementById('turno-materia').value = turno.materia;
        document.getElementById('turno-fecha').value = turno.fecha;
        document.getElementById('turno-hora').value = turno.hora;
        document.getElementById('turno-duracion').value = turno.duracion;
        document.getElementById('turno-notas').value = turno.notas || '';
        
        modal.open('Editar Turno', 'turno');
    },
    
    // Eliminar turno
    eliminarTurno: function(id) {
        var turno = turnosCrud.getById(id);
        if (!turno) return;
        
        if (confirm('¿Estás seguro de que quieres eliminar el turno del ' + utils.formatDate(turno.fecha) + ' a las ' + turno.hora + '?')) {
            turnosCrud.delete(id);
            ui.renderTablaTurnos();
            this.showNotification('Turno eliminado correctamente', 'success');
        }
    },
    
    // Guardar turno (crear o actualizar)
    guardarTurno: function(event) {
        event.preventDefault();
        
        var alumnoId = document.getElementById('turno-alumno').value;
        var materia = document.getElementById('turno-materia').value;
        var fecha = document.getElementById('turno-fecha').value;
        var hora = document.getElementById('turno-hora').value;
        var duracion = document.getElementById('turno-duracion').value;
        var notas = document.getElementById('turno-notas').value.trim();
        
        // Validaciones
        if (!alumnoId || !materia || !fecha || !hora) {
            this.showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Obtener nombre del alumno
        var alumno = alumnosCrud.getById(parseFloat(alumnoId));
        if (!alumno) {
            this.showNotification('Alumno no encontrado', 'error');
            return;
        }
        
        var turnoData = {
            alumnoId: parseFloat(alumnoId),
            alumnoNombre: alumno.nombre,
            materia: materia,
            fecha: fecha,
            hora: hora,
            duracion: duracion,
            notas: notas
        };
        
        if (appState.editingTurno) {
            // Actualizar
            turnosCrud.update(appState.editingTurno.id, turnoData);
            this.showNotification('Turno actualizado correctamente', 'success');
        } else {
            // Crear
            turnosCrud.create(turnoData);
            this.showNotification('Turno creado correctamente', 'success');
        }
        
        modal.close();
        ui.renderTablaTurnos();
        filters.applyTurnosFilters();
    },
    
    // Mostrar notificación
    showNotification: function(message, type) {
        var notification = document.getElementById('notification');
        var messageEl = document.getElementById('notification-message');
        
        messageEl.textContent = message;
        notification.className = 'notification ' + type;
        notification.classList.add('show');
        
        setTimeout(function() {
            notification.classList.remove('show');
        }, 3000);
    }
};

// Sistema de filtros
var filters = {
    // Aplicar filtros de alumnos
    applyAlumnosFilters: function() {
        var searchTerm = document.getElementById('buscar-alumno').value.toLowerCase();
        var materiaFilter = document.getElementById('filtro-materia-alumno').value;
        
        var alumnos = alumnosCrud.getAll();
        var filteredAlumnos = [];
        
        for (var i = 0; i < alumnos.length; i++) {
            var alumno = alumnos[i];
            var matchesSearch = !searchTerm || 
                alumno.nombre.toLowerCase().indexOf(searchTerm) !== -1 ||
                alumno.email.toLowerCase().indexOf(searchTerm) !== -1;
            var matchesMateria = !materiaFilter || alumno.materia === materiaFilter;
            
            if (matchesSearch && matchesMateria) {
                filteredAlumnos.push(alumno);
            }
        }
        
        ui.renderTablaAlumnos(filteredAlumnos);
    },
    
    // Aplicar filtros de turnos
    applyTurnosFilters: function() {
        var searchTerm = document.getElementById('buscar-turno').value.toLowerCase();
        var materiaFilter = document.getElementById('filtro-materia-turno').value;
        var fechaFilter = document.getElementById('filtro-fecha').value;
        
        var turnos = turnosCrud.getAll();
        var filteredTurnos = [];
        
        for (var i = 0; i < turnos.length; i++) {
            var turno = turnos[i];
            var matchesSearch = !searchTerm || 
                turno.alumnoNombre.toLowerCase().indexOf(searchTerm) !== -1 ||
                turno.materia.toLowerCase().indexOf(searchTerm) !== -1;
            var matchesMateria = !materiaFilter || turno.materia === materiaFilter;
            var matchesFecha = !fechaFilter || turno.fecha === fechaFilter;
            
            if (matchesSearch && matchesMateria && matchesFecha) {
                filteredTurnos.push(turno);
            }
        }
        
        ui.renderTablaTurnos(filteredTurnos);
    }
};

// Gestión de tabs
var tabs = {
    switchTab: function(tabName) {
        // Actualizar botones de tab
        var tabButtons = document.querySelectorAll('.tab-button');
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        document.getElementById('tab-' + tabName).classList.add('active');
        
        // Actualizar contenido de tabs
        var tabContents = document.querySelectorAll('.tab-content');
        for (var i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }
        document.getElementById('content-' + tabName).classList.add('active');
        
        appState.activeTab = tabName;
        
        // Actualizar datos según el tab activo
        if (tabName === 'alumnos') {
            ui.renderTablaAlumnos();
        } else if (tabName === 'turnos') {
            ui.renderTablaTurnos();
        }
    }
};

// Navegación
var navigation = {
    // Smooth scroll
    smoothScroll: function(targetId) {
        var target = document.getElementById(targetId.replace('#', ''));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },
    
    // Toggle menú móvil
    toggleMobileMenu: function() {
        var navMenu = document.getElementById('nav-menu');
        var navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    },
    
    // Cerrar menú móvil
    closeMobileMenu: function() {
        var navMenu = document.getElementById('nav-menu');
        var navToggle = document.getElementById('nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
};

// Event Listeners
var eventListeners = {
    setupAll: function() {
        // Event listeners para navegación
        var navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', navigation.toggleMobileMenu);
        }
        
        // Event listeners para links de navegación
        var navLinks = document.querySelectorAll('.nav-link');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                var href = this.getAttribute('href');
                navigation.smoothScroll(href);
                navigation.closeMobileMenu();
            });
        }
        
        // Event listeners para hero buttons
        var heroButtons = document.querySelectorAll('.hero-buttons .btn');
        for (var i = 0; i < heroButtons.length; i++) {
            heroButtons[i].addEventListener('click', function(e) {
                e.preventDefault();
                var href = this.getAttribute('href');
                navigation.smoothScroll(href);
            });
        }
        
        // Event listeners para tabs
        var tabAlumnos = document.getElementById('tab-alumnos');
        var tabTurnos = document.getElementById('tab-turnos');
        
        if (tabAlumnos) {
            tabAlumnos.addEventListener('click', function() {
                tabs.switchTab('alumnos');
            });
        }
        
        if (tabTurnos) {
            tabTurnos.addEventListener('click', function() {
                tabs.switchTab('turnos');
            });
        }
        
        // Event listeners para botones de CRUD
        var btnNuevoAlumno = document.getElementById('btn-nuevo-alumno');
        var btnNuevoTurno = document.getElementById('btn-nuevo-turno');
        
        if (btnNuevoAlumno) {
            btnNuevoAlumno.addEventListener('click', crud.nuevoAlumno);
        }
        
        if (btnNuevoTurno) {
            btnNuevoTurno.addEventListener('click', crud.nuevoTurno);
        }
        
        // Event listeners para modal
        var modalClose = document.getElementById('modal-close');
        var cancelarAlumno = document.getElementById('cancelar-alumno');
        var cancelarTurno = document.getElementById('cancelar-turno');
        var modal = document.getElementById('modal');
        
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.close();
            });
        }
        
        if (cancelarAlumno) {
            cancelarAlumno.addEventListener('click', function() {
                modal.close();
            });
        }
        
        if (cancelarTurno) {
            cancelarTurno.addEventListener('click', function() {
                modal.close();
            });
        }
        
        // Cerrar modal al hacer clic fuera
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.close();
                }
            });
        }
        
        // Event listeners para formularios
        var formAlumno = document.getElementById('form-alumno');
        var formTurno = document.getElementById('form-turno');
        
        if (formAlumno) {
            formAlumno.addEventListener('submit', crud.guardarAlumno);
        }
        
        if (formTurno) {
            formTurno.addEventListener('submit', crud.guardarTurno);
        }
        
        // Event listeners para filtros
        var buscarAlumno = document.getElementById('buscar-alumno');
        var filtroMateriaAlumno = document.getElementById('filtro-materia-alumno');
        var buscarTurno = document.getElementById('buscar-turno');
        var filtroMateriaTurno = document.getElementById('filtro-materia-turno');
        var filtroFecha = document.getElementById('filtro-fecha');
        
        if (buscarAlumno) {
            buscarAlumno.addEventListener('keyup', filters.applyAlumnosFilters);
        }
        
        if (filtroMateriaAlumno) {
            filtroMateriaAlumno.addEventListener('change', filters.applyAlumnosFilters);
        }
        
        if (buscarTurno) {
            buscarTurno.addEventListener('keyup', filters.applyTurnosFilters);
        }
        
        if (filtroMateriaTurno) {
            filtroMateriaTurno.addEventListener('change', filters.applyTurnosFilters);
        }
        
        if (filtroFecha) {
            filtroFecha.addEventListener('change', filters.applyTurnosFilters);
        }
        
        // Event delegation para botones dinámicos
        document.addEventListener('click', function(e) {
            // Editar alumno
            if (e.target.classList.contains('btn-editar-alumno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.editarAlumno(id);
            }
            
            // Eliminar alumno
            if (e.target.classList.contains('btn-eliminar-alumno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.eliminarAlumno(id);
            }
            
            // Editar turno
            if (e.target.classList.contains('btn-editar-turno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.editarTurno(id);
            }
            
            // Eliminar turno
            if (e.target.classList.contains('btn-eliminar-turno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.eliminarTurno(id);
            }
        });
        
        // Event listener para tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                var modalEl = document.getElementById('modal');
                if (modalEl.classList.contains('active')) {
                    modal.close();
                }
            }
        });
    }
};

// Función de inicialización
function init() {
    // Cargar datos desde localStorage
    alumnosCrud.loadFromStorage();
    turnosCrud.loadFromStorage();
    
    // Renderizar contenido estático
    ui.renderMaterias();
    ui.renderMetodologia();
    ui.renderTestimonios();
    ui.renderMateriasOptions();
    ui.renderAlumnosOptions();
    
    // Renderizar datos dinámicos
    ui.renderTablaAlumnos();
    ui.renderTablaTurnos();
    
    // Configurar event listeners
    eventListeners.setupAll();
    
    // Establecer tab inicial
    tabs.switchTab('alumnos');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
```