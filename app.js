// Datos de la aplicación

var appData = {
    materias: [
        {id: 1, nombre: "Matemática", nivel: "Primario, Secundario, Universitario", imagen: "images/matematica.jpg"},
        {id: 2, nombre: "Física", nivel: "Secundario, Universitario", imagen: "images/fisica.jpg"},
        {id: 3, nombre: "Química", nivel: "Secundario, Universitario", imagen: "images/quimica.jpg"},
        {id: 4, nombre: "Biología", nivel: "Secundario, Universitario", imagen: "images/biologia.jpg"},
        {id: 5, nombre: "Historia", nivel: "Primario, Secundario", imagen: "images/historia.jpg"},
        {id: 6, nombre: "Geografía", nivel: "Primario, Secundario", imagen: "images/geografia.jpg"},
        {id: 7, nombre: "Literatura", nivel: "Secundario", imagen: "images/literatura.jpg"},
        {id: 8, nombre: "Inglés", nivel: "Todos los niveles", imagen: "images/ingles.jpg"},
        {id: 9, nombre: "Filosofía", nivel: "Secundario", imagen: "images/filosofia.jpg"},
        {id: 10, nombre: "Economía", nivel: "Secundario, Universitario", imagen: "images/economia.jpg"},
        {id: 11, nombre: "Contabilidad", nivel: "Secundario, Universitario", imagen: "images/contabilidad.jpg"},
        {id: 12, nombre: "Informática", nivel: "Todos los niveles", imagen: "images/informatica.jpg"}
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
    generateId: function() {
        return Date.now() + Math.random();
    },
    
    formatDate: function(date) {
        if (!date) return '';
        var d = new Date(date);
        var day = d.getDate().toString().padStart(2, '0');
        var month = (d.getMonth() + 1).toString().padStart(2, '0');
        var year = d.getFullYear();
        return day + '/' + month + '/' + year;
    },
    
    validateEmail: function(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
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
    getAll: function() {
        return appState.alumnos;
    },
    
    getById: function(id) {
        for (var i = 0; i < appState.alumnos.length; i++) {
            if (appState.alumnos[i].id === id) {
                return appState.alumnos[i];
            }
        }
        return null;
    },
    
    create: function(alumnoData) {
        var newAlumno = {
            id: utils.generateId(),
            nombre: alumnoData.nombre,
            email: alumnoData.email,
            telefono: alumnoData.telefono,
            nivel: alumnoData.nivel || '',
            fechaRegistro: new Date().toISOString()
        };
        appState.alumnos.push(newAlumno);
        this.saveToStorage();
        return newAlumno;
    },
    
    update: function(id, alumnoData) {
        for (var i = 0; i < appState.alumnos.length; i++) {
            if (appState.alumnos[i].id === id) {
                appState.alumnos[i].nombre = alumnoData.nombre;
                appState.alumnos[i].email = alumnoData.email;
                appState.alumnos[i].telefono = alumnoData.telefono;
                appState.alumnos[i].nivel = alumnoData.nivel || '';
                this.saveToStorage();
                return appState.alumnos[i];
            }
        }
        return null;
    },
    
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
    
    saveToStorage: function() {
        storage.save('alumnos', appState.alumnos);
    },
    
    loadFromStorage: function() {
        var alumnos = storage.load('alumnos');
        appState.alumnos = alumnos || [];
    }
};


// CRUD de Turnos
var turnosCrud = {
    getAll: function() {
        return appState.turnos;
    },
    
    getById: function(id) {
        for (var i = 0; i < appState.turnos.length; i++) {
            if (appState.turnos[i].id === id) {
                return appState.turnos[i];
            }
        }
        return null;
    },
    
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
    
    saveToStorage: function() {
        storage.save('turnos', appState.turnos);
    },
    
    loadFromStorage: function() {
        var turnos = storage.load('turnos');
        appState.turnos = turnos || [];
    }
};

// Funciones de UI
var ui = {
    renderMaterias: function() {
        var container = document.getElementById('materias-grid');
        if (!container) return;
        
        var html = '';
        for (var i = 0; i < appData.materias.length; i++) {
            var materia = appData.materias[i];
            html += '<div class="materia-card">';
            html += '<div class="materia-icon">';
            html += '<img src="' + materia.imagen + '" alt="' + materia.nombre + '" class="materia-imagen">';
            html += '</div>';
            html += '<h3 class="materia-nombre">' + materia.nombre + '</h3>';
            html += '<p class="materia-nivel">' + materia.nivel + '</p>';
            html += '</div>';
        }
        container.innerHTML = html;
    },
    
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
    
    renderAlumnos: function() {
        var tbody = document.getElementById('tabla-alumnos');
        if (!tbody) return;
        
        var alumnos = this.getFilteredAlumnos();
        var html = '';
        
        if (alumnos.length === 0) {
            html = '<tr><td colspan="5" class="no-data">No hay alumnos que coincidan con el filtro</td></tr>';
        } else {
            for (var i = 0; i < alumnos.length; i++) {
                var alumno = alumnos[i];
                html += '<tr>';
                html += '<td>' + alumno.nombre + '</td>';
                html += '<td>' + alumno.email + '</td>';
                html += '<td>' + alumno.telefono + '</td>';
                html += '<td>' + (alumno.nivel || 'No especificado') + '</td>';
                html += '<td class="action-buttons">';
                html += '<button class="btn btn-sm btn-secondary btn-editar-alumno" data-id="' + alumno.id + '">Editar</button>';
                html += '<button class="btn btn-sm btn-danger btn-eliminar-alumno" data-id="' + alumno.id + '">Eliminar</button>';
                html += '</td>';
                html += '</tr>';
            }
        }
        tbody.innerHTML = html;
    },
    
    renderTurnos: function() {
        var tbody = document.getElementById('tabla-turnos');
        if (!tbody) return;
        
        var turnos = this.getFilteredTurnos();
        var html = '';
        
        if (turnos.length === 0) {
            html = '<tr><td colspan="6" class="no-data">No hay turnos que coincidan con el filtro</td></tr>';
        } else {
            for (var i = 0; i < turnos.length; i++) {
                var turno = turnos[i];
                html += '<tr>';
                html += '<td>' + turno.alumnoNombre + '</td>';
                html += '<td>' + turno.materia + '</td>';
                html += '<td>' + utils.formatDate(turno.fecha) + '</td>';
                html += '<td>' + turno.hora + '</td>';
                html += '<td>' + turno.estado + '</td>';
                html += '<td class="action-buttons">';
                html += '<button class="btn btn-sm btn-secondary btn-editar-turno" data-id="' + turno.id + '">Editar</button>';
                html += '<button class="btn btn-sm btn-danger btn-eliminar-turno" data-id="' + turno.id + '">Eliminar</button>';
                html += '</td>';
                html += '</tr>';
            }
        }
        tbody.innerHTML = html;
    },
    
    getFilteredAlumnos: function() {
    var busqueda = document.getElementById('buscar-alumno').value.toLowerCase();
    
    var alumnos = alumnosCrud.getAll();
    var filtrados = [];
    
    for (var i = 0; i < alumnos.length; i++) {
        var alumno = alumnos[i];
        var coincideBusqueda = alumno.nombre.toLowerCase().indexOf(busqueda) !== -1 || 
                              alumno.email.toLowerCase().indexOf(busqueda) !== -1;
        
        if (coincideBusqueda) {
            filtrados.push(alumno);
        }
    }
    
    return filtrados;
    },

    
   getFilteredTurnos: function() {
    var busqueda = document.getElementById('buscar-turno').value.toLowerCase();
    var materiaFiltro = document.getElementById('filtro-materia-turno').value;
    var fechaFiltro = document.getElementById('filtro-fecha').value;
    
    var turnos = turnosCrud.getAll();
    var filtrados = [];
    
    for (var i = 0; i < turnos.length; i++) {
        var turno = turnos[i];
        var coincideBusqueda = turno.alumnoNombre.toLowerCase().indexOf(busqueda) !== -1;
        var coincideMateria = !materiaFiltro || turno.materia === materiaFiltro;
        
        // Normalización de fechas
        var coincideFecha = true;
        if (fechaFiltro) {
            // Convertir fecha del filtro (YYYY-MM-DD) a formato DD/MM/YYYY
            var partesFiltro = fechaFiltro.split('-');
            var fechaFiltroFormateada = partesFiltro[2] + '/' + partesFiltro[1] + '/' + partesFiltro[0];
            
            // Comparar directamente los strings formateados
            coincideFecha = turno.fecha === fechaFiltroFormateada;
        }
        
        if (coincideBusqueda && coincideMateria && coincideFecha) {
            filtrados.push(turno);
        }
    }
    
    return filtrados;
},

    
    updateMateriaSelects: function() {
        var selects = ['turno-materia', 'filtro-materia-turno'];
        
        for (var i = 0; i < selects.length; i++) {
            var select = document.getElementById(selects[i]);
            if (select) {
                var currentValue = select.value;
                var html = '<option value="">Seleccione una materia</option>';
                
                for (var j = 0; j < appData.materias.length; j++) {
                    var materia = appData.materias[j];
                    html += '<option value="' + materia.nombre + '">' + materia.nombre + '</option>';
                }
                
                select.innerHTML = html;
                select.value = currentValue;
            }
        }
    },
    
    updateAlumnoSelect: function() {
        var select = document.getElementById('turno-alumno');
        if (!select) return;
        
        var currentValue = select.value;
        var html = '<option value="">Seleccione un alumno</option>';
        
        var alumnos = alumnosCrud.getAll();
        for (var i = 0; i < alumnos.length; i++) {
            var alumno = alumnos[i];
            html += '<option value="' + alumno.id + '">' + alumno.nombre + '</option>';
        }
        
        select.innerHTML = html;
        select.value = currentValue;
    },
    
    showNotification: function(message, type) {
        var notification = document.getElementById('notification');
        var messageEl = document.getElementById('notification-message');
        
        if (notification && messageEl) {
            messageEl.textContent = message;
            notification.className = 'notification ' + (type || 'info') + ' show';
            
            setTimeout(function() {
                notification.classList.remove('show');
            }, 3000);
        }
    }
};

// Gestión de modales
var modal = {
    open: function(formId, title) {
        var modalEl = document.getElementById('modal');
        var titleEl = document.getElementById('modal-title');
        
        // FORZAR ocultación de todos los formularios PRIMERO
        var forms = ['form-alumno', 'form-turno'];
        for (var i = 0; i < forms.length; i++) {
            var form = document.getElementById(forms[i]);
            if (form) {
                form.classList.add('hidden');
                form.style.display = 'none'; // Forzar ocultación inmediata
            }
        }
        
        // Pequeño delay para asegurar que el CSS se aplique
        setTimeout(function() {
            // Mostrar SOLO el formulario solicitado
            var targetForm = document.getElementById(formId);
            if (targetForm) {
                targetForm.classList.remove('hidden');
                targetForm.style.display = 'block'; // Forzar visualización
            }
            
            if (titleEl) {
                titleEl.textContent = title;
            }
            
            if (modalEl) {
                modalEl.classList.add('active');
            }
        }, 10); // 10ms es suficiente para forzar el re-render
    },
    
    close: function() {
        var modalEl = document.getElementById('modal');
        if (modalEl) {
            modalEl.classList.remove('active');
        }
        
        // Limpiar y ocultar todos los formularios
        var forms = ['form-alumno', 'form-turno'];
        for (var i = 0; i < forms.length; i++) {
            var form = document.getElementById(forms[i]);
            if (form) {
                form.reset();
                form.classList.add('hidden');
                form.style.display = 'none';
            }
        }
        
        appState.editingAlumno = null;
        appState.editingTurno = null;
    }
};
// Funciones de CRUD
var crud = {
    nuevoAlumno: function() {
        modal.open('form-alumno', 'Nuevo Alumno');
    },
    
    editarAlumno: function(id) {
        var alumno = alumnosCrud.getById(id);
        if (!alumno) return;
        
        document.getElementById('alumno-nombre').value = alumno.nombre;
        document.getElementById('alumno-email').value = alumno.email;
        document.getElementById('alumno-telefono').value = alumno.telefono;
        document.getElementById('alumno-nivel').value = alumno.nivel;
        
        appState.editingAlumno = id;
        modal.open('form-alumno', 'Editar Alumno');
    },
    
    eliminarAlumno: function(id) {
        var alumno = alumnosCrud.getById(id);
        if (!alumno) return;
        
        if (confirm('¿Está seguro de eliminar a ' + alumno.nombre + '?')) {
            alumnosCrud.delete(id);
            ui.renderAlumnos();
            ui.updateAlumnoSelect();
            ui.showNotification('Alumno eliminado correctamente', 'success');
        }
    },
    
    guardarAlumno: function(formData) {
    if (!formData.nombre || !formData.email || !formData.telefono) {
        ui.showNotification('Por favor complete todos los campos obligatorios', 'error');
        return false;
    }
    
    if (!utils.validateEmail(formData.email)) {
        ui.showNotification('Por favor ingrese un email válido', 'error');
        return false;
    }
    
    if (!utils.validatePhone(formData.telefono)) {
        ui.showNotification('Por favor ingrese un teléfono válido', 'error');
        return false;
    }
    
    try {
        if (appState.editingAlumno) {
            alumnosCrud.update(appState.editingAlumno, formData);
            ui.showNotification('Alumno actualizado correctamente', 'success');
        } else {
            alumnosCrud.create(formData);
            ui.showNotification('Alumno creado correctamente', 'success');
        }
        
        modal.close();
        ui.renderAlumnos();
        ui.updateAlumnoSelect();
        return true;
    } catch (error) {
        ui.showNotification('Error al guardar el alumno', 'error');
        return false;
    }
    },
    
    nuevoTurno: function() {
        var alumnos = alumnosCrud.getAll();
        if (alumnos.length === 0) {
            ui.showNotification('Debe registrar al menos un alumno antes de crear turnos', 'warning');
            return;
        }
        
        modal.open('form-turno', 'Nuevo Turno');
    },
    
    editarTurno: function(id) {
        var turno = turnosCrud.getById(id);
        if (!turno) return;
        
        document.getElementById('turno-alumno').value = turno.alumnoId;
        document.getElementById('turno-materia').value = turno.materia;
        document.getElementById('turno-fecha').value = turno.fecha;
        document.getElementById('turno-hora').value = turno.hora;
        document.getElementById('turno-duracion').value = turno.duracion;
        document.getElementById('turno-notas').value = turno.notas;
        
        appState.editingTurno = id;
        modal.open('form-turno', 'Editar Turno');
    },
    
    eliminarTurno: function(id) {
        var turno = turnosCrud.getById(id);
        if (!turno) return;
        
        if (confirm('¿Está seguro de eliminar el turno del ' + utils.formatDate(turno.fecha) + ' a las ' + turno.hora + '?')) {
            turnosCrud.delete(id);
            ui.renderTurnos();
            ui.showNotification('Turno eliminado correctamente', 'success');
        }
    },
    
     guardarTurno: function(formData) {
        if (!formData.alumnoId || !formData.materia || !formData.fecha || !formData.hora) {
            ui.showNotification('Por favor complete todos los campos obligatorios', 'error');
            return false;
        }
    
        var alumno = null;
        for (var i = 0; i < appState.alumnos.length; i++) {
            if (appState.alumnos[i].id == formData.alumnoId) {
                alumno = appState.alumnos[i];
                break;
            }
        }
    
        if (!alumno) {
            ui.showNotification('Alumno no encontrado', 'error');
            return false;
        }
    
    // Convertir fecha a formato DD/MM/YYYY sin zona horaria
        var partesDate = formData.fecha.split('-');
        var fechaFormateada = partesDate[2] + '/' + partesDate[1] + '/' + partesDate[0];
    
        formData.fecha = fechaFormateada;
        formData.alumnoNombre = alumno.nombre;
    
        try {
            if (appState.editingTurno) {
                turnosCrud.update(appState.editingTurno, formData);
                ui.showNotification('Turno actualizado correctamente', 'success');
            } else {
                turnosCrud.create(formData);
                ui.showNotification('Turno creado correctamente', 'success');
            }
        
        modal.close();
        ui.renderTurnos();
        return true;
    } catch (error) {
        ui.showNotification('Error al guardar el turno', 'error');
        return false;
    }
}
};         

// Event listeners y configuración
var eventListeners = {
    setupAll: function() {
        // Botones principales
        var btnNuevoAlumno = document.getElementById('btn-nuevo-alumno');
        var btnNuevoTurno = document.getElementById('btn-nuevo-turno');
        var modalClose = document.getElementById('modal-close');
        var modalEl = document.getElementById('modal');
        var cancelAlumno = document.getElementById('cancel-alumno');
        var cancelTurno = document.getElementById('cancel-turno');
        
        // Event listeners para botones principales
        if (btnNuevoAlumno) {
            btnNuevoAlumno.addEventListener('click', function() {
                crud.nuevoAlumno();
            });
        }
        
        if (btnNuevoTurno) {
            btnNuevoTurno.addEventListener('click', function() {
                crud.nuevoTurno();
            });
        }
        
        // Event listeners para modal
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.close();
            });
        }
        
        if (modalEl) {
            modalEl.addEventListener('click', function(e) {
                if (e.target === modalEl) {
                    modal.close();
                }
            });
        }
        
        if (cancelAlumno) {
            cancelAlumno.addEventListener('click', function() {
                modal.close();
            });
        }
        
        if (cancelTurno) {
            cancelTurno.addEventListener('click', function() {
                modal.close();
            });
        }
        
        // Event listeners para formularios
        var formAlumno = document.getElementById('form-alumno');
        var formTurno = document.getElementById('form-turno');
        
        if (formAlumno) {
            formAlumno.addEventListener('submit', function(e) {
                e.preventDefault();
                var formData = {
                    nombre: document.getElementById('alumno-nombre').value,
                    email: document.getElementById('alumno-email').value,
                    telefono: document.getElementById('alumno-telefono').value,
                    nivel: document.getElementById('alumno-nivel').value
                };
                crud.guardarAlumno(formData);
            });
        }
        
        if (formTurno) {
            formTurno.addEventListener('submit', function(e) {
                e.preventDefault();
                var formData = {
                    alumnoId: document.getElementById('turno-alumno').value,
                    materia: document.getElementById('turno-materia').value,
                    fecha: document.getElementById('turno-fecha').value,
                    hora: document.getElementById('turno-hora').value,
                    duracion: document.getElementById('turno-duracion').value,
                    notas: document.getElementById('turno-notas').value
                };
                crud.guardarTurno(formData);
            });
        }
        
        // Event listeners para botones de tabla (delegación de eventos)
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-editar-alumno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.editarAlumno(id);
            } else if (e.target.classList.contains('btn-eliminar-alumno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.eliminarAlumno(id);
            } else if (e.target.classList.contains('btn-editar-turno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.editarTurno(id);
            } else if (e.target.classList.contains('btn-eliminar-turno')) {
                var id = parseFloat(e.target.getAttribute('data-id'));
                crud.eliminarTurno(id);
            }
        });
        
        // Event listeners para filtros
        var buscarAlumno = document.getElementById('buscar-alumno');
        var buscarTurno = document.getElementById('buscar-turno');
        var filtroMateriaTurno = document.getElementById('filtro-materia-turno');
        var filtroFecha = document.getElementById('filtro-fecha');
        
        if (buscarAlumno) {
            buscarAlumno.addEventListener('keyup', function() {
                ui.renderAlumnos();
            });
        }
        
        if (buscarTurno) {
            buscarTurno.addEventListener('keyup', function() {
                ui.renderTurnos();
            });
        }
        
        if (filtroMateriaTurno) {
            filtroMateriaTurno.addEventListener('change', function() {
                ui.renderTurnos();
            });
        }
        
        if (filtroFecha) {
            filtroFecha.addEventListener('change', function() {
                ui.renderTurnos();
            });
        }
        
        // Event listeners para tabs
        var tabAlumnos = document.getElementById('tab-alumnos');
        var tabTurnos = document.getElementById('tab-turnos');
        
        if (tabAlumnos) {
            tabAlumnos.addEventListener('click', function() {
                // Remover clase active de todos los tabs
                var allTabs = document.querySelectorAll('.tab-button');
                var allContents = document.querySelectorAll('.tab-content');
                
                for (var i = 0; i < allTabs.length; i++) {
                    allTabs[i].classList.remove('active');
                }
                for (var j = 0; j < allContents.length; j++) {
                    allContents[j].classList.remove('active');
                }
                
                // Activar tab de alumnos
                this.classList.add('active');
                var contentAlumnos = document.getElementById('content-alumnos');
                if (contentAlumnos) {
                    contentAlumnos.classList.add('active');
                }
                
                appState.activeTab = 'alumnos';
            });
        }
        
        if (tabTurnos) {
            tabTurnos.addEventListener('click', function() {
                // Remover clase active de todos los tabs
                var allTabs = document.querySelectorAll('.tab-button');
                var allContents = document.querySelectorAll('.tab-content');
                
                for (var i = 0; i < allTabs.length; i++) {
                    allTabs[i].classList.remove('active');
                }
                for (var j = 0; j < allContents.length; j++) {
                    allContents[j].classList.remove('active');
                }
                
                // Activar tab de turnos
                this.classList.add('active');
                var contentTurnos = document.getElementById('content-turnos');
                if (contentTurnos) {
                    contentTurnos.classList.add('active');
                }
                
                appState.activeTab = 'turnos';
            });
        }
        
        // Event listener para tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.close();
            }
        });
        
        // Event listeners para navegación móvil
        var navToggle = document.querySelector('.nav-toggle');
        var navMenu = document.querySelector('.nav-menu');
        var navLinks = document.querySelectorAll('.nav-link');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    }
};

// Inicialización
function init() {
    alumnosCrud.loadFromStorage();
    turnosCrud.loadFromStorage();
    
    ui.renderMaterias();
    ui.renderMetodologia();
    ui.renderTestimonios();
    
    ui.updateMateriaSelects();
    ui.updateAlumnoSelect();
    
    ui.renderAlumnos();
    ui.renderTurnos();
    
    eventListeners.setupAll();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
