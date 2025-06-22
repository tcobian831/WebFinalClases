# Código HTML - index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Clases particulares con Tomás Cobián - Profesor especializado en más de 12 materias">
    <meta name="keywords" content="clases particulares, profesor, matemática, física, química, apoyo escolar">
    <title>Tomás Cobián - Clases Particulares</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <nav class="nav container">
            <div class="nav-brand">
                <h1 class="nav-title">Tomás Cobián</h1>
                <span class="nav-subtitle">Profesor Particular Especializado</span>
            </div>
            <button class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="#inicio" class="nav-link">Inicio</a></li>
                <li><a href="#sobre-mi" class="nav-link">Sobre Mí</a></li>
                <li><a href="#materias" class="nav-link">Materias</a></li>
                <li><a href="#metodologia" class="nav-link">Metodología</a></li>
                <li><a href="#testimonios" class="nav-link">Testimonios</a></li>
                <li><a href="#gestion" class="nav-link">Gestión</a></li>
            </ul>
        </nav>
    </header>

    <main class="main">
        <!-- Hero Section -->
        <section id="inicio" class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">Clases Particulares de Excelencia</h1>
                    <p class="hero-subtitle">Apoyo académico personalizado con 8 años de experiencia en múltiples materias</p>
                    <div class="hero-buttons">
                        <a href="#gestion" class="btn btn-primary">Reservar Clase</a>
                        <a href="#sobre-mi" class="btn btn-secondary">Conocer Más</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sobre Mí Section -->
        <section id="sobre-mi" class="sobre-mi">
            <div class="container">
                <div class="sobre-mi-content">
                    <div class="sobre-mi-text">
                        <h2 class="section-title">Sobre Mí</h2>
                        <h3 class="sobre-mi-nombre">Tomás Cobián</h3>
                        <p class="sobre-mi-titulo">Profesor Particular Especializado</p>
                        <p class="sobre-mi-experiencia">8 años de experiencia en enseñanza personalizada</p>
                        <p class="sobre-mi-descripcion">
                            Soy un profesor apasionado por la enseñanza personalizada con amplia experiencia 
                            en diferentes niveles educativos. Mi objetivo es ayudar a cada estudiante a 
                            alcanzar su máximo potencial académico através de metodologías adaptadas a 
                            su estilo de aprendizaje.
                        </p>
                        <div class="sobre-mi-stats">
                            <div class="stat">
                                <span class="stat-number">8+</span>
                                <span class="stat-label">Años de Experiencia</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">12</span>
                                <span class="stat-label">Materias Enseñadas</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">200+</span>
                                <span class="stat-label">Estudiantes Ayudados</span>
                            </div>
                        </div>
                    </div>
                    <div class="sobre-mi-image">
                        <div class="imagen-placeholder">
                            <span>Foto del Profesor</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Materias Section -->
        <section id="materias" class="materias">
            <div class="container">
                <h2 class="section-title">Materias que Enseño</h2>
                <p class="section-subtitle">Apoyo académico especializado en múltiples áreas del conocimiento</p>
                <div class="materias-grid" id="materias-grid">
                    <!-- Las materias se cargan dinámicamente con JavaScript -->
                </div>
            </div>
        </section>

        <!-- Metodología Section -->
        <section id="metodologia" class="metodologia">
            <div class="container">
                <h2 class="section-title">Mi Metodología</h2>
                <p class="section-subtitle">Proceso estructurado para garantizar el éxito académico</p>
                <div class="metodologia-grid" id="metodologia-grid">
                    <!-- La metodología se carga dinámicamente con JavaScript -->
                </div>
            </div>
        </section>

        <!-- Testimonios Section -->
        <section id="testimonios" class="testimonios">
            <div class="container">
                <h2 class="section-title">Testimonios de Estudiantes</h2>
                <p class="section-subtitle">Lo que dicen mis alumnos sobre las clases</p>
                <div class="testimonios-grid" id="testimonios-grid">
                    <!-- Los testimonios se cargan dinámicamente con JavaScript -->
                </div>
            </div>
        </section>

        <!-- Gestión Section -->
        <section id="gestion" class="gestion">
            <div class="container">
                <h2 class="section-title">Gestión de Clases</h2>
                <p class="section-subtitle">Sistema de administración de alumnos y turnos</p>
                
                <!-- Tabs -->
                <div class="tabs">
                    <button class="tab-button active" id="tab-alumnos">Gestión de Alumnos</button>
                    <button class="tab-button" id="tab-turnos">Gestión de Turnos</button>
                </div>

                <!-- Alumnos Tab -->
                <div class="tab-content active" id="content-alumnos">
                    <div class="crud-header">
                        <h3>Gestión de Alumnos</h3>
                        <button class="btn btn-primary" id="btn-nuevo-alumno">Nuevo Alumno</button>
                    </div>
                    
                    <div class="filtros">
                        <input type="text" id="buscar-alumno" placeholder="Buscar alumno..." class="input">
                        <select id="filtro-materia-alumno" class="select">
                            <option value="">Todas las materias</option>
                        </select>
                    </div>

                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Materia</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-alumnos">
                                <!-- Los alumnos se cargan dinámicamente -->
                            </tbody>
                        </table>
                        <div id="no-alumnos" class="no-data" style="display: none;">
                            No hay alumnos registrados
                        </div>
                    </div>
                </div>

                <!-- Turnos Tab -->
                <div class="tab-content" id="content-turnos">
                    <div class="crud-header">
                        <h3>Gestión de Turnos</h3>
                        <button class="btn btn-primary" id="btn-nuevo-turno">Nuevo Turno</button>
                    </div>
                    
                    <div class="filtros">
                        <input type="text" id="buscar-turno" placeholder="Buscar turno..." class="input">
                        <select id="filtro-materia-turno" class="select">
                            <option value="">Todas las materias</option>
                        </select>
                        <input type="date" id="filtro-fecha" class="input">
                    </div>

                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Materia</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-turnos">
                                <!-- Los turnos se cargan dinámicamente -->
                            </tbody>
                        </table>
                        <div id="no-turnos" class="no-data" style="display: none;">
                            No hay turnos programados
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-info">
                    <h3>Tomás Cobián</h3>
                    <p>Profesor Particular Especializado</p>
                    <p>8 años de experiencia en enseñanza personalizada</p>
                </div>
                <div class="footer-contact">
                    <h4>Contacto</h4>
                    <p>Email: tomas.cobian@email.com</p>
                    <p>Teléfono: +54 11 1234-5678</p>
                    <p>WhatsApp: +54 9 11 1234-5678</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Tomás Cobián - Clases Particulares. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <!-- Modal -->
    <div class="modal" id="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 id="modal-title">Modal</h3>
                <button class="modal-close" id="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Forms -->
                <form id="form-alumno" style="display: none;">
                    <div class="form-group">
                        <label for="alumno-nombre">Nombre completo *</label>
                        <input type="text" id="alumno-nombre" required class="input">
                    </div>
                    <div class="form-group">
                        <label for="alumno-email">Email *</label>
                        <input type="email" id="alumno-email" required class="input">
                    </div>
                    <div class="form-group">
                        <label for="alumno-telefono">Teléfono *</label>
                        <input type="tel" id="alumno-telefono" required class="input">
                    </div>
                    <div class="form-group">
                        <label for="alumno-materia">Materia principal *</label>
                        <select id="alumno-materia" required class="select">
                            <option value="">Seleccionar materia</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="alumno-nivel">Nivel educativo</label>
                        <select id="alumno-nivel" class="select">
                            <option value="">Seleccionar nivel</option>
                            <option value="Primario">Primario</option>
                            <option value="Secundario">Secundario</option>
                            <option value="Universitario">Universitario</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancelar-alumno">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Alumno</button>
                    </div>
                </form>

                <form id="form-turno" style="display: none;">
                    <div class="form-group">
                        <label for="turno-alumno">Alumno *</label>
                        <select id="turno-alumno" required class="select">
                            <option value="">Seleccionar alumno</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="turno-materia">Materia *</label>
                        <select id="turno-materia" required class="select">
                            <option value="">Seleccionar materia</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="turno-fecha">Fecha *</label>
                        <input type="date" id="turno-fecha" required class="input">
                    </div>
                    <div class="form-group">
                        <label for="turno-hora">Hora *</label>
                        <input type="time" id="turno-hora" required class="input">
                    </div>
                    <div class="form-group">
                        <label for="turno-duracion">Duración (minutos)</label>
                        <select id="turno-duracion" class="select">
                            <option value="60">60 minutos</option>
                            <option value="90">90 minutos</option>
                            <option value="120">120 minutos</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="turno-notas">Notas adicionales</label>
                        <textarea id="turno-notas" rows="3" class="textarea"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancelar-turno">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Turno</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Notification -->
    <div class="notification" id="notification">
        <span id="notification-message"></span>
    </div>

    <script src="app.js"></script>
</body>
</html>
```