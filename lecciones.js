// Contenido del curso. Cada lección sigue el mismo formato:
// intuición, desarrollo, ejemplo, ejercicios, práctica y resumen.
// Las fórmulas van en LaTeX entre $...$ (en línea) o $$...$$ (en bloque).
const R = String.raw;

window.CURSO = {
  fases: [
    { n: 0, titulo: "Rearranque", duracion: "2,5 meses", fechas: "nov 2026 – ene 2027",
      resumen: "Álgebra, trigonometría, logaritmos y vectores, junto con las escalas del cosmos y el cielo a simple vista.",
      proximas: [] },
    { n: 1, titulo: "El cielo y las órbitas", duracion: "6,5 meses", fechas: "feb – ago 2027",
      resumen: "Cálculo de una variable y mecánica de Newton para entender la esfera celeste, Kepler y la gravitación.",
      proximas: [] },
    { n: 2, titulo: "La luz y los instrumentos", duracion: "8 meses", fechas: "ago 2027 – abr 2028",
      resumen: "Ondas, electromagnetismo y Fourier para la radiación, los telescopios y la interferometría.",
      proximas: [] },
    { n: 3, titulo: "Las estrellas", duracion: "9,5 meses", fechas: "abr 2028 – ene 2029",
      resumen: "Termodinámica, física estadística y cuántica básica para la estructura y la evolución estelar.",
      proximas: [] },
    { n: 4, titulo: "Del agujero negro al universo", duracion: "8 meses", fechas: "feb – sep 2029",
      resumen: "Relatividad para los objetos compactos, las galaxias, la materia oscura y la cosmología.",
      proximas: [] },
    { n: 5, titulo: "Proyecto", duracion: "5 meses", fechas: "oct 2029 – feb 2030",
      resumen: "Exoplanetas, astrobiología y un proyecto propio con datos públicos.",
      proximas: [] }
  ],

  lecciones: [
    /* ───────────────────────── LECCIÓN 1 ───────────────────────── */
    {
      id: "leccion-1", n: 1, fase: 0, codigo: "A0.1 · B0.1",
      titulo: "Potencias de diez y las escalas del cosmos",
      sub: "La herramienta para manejar números enormes y tu primer mapa de distancias.",
      horas: "4 a 5 horas",
      contexto: "Reglas de las potencias, notación científica, órdenes de magnitud, unidad astronómica (1,496e11 m), año luz (9,461e15 m), pársec (3,086e16 m = 3,26 años luz), tiempo de luz, escalera de distancias del cosmos.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Las potencias de diez son a las distancias lo que los decibelios son a las potencias: una forma de manejar cantidades que se diferencian en factores enormes sin perderse entre ceros.</p>
<p>En telecomunicaciones trabajabas con señales desde picovatios hasta kilovatios, quince órdenes de magnitud, y por eso usabas dB. En astronomía el problema es mayor. Entre el tamaño de un núcleo atómico ($10^{-15}$ m) y el del universo observable ($10^{27}$ m) hay 42 órdenes de magnitud.</p>
<div class="nota"><strong>La equivalencia es directa.</strong> Un orden de magnitud es un factor 10, es decir, 10 dB. Decir que el Sol está tres órdenes de magnitud más lejos que la Luna es como decir que una señal es 30 dB más fuerte que otra.</div>
<p>Mueve el control para recorrer el universo de potencia en potencia.</p>
<div data-widget="escala"></div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Qué es una potencia</h3>
<p>Una potencia es una multiplicación repetida. El número que se repite es la <em>base</em> y el número de veces es el <em>exponente</em>.</p>
$$a^n = \underbrace{a \cdot a \cdots a}_{n\ \text{veces}}$$

<h3>2. Las reglas, deducidas una a una</h3>
<p><strong>Producto.</strong> Si multiplicas $m$ factores por otros $n$ factores, tienes $m+n$ factores en total. Por eso los exponentes se suman.</p>
$$a^m \cdot a^n = a^{m+n} \qquad 10^3 \cdot 10^2 = (10\cdot10\cdot10)(10\cdot10) = 10^5$$
<p><strong>Cociente.</strong> Al dividir, cada factor de abajo cancela uno de arriba. Por eso los exponentes se restan.</p>
$$\frac{a^m}{a^n} = a^{m-n} \qquad \frac{10^5}{10^2} = 10^3$$
<p><strong>Exponente cero.</strong> Aplica la regla del cociente a un número dividido por sí mismo. El resultado tiene que ser 1, y la regla dice que el exponente es cero.</p>
$$1 = \frac{a^m}{a^m} = a^{m-m} = a^0$$
<p><strong>Exponente negativo.</strong> Aplica otra vez el cociente con el exponente de arriba igual a cero. Un exponente negativo significa dividir en lugar de multiplicar.</p>
$$a^{-n} = \frac{a^0}{a^n} = \frac{1}{a^n} \qquad 10^{-3} = \frac{1}{1000} = 0{,}001$$
<p><strong>Potencia de una potencia.</strong> Repetir $n$ veces un bloque de $m$ factores da $m \cdot n$ factores.</p>
$$(a^m)^n = a^{m \cdot n} \qquad (10^3)^2 = 10^3 \cdot 10^3 = 10^6$$
<p><strong>Exponente fraccionario.</strong> Si elevas al cuadrado $a^{1/2}$, la regla anterior da $a$. El número que al cuadrado da $a$ es su raíz cuadrada.</p>
$$\left(a^{1/2}\right)^2 = a^1 \;\Rightarrow\; a^{1/2} = \sqrt{a} \qquad \sqrt{10^6} = 10^3$$

<h3>3. Notación científica</h3>
<p>Cualquier número se escribe como una <em>mantisa</em> $m$ entre 1 y 10 multiplicada por una potencia de diez. El exponente $n$ es el orden de magnitud.</p>
$$x = m \times 10^{n}, \qquad 1 \le m < 10$$
<p>Para multiplicar dos números, multiplicas las mantisas y sumas los exponentes. Si la mantisa se sale del intervalo entre 1 y 10, la reajustas.</p>
$$(4 \times 10^{5})(6 \times 10^{3}) = 24 \times 10^{8} = 2{,}4 \times 10^{9}$$
<p>En el último paso, 24 se escribe como $2{,}4 \times 10$, y ese 10 sube el exponente de 8 a 9.</p>

<h3>4. Las unidades astronómicas de distancia</h3>
<p><strong>Unidad astronómica (UA).</strong> Es la distancia media entre la Tierra y el Sol. Sirve para el sistema solar.</p>
$$1\ \text{UA} = 1{,}496 \times 10^{11}\ \text{m}$$
<p><strong>Año luz.</strong> Es la distancia que recorre la luz en un año. Es una distancia, no un tiempo. Primero, los segundos que tiene un año:</p>
$$1\ \text{año} = 365{,}25 \times 24 \times 3600\ \text{s} = 3{,}156 \times 10^{7}\ \text{s}$$
<p>Después multiplicamos por la velocidad de la luz $c$, porque distancia es velocidad por tiempo:</p>
$$1\ \text{año luz} = c \cdot t = (2{,}998 \times 10^{8}\ \text{m/s})(3{,}156 \times 10^{7}\ \text{s}) = 9{,}461 \times 10^{15}\ \text{m}$$
<p><strong>Pársec (pc).</strong> Es la unidad que usan los astrónomos profesionales. Su definición sale de la geometría del paralaje y la deducirás en la Lección 2.</p>
$$1\ \text{pc} = 3{,}086 \times 10^{16}\ \text{m} = 3{,}26\ \text{años luz}$$

<h3>5. La escalera de distancias</h3>
<p>El tiempo de luz es el retardo de propagación de una señal, el mismo concepto que en un radioenlace.</p>
<div class="tabla"><table>
<thead><tr><th>Distancia</th><th>Metros</th><th>Tiempo de luz</th></tr></thead>
<tbody>
<tr><td>Tierra a la Luna</td><td>$3{,}84 \times 10^{8}$</td><td>1,3 segundos</td></tr>
<tr><td>Tierra al Sol (1 UA)</td><td>$1{,}496 \times 10^{11}$</td><td>8,3 minutos</td></tr>
<tr><td>Sol a Neptuno (30 UA)</td><td>$4{,}5 \times 10^{12}$</td><td>4,2 horas</td></tr>
<tr><td>Sol a Próxima Centauri</td><td>$4{,}0 \times 10^{16}$</td><td>4,24 años</td></tr>
<tr><td>Sol al centro de la Vía Láctea</td><td>$2{,}5 \times 10^{20}$</td><td>26 000 años</td></tr>
<tr><td>Vía Láctea a Andrómeda</td><td>$2{,}4 \times 10^{22}$</td><td>2,5 millones de años</td></tr>
<tr><td>Radio del universo observable</td><td>$4{,}4 \times 10^{26}$</td><td>46 000 millones de años</td></tr>
</tbody></table></div>
<div class="nota"><strong>Establecido, aunque sorprenda.</strong> El último valor es mayor que la edad del universo (13 800 millones de años) multiplicada por $c$. No es un error: el espacio se ha expandido mientras la luz viajaba. Lo verás en cosmología.</div>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>¿Cuánto tarda en llegar la luz del Sol?</h3>
<p>El tiempo es la distancia dividida entre la velocidad. Dividimos las mantisas y restamos los exponentes.</p>
$$t = \frac{d}{c} = \frac{1{,}496 \times 10^{11}\ \text{m}}{2{,}998 \times 10^{8}\ \text{m/s}} = 0{,}499 \times 10^{3}\ \text{s} = 499\ \text{s}$$
<p>Son 8 minutos y 19 segundos. Cuando miras el Sol, lo ves como era hace algo más de 8 minutos.</p>
<h3>¿Cuál es el retardo de la señal de la Voyager 1?</h3>
<p>La sonda Voyager 1 está a unas 170 UA de la Tierra. Como la luz tarda 499 s en recorrer 1 UA, basta multiplicar.</p>
$$t = 170 \times 499\ \text{s} = 8{,}48 \times 10^{4}\ \text{s} = \frac{8{,}48 \times 10^{4}}{3600}\ \text{h} \approx 23{,}6\ \text{h}$$
<p>Una orden enviada hoy llega a la sonda casi un día después, y la confirmación tarda otro día en volver. Es el objeto humano más lejano, y aun así está a menos de una milésima parte del camino a la estrella más cercana.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Calentamiento",
            enunciado: R`<p>Calcula sin calculadora y da el resultado en notación científica.</p>`,
            partes: [
              { id: "a", pregunta: R`$(3 \times 10^{8})(5 \times 10^{-7})$`, tipo: "sci", respuesta: 1.5e2,
                pistas: ["Multiplica las mantisas por un lado y suma los exponentes por otro.", "3 por 5 son 15, que no está entre 1 y 10. ¿Cómo se reajusta?"],
                solucion: R`$3 \cdot 5 = 15$ y $10^{8} \cdot 10^{-7} = 10^{1}$. Queda $15 \times 10^{1} = 1{,}5 \times 10^{2}$.` },
              { id: "b", pregunta: R`$\dfrac{6 \times 10^{24}}{2 \times 10^{30}}$`, tipo: "sci", respuesta: 3e-6,
                errores: [{ v: 3e6, msg: "La mantisa está bien. Al dividir, el exponente de abajo se resta: 24 menos 30 no da un número positivo." },
                          { v: 3e54, msg: "Has sumado los exponentes. Sumar corresponde a multiplicar; en un cociente se restan." }],
                pistas: ["Divide las mantisas y resta los exponentes: el de arriba menos el de abajo."],
                solucion: R`$6/2 = 3$ y $10^{24-30} = 10^{-6}$. Queda $3 \times 10^{-6}$.` },
              { id: "c", pregunta: R`$(4 \times 10^{6})^{2}$`, tipo: "sci", respuesta: 1.6e13,
                errores: [{ v: 1.6e9, msg: "Has sumado 2 al exponente. En una potencia de una potencia los exponentes se multiplican." },
                          { v: 4e12, msg: "El exponente está bien, pero el cuadrado afecta también a la mantisa: hay que elevar el 4 al cuadrado." },
                          { v: 8e12, msg: "Elevar al cuadrado no es multiplicar por 2: 4 al cuadrado es 4 por 4." }],
                pistas: ["El cuadrado se aplica a los dos factores: a la mantisa y a la potencia de diez."],
                solucion: R`$4^2 = 16$ y $(10^{6})^{2} = 10^{12}$. Queda $16 \times 10^{12} = 1{,}6 \times 10^{13}$.` },
              { id: "d", pregunta: R`$\sqrt{9 \times 10^{16}}$`, tipo: "sci", respuesta: 3e8,
                errores: [{ v: 3e16, msg: "Has hecho la raíz de la mantisa, pero falta la de la potencia de diez. La raíz es elevar a un medio." },
                          { v: 3e4, msg: "La raíz cuadrada divide el exponente entre 2, no entre 4." }],
                pistas: ["La raíz cuadrada equivale a elevar a 1/2, y eso se aplica a cada factor."],
                solucion: R`$\sqrt{9} = 3$ y $(10^{16})^{1/2} = 10^{8}$. Queda $3 \times 10^{8}$, que casualmente es la velocidad de la luz en m/s.` }
            ] },
          { id: "e2", nivel: 2, titulo: "El sistema solar a escala",
            enunciado: R`<p>Construye una maqueta dividiendo todas las distancias entre $10^{10}$. Datos reales: diámetro del Sol, $1{,}39 \times 10^{9}$ m; diámetro de la Tierra, $1{,}27 \times 10^{7}$ m; Próxima Centauri está a $4{,}0 \times 10^{16}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "Diámetro del Sol en la maqueta", tipo: "num", unidad: "cm", respuesta: 13.9,
                errores: [{ v: 0.139, msg: "Ese valor está en metros. Se pide en centímetros." }],
                pistas: ["Divide entre 10¹⁰: resta 10 al exponente. Después pasa de metros a centímetros."],
                solucion: R`$1{,}39 \times 10^{9-10} = 1{,}39 \times 10^{-1}$ m $= 13{,}9$ cm. Un pomelo grande.` },
              { id: "b", pregunta: "Diámetro de la Tierra en la maqueta", tipo: "num", unidad: "mm", respuesta: 1.27,
                errores: [{ v: 0.00127, msg: "Ese valor está en metros. Se pide en milímetros." }, { v: 0.127, msg: "Ese valor está en centímetros. Se pide en milímetros." }],
                pistas: ["El resultado en metros tiene exponente negativo. Un milímetro son 10⁻³ m."],
                solucion: R`$1{,}27 \times 10^{7-10} = 1{,}27 \times 10^{-3}$ m $= 1{,}27$ mm. Un grano de arena gruesa.` },
              { id: "c", pregunta: "Distancia del Sol a la Tierra en la maqueta", tipo: "num", unidad: "m", respuesta: 14.96, tol: 0.03,
                pistas: ["La distancia real es 1 UA. Búscala en el desarrollo y divídela entre 10¹⁰."],
                solucion: R`$1{,}496 \times 10^{11-10} = 14{,}96$ m. El grano de arena gira a 15 metros del pomelo.` },
              { id: "d", pregunta: "Distancia a Próxima Centauri en la maqueta", tipo: "num", unidad: "km", respuesta: 4000, tol: 0.03,
                errores: [{ v: 4e6, msg: "Ese valor está en metros. Se pide en kilómetros." }],
                pistas: ["Resta 10 al exponente y pasa de metros a kilómetros dividiendo entre 10³."],
                solucion: R`$4{,}0 \times 10^{16-10} = 4{,}0 \times 10^{6}$ m $= 4000$ km. Con el pomelo en Madrid, la estrella más cercana es otro pomelo situado más allá de Moscú, y entre ambos no hay casi nada.` }
            ] },
          { id: "e3", nivel: 3, titulo: "La Voyager 1 rumbo a las estrellas",
            enunciado: R`<p>La Voyager 1 se aleja a unos 17 km/s y está a 170 UA. Próxima Centauri está a 4,24 años luz, es decir, a $4{,}01 \times 10^{16}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "Si viajara en línea recta hacia Próxima Centauri, ¿cuántos años tardaría en recorrer esa distancia?", tipo: "sci", unidad: "años", respuesta: 7.48e4, tol: 0.04,
                errores: [{ v: 2.36e12, msg: "Ese es el tiempo en segundos, y está bien calculado. Falta pasarlo a años." },
                          { v: 7.48e7, msg: "Revisa las unidades de la velocidad: 17 km/s son 1,7 × 10⁴ m/s." }],
                pistas: ["Tiempo es distancia entre velocidad. Pon todo en metros y en m/s.", "El resultado sale en segundos. Un año tiene 3,156 × 10⁷ s."],
                solucion: R`$t = \dfrac{4{,}01 \times 10^{16}\ \text{m}}{1{,}7 \times 10^{4}\ \text{m/s}} = 2{,}36 \times 10^{12}$ s. En años: $\dfrac{2{,}36 \times 10^{12}}{3{,}156 \times 10^{7}} = 7{,}5 \times 10^{4}$ años, unos 75 000.` },
              { id: "b", pregunta: "La potencia recibida disminuye con el cuadrado de la distancia. ¿Por qué factor sería más débil su señal desde Próxima que desde su posición actual?", tipo: "sci", respuesta: 2.49e6, tol: 0.06,
                errores: [{ v: 1577, msg: "Ese es el cociente de distancias, y es correcto. Falta aplicar que la potencia cae con el cuadrado de la distancia." }],
                pistas: ["Primero calcula cuántas veces más lejos está Próxima: pasa 170 UA a metros y divide.", "La potencia va como 1/d². Si la distancia se multiplica por k, la potencia se divide entre k²."],
                solucion: R`$170\ \text{UA} = 170 \times 1{,}496 \times 10^{11} = 2{,}54 \times 10^{13}$ m. Cociente de distancias: $\dfrac{4{,}01 \times 10^{16}}{2{,}54 \times 10^{13}} = 1{,}58 \times 10^{3}$. Al cuadrado: $2{,}5 \times 10^{6}$.` },
              { id: "c", pregunta: "Expresa ese factor en decibelios (opcional).", tipo: "num", unidad: "dB", respuesta: 64, tol: 0.02, opcional: true,
                errores: [{ v: 32, msg: "Has usado 10 log sobre el cociente de distancias. O usas 20 log con las distancias, o 10 log con el factor de potencia." }],
                pistas: ["dB = 10 · log₁₀ del factor de potencia. El logaritmo de 2,5 × 10⁶ es 6 más el logaritmo de 2,5."],
                solucion: R`$10 \log_{10}(2{,}5 \times 10^{6}) = 10\,(6 + 0{,}4) = 64$ dB. La señal ya llega hoy tan débil que hace falta una antena de 70 m para recibirla, así que 64 dB menos la dejarían muy por debajo de lo detectable.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<p>No necesitas telescopio para ninguna de las dos.</p>
<h3>Con el ordenador: Stellarium</h3>
<ol>
<li>Instala <a href="https://stellarium.org/es/" target="_blank" rel="noopener">Stellarium</a>, que es gratuito, o abre la <a href="https://stellarium-web.org/" target="_blank" rel="noopener">versión web</a>.</li>
<li>Pon tu ubicación y la hora actual.</li>
<li>Haz clic en la Luna, en Saturno y en una estrella brillante, por ejemplo Vega. Anota la distancia que indica el programa.</li>
<li>Convierte las tres distancias a metros y a tiempo de luz.</li>
</ol>`,
          notas: [{ id: "stellarium", label: "Tus tres distancias, en metros y en tiempo de luz" }],
          tareasTitulo: "Con tus ojos: primera salida",
          tareasIntro: "Una noche despejada de esta semana, sal diez minutos después de anochecer.",
          tareas: [
            { id: "t1", texto: "Localizar el norte y el sur desde mi punto de observación." },
            { id: "t2", texto: "Encontrar la W de Casiopea, alta hacia el norte en noviembre." },
            { id: "t3", texto: "Buscar un punto brillante de luz fija hacia el sur y comprobar en Stellarium si es Saturno." },
            { id: "t4", texto: "Apuntar fecha, hora y lo que he visto: la primera entrada del cuaderno de observación." }
          ],
          notas2: [{ id: "cuaderno", label: "Cuaderno de observación: fecha, hora, lugar y qué has visto" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Al multiplicar potencias de la misma base se suman los exponentes</strong> y al dividir se restan. Las demás reglas salen de estas dos.`,
          R`<strong>La notación científica separa la mantisa del orden de magnitud.</strong> Un orden de magnitud es un factor 10, el equivalente a 10 dB.`,
          R`<strong>Tres unidades cubren el cosmos:</strong> la UA ($1{,}496 \times 10^{11}$ m), el año luz ($9{,}461 \times 10^{15}$ m) y el pársec (3,26 años luz).`,
          R`<strong>Mirar lejos es mirar al pasado:</strong> la luz del Sol tarda 8,3 minutos, la de Próxima Centauri 4,24 años y la de Andrómeda 2,5 millones de años.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 2 ───────────────────────── */
    {
      id: "leccion-2", n: 2, fase: 0, codigo: "A0.2 · B0.2",
      titulo: "Ángulos pequeños y la distancia a las estrellas",
      sub: "Trigonometría mínima para medir el cielo y entender de dónde sale el pársec.",
      horas: "5 horas",
      contexto: "Radianes, grados, minutos y segundos de arco (1 rad = 206 265 segundos de arco), seno, coseno y tangente, aproximación de ángulo pequeño, tamaño angular (theta = D/d), paralaje estelar, definición del pársec, d[pc] = 1/p[segundos de arco].",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">En el cielo no se miden distancias, se miden ángulos. Toda la astronomía de posición consiste en convertir ángulos en distancias con un triángulo.</p>
<p>Haz la prueba: estira el brazo, levanta el pulgar y míralo guiñando primero un ojo y luego el otro. El pulgar salta respecto al fondo. Si lo acercas a la nariz, salta más. Ese salto es el <em>paralaje</em>, y su tamaño te dice a qué distancia está el objeto.</p>
<div class="nota"><strong>Ya lo conoces.</strong> Es la misma triangulación con la que dos estaciones de radiogoniometría localizan un emisor: una línea de base conocida y dos direcciones medidas. En astronomía la línea de base es la órbita de la Tierra, y las dos direcciones se miden con seis meses de diferencia.</div>
<p>Las estrellas están tan lejos que el salto es minúsculo, siempre menor que un segundo de arco. Por eso necesitas dos cosas: una unidad cómoda para ángulos muy pequeños y una aproximación que convierte la trigonometría en una simple división.</p>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El radián</h3>
<p>Un ángulo se puede medir por el arco que abarca. Si un arco de longitud $s$ pertenece a una circunferencia de radio $r$, el ángulo en radianes es su cociente. Es un número sin unidades.</p>
$$\theta = \frac{s}{r}$$
<p>La circunferencia completa mide $2\pi r$, así que una vuelta entera son $2\pi$ radianes. De ahí sale la conversión:</p>
$$360^\circ = 2\pi\ \text{rad} \;\Rightarrow\; 1\ \text{rad} = \frac{360^\circ}{2\pi} = 57{,}3^\circ$$

<h3>2. Minutos y segundos de arco</h3>
<p>Los ángulos del cielo son pequeños, y el grado se subdivide como una hora. Cada grado tiene 60 minutos de arco ($'$) y cada minuto, 60 segundos de arco ($''$).</p>
$$1^\circ = 60' = 3600''$$
<p>Un radián en segundos de arco es un número que usarás constantemente:</p>
$$1\ \text{rad} = 57{,}296^\circ \times 3600\ \frac{''}{^\circ} = 206\,265''$$

<h3>3. Seno, coseno y tangente</h3>
<p>En un triángulo rectángulo con un ángulo $\theta$, las tres razones comparan sus lados. Llamamos <em>opuesto</em> al cateto de enfrente, <em>contiguo</em> al cateto que toca el ángulo e <em>hipotenusa</em> al lado mayor.</p>
$$\sin\theta = \frac{\text{opuesto}}{\text{hipotenusa}} \qquad \cos\theta = \frac{\text{contiguo}}{\text{hipotenusa}} \qquad \tan\theta = \frac{\text{opuesto}}{\text{contiguo}}$$

<h3>4. La aproximación de ángulo pequeño</h3>
<p>Dibuja un triángulo muy estrecho. Cuando $\theta$ es pequeño, el cateto opuesto casi coincide con el arco de circunferencia, y la hipotenusa casi coincide con el cateto contiguo. Por tanto opuesto $\approx s$ e hipotenusa $\approx r$:</p>
$$\sin\theta \approx \tan\theta \approx \frac{s}{r} = \theta \qquad (\theta\ \text{en radianes})$$
<p>La condición es imprescindible: solo funciona con el ángulo en radianes. Para $\theta = 1^\circ$ el error es del 0,005 %, y para los ángulos de la astronomía es despreciable.</p>

<h3>5. Tamaño angular</h3>
<p>Un objeto de tamaño real $D$ visto a una distancia $d$ ocupa en el cielo un ángulo $\theta$. Con la aproximación anterior:</p>
$$\theta = \frac{D}{d}$$
<p>Para la Luna, con $D = 3{,}474 \times 10^{6}$ m y $d = 3{,}844 \times 10^{8}$ m:</p>
$$\theta = \frac{3{,}474 \times 10^{6}}{3{,}844 \times 10^{8}} = 9{,}04 \times 10^{-3}\ \text{rad} = 9{,}04 \times 10^{-3} \times 57{,}3^\circ = 0{,}52^\circ$$
<p>Es la misma relación que la anchura de haz de una antena: un ángulo es un tamaño dividido entre una distancia.</p>

<h3>6. Paralaje estelar</h3>
<p>Observa una estrella cercana en enero y otra vez en julio. La Tierra se ha movido 2 UA y la estrella parece desplazarse respecto a las estrellas lejanas del fondo. El <em>ángulo de paralaje</em> $p$ es la mitad de ese desplazamiento: el que corresponde a una línea de base de 1 UA.</p>
<div data-widget="paralaje"></div>
<p>En el triángulo Sol, Tierra, estrella, el cateto opuesto a $p$ es 1 UA y el contiguo es la distancia $d$. Como $p$ es diminuto, la tangente es el propio ángulo:</p>
$$\tan p = \frac{1\ \text{UA}}{d} \;\Rightarrow\; d = \frac{1\ \text{UA}}{p} \qquad (p\ \text{en radianes})$$

<h3>7. De aquí sale el pársec</h3>
<p>Un pársec es la distancia a la que el paralaje vale exactamente un segundo de arco. Su nombre viene de <em>par</em>alaje de un <em>sec</em>ond. Sustituyendo $p = 1'' = 1/206\,265$ rad:</p>
$$1\ \text{pc} = \frac{1\ \text{UA}}{1/206\,265} = 206\,265\ \text{UA} = 206\,265 \times 1{,}496 \times 10^{11}\ \text{m} = 3{,}086 \times 10^{16}\ \text{m}$$
<p>Con esta unidad la fórmula queda sin constantes, y por eso los astrónomos la prefieren al año luz:</p>
$$d\,[\text{pc}] = \frac{1}{p\,['']}$$` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La distancia a Próxima Centauri</h3>
<p>El paralaje medido de Próxima Centauri es $p = 0{,}7685''$. Es el mayor de todas las estrellas, porque es la más cercana.</p>
$$d = \frac{1}{0{,}7685}\ \text{pc} = 1{,}301\ \text{pc}$$
<p>Para pasarlo a años luz multiplicamos por 3,26:</p>
$$d = 1{,}301 \times 3{,}26 = 4{,}24\ \text{años luz}$$
<h3>¿Cómo de pequeño es ese ángulo?</h3>
<p>Un ángulo de $0{,}77''$ es el que ocupa una moneda de 1 euro, de 2,3 cm, vista a esta distancia:</p>
$$d = \frac{D}{\theta} = \frac{0{,}023\ \text{m}}{0{,}77/206\,265} = 6{,}2 \times 10^{3}\ \text{m} \approx 6\ \text{km}$$
<div class="nota"><strong>Dato histórico y dato actual.</strong> Friedrich Bessel midió el primer paralaje estelar en 1838, el de 61 Cygni, tras siglos de intentos fallidos. Hoy el satélite Gaia de la ESA mide paralajes con precisiones de decenas de microsegundos de arco para más de mil millones de estrellas, y sus datos son públicos. Los usarás en este curso.</div>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Cambio de unidades",
            enunciado: R`<p>Practica las conversiones entre grados, segundos de arco y radianes.</p>`,
            partes: [
              { id: "a", pregunta: "¿Cuántos segundos de arco son 0,5°?", tipo: "num", unidad: "″", respuesta: 1800,
                errores: [{ v: 30, msg: "Eso son minutos de arco. Falta un factor 60 más para llegar a segundos." }],
                pistas: ["Un grado tiene 3600 segundos de arco."],
                solucion: R`$0{,}5 \times 3600 = 1800''$.` },
              { id: "b", pregunta: "Expresa 0,5° en radianes.", tipo: "sci", unidad: "rad", respuesta: 8.727e-3,
                errores: [{ v: 28.65, msg: "Has multiplicado por 57,3 en lugar de dividir. Un radián es mucho mayor que un grado, así que el número en radianes debe ser menor." }],
                pistas: ["1 rad son 57,3°. Si el ángulo es menor que 57,3°, el resultado debe ser menor que 1."],
                solucion: R`$\dfrac{0{,}5}{57{,}296} = 8{,}73 \times 10^{-3}$ rad. También vale $\dfrac{1800}{206\,265}$.` },
              { id: "c", pregunta: "Expresa 30″ en radianes.", tipo: "sci", unidad: "rad", respuesta: 1.454e-4,
                pistas: ["Un radián son 206 265 segundos de arco."],
                solucion: R`$\dfrac{30}{206\,265} = 1{,}45 \times 10^{-4}$ rad.` }
            ] },
          { id: "e2", nivel: 2, titulo: "El Sol y la Luna en el cielo",
            enunciado: R`<p>El Sol tiene un diámetro de $1{,}39 \times 10^{9}$ m y está a $1{,}496 \times 10^{11}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "Tamaño angular del Sol en radianes", tipo: "sci", unidad: "rad", respuesta: 9.29e-3,
                pistas: ["Tamaño angular = tamaño real entre distancia."],
                solucion: R`$\theta = \dfrac{1{,}39 \times 10^{9}}{1{,}496 \times 10^{11}} = 9{,}29 \times 10^{-3}$ rad.` },
              { id: "b", pregunta: "Tamaño angular del Sol en grados", tipo: "num", unidad: "°", respuesta: 0.532, tol: 0.03,
                errores: [{ v: 0.00929, msg: "Ese valor sigue en radianes. Multiplica por 57,3 para pasarlo a grados." }],
                pistas: ["Multiplica los radianes por 57,3."],
                solucion: R`$9{,}29 \times 10^{-3} \times 57{,}3 = 0{,}53^\circ$.` },
              { id: "c", pregunta: "El Sol es 400 veces mayor que la Luna y mide casi lo mismo en el cielo (0,53° frente a 0,52°). ¿Qué consecuencia tiene?", tipo: "opcion", respuesta: 1,
                opciones: ["Que la Luna y el Sol están a la misma distancia.", "Que el Sol está unas 400 veces más lejos, y por eso la Luna puede taparlo justo en un eclipse total.", "Que la Luna refleja 400 veces menos luz.", "Es una ilusión óptica sin relación con las distancias."],
                pistas: ["Usa θ = D/d. Si θ es igual y D es 400 veces mayor, ¿qué le pasa a d?"],
                solucion: R`Con $\theta = D/d$ igual para ambos, si $D$ es 400 veces mayor, $d$ también lo es. Que los eclipses totales sean posibles es una coincidencia de nuestra época: la Luna se aleja unos 3,8 cm al año.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Paralajes reales",
            enunciado: R`<p>Usa $d\,[\text{pc}] = 1/p\,['']$ y recuerda que 1 pc son 3,26 años luz.</p>`,
            partes: [
              { id: "a", pregunta: "Sirio tiene un paralaje de 0,379″. ¿A qué distancia está en pársecs?", tipo: "num", unidad: "pc", respuesta: 2.64,
                errores: [{ v: 0.379, msg: "La distancia es el inverso del paralaje, no el paralaje." }],
                pistas: ["Calcula 1 dividido entre el paralaje en segundos de arco."],
                solucion: R`$d = \dfrac{1}{0{,}379} = 2{,}64$ pc.` },
              { id: "b", pregunta: "¿Y en años luz?", tipo: "num", unidad: "años luz", respuesta: 8.6, tol: 0.03,
                pistas: ["Multiplica los pársecs por 3,26."],
                solucion: R`$2{,}64 \times 3{,}26 = 8{,}6$ años luz. Es la estrella más brillante del cielo nocturno y una de las más cercanas.` },
              { id: "c", pregunta: "Gaia mide para una estrella un paralaje de 2 milisegundos de arco. ¿A qué distancia está?", tipo: "num", unidad: "pc", respuesta: 500,
                errores: [{ v: 0.5, msg: "El paralaje hay que ponerlo en segundos de arco: 2 milisegundos son 0,002″." }],
                pistas: ["Un milisegundo de arco son 10⁻³ segundos de arco."],
                solucion: R`$p = 2 \times 10^{-3}\,''$, así que $d = \dfrac{1}{2 \times 10^{-3}} = 500$ pc.` },
              { id: "d", pregunta: "Desde tierra, la atmósfera limita la precisión a unos 0,01″. ¿Hasta qué distancia sirve entonces el paralaje, si exigimos que el ángulo sea al menos 0,01″?", tipo: "num", unidad: "pc", respuesta: 100,
                pistas: ["La distancia máxima corresponde al paralaje mínimo medible."],
                solucion: R`$d = \dfrac{1}{0{,}01} = 100$ pc. La Vía Láctea mide unos 30 000 pc, así que desde tierra solo se alcanzaba el vecindario inmediato. Por eso hubo que ir al espacio, con Hipparcos primero y con Gaia después.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Tu mano es un instrumento de medida</h3>
<p>Con el brazo completamente extendido, tu mano abarca ángulos bastante constantes, porque las manos grandes suelen ir con brazos largos.</p>
<div class="tabla"><table>
<thead><tr><th>Gesto</th><th>Ángulo aproximado</th></tr></thead>
<tbody>
<tr><td>Ancho del meñique</td><td>1°</td></tr>
<tr><td>Ancho del pulgar</td><td>2°</td></tr>
<tr><td>Puño cerrado</td><td>10°</td></tr>
<tr><td>Palmo abierto, de pulgar a meñique</td><td>20°</td></tr>
</tbody></table></div>
<h3>Calibra tu pulgar</h3>
<ol>
<li>Mide el ancho de tu pulgar y la distancia del ojo al pulgar con el brazo extendido.</li>
<li>Calcula el ángulo con $\theta = D/d$ y pásalo a grados.</li>
<li>Comprueba cuántas lunas llenas caben detrás de tu pulgar. Deberían ser unas cuatro.</li>
</ol>`,
          notas: [{ id: "pulgar", label: "Ancho del pulgar, longitud del brazo y ángulo que te sale" }],
          tareasTitulo: "En el cielo",
          tareasIntro: "Cualquier noche despejada, con la mano como regla.",
          tareas: [
            { id: "t1", texto: "Medir con el puño la altura de la estrella Polar sobre el horizonte. Debería coincidir con mi latitud." },
            { id: "t2", texto: "Medir la longitud del Carro de la Osa Mayor, que son unos 25°." },
            { id: "t3", texto: "Comprobar en Stellarium las dos medidas con la herramienta de medición de ángulos." }
          ],
          notas2: [{ id: "cuaderno", label: "Cuaderno de observación: tus medidas y las de Stellarium" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>El radián es arco entre radio.</strong> Un radián son 57,3° o 206 265 segundos de arco.`,
          R`<strong>Para ángulos pequeños, seno y tangente valen el propio ángulo</strong>, siempre que esté en radianes.`,
          R`<strong>Tamaño angular = tamaño real entre distancia.</strong> El Sol y la Luna miden medio grado.`,
          R`<strong>El paralaje convierte un ángulo en una distancia</strong> usando la órbita terrestre como línea de base.`,
          R`<strong>Un pársec es la distancia con paralaje de 1″.</strong> De ahí la fórmula $d\,[\text{pc}] = 1/p\,['']$.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 3 ───────────────────────── */
    {
      id: "leccion-3", n: 3, fase: 0, codigo: "A0.3 · B0.3",
      titulo: "Logaritmos, decibelios y magnitudes",
      sub: "Por qué el brillo de las estrellas se mide con una escala logarítmica invertida.",
      horas: "5 horas",
      contexto: "Logaritmo decimal y sus propiedades, decibelios, flujo y ley del inverso del cuadrado (F = L / 4 pi d^2), magnitud aparente (m1 - m2 = -2,5 log(F1/F2)), 5 magnitudes = factor 100, 1 magnitud = 4 dB, magnitud absoluta y módulo de distancia (m - M = 5 log(d / 10 pc)).",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Un logaritmo responde a una sola pregunta: ¿cuántos órdenes de magnitud? Es la operación que convierte multiplicaciones en sumas, y ya la usabas cada vez que escribías un valor en dB.</p>
<p>Hace 2100 años, Hiparco clasificó las estrellas en seis clases: las más brillantes eran de primera magnitud y las más débiles visibles, de sexta. Lo hizo a ojo, y el ojo, igual que el oído, responde de forma logarítmica: percibe cocientes, no diferencias.</p>
<div class="nota"><strong>La magnitud es un decibelio al revés.</strong> Mide un cociente de potencias en escala logarítmica, como el dB, pero con dos rarezas heredadas de Hiparco: el paso es de 4 dB en vez de 1 dB, y el signo está invertido. Un número menor significa más brillo.</div>
<p>Prueba el conversor para hacerte una idea antes de ver las fórmulas.</p>
<div data-widget="magnitudes"></div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Qué es un logaritmo</h3>
<p>El logaritmo decimal de $x$ es el exponente al que hay que elevar 10 para obtener $x$. Es la operación inversa de la potencia.</p>
$$y = \log_{10} x \iff 10^{y} = x$$
$$\log 1000 = 3 \qquad \log 1 = 0 \qquad \log 0{,}01 = -2$$

<h3>2. Sus propiedades salen de las reglas de las potencias</h3>
<p><strong>Producto.</strong> Escribe $a = 10^{p}$ y $b = 10^{q}$. Entonces $ab = 10^{p+q}$, y el logaritmo del producto es la suma de los logaritmos.</p>
$$\log(ab) = \log a + \log b$$
<p><strong>Cociente.</strong> Por el mismo razonamiento con $10^{p-q}$:</p>
$$\log\frac{a}{b} = \log a - \log b$$
<p><strong>Potencia.</strong> Como $a^{n} = (10^{p})^{n} = 10^{np}$, el exponente baja multiplicando.</p>
$$\log(a^{n}) = n \log a$$
<p>Con esto, el logaritmo de un número en notación científica es inmediato: el exponente más el logaritmo de la mantisa.</p>
$$\log(2 \times 10^{5}) = \log 2 + 5 = 0{,}301 + 5 = 5{,}301$$

<h3>3. Decibelios</h3>
<p>El decibelio expresa un cociente de potencias. El factor 10 está para que un orden de magnitud sean 10 dB.</p>
$$L = 10 \log\frac{P_1}{P_2}\ \text{dB}$$

<h3>4. Flujo y ley del inverso del cuadrado</h3>
<p>Una estrella emite una potencia total $L$, su <em>luminosidad</em>, en vatios. Esa potencia se reparte sobre una esfera cada vez mayor. A una distancia $d$, la esfera tiene área $4\pi d^{2}$, y la potencia que cruza cada metro cuadrado es el <em>flujo</em> $F$.</p>
$$F = \frac{L}{4\pi d^{2}} \qquad \left[\frac{\text{W}}{\text{m}^2}\right]$$
<p>Es la misma expresión que la densidad de potencia de una antena isótropa. El flujo es lo que medimos; la luminosidad es lo que queremos saber.</p>

<h3>5. Magnitud aparente</h3>
<p>En 1856 Norman Pogson dio forma exacta a la escala de Hiparco: una diferencia de 5 magnitudes corresponde a un factor 100 en flujo. Buscamos una fórmula del tipo $m_1 - m_2 = k \log(F_1/F_2)$. Imponiendo esa condición, con la estrella 1 cien veces más brillante y por tanto cinco magnitudes menor:</p>
$$-5 = k \log 100 = 2k \;\Rightarrow\; k = -2{,}5$$
$$m_1 - m_2 = -2{,}5 \log\frac{F_1}{F_2}$$
<p>El signo negativo es la inversión: más flujo, menor magnitud. Una sola magnitud equivale a un factor</p>
$$100^{1/5} = 10^{0{,}4} = 2{,}512$$
<p>Y la relación con los decibelios sale de comparar los coeficientes 2,5 y 10:</p>
$$\Delta\text{dB} = 10 \log\frac{F_1}{F_2} = -4\,(m_1 - m_2) \;\Rightarrow\; 1\ \text{magnitud} = 4\ \text{dB}$$
<p>Para pasar de magnitudes a cociente de flujos, despeja el logaritmo:</p>
$$\frac{F_1}{F_2} = 10^{-0{,}4\,(m_1 - m_2)}$$

<h3>6. Magnitud absoluta y módulo de distancia</h3>
<p>La magnitud aparente $m$ mezcla dos cosas: lo luminosa que es la estrella y lo lejos que está. Para comparar estrellas se define la <em>magnitud absoluta</em> $M$: la magnitud que tendría la estrella vista desde 10 pc.</p>
<p>La misma estrella a distancia $d$ y a 10 pc tiene flujos que solo difieren por el inverso del cuadrado:</p>
$$\frac{F(d)}{F(10)} = \frac{L/4\pi d^{2}}{L/4\pi\,10^{2}} = \left(\frac{10}{d}\right)^{2}$$
<p>Lo sustituimos en la fórmula de Pogson. El cuadrado baja multiplicando y el signo invierte la fracción:</p>
$$m - M = -2{,}5 \log\left(\frac{10}{d}\right)^{2} = -5 \log\frac{10}{d} = 5 \log\frac{d}{10\ \text{pc}}$$
<p>La diferencia $m - M$ se llama <em>módulo de distancia</em>. Si conoces dos de las tres cantidades, obtienes la tercera. Así se miden distancias a las galaxias.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>¿Cuántas veces más brillante es el Sol que la Luna llena?</h3>
<p>Magnitudes aparentes: Sol, $m = -26{,}74$; Luna llena, $m = -12{,}74$. La diferencia es de 14 magnitudes exactas.</p>
$$\frac{F_\odot}{F_\text{Luna}} = 10^{-0{,}4\,(-26{,}74 - (-12{,}74))} = 10^{0{,}4 \times 14} = 10^{5{,}6} \approx 4 \times 10^{5}$$
<p>El Sol es unas 400 000 veces más brillante. En decibelios, $14 \times 4 = 56$ dB.</p>
<h3>La magnitud absoluta del Sol</h3>
<p>El Sol está a 1 UA. En pársecs, como 1 pc son 206 265 UA:</p>
$$d = \frac{1}{206\,265}\ \text{pc} = 4{,}848 \times 10^{-6}\ \text{pc}$$
<p>Aplicamos el módulo de distancia:</p>
$$m - M = 5 \log\frac{4{,}848 \times 10^{-6}}{10} = 5 \log(4{,}848 \times 10^{-7}) = 5\,(-6{,}314) = -31{,}57$$
$$M = m + 31{,}57 = -26{,}74 + 31{,}57 = 4{,}83$$
<p>Visto desde 10 pc, el Sol sería una estrella discreta de magnitud 4,8, visible a simple vista solo desde un cielo oscuro.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Logaritmos sin calculadora",
            enunciado: R`<p>Usa las propiedades y el dato $\log 2 = 0{,}301$.</p>`,
            partes: [
              { id: "a", pregunta: R`$\log(10^{-4})$`, tipo: "num", respuesta: -4, tol: 0.001,
                pistas: ["El logaritmo decimal es el exponente de la potencia de diez."],
                solucion: R`El logaritmo deshace la potencia: $\log(10^{-4}) = -4$.` },
              { id: "b", pregunta: R`$\log 4000$`, tipo: "num", respuesta: 3.602, tol: 0.003,
                errores: [{ v: 3.301, msg: "4 no es 2, es 2 al cuadrado. ¿Qué pasa con el exponente al tomar logaritmos?" }],
                pistas: ["Escribe 4000 como 4 × 10³, y 4 como 2².", "log(2²) = 2 · log 2."],
                solucion: R`$\log 4000 = \log(2^{2}) + \log(10^{3}) = 2 \times 0{,}301 + 3 = 3{,}602$.` },
              { id: "c", pregunta: R`$\log 5$, sabiendo que $5 = 10/2$`, tipo: "num", respuesta: 0.699, tol: 0.003,
                pistas: ["El logaritmo de un cociente es la resta de los logaritmos."],
                solucion: R`$\log 5 = \log 10 - \log 2 = 1 - 0{,}301 = 0{,}699$.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Sirio frente a la Polar",
            enunciado: R`<p>Sirio tiene magnitud aparente $-1{,}46$ y la estrella Polar, $1{,}98$.</p>`,
            partes: [
              { id: "a", pregunta: "¿Cuántas veces más flujo recibimos de Sirio que de la Polar?", tipo: "num", unidad: "veces", respuesta: 23.8, tol: 0.04,
                errores: [{ v: 0.042, msg: "Has obtenido el cociente inverso. Sirio tiene la magnitud menor, así que es la más brillante y el cociente debe ser mayor que 1." },
                          { v: 1.61, msg: "Has restado las magnitudes sin tener en cuenta que una es negativa: 1,98 − (−1,46) son 3,44." }],
                pistas: ["La diferencia de magnitudes es 1,98 − (−1,46).", "El cociente de flujos es 10 elevado a 0,4 por la diferencia de magnitudes."],
                solucion: R`$\Delta m = 1{,}98 - (-1{,}46) = 3{,}44$. Cociente: $10^{0{,}4 \times 3{,}44} = 10^{1{,}376} = 23{,}8$.` },
              { id: "b", pregunta: "Expresa esa diferencia en decibelios.", tipo: "num", unidad: "dB", respuesta: 13.76, tol: 0.03,
                pistas: ["Una magnitud son 4 dB."],
                solucion: R`$3{,}44 \times 4 = 13{,}8$ dB. Coincide con $10 \log 23{,}8$.` }
            ] },
          { id: "e3", nivel: 3, titulo: "¿Es Sirio realmente más luminosa que el Sol?",
            enunciado: R`<p>Sirio tiene $m = -1{,}46$ y está a 2,64 pc. La magnitud absoluta del Sol es 4,83. Dato: $\log 0{,}264 = -0{,}578$.</p>`,
            partes: [
              { id: "a", pregunta: "Magnitud absoluta de Sirio", tipo: "num", respuesta: 1.43, tol: 0.03,
                errores: [{ v: -4.35, msg: "Revisa el signo al despejar: M = m − 5 log(d/10), y el logaritmo de 0,264 es negativo, así que acabas sumando." }],
                pistas: ["Despeja M del módulo de distancia: M = m − 5 log(d/10).", "d/10 = 0,264, y su logaritmo es negativo."],
                solucion: R`$M = m - 5 \log\dfrac{2{,}64}{10} = -1{,}46 - 5\,(-0{,}578) = -1{,}46 + 2{,}89 = 1{,}43$.` },
              { id: "b", pregunta: "¿Cuántas veces más luminosa que el Sol es Sirio?", tipo: "num", unidad: "veces", respuesta: 22.9, tol: 0.06,
                pistas: ["Compara las dos magnitudes absolutas: ambas estrellas están ahora a la misma distancia, así que el cociente de flujos es el de luminosidades."],
                solucion: R`$\Delta M = 4{,}83 - 1{,}43 = 3{,}40$. Cociente: $10^{0{,}4 \times 3{,}40} = 10^{1{,}36} = 23$. Sirio emite unas 23 veces más luz visible que el Sol.` },
              { id: "c", pregunta: "Sirio parece la estrella más brillante del cielo. ¿Por qué?", tipo: "opcion", respuesta: 2,
                opciones: ["Porque es la estrella más luminosa de la galaxia.", "Porque es la estrella más cercana al Sol.", "Porque combina una luminosidad alta con una distancia muy pequeña.", "Porque su luz es más azul y el ojo es más sensible al azul."],
                pistas: ["El flujo depende de dos cosas: la luminosidad y la distancia."],
                solucion: R`Hay estrellas miles de veces más luminosas, como Rigel o Deneb, pero están cientos de veces más lejos. Y hay estrellas más cercanas, como Próxima Centauri, pero muy poco luminosas. Sirio gana por la combinación de ambas cosas.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Mide la magnitud límite de tu cielo</h3>
<p>La estrella más débil que alcanzas a ver te dice la calidad de tu cielo. La Osa Menor sirve de escala, porque sus estrellas cubren un rango amplio de magnitudes y es visible todo el año desde España.</p>
<div class="tabla"><table>
<thead><tr><th>Estrella de la Osa Menor</th><th>Magnitud</th></tr></thead>
<tbody>
<tr><td>Polar (α)</td><td>2,0</td></tr>
<tr><td>Kochab (β)</td><td>2,1</td></tr>
<tr><td>Pherkad (γ)</td><td>3,0</td></tr>
<tr><td>ε</td><td>4,2</td></tr>
<tr><td>ζ</td><td>4,3</td></tr>
<tr><td>δ</td><td>4,4</td></tr>
<tr><td>η</td><td>5,0</td></tr>
</tbody></table></div>
<ol>
<li>Espera 15 minutos a oscuras para que tus ojos se adapten.</li>
<li>Localiza la Osa Menor con ayuda de Stellarium.</li>
<li>Anota cuál es la estrella más débil de la tabla que consigues ver.</li>
<li>Calcula cuántas veces más débil es que la Polar.</li>
</ol>`,
          notas: [{ id: "limite", label: "Estrella más débil que ves, su magnitud y el cociente de flujos con la Polar" }],
          tareasTitulo: "Lista de la noche",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Esperar 15 minutos sin mirar pantallas brillantes." },
            { id: "t2", texto: "Encontrar la Polar, Kochab y Pherkad." },
            { id: "t3", texto: "Determinar mi magnitud límite." }
          ],
          notas2: [{ id: "cuaderno", label: "Cuaderno de observación: lugar, hora, estado del cielo y magnitud límite" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>El logaritmo es el exponente.</strong> Convierte productos en sumas y potencias en productos.`,
          R`<strong>El flujo cae con el cuadrado de la distancia:</strong> $F = L/4\pi d^{2}$, igual que la densidad de potencia de una antena isótropa.`,
          R`<strong>Cinco magnitudes son un factor 100.</strong> Una magnitud es un factor 2,512, o 4 dB, y la escala está invertida.`,
          R`<strong>La magnitud absoluta es la magnitud a 10 pc.</strong> Permite comparar luminosidades reales.`,
          R`<strong>El módulo de distancia</strong> $m - M = 5 \log(d/10\ \text{pc})$ relaciona brillo aparente, luminosidad y distancia.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 4 ───────────────────────── */
    {
      id: "leccion-4", n: 4, fase: 0, codigo: "A0.4 · C1.1",
      titulo: "Vectores, funciones y tu primera noche",
      sub: "Direcciones en el cielo, leyes de potencias y cómo gira la bóveda celeste.",
      horas: "5 horas",
      contexto: "Vectores: componentes, módulo, suma, producto escalar (a·b = |a||b|cos theta). Dirección en el cielo como vector unitario a partir de altura y azimut. Funciones lineales y leyes de potencias; en escala log-log una ley de potencias es una recta cuya pendiente es el exponente. Tercera ley de Kepler T = a^1,5 (años, UA). El cielo gira 15 grados por hora alrededor del polo; la altura de la Polar es la latitud.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Un vector es una cantidad con dirección. Apuntar una antena con azimut y elevación es dar un vector, y localizar una estrella en el cielo es exactamente lo mismo.</p>
<p>Hasta ahora has trabajado con números sueltos: una distancia, un ángulo, un brillo. Pero una velocidad, una fuerza o la posición de una estrella necesitan además una dirección. Los vectores permiten sumar esas cantidades y, sobre todo, calcular el ángulo entre dos direcciones con una sola operación.</p>
<div class="nota"><strong>La segunda herramienta de la lección también la conoces.</strong> En un diagrama de Bode, una caída de 20 dB por década es una recta. Eso ocurre porque los dos ejes son logarítmicos y la respuesta sigue una ley de potencias. En astronomía casi todas las relaciones importantes son leyes de potencias, y se leen igual: la pendiente de la recta es el exponente.</div>
<p>La lección termina fuera de casa: con vectores y ángulos en la cabeza, tu primera noche de observación consiste en comprobar que el cielo entero gira alrededor de un punto.</p>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Componentes y módulo</h3>
<p>En un plano con ejes $x$ e $y$, un vector se describe por lo que avanza en cada eje. Esas dos cantidades son sus <em>componentes</em>.</p>
$$\vec{v} = (v_x,\ v_y)$$
<p>Las componentes son los catetos de un triángulo rectángulo cuya hipotenusa es el propio vector. Su longitud, el <em>módulo</em>, sale del teorema de Pitágoras:</p>
$$|\vec{v}| = \sqrt{v_x^{2} + v_y^{2}}$$
<p>Si conoces el módulo $v$ y el ángulo $\theta$ con el eje $x$, las componentes salen de la definición de coseno y seno de la Lección 2:</p>
$$v_x = v\cos\theta \qquad v_y = v\sin\theta \qquad \tan\theta = \frac{v_y}{v_x}$$
<p>En tres dimensiones se añade una componente y nada más cambia: $|\vec{v}| = \sqrt{v_x^{2} + v_y^{2} + v_z^{2}}$.</p>

<h3>2. Suma</h3>
<p>Dos vectores se suman componente a componente. Geométricamente equivale a colocar uno a continuación del otro.</p>
$$\vec{a} + \vec{b} = (a_x + b_x,\ a_y + b_y)$$

<h3>3. Producto escalar</h3>
<p>El producto escalar multiplica dos vectores y da un número. Se calcula multiplicando las componentes correspondientes y sumando:</p>
$$\vec{a}\cdot\vec{b} = a_x b_x + a_y b_y + a_z b_z$$
<p>Su utilidad viene de que ese mismo número es el producto de los módulos por el coseno del ángulo que forman:</p>
$$\vec{a}\cdot\vec{b} = |\vec{a}|\,|\vec{b}|\cos\theta$$
<p>Igualando las dos expresiones se obtiene el ángulo entre dos direcciones cualesquiera. Si el producto escalar es cero, los vectores son perpendiculares, porque $\cos 90^\circ = 0$.</p>
$$\cos\theta = \frac{\vec{a}\cdot\vec{b}}{|\vec{a}|\,|\vec{b}|}$$

<h3>4. Una dirección en el cielo</h3>
<p>Desde tu punto de observación, cada estrella tiene dos ángulos: la <em>altura</em> $h$ sobre el horizonte y el <em>azimut</em> $A$, medido desde el norte hacia el este. Con ejes $x$ al norte, $y$ al este y $z$ al cénit, la dirección de la estrella es un vector de módulo 1:</p>
$$\hat{s} = (\cos h\cos A,\ \cos h\sin A,\ \sin h)$$
<p>La componente vertical es $\sin h$ por la definición de seno. Lo que queda sobre el suelo mide $\cos h$, y se reparte entre norte y este con el coseno y el seno del azimut. Es la misma descomposición que la de un haz de antena en azimut y elevación.</p>

<h3>5. Leyes de potencias y rectas</h3>
<p>Una <em>ley de potencias</em> es una función en la que la variable aparece elevada a un exponente fijo $n$.</p>
$$y = k\,x^{n}$$
<p>Toma logaritmos en los dos lados y aplica las propiedades de la Lección 3. El producto se convierte en suma y el exponente baja multiplicando:</p>
$$\log y = \log k + n\log x$$
<p>Esto es la ecuación de una recta, $Y = b + nX$, si representas $\log y$ frente a $\log x$. La pendiente es el exponente $n$. Por eso los astrónomos dibujan casi todo en ejes logarítmicos.</p>
<p>El ejemplo clásico es la tercera ley de Kepler. Con el periodo $T$ en años y el radio de la órbita $a$ en UA:</p>
$$T^{2} = a^{3} \;\Rightarrow\; T = a^{3/2}$$
<p>En escala log-log, todos los planetas caen sobre una recta de pendiente 1,5. La deducirás a partir de la gravedad en la Fase 1.</p>

<h3>6. El cielo gira</h3>
<p>La Tierra da una vuelta sobre su eje en 23 horas y 56 minutos. Visto desde el suelo, es el cielo el que gira en sentido contrario, alrededor del punto al que apunta el eje terrestre: el <em>polo celeste</em>, que está a menos de un grado de la estrella Polar.</p>
$$\omega = \frac{360^\circ}{24\ \text{h}} \approx 15^\circ\ \text{por hora}$$
<p>La altura del polo sobre el horizonte es igual a tu latitud. En Madrid, la Polar está siempre a unos $40^\circ$ de altura, hacia el norte, y no se mueve.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>¿Qué ángulo separa dos estrellas?</h3>
<p>La estrella 1 está al norte ($A = 0^\circ$) a $30^\circ$ de altura. La estrella 2 está al este ($A = 90^\circ$) a $60^\circ$ de altura. Primero escribimos sus vectores de dirección:</p>
$$\hat{s}_1 = (\cos 30^\circ\cos 0^\circ,\ \cos 30^\circ\sin 0^\circ,\ \sin 30^\circ) = (0{,}866,\ 0,\ 0{,}5)$$
$$\hat{s}_2 = (\cos 60^\circ\cos 90^\circ,\ \cos 60^\circ\sin 90^\circ,\ \sin 60^\circ) = (0,\ 0{,}5,\ 0{,}866)$$
<p>Los dos tienen módulo 1, así que el producto escalar es directamente el coseno del ángulo:</p>
$$\cos\theta = 0{,}866 \cdot 0 + 0 \cdot 0{,}5 + 0{,}5 \cdot 0{,}866 = 0{,}433 \;\Rightarrow\; \theta = 64{,}3^\circ$$
<p>No son $90^\circ$ aunque los azimuts difieran en $90^\circ$, porque las dos estrellas están altas y las direcciones se acercan entre sí al subir hacia el cénit.</p>
<h3>El año de Marte</h3>
<p>Marte orbita a $a = 1{,}524$ UA. Con la ley de Kepler:</p>
$$T = a^{3/2} = 1{,}524^{1{,}5} = 1{,}524 \times \sqrt{1{,}524} = 1{,}524 \times 1{,}2345 = 1{,}88\ \text{años}$$
<p>Son 687 días, que es el valor observado.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Componentes y módulo",
            enunciado: R`<p>Considera los vectores $\vec{a} = (3,\ 4)$ y $\vec{b} = (1,\ -2)$.</p>`,
            partes: [
              { id: "a", pregunta: R`Módulo de $\vec{a}$`, tipo: "num", respuesta: 5,
                errores: [{ v: 7, msg: "Has sumado las componentes. El módulo es la hipotenusa: raíz de la suma de los cuadrados." }, { v: 25, msg: "Falta la raíz cuadrada." }],
                pistas: ["Aplica Pitágoras a las dos componentes."],
                solucion: R`$\sqrt{3^{2} + 4^{2}} = \sqrt{25} = 5$.` },
              { id: "b", pregunta: R`Ángulo de $\vec{a}$ con el eje $x$, en grados`, tipo: "num", unidad: "°", respuesta: 53.13,
                errores: [{ v: 36.87, msg: "Has invertido el cociente. La tangente es la componente y entre la componente x." }, { v: 0.927, msg: "Ese valor está en radianes. Se pide en grados." }],
                pistas: ["tan θ = componente y entre componente x. Usa la tecla de arcotangente."],
                solucion: R`$\tan\theta = 4/3$, así que $\theta = \arctan(1{,}333) = 53{,}1^\circ$.` },
              { id: "c", pregunta: R`Módulo de $\vec{a} + \vec{b}$`, tipo: "num", respuesta: 4.472,
                errores: [{ v: 7.236, msg: "Has sumado los módulos. Los vectores se suman componente a componente, y después se calcula el módulo del resultado." }],
                pistas: ["Primero suma componente a componente. Después aplica Pitágoras al resultado."],
                solucion: R`$\vec{a} + \vec{b} = (4,\ 2)$, y su módulo es $\sqrt{16 + 4} = \sqrt{20} = 4{,}47$.` }
            ] },
          { id: "e2", nivel: 2, titulo: "La velocidad de una estrella",
            enunciado: R`<p>Una estrella se aleja de nosotros a 20 km/s (velocidad radial, medida por efecto Doppler) y además se desplaza de lado a 15 km/s (velocidad tangencial, medida por su movimiento en el cielo). Las dos componentes son perpendiculares.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad total de la estrella respecto al Sol", tipo: "num", unidad: "km/s", respuesta: 25,
                errores: [{ v: 35, msg: "Las velocidades perpendiculares no se suman directamente. Son los catetos de un triángulo rectángulo." }],
                pistas: ["Radial y tangencial son las dos componentes del vector velocidad."],
                solucion: R`$v = \sqrt{20^{2} + 15^{2}} = \sqrt{625} = 25$ km/s.` },
              { id: "b", pregunta: "Ángulo entre la velocidad total y la línea de visión", tipo: "num", unidad: "°", respuesta: 36.87,
                errores: [{ v: 53.13, msg: "Ese es el ángulo con la dirección tangencial. La línea de visión es la dirección radial." }],
                pistas: ["La componente a lo largo de la línea de visión es la radial. La tangente del ángulo es tangencial entre radial."],
                solucion: R`$\tan\theta = 15/20 = 0{,}75$, así que $\theta = 36{,}9^\circ$.` },
              { id: "c", pregunta: R`Producto escalar de $(1,\ 2,\ 2)$ y $(2,\ 1,\ -2)$`, tipo: "num", respuesta: 0, tol: 0.001,
                pistas: ["Multiplica componente a componente y suma los tres productos, con su signo."],
                solucion: R`$1 \cdot 2 + 2 \cdot 1 + 2 \cdot (-2) = 2 + 2 - 4 = 0$.` },
              { id: "d", pregunta: "¿Qué ángulo forman esos dos vectores?", tipo: "num", unidad: "°", respuesta: 90,
                pistas: ["¿Para qué ángulo vale cero el coseno?"],
                solucion: R`Si el producto escalar es cero, $\cos\theta = 0$ y los vectores son perpendiculares: $90^\circ$.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Kepler en escala logarítmica",
            enunciado: R`<p>Usa $T = a^{3/2}$, con $T$ en años y $a$ en UA.</p>`,
            partes: [
              { id: "a", pregunta: "Júpiter orbita a 5,20 UA. ¿Cuánto dura su año?", tipo: "num", unidad: "años", respuesta: 11.86,
                errores: [{ v: 7.8, msg: "Has multiplicado por 1,5. El 1,5 es un exponente: a elevado a 1,5 es a por la raíz de a." }, { v: 3.0, msg: "Has usado el exponente 2/3. Ese es el que despeja a en función de T." }],
                pistas: ["a elevado a 1,5 es a multiplicado por su raíz cuadrada."],
                solucion: R`$T = 5{,}20 \times \sqrt{5{,}20} = 5{,}20 \times 2{,}280 = 11{,}86$ años.` },
              { id: "b", pregunta: "Un asteroide tarda 8 años en dar una vuelta al Sol. ¿A qué distancia orbita?", tipo: "num", unidad: "UA", respuesta: 4,
                errores: [{ v: 22.63, msg: "Has aplicado el exponente 3/2. Para despejar a hay que usar el inverso, 2/3." }],
                pistas: ["Despeja a: eleva los dos lados a 2/3.", "8 elevado a 2/3 es la raíz cúbica de 8, al cuadrado."],
                solucion: R`$a = T^{2/3} = 8^{2/3} = (\sqrt[3]{8})^{2} = 2^{2} = 4$ UA.` },
              { id: "c", pregunta: R`Si representas $\log T$ frente a $\log a$ para todos los planetas, ¿qué pendiente tiene la recta?`, tipo: "num", respuesta: 1.5,
                errores: [{ v: 0.667, msg: "Esa sería la pendiente con los ejes intercambiados. Aquí T va en el eje vertical." }],
                pistas: ["Toma logaritmos en T = a^1,5. El exponente baja multiplicando."],
                solucion: R`$\log T = 1{,}5\,\log a$. Es una recta que pasa por el origen con pendiente 1,5.` },
              { id: "d", pregunta: "¿Cuántos grados gira una estrella alrededor del polo celeste en 2 horas?", tipo: "num", unidad: "°", respuesta: 30,
                pistas: ["El cielo da una vuelta completa en un día."],
                solucion: R`$15^\circ$ por hora durante 2 horas son $30^\circ$: tres puños con el brazo extendido.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Tu primera noche: comprueba que el cielo gira</h3>
<p>Necesitas una noche despejada, un sitio desde el que veas el norte y unas dos horas, aunque no seguidas.</p>
<ol>
<li><strong>Encuentra la Polar.</strong> Localiza el Carro de la Osa Mayor. Prolonga cinco veces la línea que une las dos estrellas del borde del cazo y llegarás a ella. En otoño el Carro está bajo, cerca del horizonte norte; si no lo ves, usa Casiopea, que queda al otro lado de la Polar.</li>
<li><strong>Mide su altura</strong> con el puño, a razón de $10^\circ$ por puño. Debería coincidir con tu latitud.</li>
<li><strong>Elige una estrella brillante</strong> cerca de un tejado, un árbol o una antena, y anota la hora y su posición respecto a esa referencia.</li>
<li><strong>Vuelve una hora después</strong>, al mismo sitio exacto. Mide con la mano cuánto se ha movido.</li>
</ol>
<p>Abre después Stellarium, activa la cuadrícula azimutal y acelera el tiempo. Verás el mismo giro que acabas de medir.</p>`,
          notas: [{ id: "giro", label: "Altura de la Polar, estrella elegida, horas y desplazamiento medido" }],
          tareasTitulo: "Lista de la noche",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Encontrar la Polar a partir del Carro o de Casiopea." },
            { id: "t2", texto: "Medir la altura de la Polar y compararla con mi latitud." },
            { id: "t3", texto: "Medir cuánto se desplaza una estrella en una hora." },
            { id: "t4", texto: "Reproducir el giro en Stellarium acelerando el tiempo." }
          ],
          notas2: [{ id: "cuaderno", label: "Cuaderno de observación: lugar, fecha, estado del cielo y lo que más te ha sorprendido" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Un vector tiene componentes y módulo.</strong> El módulo sale de Pitágoras y las componentes, del seno y el coseno.`,
          R`<strong>El producto escalar da el ángulo entre dos direcciones:</strong> $\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos\theta$.`,
          R`<strong>La posición de una estrella es un vector unitario</strong> definido por su altura y su azimut.`,
          R`<strong>Una ley de potencias es una recta en escala log-log</strong>, y su pendiente es el exponente. Kepler: $T = a^{3/2}$.`,
          R`<strong>El cielo gira 15° por hora alrededor del polo celeste</strong>, y la altura de la Polar es tu latitud.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 5 · REPASO ───────────────────────── */
    {
      id: "leccion-5", n: 5, fase: 0, codigo: "Repaso acumulativo",
      titulo: "Repaso de la Fase 0",
      sub: "Tres problemas que mezclan todo lo anterior, para decidir el ritmo de la Fase 1.",
      horas: "3 horas",
      contexto: "Repaso de la Fase 0: potencias y notación científica, UA, año luz y pársec, ángulos pequeños y tamaño angular, paralaje d[pc] = 1/p, logaritmos, magnitudes (m1 - m2 = -2,5 log(F1/F2)), módulo de distancia m - M = 5 log(d/10 pc), vectores y leyes de potencias.",
      secciones: [
        { id: "mapa", titulo: "Mapa de ideas", html: R`
<p class="lead">En cuatro lecciones has reunido las herramientas con las que se mide el universo cercano: cuánto mide algo, a qué distancia está y cuánta luz emite.</p>
<div class="tabla"><table>
<thead><tr><th>Idea</th><th>Fórmula</th><th>Lección</th></tr></thead>
<tbody>
<tr><td>Producto de potencias</td><td>$a^{m}a^{n} = a^{m+n}$</td><td>1</td></tr>
<tr><td>Año luz y pársec</td><td>$9{,}461 \times 10^{15}$ m y $3{,}086 \times 10^{16}$ m</td><td>1</td></tr>
<tr><td>Tiempo de luz</td><td>$t = d/c$</td><td>1</td></tr>
<tr><td>Radián en segundos de arco</td><td>$1\ \text{rad} = 206\,265''$</td><td>2</td></tr>
<tr><td>Tamaño angular</td><td>$\theta = D/d$</td><td>2</td></tr>
<tr><td>Paralaje</td><td>$d\,[\text{pc}] = 1/p\,['']$</td><td>2</td></tr>
<tr><td>Flujo</td><td>$F = L/4\pi d^{2}$</td><td>3</td></tr>
<tr><td>Magnitudes</td><td>$m_1 - m_2 = -2{,}5\log(F_1/F_2)$</td><td>3</td></tr>
<tr><td>Módulo de distancia</td><td>$m - M = 5\log(d/10\ \text{pc})$</td><td>3</td></tr>
<tr><td>Producto escalar</td><td>$\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos\theta$</td><td>4</td></tr>
<tr><td>Tercera ley de Kepler</td><td>$T = a^{3/2}$</td><td>4</td></tr>
</tbody></table></div>
<p>Intenta los problemas sin volver a las lecciones. Si necesitas consultarlas, hazlo, pero apunta cuál: esa es la información que sirve para ajustar el ritmo.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "r1", nivel: 2, titulo: "Vega, de principio a fin",
            enunciado: R`<p>Vega tiene un paralaje de $0{,}130''$ y una magnitud aparente $m = 0{,}03$. La magnitud absoluta del Sol es 4,83. Dato: $\log 0{,}769 = -0{,}114$.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia a Vega en pársecs", tipo: "num", unidad: "pc", respuesta: 7.69,
                pistas: ["La distancia en pársecs es el inverso del paralaje en segundos de arco."],
                solucion: R`$d = 1/0{,}130 = 7{,}69$ pc.` },
              { id: "b", pregunta: "¿Cuántos años tarda su luz en llegar?", tipo: "num", unidad: "años", respuesta: 25.1, tol: 0.03,
                pistas: ["Pasa los pársecs a años luz. La luz tarda un año en recorrer un año luz."],
                solucion: R`$7{,}69 \times 3{,}26 = 25{,}1$ años luz, así que la luz tarda 25 años.` },
              { id: "c", pregunta: "Magnitud absoluta de Vega", tipo: "num", respuesta: 0.60, tol: 0.05,
                errores: [{ v: -0.54, msg: "Revisa el signo: el logaritmo de 0,769 es negativo, y al restarlo acabas sumando." }],
                pistas: ["M = m − 5 log(d/10). Aquí d/10 = 0,769."],
                solucion: R`$M = 0{,}03 - 5\,(-0{,}114) = 0{,}03 + 0{,}57 = 0{,}60$.` },
              { id: "d", pregunta: "¿Cuántas veces más luminosa que el Sol es Vega?", tipo: "num", unidad: "veces", respuesta: 49, tol: 0.08,
                pistas: ["Compara las dos magnitudes absolutas y convierte la diferencia en cociente de flujos."],
                solucion: R`$\Delta M = 4{,}83 - 0{,}60 = 4{,}23$. Cociente: $10^{0{,}4 \times 4{,}23} = 10^{1{,}69} \approx 49$.` }
            ] },
          { id: "r2", nivel: 2, titulo: "Júpiter en el ocular",
            enunciado: R`<p>Júpiter tiene un diámetro de $1{,}40 \times 10^{8}$ m. En su mejor momento está a 4,2 UA de la Tierra.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia en metros", tipo: "sci", unidad: "m", respuesta: 6.28e11,
                pistas: ["Una UA son 1,496 × 10¹¹ m."],
                solucion: R`$4{,}2 \times 1{,}496 \times 10^{11} = 6{,}28 \times 10^{11}$ m.` },
              { id: "b", pregunta: "Tamaño angular en radianes", tipo: "sci", unidad: "rad", respuesta: 2.23e-4,
                pistas: ["Tamaño angular = diámetro entre distancia."],
                solucion: R`$\theta = \dfrac{1{,}40 \times 10^{8}}{6{,}28 \times 10^{11}} = 2{,}23 \times 10^{-4}$ rad.` },
              { id: "c", pregunta: "Tamaño angular en segundos de arco", tipo: "num", unidad: "″", respuesta: 46, tol: 0.03,
                errores: [{ v: 0.0128, msg: "Ese valor está en grados. Se piden segundos de arco." }],
                pistas: ["Un radián son 206 265 segundos de arco."],
                solucion: R`$2{,}23 \times 10^{-4} \times 206\,265 = 46''$. Con 100 aumentos, Júpiter se ve con un tamaño aparente de $4600'' = 1{,}3^\circ$, más de dos veces la Luna a simple vista.` }
            ] },
          { id: "r3", nivel: 3, titulo: "La galaxia de Andrómeda",
            enunciado: R`<p>Andrómeda está a 2,5 millones de años luz y su magnitud aparente es 3,4. Dato: $\log(7{,}67 \times 10^{4}) = 4{,}885$.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia en pársecs", tipo: "sci", unidad: "pc", respuesta: 7.67e5,
                errores: [{ v: 8.15e6, msg: "Has multiplicado por 3,26. Un pársec es mayor que un año luz, así que el número en pársecs debe ser menor." }],
                pistas: ["Un pársec son 3,26 años luz. Para pasar de años luz a pársecs se divide."],
                solucion: R`$\dfrac{2{,}5 \times 10^{6}}{3{,}26} = 7{,}67 \times 10^{5}$ pc.` },
              { id: "b", pregunta: "Módulo de distancia m − M", tipo: "num", respuesta: 24.4, tol: 0.01,
                pistas: ["m − M = 5 log(d/10). Divide la distancia entre 10 y usa el dato del enunciado."],
                solucion: R`$5\log\dfrac{7{,}67 \times 10^{5}}{10} = 5 \times 4{,}885 = 24{,}4$.` },
              { id: "c", pregunta: "Magnitud absoluta de Andrómeda", tipo: "num", respuesta: -21.0, tol: 0.01,
                errores: [{ v: 27.8, msg: "Has sumado el módulo. Despeja con cuidado: M = m − (m − M)." }],
                pistas: ["M es la magnitud aparente menos el módulo de distancia."],
                solucion: R`$M = 3{,}4 - 24{,}4 = -21{,}0$. Frente al $4{,}83$ del Sol son casi 26 magnitudes: unas $2 \times 10^{10}$ veces la luz del Sol.` }
            ] }
        ] },

        { id: "ritmo", titulo: "Ajuste de ritmo", html: R`
<h3>Cómo interpretar tu resultado</h3>
<div class="tabla"><table>
<thead><tr><th>Lo que ha pasado</th><th>Qué significa</th><th>Qué hacer</th></tr></thead>
<tbody>
<tr><td>Casi todo bien a la primera, sin consultar</td><td>La base está recuperada</td><td>Pasar a la Fase 1 y subir un poco el ritmo</td></tr>
<tr><td>Bien, pero consultando las lecciones</td><td>Las ideas están; falta soltura</td><td>Pasar a la Fase 1 al ritmo previsto</td></tr>
<tr><td>Errores repetidos en un mismo tema</td><td>Una herramienta concreta falla</td><td>Repetir los ejercicios de esa lección antes de seguir</td></tr>
</tbody></table></div>
<p>Los fallos más habituales en este punto son tres: los signos al despejar en el módulo de distancia, olvidar pasar los ángulos a radianes y confundir multiplicar con dividir al cambiar de unidades. Ninguno es grave y los tres se corrigen con práctica.</p>`,
          notas: [{ id: "balance", label: "Qué te ha costado más, qué lecciones has tenido que consultar y cuántas horas reales has dedicado por semana" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Ya puedes medir el vecindario solar:</strong> distancia por paralaje, tamaño por ángulo y luminosidad por magnitud.`,
          R`<strong>Las mismas tres herramientas</strong>, notación científica, ángulos pequeños y logaritmos, aparecerán en todas las fases siguientes.`,
          R`<strong>Lo siguiente es la Fase 1:</strong> derivadas e integrales para describir el movimiento, y con ellas la esfera celeste y las órbitas.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 6 ───────────────────────── */
    {
      id: "leccion-6", n: 6, fase: 1, codigo: "A1.1",
      titulo: "Derivadas: el ritmo del cambio",
      sub: "Cómo se mide la rapidez con la que cambia algo, y por qué eso es la velocidad.",
      horas: "6 horas",
      contexto: "Derivada como límite del cociente incremental y como pendiente; reglas de derivación (potencia, suma, producto, cadena); derivadas de seno, coseno, exponencial y logaritmo; máximos y mínimos; aproximación lineal f(x+dx) = f(x) + f'(x) dx y (1+x)^n = 1 + n x; velocidad v = dx/dt y aceleración a = dv/dt; propagación de errores con derivadas.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">La derivada responde a una pregunta: si muevo un poco la entrada, ¿cuánto se mueve la salida? Es la pendiente de una curva en un punto.</p>
<p>El velocímetro de un coche es una derivada. No te dice dónde estás ni cuánto has recorrido, sino a qué ritmo cambia tu posición en este instante. En electrónica lo has visto con otro nombre: la pendiente de una señal, el <em>slew rate</em> de un amplificador o la ganancia en pequeña señal de un circuito son derivadas.</p>
<div class="nota"><strong>Por qué la necesita la astronomía.</strong> Todo en el cielo se mueve, y las leyes de la física no dicen dónde está un planeta sino cómo cambia su velocidad. Para pasar de fuerzas a órbitas hacen falta derivadas. Además, sirven para algo muy práctico: saber cuánto error tiene un resultado cuando el dato medido tiene error.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. De la velocidad media a la instantánea</h3>
<p>Si un objeto está en $x_1$ en el instante $t_1$ y en $x_2$ en $t_2$, su velocidad media es el desplazamiento entre el tiempo empleado.</p>
$$v_\text{media} = \frac{x_2 - x_1}{t_2 - t_1} = \frac{\Delta x}{\Delta t}$$
<p>Para conocer la velocidad en un instante concreto, acortamos el intervalo hasta que sea tan pequeño como queramos. Ese proceso es un <em>límite</em>.</p>

<h3>2. Definición</h3>
<p>La derivada de $f$ en $x$ es el límite del cociente entre lo que cambia la función y lo que cambia la variable, cuando ese cambio $h$ tiende a cero.</p>
$$f'(x) = \frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
<p>Hagámoslo una vez a mano con $f(x) = x^{2}$. Desarrollamos el cuadrado, restamos y simplificamos $h$ antes de tomar el límite:</p>
$$\frac{(x+h)^{2} - x^{2}}{h} = \frac{x^{2} + 2xh + h^{2} - x^{2}}{h} = \frac{2xh + h^{2}}{h} = 2x + h \;\xrightarrow{\;h \to 0\;}\; 2x$$
<p>La pendiente de la parábola en el punto $x$ es $2x$: cero en el vértice y cada vez mayor al alejarse.</p>

<h3>3. Reglas</h3>
<p>No hace falta repetir el límite cada vez. Estas reglas cubren casi todo lo que necesitarás.</p>
<p><strong>Potencia.</strong> El exponente baja multiplicando y se reduce en uno. Vale para cualquier exponente, también negativo o fraccionario.</p>
$$\frac{d}{dx}\,x^{n} = n\,x^{n-1}$$
<p><strong>Constante y suma.</strong> Una constante que multiplica sale fuera, y la derivada de una suma es la suma de las derivadas.</p>
$$\frac{d}{dx}\big[c\,f + g\big] = c\,f' + g'$$
<p><strong>Producto.</strong> Cada factor se deriva una vez mientras el otro espera.</p>
$$\frac{d}{dx}\big[f\,g\big] = f'\,g + f\,g'$$
<p><strong>Cadena.</strong> Si una función está dentro de otra, se multiplican las derivadas: la de fuera, evaluada en la de dentro, por la de dentro. Es como dos etapas de ganancia en cascada.</p>
$$\frac{d}{dx}\,f\big(g(x)\big) = f'\big(g(x)\big)\cdot g'(x)$$
<p><strong>Funciones básicas.</strong> Los ángulos van siempre en radianes.</p>
$$\frac{d}{dx}\sin x = \cos x \qquad \frac{d}{dx}\cos x = -\sin x \qquad \frac{d}{dx}e^{x} = e^{x} \qquad \frac{d}{dx}\ln x = \frac{1}{x}$$
<p>El número $e = 2{,}718\ldots$ es la base para la que la exponencial es su propia derivada, y $\ln$ es el logaritmo en esa base. Se relaciona con el decimal por $\ln x = 2{,}303\,\log x$.</p>

<h3>4. Máximos y mínimos</h3>
<p>En la cima de una colina la pendiente es cero. Para encontrar dónde una función alcanza un máximo o un mínimo, se deriva y se iguala a cero.</p>
$$f'(x) = 0$$

<h3>5. Aproximación lineal</h3>
<p>Cerca de un punto, toda curva suave se parece a su recta tangente. Si la entrada cambia una cantidad pequeña $\Delta x$, la salida cambia aproximadamente la pendiente por ese cambio.</p>
$$f(x + \Delta x) \approx f(x) + f'(x)\,\Delta x$$
<p>Aplicada a $(1+x)^{n}$ cerca de $x = 0$ da una de las fórmulas más usadas de la física:</p>
$$(1 + x)^{n} \approx 1 + n\,x \qquad (|x| \ll 1)$$
<p>La aproximación de ángulo pequeño de la Lección 2, $\sin\theta \approx \theta$, es este mismo resultado: la pendiente del seno en el origen es $\cos 0 = 1$.</p>

<h3>6. Velocidad y aceleración</h3>
<p>La velocidad es la derivada de la posición respecto al tiempo, y la aceleración es la derivada de la velocidad.</p>
$$v = \frac{dx}{dt} \qquad a = \frac{dv}{dt} = \frac{d^{2}x}{dt^{2}}$$
<p>Para un objeto que cae desde el reposo, $x(t) = \tfrac{1}{2} g t^{2}$. Derivando una vez, $v = g\,t$; derivando otra, $a = g$, que es constante.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Caída libre en la Luna</h3>
<p>En la Luna, $g = 1{,}62\ \text{m/s}^2$. La distancia recorrida por un martillo que se suelta es $x(t) = \tfrac{1}{2}(1{,}62)\,t^{2} = 0{,}81\,t^{2}$. Su velocidad es la derivada:</p>
$$v(t) = \frac{dx}{dt} = 2 \times 0{,}81\,t = 1{,}62\,t \;\Rightarrow\; v(3\ \text{s}) = 4{,}86\ \text{m/s}$$
<h3>¿Cuánto error tiene la distancia a Sirio?</h3>
<p>La distancia sale del paralaje, $d = 1/p = p^{-1}$. Si el paralaje tiene un error $\Delta p$, la aproximación lineal dice cuánto error hereda la distancia. Derivamos con la regla de la potencia:</p>
$$\frac{dd}{dp} = -p^{-2} = -\frac{1}{p^{2}} \;\Rightarrow\; |\Delta d| \approx \frac{\Delta p}{p^{2}}$$
<p>Para Sirio, $p = 0{,}379''$ con un error de $0{,}002''$:</p>
$$|\Delta d| \approx \frac{0{,}002}{0{,}379^{2}} = \frac{0{,}002}{0{,}1436} = 0{,}014\ \text{pc}$$
<p>La distancia es $2{,}64 \pm 0{,}01$ pc. Fíjate en el $p^{2}$ del denominador: cuanto menor es el paralaje, más se amplifica el error. Por eso el paralaje deja de servir para estrellas lejanas.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Reglas de derivación",
            enunciado: R`<p>Deriva cada función y evalúa la derivada en el punto indicado.</p>`,
            partes: [
              { id: "a", pregunta: R`$f(x) = 3x^{4}$, en $x = 2$`, tipo: "num", respuesta: 96,
                errores: [{ v: 48, msg: "Ese es el valor de la función, no de la derivada. Deriva primero: el exponente baja multiplicando." }, { v: 24, msg: "Has bajado el exponente pero no has evaluado bien la potencia: 2 al cubo es 8." }],
                pistas: ["La derivada es 12x³. Sustituye x = 2."],
                solucion: R`$f'(x) = 3 \cdot 4\,x^{3} = 12x^{3}$, y $f'(2) = 12 \cdot 8 = 96$.` },
              { id: "b", pregunta: R`$f(x) = \dfrac{5}{x^{2}}$, en $x = 1$`, tipo: "num", respuesta: -10,
                errores: [{ v: 10, msg: "El valor absoluto es correcto, pero falta el signo: al bajar un exponente negativo, la derivada es negativa." }],
                pistas: ["Escribe la función como 5x⁻² y aplica la regla de la potencia."],
                solucion: R`$f(x) = 5x^{-2}$, así que $f'(x) = -10\,x^{-3}$ y $f'(1) = -10$.` },
              { id: "c", pregunta: R`$f(x) = \sin(2x)$, en $x = 0$`, tipo: "num", respuesta: 2,
                errores: [{ v: 1, msg: "Falta la regla de la cadena: hay que multiplicar por la derivada de lo de dentro, que es 2x." }],
                pistas: ["Regla de la cadena: derivada del seno, evaluada en 2x, por la derivada de 2x."],
                solucion: R`$f'(x) = \cos(2x) \cdot 2$, y $f'(0) = 2\cos 0 = 2$.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Lanzamiento vertical",
            enunciado: R`<p>Lanzas una piedra hacia arriba y su altura en metros es $x(t) = 20\,t - 5\,t^{2}$, con $t$ en segundos.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad en t = 1 s", tipo: "num", unidad: "m/s", respuesta: 10,
                errores: [{ v: 15, msg: "Ese es el valor de la altura en t = 1. La velocidad es la derivada." }],
                pistas: ["Deriva x(t) término a término."],
                solucion: R`$v(t) = 20 - 10\,t$, y $v(1) = 10$ m/s.` },
              { id: "b", pregunta: "¿En qué instante alcanza la altura máxima?", tipo: "num", unidad: "s", respuesta: 2,
                pistas: ["En el punto más alto la piedra se para un instante: la velocidad es cero."],
                solucion: R`$v = 20 - 10\,t = 0 \Rightarrow t = 2$ s.` },
              { id: "c", pregunta: "Altura máxima", tipo: "num", unidad: "m", respuesta: 20,
                pistas: ["Sustituye en x(t) el instante que acabas de obtener."],
                solucion: R`$x(2) = 40 - 20 = 20$ m.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Pequeños cambios",
            enunciado: R`<p>Usa la aproximación lineal y $(1+x)^{n} \approx 1 + nx$.</p>`,
            partes: [
              { id: "a", pregunta: "El flujo de una estrella va como 1/d². Si la distancia aumenta un 1 %, ¿cuánto cambia el flujo, en tanto por ciento?", tipo: "num", unidad: "%", respuesta: -2, tol: 0.03,
                errores: [{ v: 2, msg: "El tamaño es correcto, pero el flujo disminuye al alejarse: el cambio es negativo." }, { v: -1, msg: "El exponente es −2, y multiplica al cambio relativo." }],
                pistas: ["Escribe el flujo como d⁻² y la nueva distancia como d(1 + 0,01)."],
                solucion: R`$F \propto [d(1 + 0{,}01)]^{-2} = d^{-2}(1 + 0{,}01)^{-2} \approx d^{-2}(1 - 0{,}02)$. El flujo baja un 2 %.` },
              { id: "b", pregunta: "Vega tiene p = 0,130″ con un error de 0,001″. ¿Qué error tiene su distancia?", tipo: "num", unidad: "pc", respuesta: 0.0592, tol: 0.04,
                errores: [{ v: 0.0077, msg: "Has dividido entre p una sola vez. La derivada de 1/p lleva p al cuadrado en el denominador." }],
                pistas: ["El error en d es el error en p dividido entre p al cuadrado."],
                solucion: R`$\Delta d \approx \dfrac{0{,}001}{0{,}130^{2}} = \dfrac{0{,}001}{0{,}0169} = 0{,}059$ pc. La distancia es $7{,}69 \pm 0{,}06$ pc.` },
              { id: "c", pregunta: R`Para $T = a^{3/2}$ (años, UA), ¿cuánto vale $dT/da$ en la órbita de la Tierra, $a = 1$?`, tipo: "num", unidad: "años/UA", respuesta: 1.5,
                pistas: ["Regla de la potencia con n = 3/2."],
                solucion: R`$\dfrac{dT}{da} = \dfrac{3}{2}\,a^{1/2}$, que en $a = 1$ vale $1{,}5$. Una órbita un 1 % mayor que la terrestre tendría un año un 1,5 % más largo.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Tu primer programa: una derivada numérica</h3>
<p>Desde esta fase las prácticas usan Python. Para empezar no hace falta instalar nada: abre un cuaderno gratuito en <a href="https://colab.research.google.com/" target="_blank" rel="noopener">Google Colab</a> y pega este código.</p>
<div class="tabla"><pre>def f(x):
    return x**2

x = 3.0
for h in [1.0, 0.1, 0.01, 0.001, 0.0001]:
    pendiente = (f(x + h) - f(x)) / h
    print(h, pendiente)</pre></div>
<ol>
<li>Ejecútalo y observa a qué valor se acerca la pendiente al reducir $h$. Compáralo con $f'(3) = 2 \cdot 3$.</li>
<li>Cambia la función por <code>x**3</code> y predice el resultado antes de ejecutar.</li>
<li>Prueba con $h = 10^{-15}$. El resultado empeora: los ordenadores guardan los números con unas 16 cifras, y la resta pierde casi todas. Es el mismo problema que el ruido de cuantificación.</li>
</ol>`,
          notas: [{ id: "python", label: "Qué valores te salen y qué pasa con h muy pequeño" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La derivada es la pendiente:</strong> el límite de $\Delta f/\Delta x$ cuando el intervalo se hace cero.`,
          R`<strong>Cuatro reglas bastan:</strong> potencia, suma, producto y cadena.`,
          R`<strong>Derivada cero</strong> señala los máximos y los mínimos.`,
          R`<strong>Cerca de un punto, toda función es una recta:</strong> $f(x + \Delta x) \approx f(x) + f'(x)\Delta x$. De ahí salen las aproximaciones y la propagación de errores.`,
          R`<strong>Velocidad y aceleración</strong> son la primera y la segunda derivada de la posición.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 7 ───────────────────────── */
    {
      id: "leccion-7", n: 7, fase: 1, codigo: "A1.2",
      titulo: "Integrales: acumular para medir",
      sub: "La operación inversa de derivar, y con ella la energía gravitatoria y la velocidad de escape.",
      horas: "6 horas",
      contexto: "Integral definida como suma de Riemann y área bajo la curva; teorema fundamental del cálculo; primitivas de potencias, 1/x, exponencial, seno y coseno; trabajo W = integral de F dx; energía potencial gravitatoria U = -G M m / r; velocidad de escape v = raíz(2 G M / R).",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Integrar es acumular. Si la derivada te dice a qué ritmo cambia algo, la integral suma todos esos pequeños cambios para darte el total.</p>
<p>El cuentakilómetros es la integral del velocímetro. La energía que consume un equipo es la integral de su potencia en el tiempo, y un condensador integra la corriente que le llega. En todos los casos sumas muchos trozos pequeños de «ritmo por intervalo».</p>
<div class="nota"><strong>Por qué la necesita la astronomía.</strong> Para saber cuánta energía cuesta sacar una nave del pozo gravitatorio de la Tierra hay que sumar una fuerza que cambia a cada metro. Esa suma es una integral, y de ella salen la energía potencial, la velocidad de escape y, más adelante, el radio de un agujero negro.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Suma de trozos pequeños</h3>
<p>Divide el intervalo de $a$ a $b$ en $N$ trozos de anchura $\Delta x$. En cada uno, la función vale aproximadamente $f(x_i)$, y el rectángulo correspondiente tiene área $f(x_i)\,\Delta x$. La integral es el límite de la suma cuando los trozos se hacen infinitamente estrechos.</p>
$$\int_{a}^{b} f(x)\,dx = \lim_{\Delta x \to 0} \sum_{i=1}^{N} f(x_i)\,\Delta x$$
<p>Geométricamente es el área entre la curva y el eje horizontal. El símbolo $\int$ es una S alargada, de «suma».</p>

<h3>2. El teorema fundamental</h3>
<p>Llama $A(x)$ al área acumulada desde $a$ hasta $x$. Si avanzas un poco más, hasta $x + h$, el área crece en una franja de anchura $h$ y altura $f(x)$:</p>
$$A(x + h) - A(x) \approx f(x)\,h \;\Rightarrow\; \frac{dA}{dx} = f(x)$$
<p>La derivada del área acumulada es la propia función. Por tanto, para integrar basta encontrar una función $F$ cuya derivada sea $f$, llamada <em>primitiva</em>, y restar sus valores en los extremos.</p>
$$\int_{a}^{b} f(x)\,dx = F(b) - F(a) \qquad \text{con } F' = f$$

<h3>3. Primitivas básicas</h3>
<p>Se obtienen leyendo al revés la tabla de derivadas de la lección anterior.</p>
<div class="tabla"><table>
<thead><tr><th>Función</th><th>Primitiva</th><th>Comprobación</th></tr></thead>
<tbody>
<tr><td>$x^{n}$, con $n \neq -1$</td><td>$\dfrac{x^{n+1}}{n+1}$</td><td>al derivar, baja $n+1$ y se cancela</td></tr>
<tr><td>$\dfrac{1}{x}$</td><td>$\ln x$</td><td>derivada del logaritmo</td></tr>
<tr><td>$e^{x}$</td><td>$e^{x}$</td><td>es su propia derivada</td></tr>
<tr><td>$\cos x$</td><td>$\sin x$</td><td>derivada del seno</td></tr>
<tr><td>$\sin x$</td><td>$-\cos x$</td><td>derivada del coseno, con el signo</td></tr>
</tbody></table></div>
<p>Un ejemplo completo:</p>
$$\int_{1}^{2} x^{3}\,dx = \left[\frac{x^{4}}{4}\right]_{1}^{2} = \frac{16}{4} - \frac{1}{4} = 3{,}75$$

<h3>4. Trabajo</h3>
<p>Una fuerza constante $F$ que desplaza un objeto una distancia $d$ realiza un trabajo $W = F\,d$, que es energía transferida. Si la fuerza cambia con la posición, se suma trozo a trozo:</p>
$$W = \int_{x_1}^{x_2} F(x)\,dx$$

<h3>5. Energía potencial gravitatoria</h3>
<p>La gravedad entre una masa $M$ y otra $m$ separadas una distancia $r$ vale $F = GMm/r^{2}$, con $G = 6{,}674 \times 10^{-11}\ \text{N}\cdot\text{m}^2/\text{kg}^2$. La estudiarás a fondo en la lección siguiente. El trabajo necesario para llevar $m$ desde $r$ hasta el infinito, en contra de esa fuerza, es:</p>
$$W = \int_{r}^{\infty} \frac{GMm}{r'^{2}}\,dr' = GMm\left[-\frac{1}{r'}\right]_{r}^{\infty} = GMm\left(0 + \frac{1}{r}\right) = \frac{GMm}{r}$$
<p>La primitiva de $r^{-2}$ es $-r^{-1}$, por la regla de las potencias. En el infinito vale cero. Si tomamos el infinito como origen de energía, la <em>energía potencial</em> a distancia $r$ es negativa: hay que aportar energía para salir.</p>
$$U(r) = -\frac{GMm}{r}$$

<h3>6. Velocidad de escape</h3>
<p>Un objeto lanzado desde la superficie de un cuerpo de radio $R$ escapa si su energía cinética, $\tfrac{1}{2}mv^{2}$, cubre justo esa deuda. Igualamos y despejamos. La masa $m$ del objeto se cancela:</p>
$$\frac{1}{2}\,m\,v^{2} = \frac{GMm}{R} \;\Rightarrow\; v_\text{esc} = \sqrt{\frac{2GM}{R}}$$` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Velocidad de escape de la Tierra</h3>
<p>Datos: $M = 5{,}972 \times 10^{24}$ kg y $R = 6{,}371 \times 10^{6}$ m. Primero el producto $GM$:</p>
$$GM = 6{,}674 \times 10^{-11} \times 5{,}972 \times 10^{24} = 3{,}986 \times 10^{14}\ \text{m}^3/\text{s}^2$$
<p>Después lo que va dentro de la raíz:</p>
$$\frac{2GM}{R} = \frac{2 \times 3{,}986 \times 10^{14}}{6{,}371 \times 10^{6}} = 1{,}251 \times 10^{8}\ \text{m}^2/\text{s}^2$$
<p>Y por último la raíz. Para hacerla con exponente par, escribimos $1{,}251 \times 10^{8}$ tal cual:</p>
$$v_\text{esc} = \sqrt{1{,}251 \times 10^{8}} = 1{,}119 \times 10^{4}\ \text{m/s} = 11{,}2\ \text{km/s}$$
<p>Es independiente de la masa de la nave. Las moléculas de hidrógeno de la alta atmósfera alcanzan a veces esa velocidad, y por eso la Tierra ha perdido casi todo su hidrógeno libre.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Integrales definidas",
            enunciado: R`<p>Calcula cada integral con el teorema fundamental.</p>`,
            partes: [
              { id: "a", pregunta: R`$\displaystyle\int_{0}^{3} x^{2}\,dx$`, tipo: "num", respuesta: 9,
                errores: [{ v: 27, msg: "Falta dividir entre el nuevo exponente: la primitiva de x² es x³/3." }, { v: 6, msg: "Eso es derivar. Para integrar, el exponente sube en uno." }],
                pistas: ["La primitiva de x² es x³/3. Evalúala en 3 y en 0 y resta."],
                solucion: R`$\left[\dfrac{x^{3}}{3}\right]_{0}^{3} = \dfrac{27}{3} - 0 = 9$.` },
              { id: "b", pregunta: R`$\displaystyle\int_{0}^{2} (4x + 1)\,dx$`, tipo: "num", respuesta: 10,
                errores: [{ v: 8, msg: "Falta la integral del 1, que es x." }],
                pistas: ["Integra cada término: 4x da 2x², y 1 da x."],
                solucion: R`$\left[2x^{2} + x\right]_{0}^{2} = 8 + 2 = 10$.` },
              { id: "c", pregunta: R`$\displaystyle\int_{1}^{e} \frac{1}{x}\,dx$`, tipo: "num", respuesta: 1,
                pistas: ["La primitiva de 1/x es el logaritmo natural. ¿Cuánto valen ln e y ln 1?"],
                solucion: R`$\left[\ln x\right]_{1}^{e} = \ln e - \ln 1 = 1 - 0 = 1$.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Acumular en el tiempo",
            enunciado: R`<p>Dos acumulaciones: una de distancia y otra de energía.</p>`,
            partes: [
              { id: "a", pregunta: R`Un cohete acelera con $v(t) = 3t^{2}$ m/s. ¿Qué distancia recorre entre $t = 0$ y $t = 2$ s?`, tipo: "num", unidad: "m", respuesta: 8,
                errores: [{ v: 12, msg: "Ese es el valor de la velocidad en t = 2. La distancia es la integral de la velocidad." }],
                pistas: ["La distancia es la integral de la velocidad. La primitiva de 3t² es t³."],
                solucion: R`$\displaystyle\int_{0}^{2} 3t^{2}\,dt = \left[t^{3}\right]_{0}^{2} = 8$ m.` },
              { id: "b", pregunta: R`El Sol emite $3{,}828 \times 10^{26}$ W de forma constante. ¿Cuánta energía emite en un año ($3{,}156 \times 10^{7}$ s)?`, tipo: "sci", unidad: "J", respuesta: 1.208e34,
                pistas: ["Si la potencia es constante, la integral es simplemente potencia por tiempo."],
                solucion: R`$E = 3{,}828 \times 10^{26} \times 3{,}156 \times 10^{7} = 1{,}21 \times 10^{34}$ J. Toda la humanidad consume unos $6 \times 10^{20}$ J al año.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Velocidades de escape",
            enunciado: R`<p>Usa $v_\text{esc} = \sqrt{2GM/R}$ con $G = 6{,}674 \times 10^{-11}$ en unidades del SI.</p>`,
            partes: [
              { id: "a", pregunta: R`La Luna: $M = 7{,}342 \times 10^{22}$ kg, $R = 1{,}737 \times 10^{6}$ m`, tipo: "num", unidad: "km/s", respuesta: 2.38, tol: 0.03,
                errores: [{ v: 2375, msg: "Ese valor está en m/s. Se pide en km/s." }, { v: 1.68, msg: "Falta el factor 2 dentro de la raíz." }],
                pistas: ["Calcula primero GM, luego 2GM/R, y al final la raíz. Pasa a km/s."],
                solucion: R`$2GM/R = \dfrac{2 \times 4{,}900 \times 10^{12}}{1{,}737 \times 10^{6}} = 5{,}64 \times 10^{6}$, y su raíz es $2{,}38 \times 10^{3}$ m/s $= 2{,}38$ km/s.` },
              { id: "b", pregunta: R`La superficie del Sol: $M = 1{,}989 \times 10^{30}$ kg, $R = 6{,}957 \times 10^{8}$ m`, tipo: "num", unidad: "km/s", respuesta: 618, tol: 0.03,
                pistas: ["El mismo procedimiento. GM del Sol es 1,327 × 10²⁰."],
                solucion: R`$2GM/R = \dfrac{2 \times 1{,}327 \times 10^{20}}{6{,}957 \times 10^{8}} = 3{,}82 \times 10^{11}$, y su raíz es $6{,}18 \times 10^{5}$ m/s $= 618$ km/s.` },
              { id: "c", pregunta: R`¿A qué radio habría que comprimir el Sol para que su velocidad de escape fuera la de la luz, $c = 2{,}998 \times 10^{8}$ m/s?`, tipo: "num", unidad: "km", respuesta: 2.95, tol: 0.03,
                errores: [{ v: 2953, msg: "Ese valor está en metros. Se pide en kilómetros." }, { v: 1.48, msg: "Falta el factor 2 al despejar: R = 2GM/c²." }],
                pistas: ["Despeja R de la fórmula con v = c: eleva al cuadrado los dos lados."],
                solucion: R`$c^{2} = 2GM/R \Rightarrow R = \dfrac{2GM}{c^{2}} = \dfrac{2{,}654 \times 10^{20}}{8{,}988 \times 10^{16}} = 2{,}95 \times 10^{3}$ m $\approx 3$ km. Es el radio de Schwarzschild del Sol. Que este cálculo de Newton dé el resultado correcto es una coincidencia; la deducción rigurosa necesita relatividad general y la verás en la Fase 4.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Una integral numérica</h3>
<p>Comprueba el primer ejercicio sumando rectángulos, tal como dice la definición.</p>
<div class="tabla"><pre>def f(x):
    return x**2

a, b = 0.0, 3.0
for N in [10, 100, 1000, 10000]:
    dx = (b - a) / N
    suma = 0.0
    for i in range(N):
        suma = suma + f(a + i * dx) * dx
    print(N, suma)</pre></div>
<ol>
<li>Observa cómo la suma se acerca a 9 al aumentar el número de rectángulos.</li>
<li>Cambia <code>a + i * dx</code> por <code>a + (i + 0.5) * dx</code>, para evaluar en el centro de cada trozo. La convergencia es mucho más rápida.</li>
<li>Integra $1/x^{2}$ entre 1 y un número muy grande. Debería acercarse a 1, que es el cálculo de la energía potencial con $GMm = 1$.</li>
</ol>`,
          notas: [{ id: "python", label: "Resultados con N = 10 y N = 10000, y qué cambia al evaluar en el centro" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La integral suma infinitos trozos pequeños</strong> y equivale al área bajo la curva.`,
          R`<strong>Teorema fundamental:</strong> $\int_a^b f\,dx = F(b) - F(a)$, donde $F$ es una primitiva de $f$.`,
          R`<strong>El trabajo es la integral de la fuerza</strong> a lo largo del camino.`,
          R`<strong>Energía potencial gravitatoria:</strong> $U = -GMm/r$, negativa porque salir cuesta energía.`,
          R`<strong>Velocidad de escape:</strong> $v = \sqrt{2GM/R}$. Para la Tierra, 11,2 km/s.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 8 ───────────────────────── */
    {
      id: "leccion-8", n: 8, fase: 1, codigo: "A1.3 · B2.1",
      titulo: "Newton, órbitas circulares y cómo pesar un astro",
      sub: "De las tres leyes del movimiento a la tercera ley de Kepler, deducida paso a paso.",
      horas: "6 horas",
      contexto: "Leyes de Newton; movimiento circular uniforme (omega = 2 pi / T, v = omega r, aceleración centrípeta v^2/r); gravitación universal F = G M m / r^2; velocidad orbital v = raíz(G M / r); tercera ley de Kepler T^2 = 4 pi^2 r^3 / (G M); medida de masas M = 4 pi^2 r^3 / (G T^2); gravedad superficial g = G M / R^2; órbita geoestacionaria.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Una órbita es una caída que nunca termina. El satélite cae continuamente hacia la Tierra, pero avanza de lado tan deprisa que el suelo se curva bajo él al mismo ritmo.</p>
<p>Newton lo explicó con un cañón en lo alto de una montaña. Si dispara flojo, la bala cae cerca. Si dispara más fuerte, cae más lejos. Con la velocidad justa, la bala cae exactamente lo mismo que se curva la Tierra y da la vuelta completa. La Luna es esa bala.</p>
<div class="nota"><strong>Ya has trabajado con esto.</strong> Un satélite geoestacionario está a 35 786 km de altura por una razón que hoy vas a calcular: es la única distancia a la que el periodo orbital coincide con un día. La misma fórmula, leída al revés, es la báscula del universo. Todas las masas que conocemos en astronomía, de planetas, estrellas y agujeros negros, se han medido observando algo que orbita a su alrededor.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Las tres leyes de Newton</h3>
<ol>
<li><strong>Inercia.</strong> Un cuerpo sobre el que no actúa ninguna fuerza se mueve en línea recta con velocidad constante.</li>
<li><strong>Fuerza y aceleración.</strong> La fuerza neta es la masa por la aceleración. Es una ecuación vectorial: la aceleración apunta hacia donde apunta la fuerza.</li>
<li><strong>Acción y reacción.</strong> Si A ejerce una fuerza sobre B, B ejerce sobre A una fuerza igual y opuesta.</li>
</ol>
$$\vec{F} = m\,\vec{a}$$
<p>La primera ley tiene una consecuencia directa: si un planeta se mueve en círculo y no en línea recta, alguna fuerza tira de él.</p>

<h3>2. Movimiento circular</h3>
<p>Un objeto que recorre una circunferencia de radio $r$ en un tiempo $T$, el <em>periodo</em>, tiene una velocidad angular $\omega$ y una velocidad lineal $v$:</p>
$$\omega = \frac{2\pi}{T} \qquad v = \frac{2\pi r}{T} = \omega\,r$$
<p>Aunque la rapidez sea constante, la dirección de la velocidad cambia, y eso es una aceleración. En un tiempo corto $\Delta t$ el objeto gira un ángulo $\Delta\theta = v\,\Delta t / r$. El vector velocidad gira ese mismo ángulo, así que cambia en $\Delta v = v\,\Delta\theta$. Dividiendo entre $\Delta t$:</p>
$$a = \frac{\Delta v}{\Delta t} = \frac{v \cdot v\,\Delta t / r}{\Delta t} = \frac{v^{2}}{r}$$
<p>Esta <em>aceleración centrípeta</em> apunta siempre hacia el centro.</p>

<h3>3. Gravitación universal</h3>
<p>Dos masas $M$ y $m$ separadas una distancia $r$ se atraen con una fuerza proporcional a ambas masas e inversa al cuadrado de la distancia. Es la misma dependencia que el flujo de la Lección 3, y por la misma razón geométrica.</p>
$$F = \frac{G\,M\,m}{r^{2}} \qquad G = 6{,}674 \times 10^{-11}\ \frac{\text{N}\cdot\text{m}^2}{\text{kg}^2}$$
<p>En la superficie de un planeta de radio $R$, esa fuerza es el peso, $mg$. De ahí la gravedad superficial:</p>
$$m\,g = \frac{GMm}{R^{2}} \;\Rightarrow\; g = \frac{GM}{R^{2}}$$

<h3>4. Velocidad orbital</h3>
<p>En una órbita circular, la gravedad es la única fuerza y proporciona justo la aceleración centrípeta. Aplicamos la segunda ley con $a = v^{2}/r$:</p>
$$\frac{GMm}{r^{2}} = m\,\frac{v^{2}}{r}$$
<p>La masa $m$ del satélite se cancela y un factor $r$ también. Queda:</p>
$$v = \sqrt{\frac{GM}{r}}$$
<p>Cuanto más lejos, más despacio. Compárala con la velocidad de escape de la lección anterior: es exactamente $\sqrt{2}$ veces menor.</p>

<h3>5. La tercera ley de Kepler, deducida</h3>
<p>Sustituimos $v = 2\pi r / T$ en la expresión anterior, elevada al cuadrado:</p>
$$\frac{4\pi^{2} r^{2}}{T^{2}} = \frac{GM}{r} \;\Rightarrow\; T^{2} = \frac{4\pi^{2}}{GM}\,r^{3}$$
<p>El cuadrado del periodo es proporcional al cubo del radio. Kepler lo descubrió en 1619 ajustando datos, sin saber por qué. La constante solo depende de la masa central. Si $M$ es la masa del Sol y medimos en años y UA, vale 1, y recuperamos $T^{2} = a^{3}$ de la Lección 4.</p>

<h3>6. La báscula del universo</h3>
<p>Despejando la masa:</p>
$$M = \frac{4\pi^{2}\,r^{3}}{G\,T^{2}}$$
<p>Si mides el tamaño y el periodo de cualquier órbita, conoces la masa del cuerpo central. En unidades solares, con $a$ en UA y $T$ en años, se simplifica a $M = a^{3}/T^{2}$ masas solares.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La masa del Sol</h3>
<p>La Tierra orbita a $r = 1{,}496 \times 10^{11}$ m con $T = 3{,}156 \times 10^{7}$ s. Calculamos por partes:</p>
$$r^{3} = (1{,}496 \times 10^{11})^{3} = 3{,}348 \times 10^{33}\ \text{m}^3 \qquad T^{2} = (3{,}156 \times 10^{7})^{2} = 9{,}960 \times 10^{14}\ \text{s}^2$$
$$M_\odot = \frac{4\pi^{2}\,r^{3}}{G\,T^{2}} = \frac{39{,}48 \times 3{,}348 \times 10^{33}}{6{,}674 \times 10^{-11} \times 9{,}960 \times 10^{14}} = \frac{1{,}322 \times 10^{35}}{6{,}647 \times 10^{4}} = 1{,}99 \times 10^{30}\ \text{kg}$$
<p>Con un cronómetro de un año y una regla de una UA has pesado el Sol.</p>
<h3>La Estación Espacial Internacional</h3>
<p>Orbita a 400 km de altura, así que $r = 6{,}371 \times 10^{6} + 4{,}0 \times 10^{5} = 6{,}771 \times 10^{6}$ m. Con $GM = 3{,}986 \times 10^{14}$:</p>
$$v = \sqrt{\frac{3{,}986 \times 10^{14}}{6{,}771 \times 10^{6}}} = \sqrt{5{,}887 \times 10^{7}} = 7{,}67 \times 10^{3}\ \text{m/s}$$
$$T = \frac{2\pi r}{v} = \frac{4{,}254 \times 10^{7}}{7{,}67 \times 10^{3}} = 5{,}54 \times 10^{3}\ \text{s} = 92\ \text{min}$$
<p>Da una vuelta a la Tierra cada hora y media, a 7,7 km/s.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Gravedad y velocidad",
            enunciado: R`<p>Usa $G = 6{,}674 \times 10^{-11}$ en unidades del SI.</p>`,
            partes: [
              { id: "a", pregunta: R`Gravedad en la superficie de Marte: $M = 6{,}417 \times 10^{23}$ kg, $R = 3{,}390 \times 10^{6}$ m`, tipo: "num", unidad: "m/s²", respuesta: 3.73, tol: 0.03,
                errores: [{ v: 1.263e7, msg: "Has dividido entre R en lugar de entre R al cuadrado." }],
                pistas: ["g = GM/R². Calcula GM por un lado y R² por otro."],
                solucion: R`$g = \dfrac{4{,}283 \times 10^{13}}{1{,}149 \times 10^{13}} = 3{,}73\ \text{m/s}^2$, un 38 % de la terrestre.` },
              { id: "b", pregunta: R`Velocidad de la Tierra en su órbita ($r = 1{,}496 \times 10^{11}$ m, $T = 3{,}156 \times 10^{7}$ s)`, tipo: "num", unidad: "km/s", respuesta: 29.8, tol: 0.03,
                errores: [{ v: 4.74, msg: "Falta el 2π: la Tierra recorre la circunferencia entera, no el radio." }, { v: 29780, msg: "Ese valor está en m/s. Se pide en km/s." }],
                pistas: ["Velocidad = longitud de la circunferencia entre el periodo."],
                solucion: R`$v = \dfrac{2\pi \times 1{,}496 \times 10^{11}}{3{,}156 \times 10^{7}} = 2{,}98 \times 10^{4}$ m/s $= 29{,}8$ km/s.` }
            ] },
          { id: "e2", nivel: 2, titulo: "La órbita geoestacionaria",
            enunciado: R`<p>Un satélite geoestacionario da una vuelta en un día sidéreo, $T = 86\,164$ s. Para la Tierra, $GM = 3{,}986 \times 10^{14}\ \text{m}^3/\text{s}^2$ y $R = 6371$ km.</p>`,
            partes: [
              { id: "a", pregunta: "Radio de la órbita, medido desde el centro de la Tierra", tipo: "sci", unidad: "m", respuesta: 4.216e7,
                errores: [{ v: 7.496e22, msg: "Ese es r³. Falta la raíz cúbica." }],
                pistas: ["Despeja r³ de la tercera ley: r³ = GM·T²/4π².", "Para la raíz cúbica, eleva a 1/3. Escribe el número con un exponente múltiplo de 3."],
                solucion: R`$r^{3} = \dfrac{3{,}986 \times 10^{14} \times (86\,164)^{2}}{39{,}48} = 7{,}496 \times 10^{22} = 74{,}96 \times 10^{21}$, y $r = \sqrt[3]{74{,}96} \times 10^{7} = 4{,}216 \times 10^{7}$ m.` },
              { id: "b", pregunta: "Altura sobre la superficie", tipo: "num", unidad: "km", respuesta: 35790, tol: 0.01,
                errores: [{ v: 42160, msg: "Ese es el radio desde el centro. Resta el radio de la Tierra." }],
                pistas: ["Pasa el radio a kilómetros y resta el radio de la Tierra."],
                solucion: R`$42\,160 - 6371 = 35\,790$ km, la cifra que aparece en cualquier manual de comunicaciones por satélite.` },
              { id: "c", pregunta: "Retardo de ida y vuelta de una señal con el satélite en la vertical", tipo: "num", unidad: "ms", respuesta: 239, tol: 0.03,
                errores: [{ v: 119, msg: "Ese es el retardo solo de ida." }],
                pistas: ["Tiempo = distancia entre c, y son dos trayectos."],
                solucion: R`$t = \dfrac{2 \times 3{,}579 \times 10^{7}}{2{,}998 \times 10^{8}} = 0{,}239$ s $= 239$ ms.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Pesar Júpiter y un agujero negro",
            enunciado: R`<p>Usa $M = 4\pi^{2} r^{3} / (G T^{2})$ en el SI, o $M = a^{3}/T^{2}$ en masas solares con UA y años.</p>`,
            partes: [
              { id: "a", pregunta: R`Ío orbita Júpiter a $r = 4{,}217 \times 10^{8}$ m con $T = 1{,}528 \times 10^{5}$ s. ¿Qué masa tiene Júpiter?`, tipo: "sci", unidad: "kg", respuesta: 1.899e27, tol: 0.03,
                pistas: ["Calcula r³ y T² por separado, como en el ejemplo del Sol."],
                solucion: R`$r^{3} = 7{,}499 \times 10^{25}$ y $T^{2} = 2{,}335 \times 10^{10}$. $M = \dfrac{39{,}48 \times 7{,}499 \times 10^{25}}{6{,}674 \times 10^{-11} \times 2{,}335 \times 10^{10}} = \dfrac{2{,}961 \times 10^{27}}{1{,}558} = 1{,}90 \times 10^{27}$ kg.` },
              { id: "b", pregunta: "¿Cuántas veces la masa de la Tierra (5,972 × 10²⁴ kg) es eso?", tipo: "num", unidad: "veces", respuesta: 318, tol: 0.03,
                pistas: ["Divide las dos masas."],
                solucion: R`$\dfrac{1{,}90 \times 10^{27}}{5{,}972 \times 10^{24}} = 318$.` },
              { id: "c", pregunta: "La estrella S2 orbita el centro de la Vía Láctea con a = 1020 UA y T = 16,05 años. ¿Qué masa, en masas solares, hay en el centro?", tipo: "sci", unidad: "M☉", respuesta: 4.12e6, tol: 0.05,
                errores: [{ v: 6.61e7, msg: "Has dividido entre T en lugar de entre T al cuadrado." }],
                pistas: ["En unidades solares, M = a³/T²."],
                solucion: R`$M = \dfrac{1020^{3}}{16{,}05^{2}} = \dfrac{1{,}061 \times 10^{9}}{257{,}6} = 4{,}1 \times 10^{6}$ masas solares. Cuatro millones de soles en una región menor que el sistema solar y que no emite luz: es Sagitario A*, un agujero negro. Esta medida valió el Nobel de Física de 2020.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Pesa Júpiter con Stellarium</h3>
<p>Vas a repetir el ejercicio 3 con tus propias medidas, como hizo Galileo en 1610 sin saberlo.</p>
<ol>
<li>En Stellarium, busca Júpiter y acércate hasta ver sus cuatro lunas grandes. Desactiva la atmósfera y el suelo para verlo a cualquier hora.</li>
<li>Fíjate en Ío, la más cercana. Avanza el tiempo de hora en hora y anota el instante en que alcanza su máxima separación a un lado del planeta.</li>
<li>Sigue avanzando hasta que vuelva a la misma posición. Ese intervalo es su periodo.</li>
<li>Con $r = 4{,}217 \times 10^{8}$ m y tu periodo en segundos, calcula la masa de Júpiter.</li>
</ol>
<p>Si en los próximos meses tienes acceso a unos prismáticos, las cuatro lunas se ven como puntos alineados y cambian de posición de una noche a otra.</p>`,
          notas: [{ id: "io", label: "Periodo de Ío que has medido, masa de Júpiter que te sale y diferencia con el valor real" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Girar es acelerar:</strong> un movimiento circular necesita una aceleración $v^{2}/r$ hacia el centro.`,
          R`<strong>La gravedad proporciona esa aceleración.</strong> De ahí la velocidad orbital $v = \sqrt{GM/r}$.`,
          R`<strong>Tercera ley de Kepler:</strong> $T^{2} = 4\pi^{2}r^{3}/GM$. Ya no es una regla empírica, sino una consecuencia de Newton.`,
          R`<strong>Toda órbita es una báscula:</strong> $M = 4\pi^{2}r^{3}/GT^{2}$, o $M = a^{3}/T^{2}$ en unidades solares.`,
          R`<strong>La masa del objeto que orbita no importa:</strong> se cancela siempre.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 9 ───────────────────────── */
    {
      id: "leccion-9", n: 9, fase: 1, codigo: "B1.1",
      titulo: "La esfera celeste y sus coordenadas",
      sub: "Dos sistemas para decir dónde está una estrella: uno ligado a ti y otro ligado al cielo.",
      horas: "5 horas",
      contexto: "Esfera celeste, polos y ecuador celestes; coordenadas horizontales (altura y azimut); coordenadas ecuatoriales (ascensión recta en horas, 1 h = 15 grados, y declinación); altura del polo = latitud; altura en la culminación h = 90 - latitud + declinación; estrellas circumpolares (declinación > 90 - latitud); ángulo horario H = tiempo sidéreo local - ascensión recta; eclíptica y oblicuidad de 23,44 grados; altura del Sol a mediodía.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Para apuntar un telescopio hacen falta dos ángulos. La cuestión es respecto a qué se miden: respecto a tu horizonte, que es cómodo pero cambia a cada minuto, o respecto al propio cielo, que no cambia nunca.</p>
<p>Las estrellas están a distancias muy distintas, pero para orientarse basta imaginarlas pegadas a una esfera enorme centrada en ti: la <em>esfera celeste</em>. Esa esfera parece girar una vez al día alrededor del eje de la Tierra, como comprobaste en tu primera noche.</p>
<div class="nota"><strong>El paralelo con las antenas es exacto.</strong> Una antena con montura de azimut y elevación necesita mover los dos ejes para seguir un astro. Una antena con montura polar tiene un eje paralelo al de la Tierra y sigue el cielo girando solo ese eje. Son los dos sistemas de coordenadas de esta lección, y las dos familias de monturas de telescopio que verás al elegir equipo.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Referencias sobre la esfera</h3>
<ul>
<li><strong>Cénit:</strong> el punto justo encima de tu cabeza.</li>
<li><strong>Polos celestes:</strong> los dos puntos donde el eje de la Tierra, prolongado, corta la esfera. El norte está junto a la Polar.</li>
<li><strong>Ecuador celeste:</strong> la proyección del ecuador terrestre sobre el cielo. Está a 90° de los polos.</li>
<li><strong>Meridiano:</strong> el arco que va de norte a sur pasando por el cénit. Cuando un astro lo cruza, está en su punto más alto: <em>culmina</em>.</li>
</ul>

<h3>2. Coordenadas horizontales</h3>
<p>Son las de la Lección 4: la <em>altura</em> $h$ sobre el horizonte, de 0° a 90°, y el <em>azimut</em> $A$, medido desde el norte hacia el este. Son intuitivas, pero dependen del lugar y de la hora. Una estrella cambia de altura y azimut continuamente.</p>

<h3>3. Coordenadas ecuatoriales</h3>
<p>Son la latitud y la longitud de la Tierra proyectadas sobre el cielo. Cada estrella tiene las suyas, fijas, y con ellas se elaboran los catálogos.</p>
<ul>
<li><strong>Declinación</strong> $\delta$: el ángulo sobre el ecuador celeste, de $-90^\circ$ a $+90^\circ$. Es el análogo de la latitud.</li>
<li><strong>Ascensión recta</strong> $\alpha$: el ángulo a lo largo del ecuador celeste, medido hacia el este desde un punto de referencia llamado punto Aries. Es el análogo de la longitud.</li>
</ul>
<p>La ascensión recta se expresa en horas, porque el cielo da una vuelta en 24 horas:</p>
$$24\ \text{h} = 360^\circ \;\Rightarrow\; 1\ \text{h} = 15^\circ \qquad 1\ \text{min} = 15' \qquad 1\ \text{s} = 15''$$

<h3>4. La altura del polo es tu latitud</h3>
<p>En el polo norte terrestre, latitud 90°, el polo celeste está en el cénit, a 90° de altura. En el ecuador, latitud 0°, está en el horizonte. Entre ambos casos la relación es lineal: a latitud $\varphi$, el polo está a una altura $\varphi$.</p>
<p>El ecuador celeste está a 90° del polo. Por tanto, cruza el meridiano hacia el sur a una altura:</p>
$$h_\text{ecuador} = 90^\circ - \varphi$$

<h3>5. Altura de una estrella al culminar</h3>
<p>Una estrella de declinación $\delta$ está $\delta$ grados por encima del ecuador celeste. Cuando cruza el meridiano hacia el sur, su altura es la del ecuador más su declinación:</p>
$$h_\text{máx} = 90^\circ - \varphi + \delta$$
<p>Si el resultado supera 90°, la estrella culmina al norte del cénit y la altura es $180^\circ$ menos ese valor. Si es negativo, la estrella nunca sale.</p>

<h3>6. Estrellas circumpolares</h3>
<p>Una estrella muy próxima al polo da vueltas a su alrededor sin llegar a tocar el horizonte. El polo está a una altura $\varphi$, así que el círculo cabe entero sobre el horizonte si la estrella dista del polo menos de $\varphi$. Su distancia al polo es $90^\circ - \delta$, luego la condición es:</p>
$$90^\circ - \delta < \varphi \;\Rightarrow\; \delta > 90^\circ - \varphi$$
<p>Por simetría, las estrellas con $\delta < -(90^\circ - \varphi)$ no se ven nunca desde esa latitud.</p>

<h3>7. Cuándo culmina: el ángulo horario</h3>
<p>El <em>tiempo sidéreo local</em> (TSL) es la ascensión recta que está cruzando tu meridiano en este momento. Es un reloj que marca el giro del cielo. El <em>ángulo horario</em> $H$ de una estrella es lo que le falta, o lo que lleva, desde que culminó:</p>
$$H = \text{TSL} - \alpha$$
<p>Cuando $H = 0$, la estrella está en el meridiano. Si $H$ es negativo, aún no ha llegado.</p>

<h3>8. La eclíptica</h3>
<p>El eje de la Tierra está inclinado $23{,}44^\circ$ respecto a la perpendicular de su órbita. Por eso el camino anual del Sol sobre la esfera, la <em>eclíptica</em>, está inclinado ese ángulo respecto al ecuador celeste, y la declinación del Sol oscila a lo largo del año:</p>
$$-23{,}44^\circ \le \delta_\odot \le +23{,}44^\circ$$
<p>Vale $+23{,}44^\circ$ en el solsticio de junio, $-23{,}44^\circ$ en el de diciembre y $0^\circ$ en los equinoccios. Esa variación, y no la distancia al Sol, es la causa de las estaciones.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El cielo desde Madrid</h3>
<p>Madrid está a latitud $\varphi = 40{,}4^\circ$ N. El polo celeste queda a $40{,}4^\circ$ de altura y el ecuador celeste cruza el meridiano a $90 - 40{,}4 = 49{,}6^\circ$.</p>
<p><strong>Sirio</strong>, con $\delta = -16{,}7^\circ$, culmina a:</p>
$$h_\text{máx} = 90^\circ - 40{,}4^\circ + (-16{,}7^\circ) = 32{,}9^\circ$$
<p><strong>El Sol a mediodía</strong> en los dos solsticios:</p>
$$h_\text{junio} = 49{,}6^\circ + 23{,}44^\circ = 73{,}0^\circ \qquad h_\text{diciembre} = 49{,}6^\circ - 23{,}44^\circ = 26{,}2^\circ$$
<p><strong>Circumpolares:</strong> lo son las estrellas con $\delta > 49{,}6^\circ$. La Polar ($\delta = +89{,}3^\circ$) y casi toda la Osa Mayor lo son. Vega ($\delta = +38{,}8^\circ$) no llega y se pone unas horas cada día.</p>
<p><strong>Invisibles:</strong> las que tienen $\delta < -49{,}6^\circ$. La Cruz del Sur ($\delta \approx -60^\circ$) no se ve nunca desde España.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Unidades y referencias",
            enunciado: R`<p>Recuerda que 1 hora de ascensión recta son 15°.</p>`,
            partes: [
              { id: "a", pregunta: "Expresa en grados una ascensión recta de 6 h 45 min.", tipo: "num", unidad: "°", respuesta: 101.25,
                errores: [{ v: 96.75, msg: "45 minutos no son 0,45 horas, sino 45/60 = 0,75 horas." }],
                pistas: ["Pasa primero a horas decimales y multiplica por 15."],
                solucion: R`$6{,}75\ \text{h} \times 15 = 101{,}25^\circ$.` },
              { id: "b", pregunta: "Desde latitud 40° N, ¿a qué altura está el polo celeste?", tipo: "num", unidad: "°", respuesta: 40,
                pistas: ["La altura del polo coincide con la latitud."],
                solucion: R`A $40^\circ$, hacia el norte.` },
              { id: "c", pregunta: "¿Y a qué altura cruza el meridiano el ecuador celeste?", tipo: "num", unidad: "°", respuesta: 50,
                pistas: ["El ecuador está a 90° del polo."],
                solucion: R`$90^\circ - 40^\circ = 50^\circ$, hacia el sur.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Qué se ve desde latitud 40° N",
            enunciado: R`<p>Aplica $h_\text{máx} = 90^\circ - \varphi + \delta$ con $\varphi = 40^\circ$.</p>`,
            partes: [
              { id: "a", pregunta: "Altura máxima de Betelgeuse (δ = +7,4°)", tipo: "num", unidad: "°", respuesta: 57.4,
                pistas: ["Suma la declinación a la altura del ecuador celeste."],
                solucion: R`$50^\circ + 7{,}4^\circ = 57{,}4^\circ$.` },
              { id: "b", pregunta: "Declinación mínima para que una estrella sea circumpolar", tipo: "num", unidad: "°", respuesta: 50,
                errores: [{ v: 40, msg: "Esa es la altura del polo. La condición es que la distancia al polo, 90° − δ, sea menor que la latitud." }],
                pistas: ["La condición es δ > 90° − φ."],
                solucion: R`$\delta > 90^\circ - 40^\circ = 50^\circ$.` },
              { id: "c", pregunta: "Canopus, la segunda estrella más brillante del cielo, tiene δ = −52,7°. Desde latitud 40° N:", tipo: "opcion", respuesta: 3,
                opciones: ["Es circumpolar y se ve toda la noche.", "Culmina a 37,3° de altura.", "Se ve muy baja, rozando el horizonte sur.", "No sale nunca: su altura máxima sería negativa."],
                pistas: ["Calcula su altura máxima con la fórmula."],
                solucion: R`$h_\text{máx} = 50^\circ - 52{,}7^\circ = -2{,}7^\circ$. Queda siempre bajo el horizonte. Desde Canarias, a latitud 28°, sí se ve: $62^\circ - 52{,}7^\circ = 9{,}3^\circ$.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Tiempo y sombras",
            enunciado: R`<p>Combina el ángulo horario con la altura del Sol.</p>`,
            partes: [
              { id: "a", pregunta: "Betelgeuse tiene α = 5 h 55 min. Si tu tiempo sidéreo local es 3 h 25 min, ¿cuántas horas faltan para que culmine?", tipo: "num", unidad: "h", respuesta: 2.5,
                errores: [{ v: 2.3, msg: "La diferencia son 2 h 30 min, que son 2,5 horas, no 2,3." }],
                pistas: ["Culmina cuando el tiempo sidéreo local iguala su ascensión recta."],
                solucion: R`$5\ \text{h}\ 55\ \text{min} - 3\ \text{h}\ 25\ \text{min} = 2\ \text{h}\ 30\ \text{min} = 2{,}5$ h.` },
              { id: "b", pregunta: "Altura del Sol a mediodía en un equinoccio, desde latitud 40° N", tipo: "num", unidad: "°", respuesta: 50,
                pistas: ["En los equinoccios, la declinación del Sol es cero."],
                solucion: R`Con $\delta_\odot = 0$, el Sol está sobre el ecuador celeste: $50^\circ$.` },
              { id: "c", pregunta: "En el solsticio de invierno, el Sol de mediodía está a 26,6° de altura. ¿Qué sombra proyecta un palo vertical de 1 m?", tipo: "num", unidad: "m", respuesta: 2.0, tol: 0.03,
                errores: [{ v: 0.5, msg: "Has multiplicado por la tangente. El palo es el cateto opuesto y la sombra el contiguo: hay que dividir." }],
                pistas: ["El palo, la sombra y el rayo de sol forman un triángulo rectángulo. La tangente de la altura es palo entre sombra."],
                solucion: R`$\tan 26{,}6^\circ = \dfrac{1}{s} \Rightarrow s = \dfrac{1}{0{,}50} = 2{,}0$ m. Así midió Eratóstenes el tamaño de la Tierra hacia el 240 a. C.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Las dos cuadrículas en Stellarium</h3>
<ol>
<li>Activa la cuadrícula azimutal y acelera el tiempo. Las estrellas cruzan las líneas: sus coordenadas horizontales cambian.</li>
<li>Cámbiala por la cuadrícula ecuatorial. Ahora la cuadrícula gira con las estrellas: sus coordenadas no cambian.</li>
<li>Haz clic en Vega y localiza en el panel su ascensión recta y su declinación, y aparte su azimut y su altura. Avanza una hora y comprueba cuáles han cambiado.</li>
</ol>
<h3>Comprueba la fórmula en el cielo</h3>
<p>Elige en Stellarium una estrella brillante que vaya a cruzar el meridiano sur a una hora cómoda, y anota su declinación. Calcula su altura máxima para tu latitud. Sal a esa hora y mídela con el puño, a $10^\circ$ por puño.</p>`,
          notas: [{ id: "culminacion", label: "Estrella elegida, declinación, altura calculada y altura medida con la mano" }],
          tareasTitulo: "Lista de la noche",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Señalar el polo celeste, el cénit y el meridiano desde mi punto de observación." },
            { id: "t2", texto: "Imaginar el ecuador celeste: un arco de este a oeste que pasa a 90° menos mi latitud sobre el sur." },
            { id: "t3", texto: "Medir la altura de una estrella al culminar y compararla con el cálculo." },
            { id: "t4", texto: "Identificar una estrella circumpolar y otra que no lo sea." }
          ],
          notas2: [{ id: "cuaderno", label: "Cuaderno de observación" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Coordenadas horizontales</strong> (altura y azimut): fáciles de usar, pero cambian con el lugar y la hora.`,
          R`<strong>Coordenadas ecuatoriales</strong> (ascensión recta y declinación): fijas para cada estrella. Una hora de ascensión recta son 15°.`,
          R`<strong>La altura del polo celeste es tu latitud</strong>, y el ecuador celeste culmina a $90^\circ - \varphi$.`,
          R`<strong>Altura al culminar:</strong> $h = 90^\circ - \varphi + \delta$. Si $\delta > 90^\circ - \varphi$, la estrella es circumpolar.`,
          R`<strong>La eclíptica está inclinada 23,44°</strong> respecto al ecuador celeste, y esa inclinación causa las estaciones.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 10 ───────────────────────── */
    {
      id: "leccion-10", n: 10, fase: 1, codigo: "B1.2",
      titulo: "Tiempo sidéreo y movimientos aparentes",
      sub: "Por qué las estrellas salen cuatro minutos antes cada día, y cómo se mueven el Sol, la Luna y los planetas sobre ese fondo.",
      horas: "5 horas",
      contexto: "Día solar (24 h) y día sidéreo (23 h 56 min 4 s = 86 164 s); las estrellas adelantan 3 min 56 s al día, 2 h al mes; tiempo sidéreo local a medianoche: 0 h el 22 de septiembre y 2 h más por mes; el Sol avanza 1 grado al día por la eclíptica; mes sidéreo 27,32 d y mes sinódico 29,53 d; periodo sinódico 1/S = |1/T1 - 1/T2|; oposición, conjunción y movimiento retrógrado; precesión de los equinoccios, 25 800 años, 50,3 segundos de arco al año.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">La Tierra hace dos cosas a la vez: gira sobre sí misma y da vueltas al Sol. Por eso hay dos formas de contar un día, según tomes como referencia el Sol o las estrellas, y no duran lo mismo.</p>
<p>Imagina que caminas alrededor de una farola mientras giras sobre ti mismo. Cuando has dado una vuelta completa respecto a los edificios lejanos, la farola ya no queda delante de ti, porque te has desplazado. Tienes que girar un poco más para volver a encararla.</p>
<div class="nota"><strong>Es un batido de frecuencias.</strong> Dos osciladores de frecuencias muy próximas se desfasan poco a poco, y la frecuencia con la que vuelven a coincidir es la diferencia de las dos. Aquí los osciladores son la rotación de la Tierra respecto a las estrellas y respecto al Sol, y la frecuencia de batido es una vez al año. La misma resta de frecuencias explicará el mes lunar y el tiempo que tarda un planeta en volver a estar bien situado.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Día solar y día sidéreo</h3>
<p>El <em>día sidéreo</em> es el tiempo que tarda la Tierra en girar 360° respecto a las estrellas. El <em>día solar</em> es el tiempo entre dos mediodías, y es el que marcan los relojes: 24 horas.</p>
<p>En un día la Tierra avanza en su órbita un ángulo:</p>
$$\frac{360^\circ}{365{,}25\ \text{días}} = 0{,}986^\circ \text{ por día}$$
<p>Para volver a encarar el Sol tiene que girar ese ángulo de más. Como gira 360° en unas 24 horas, es decir 15° por hora o 1° cada 4 minutos, ese giro adicional le lleva:</p>
$$0{,}986^\circ \times 4\ \frac{\text{min}}{{}^\circ} = 3{,}94\ \text{min} = 3\ \text{min}\ 56\ \text{s}$$
<p>Por tanto, el día sidéreo es más corto que el solar:</p>
$$T_\text{sid} = 24\ \text{h} - 3\ \text{min}\ 56\ \text{s} = 23\ \text{h}\ 56\ \text{min}\ 4\ \text{s} = 86\,164\ \text{s}$$
<p>Es el periodo que usaste en la Lección 8 para la órbita geoestacionaria.</p>

<h3>2. La misma idea con frecuencias</h3>
<p>En un año la Tierra da 365,25 vueltas respecto al Sol, pero 366,25 respecto a las estrellas: la vuelta alrededor del Sol añade una. Escrito con frecuencias, que son los inversos de los periodos:</p>
$$\frac{1}{T_\text{sid}} = \frac{1}{T_\text{sol}} + \frac{1}{T_\text{año}}$$
<p>Las frecuencias de giros en el mismo sentido se suman o se restan. Los periodos no.</p>

<h3>3. El cielo se adelanta</h3>
<p>Las estrellas siguen el día sidéreo y tu reloj el solar. Cada día, una estrella sale, culmina y se pone 3 min 56 s antes que el día anterior:</p>
$$3{,}94\ \frac{\text{min}}{\text{día}} \times 30{,}4\ \text{días} \approx 120\ \text{min} = 2\ \text{h por mes}$$
<p>En doce meses el adelanto suma 24 horas y el cielo vuelve a estar igual. Por eso cada estación tiene sus constelaciones: Orión se ve en las noches de invierno y el Cisne en las de verano.</p>

<h3>4. Estimar el tiempo sidéreo</h3>
<p>El tiempo sidéreo local, de la lección anterior, es la ascensión recta que cruza tu meridiano. Hacia el 22 de septiembre, a medianoche, vale 0 h. Desde ahí gana 2 horas cada mes:</p>
$$\text{TSL a medianoche} \approx 2\ \text{h} \times (\text{meses transcurridos desde el 22 de septiembre})$$
<p>Y a lo largo de la noche avanza prácticamente al ritmo del reloj. Con esta regla sabes qué ascensiones rectas están bien situadas en cada época: una estrella está en su mejor momento cuando su $\alpha$ coincide con el TSL.</p>

<h3>5. El Sol sobre el fondo de estrellas</h3>
<p>Visto desde la Tierra, el Sol recorre la eclíptica hacia el este a razón de $0{,}986^\circ$ por día, casi un grado. Las constelaciones que atraviesa son las del zodiaco. No las vemos detrás del Sol porque es de día, pero sí vemos las del lado opuesto a medianoche.</p>

<h3>6. La Luna: mes sidéreo y mes sinódico</h3>
<p>La Luna da una vuelta a la Tierra respecto a las estrellas en 27,32 días, el <em>mes sidéreo</em>. Pero las fases dependen de su posición respecto al Sol, y mientras tanto el Sol se ha movido. La Luna gira en el mismo sentido en el que avanza el Sol, así que las frecuencias se restan:</p>
$$\frac{1}{T_\text{sin}} = \frac{1}{27{,}32} - \frac{1}{365{,}25} = 0{,}03660 - 0{,}00274 = 0{,}03386\ \text{días}^{-1}$$
$$T_\text{sin} = \frac{1}{0{,}03386} = 29{,}53\ \text{días}$$
<p>Ese es el <em>mes sinódico</em>, el tiempo entre dos lunas llenas. La Luna se desplaza $360^\circ/27{,}32 = 13{,}2^\circ$ por día respecto a las estrellas, más que un puño extendido, y por eso sale cada día unos 50 minutos más tarde.</p>

<h3>7. Los planetas: periodo sinódico</h3>
<p>Con los planetas pasa lo mismo. La Tierra y otro planeta giran alrededor del Sol con periodos $T_1$ y $T_2$. El tiempo que tardan en repetir la misma posición relativa es el <em>periodo sinódico</em> $S$:</p>
$$\frac{1}{S} = \left|\frac{1}{T_1} - \frac{1}{T_2}\right|$$
<p>Un planeta exterior está en <em>oposición</em> cuando queda justo en el lado contrario al Sol. Es su mejor momento: está más cerca, brilla más y culmina a medianoche. En torno a la oposición, la Tierra lo adelanta por el interior, y durante unas semanas el planeta parece retroceder sobre el fondo de estrellas. Es el <em>movimiento retrógrado</em>, el mismo efecto que hace que un coche más lento parezca ir hacia atrás cuando lo adelantas en la autovía.</p>

<h3>8. La precesión</h3>
<p>El eje de la Tierra no apunta siempre al mismo sitio. Describe un cono, como el eje de una peonza, y completa una vuelta cada 25 800 años. El punto Aries, origen de la ascensión recta, se desplaza por eso sobre la eclíptica:</p>
$$\frac{360 \times 3600''}{25\,800\ \text{años}} = 50{,}2''\ \text{por año}$$
<p>Es un movimiento bien medido. Tiene dos consecuencias prácticas. Las coordenadas de los catálogos llevan fecha, hoy casi siempre la época J2000. Y la estrella polar cambia: dentro de unos 12 000 años, el polo norte celeste estará cerca de Vega.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Cuándo observar Betelgeuse</h3>
<p>Betelgeuse tiene $\alpha = 5\ \text{h}\ 55\ \text{min} = 5{,}92$ h. Culmina a medianoche cuando el tiempo sidéreo local a medianoche vale eso mismo:</p>
$$\frac{5{,}92\ \text{h}}{2\ \text{h/mes}} = 2{,}96\ \text{meses después del 22 de septiembre}$$
<p>Es decir, hacia el 20 de diciembre. Si prefieres observarla a las 22:00, dos horas antes de la medianoche, hay que esperar a que el cielo se adelante esas dos horas: un mes más, hacia el 20 de enero.</p>
<h3>Cada cuánto hay oposición de Marte</h3>
<p>La Tierra tiene un periodo de 1 año y Marte de 1,881 años:</p>
$$\frac{1}{S} = \frac{1}{1} - \frac{1}{1{,}881} = 1 - 0{,}5316 = 0{,}4684\ \text{años}^{-1}$$
$$S = \frac{1}{0{,}4684} = 2{,}135\ \text{años} = 780\ \text{días}$$
<p>Marte solo está bien situado para observarlo cada dos años y casi dos meses. Las agencias espaciales están sujetas al mismo ritmo: las ventanas de lanzamiento hacia Marte se abren cada 26 meses.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "El adelanto del cielo",
            enunciado: R`<p>Usa el adelanto diario de $3{,}94$ minutos y la regla del tiempo sidéreo a medianoche.</p>`,
            partes: [
              { id: "a", pregunta: "Una estrella sale hoy a las 23:00. ¿Cuántos minutos antes saldrá dentro de 15 días?", tipo: "num", unidad: "min", respuesta: 59.1, tol: 0.03,
                pistas: ["El adelanto es de 3,94 minutos por día."],
                solucion: R`$15 \times 3{,}94 = 59{,}1$ min. Saldrá hacia las 22:01.` },
              { id: "b", pregunta: "¿Cuántos grados avanza el Sol por la eclíptica en 30 días?", tipo: "num", unidad: "°", respuesta: 29.6, tol: 0.03,
                pistas: ["Avanza 360° en 365,25 días."],
                solucion: R`$30 \times 0{,}986 = 29{,}6^\circ$, casi una constelación del zodiaco por mes.` },
              { id: "c", pregunta: "Tiempo sidéreo local aproximado a medianoche el 22 de diciembre", tipo: "num", unidad: "h", respuesta: 6, tol: 0.05,
                pistas: ["Han pasado tres meses desde el 22 de septiembre."],
                solucion: R`$3 \times 2 = 6$ h. A esa hora culminan las estrellas con $\alpha \approx 6$ h, como las de Orión.` }
            ] },
          { id: "e2", nivel: 2, titulo: "La Luna",
            enunciado: R`<p>El mes sidéreo dura 27,32 días y el año 365,25 días.</p>`,
            partes: [
              { id: "a", pregunta: "¿Cuántos grados se desplaza la Luna cada día respecto a las estrellas?", tipo: "num", unidad: "°", respuesta: 13.18,
                pistas: ["Recorre 360° en un mes sidéreo."],
                solucion: R`$360/27{,}32 = 13{,}18^\circ$ por día.` },
              { id: "b", pregunta: "¿Y respecto al Sol, que avanza 0,986° por día en el mismo sentido?", tipo: "num", unidad: "°", respuesta: 12.19,
                errores: [{ v: 14.16, msg: "Has sumado. La Luna y el Sol se mueven en el mismo sentido, así que la Luna gana al Sol la diferencia." }],
                pistas: ["Es una velocidad relativa: resta."],
                solucion: R`$13{,}18 - 0{,}99 = 12{,}19^\circ$ por día. Comprobación: $360/12{,}19 = 29{,}53$ días, el mes sinódico.` },
              { id: "c", pregunta: "¿Cuántos minutos más tarde sale la Luna cada día, de media?", tipo: "num", unidad: "min", respuesta: 48.8, tol: 0.04,
                pistas: ["El cielo gira 1° cada 4 minutos. La Tierra tiene que girar de más el ángulo que la Luna se ha separado del Sol."],
                solucion: R`$12{,}19^\circ \times 4\ \text{min} = 48{,}8$ min. Es un valor medio: según la época y la latitud varía bastante.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Planetas y precesión",
            enunciado: R`<p>Usa $\dfrac{1}{S} = \left|\dfrac{1}{T_1} - \dfrac{1}{T_2}\right|$ con el periodo de la Tierra igual a 1 año de 365,25 días.</p>`,
            partes: [
              { id: "a", pregunta: "Periodo sinódico de Venus (T = 0,6152 años), en días", tipo: "num", unidad: "días", respuesta: 584, tol: 0.01,
                errores: [{ v: 1.6, msg: "Ese valor está en años. Se pide en días." }],
                pistas: ["Venus es más rápido que la Tierra: 1/S = 1/0,6152 − 1."],
                solucion: R`$\dfrac{1}{S} = 1{,}6255 - 1 = 0{,}6255 \Rightarrow S = 1{,}599\ \text{años} = 584$ días.` },
              { id: "b", pregunta: "Periodo sinódico de Saturno (T = 29,46 años), en días", tipo: "num", unidad: "días", respuesta: 378, tol: 0.01,
                pistas: ["1/S = 1 − 1/29,46."],
                solucion: R`$\dfrac{1}{S} = 1 - 0{,}0339 = 0{,}9661 \Rightarrow S = 1{,}035\ \text{años} = 378$ días. Cuanto más lento es el planeta, más se acerca $S$ a un año: la Tierra lo alcanza casi en el mismo sitio.` },
              { id: "c", pregunta: "Un planeta exterior en oposición culmina:", tipo: "opcion", respuesta: 1,
                opciones: ["A mediodía", "A medianoche", "Al anochecer", "Al amanecer"],
                pistas: ["En oposición está en el lado contrario al Sol."],
                solucion: R`A medianoche. Está a 180° del Sol, que a esa hora se encuentra en su punto más bajo.` },
              { id: "d", pregunta: "¿Cuántos grados se ha desplazado el punto Aries en 2000 años, a 50,2″ por año?", tipo: "num", unidad: "°", respuesta: 27.9, tol: 0.03,
                errores: [{ v: 100400, msg: "Ese valor está en segundos de arco. Divide entre 3600 para pasar a grados." }],
                pistas: ["Multiplica y pasa de segundos de arco a grados."],
                solucion: R`$2000 \times 50{,}2'' = 100\,400'' = 27{,}9^\circ$. Es casi una constelación entera del zodiaco: el punto Aries ya no está en Aries, sino en Piscis.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>El adelanto, medido</h3>
<ol>
<li>En Stellarium, fija la hora en las 22:00 y anota la altura y el azimut de una estrella brillante.</li>
<li>Avanza siete días exactos, a la misma hora. La estrella se ha desplazado hacia el oeste.</li>
<li>Retrocede en la hora hasta que vuelva a la posición inicial. Deberías tener que retroceder unos $7 \times 3{,}94 \approx 28$ minutos.</li>
</ol>
<h3>La Luna, dos noches seguidas</h3>
<p>Elige dos noches consecutivas con la Luna visible. A la misma hora, anota junto a qué estrellas está. La segunda noche se habrá desplazado unos $13^\circ$ hacia el este, algo más de un puño.</p>
<h3>Retrogradación</h3>
<p>En Stellarium, busca Marte, cambia a montura ecuatorial y avanza el tiempo de semana en semana alrededor de una oposición, por ejemplo la de febrero de 2027. Verás cómo se frena, retrocede y vuelve a avanzar.</p>`,
          notas: [{ id: "adelanto", label: "Minutos que has tenido que retroceder, y junto a qué estrellas estaba la Luna cada noche" }],
          tareasTitulo: "Lista de la práctica",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Medir en Stellarium el adelanto de una estrella en siete días." },
            { id: "t2", texto: "Anotar la posición de la Luna dos noches seguidas a la misma hora." },
            { id: "t3", texto: "Ver el bucle retrógrado de Marte en Stellarium." },
            { id: "t4", texto: "Calcular qué ascensión recta culmina a medianoche este mes." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>El día sidéreo dura 23 h 56 min 4 s.</strong> Las estrellas se adelantan 3 min 56 s cada día y 2 horas cada mes.`,
          R`<strong>El tiempo sidéreo a medianoche</strong> vale 0 h hacia el 22 de septiembre y aumenta 2 h por mes. Indica qué ascensiones rectas están bien situadas.`,
          R`<strong>Las frecuencias se restan:</strong> $1/S = |1/T_1 - 1/T_2|$ da el mes sinódico de la Luna (29,53 días) y el periodo sinódico de los planetas.`,
          R`<strong>En oposición</strong>, un planeta exterior culmina a medianoche, y en torno a ella muestra movimiento retrógrado.`,
          R`<strong>La precesión</strong> desplaza el punto Aries 50″ por año, con un ciclo de 25 800 años. Por eso las coordenadas llevan fecha.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 11 ───────────────────────── */
    {
      id: "leccion-11", n: 11, fase: 1, codigo: "A1.4",
      titulo: "Energía y momento angular",
      sub: "Dos cantidades que una órbita no puede cambiar, y todo lo que se deduce de ellas.",
      horas: "6 horas",
      contexto: "Trabajo y energía cinética K = m v^2 / 2; energía potencial gravitatoria U = -G M m / r; conservación de la energía mecánica E = K + U; órbita circular: K = G M m / 2r, U = -2K, E = -G M m / 2r; signo de E: negativo órbita ligada, cero parábola, positivo hipérbola; momento angular L = m r v perpendicular; fuerza central implica L constante; r_p v_p = r_a v_a; ley de las áreas dA/dt = L / 2m (segunda ley de Kepler); para un cuerpo que gira, L proporcional a M R^2 / T.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Seguir una órbita paso a paso, calculando fuerzas y aceleraciones en cada instante, es laborioso. Hay un atajo: dos cantidades que no cambian nunca a lo largo del movimiento. Si conoces su valor en un punto, lo conoces en todos.</p>
<p>La primera es la <em>energía</em>. Un planeta que se acerca al Sol gana velocidad y pierde altura, y al alejarse ocurre lo contrario. La suma de las dos partidas no varía.</p>
<p>La segunda es el <em>momento angular</em>, que mide la cantidad de giro. Es lo que hace que una patinadora gire más rápido al recoger los brazos.</p>
<div class="nota"><strong>Un circuito LC hace lo mismo.</strong> En un circuito resonante ideal, la energía pasa del campo eléctrico del condensador al campo magnético de la bobina y vuelve, sin que el total cambie. En una órbita, la energía pasa de potencial a cinética y vuelve. En los dos casos, saber que el total se conserva permite conocer una parte a partir de la otra sin resolver la evolución completa.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Trabajo y energía cinética</h3>
<p>En la Lección 7 definimos el trabajo como la integral de la fuerza a lo largo del camino, $W = \int F\,dx$. Veamos qué produce ese trabajo. Sustituimos la segunda ley de Newton, $F = m\,dv/dt$:</p>
$$F\,dx = m\,\frac{dv}{dt}\,dx = m\,dv\,\frac{dx}{dt} = m\,v\,dv$$
<p>El paso central es reordenar el cociente: $dx/dt$ es la velocidad. Ahora integramos entre una velocidad inicial $v_1$ y una final $v_2$, con la regla de la potencia:</p>
$$W = \int_{v_1}^{v_2} m\,v\,dv = \frac{1}{2}m\,v_2^{2} - \frac{1}{2}m\,v_1^{2}$$
<p>La cantidad $K = \frac{1}{2}mv^{2}$ es la <em>energía cinética</em>. El trabajo hecho sobre un cuerpo es lo que cambia su energía cinética. Se mide en julios: $1\ \text{J} = 1\ \text{kg}\cdot\text{m}^2/\text{s}^2$.</p>

<h3>2. Energía potencial gravitatoria</h3>
<p>En la Lección 7 calculaste que llevar una masa $m$ desde una distancia $r$ hasta el infinito cuesta un trabajo $GMm/r$. Se define la <em>energía potencial</em> de modo que valga cero en el infinito:</p>
$$U(r) = -\frac{G\,M\,m}{r}$$
<p>El signo negativo tiene un significado claro: a cualquier distancia finita, el cuerpo tiene menos energía que si estuviera libre en el infinito. Está en un pozo, y $U$ indica su profundidad.</p>

<h3>3. Conservación de la energía</h3>
<p>Si solo actúa la gravedad, lo que gana $K$ lo pierde $U$. La suma se mantiene:</p>
$$E = \frac{1}{2}m\,v^{2} - \frac{G\,M\,m}{r} = \text{constante}$$

<h3>4. La energía de una órbita circular</h3>
<p>En una órbita circular, $v^{2} = GM/r$, de la Lección 8. Sustituimos en la energía cinética:</p>
$$K = \frac{1}{2}m\,\frac{GM}{r} = \frac{G\,M\,m}{2r}$$
<p>Comparando con $U = -GMm/r$, vemos que $U = -2K$. La energía total es:</p>
$$E = K + U = \frac{GMm}{2r} - \frac{GMm}{r} = -\frac{G\,M\,m}{2r}$$
<p>De aquí sale un resultado que choca con la intuición. Un satélite que pierde energía por el rozamiento con la atmósfera baja a una órbita de menor $r$, y allí $K$ es mayor: al frenarlo, acaba yendo más rápido. La energía potencial ha bajado el doble de lo que ha subido la cinética.</p>

<h3>5. El signo de la energía decide el destino</h3>
<div class="tabla"><table>
<thead><tr><th>Energía total</th><th>Qué ocurre</th><th>Trayectoria</th></tr></thead>
<tbody>
<tr><td>$E < 0$</td><td>El cuerpo no puede llegar al infinito: está ligado</td><td>Elipse o círculo</td></tr>
<tr><td>$E = 0$</td><td>Llega al infinito con velocidad nula: es justo la velocidad de escape</td><td>Parábola</td></tr>
<tr><td>$E > 0$</td><td>Llega al infinito con velocidad de sobra</td><td>Hipérbola</td></tr>
</tbody></table></div>
<p>Con $E = 0$ recuperas la velocidad de escape: $\frac{1}{2}mv^{2} = GMm/r$, luego $v = \sqrt{2GM/r}$.</p>

<h3>6. Momento angular</h3>
<p>Para un cuerpo de masa $m$ a distancia $r$ del centro, el momento angular es la masa por la distancia y por la componente de la velocidad perpendicular al radio:</p>
$$L = m\,r\,v_\perp$$
<p>La componente a lo largo del radio no cuenta, porque acercarse o alejarse no es girar. Si la velocidad forma un ángulo $\theta$ con el radio, $v_\perp = v\sin\theta$.</p>
<p>Lo que cambia el momento angular es el <em>momento de la fuerza</em>, o par: la fuerza por la distancia y por el seno del ángulo entre ambas, $\tau = r\,F\sin\theta$. Es la versión para giros de la segunda ley:</p>
$$\frac{dL}{dt} = \tau$$
<p>La gravedad del Sol apunta exactamente a lo largo del radio. El ángulo entre fuerza y radio es cero, su seno es cero y el par es nulo. Por tanto:</p>
$$\frac{dL}{dt} = 0 \;\Rightarrow\; L = \text{constante}$$
<p>Esto vale para cualquier fuerza dirigida hacia un centro, sea cual sea su dependencia con la distancia.</p>

<h3>7. Dos consecuencias</h3>
<p><strong>Perihelio y afelio.</strong> En el punto más cercano al Sol y en el más lejano, la velocidad es perpendicular al radio. Igualando el momento angular en los dos:</p>
$$m\,r_p\,v_p = m\,r_a\,v_a \;\Rightarrow\; r_p\,v_p = r_a\,v_a$$
<p><strong>La ley de las áreas.</strong> En un tiempo corto $dt$, el radio barre un triángulo estrecho de base $v_\perp\,dt$ y altura $r$. Su área es la mitad de base por altura:</p>
$$dA = \frac{1}{2}\,r\,v_\perp\,dt \;\Rightarrow\; \frac{dA}{dt} = \frac{1}{2}\,r\,v_\perp = \frac{L}{2m}$$
<p>Como $L$ es constante, el área barrida por unidad de tiempo también. Es la <strong>segunda ley de Kepler</strong>: el radio que une el planeta con el Sol barre áreas iguales en tiempos iguales. Kepler la encontró en los datos; aquí sale en dos líneas.</p>

<h3>8. Cuerpos que giran sobre sí mismos</h3>
<p>En una esfera que gira con periodo $T$, un trozo de masa a distancia $r$ del eje se mueve a $v = 2\pi r/T$ y tiene momento angular $m\,r\,v = 2\pi\,m\,r^{2}/T$. Sumando todos los trozos, y mientras la forma no cambie:</p>
$$L \propto \frac{M\,R^{2}}{T}$$
<p>Si el cuerpo se contrae sin perder masa, $R$ baja y $T$ tiene que bajar como $R^{2}$. Es la patinadora, y también el origen de los púlsares.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La Tierra en el perihelio y en el afelio</h3>
<p>La Tierra pasa por el perihelio a principios de enero, a $r_p = 1{,}471 \times 10^{11}$ m del Sol, con una velocidad $v_p = 30{,}29$ km/s. En el afelio, a principios de julio, está a $r_a = 1{,}521 \times 10^{11}$ m.</p>
<p><strong>Velocidad en el afelio</strong>, por conservación del momento angular:</p>
$$v_a = v_p\,\frac{r_p}{r_a} = 30{,}29 \times \frac{1{,}471}{1{,}521} = 29{,}29\ \text{km/s}$$
<p><strong>Comprobación con la energía.</strong> Calculamos la energía por kilogramo, $\frac{1}{2}v^{2} - GM/r$, con $GM_\odot = 1{,}327 \times 10^{20}\ \text{m}^3/\text{s}^2$.</p>
<p>En el perihelio:</p>
$$\frac{(3{,}029 \times 10^{4})^{2}}{2} - \frac{1{,}327 \times 10^{20}}{1{,}471 \times 10^{11}} = 4{,}587 \times 10^{8} - 9{,}021 \times 10^{8} = -4{,}43 \times 10^{8}\ \text{J/kg}$$
<p>En el afelio:</p>
$$\frac{(2{,}929 \times 10^{4})^{2}}{2} - \frac{1{,}327 \times 10^{20}}{1{,}521 \times 10^{11}} = 4{,}290 \times 10^{8} - 8{,}725 \times 10^{8} = -4{,}43 \times 10^{8}\ \text{J/kg}$$
<p>Las dos partidas cambian un 3 % y un 6 %, y la suma coincide. Es negativa: la Tierra está ligada al Sol. Observa también que el perihelio cae en enero: las estaciones no dependen de la distancia al Sol.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "La energía de la Estación Espacial",
            enunciado: R`<p>La Estación Espacial Internacional tiene una masa de $4{,}2 \times 10^{5}$ kg y orbita a $r = 6{,}78 \times 10^{6}$ m del centro de la Tierra con $v = 7{,}66 \times 10^{3}$ m/s. Para la Tierra, $GM = 3{,}986 \times 10^{14}\ \text{m}^3/\text{s}^2$.</p>`,
            partes: [
              { id: "a", pregunta: "Energía cinética", tipo: "sci", unidad: "J", respuesta: 1.232e13,
                errores: [{ v: 2.464e13, msg: "Falta el factor 1/2 de la energía cinética." }],
                pistas: ["K = m v² / 2. Eleva primero la velocidad al cuadrado."],
                solucion: R`$K = \dfrac{4{,}2 \times 10^{5} \times (7{,}66 \times 10^{3})^{2}}{2} = \dfrac{4{,}2 \times 10^{5} \times 5{,}868 \times 10^{7}}{2} = 1{,}23 \times 10^{13}$ J.` },
              { id: "b", pregunta: "Valor absoluto de la energía potencial, |U|", tipo: "sci", unidad: "J", respuesta: 2.469e13,
                pistas: ["|U| = G M m / r, y GM ya está dado."],
                solucion: R`$|U| = \dfrac{3{,}986 \times 10^{14} \times 4{,}2 \times 10^{5}}{6{,}78 \times 10^{6}} = 2{,}47 \times 10^{13}$ J. La energía potencial es $U = -2{,}47 \times 10^{13}$ J.` },
              { id: "c", pregunta: "Cociente |U| / K", tipo: "num", respuesta: 2.0, tol: 0.03,
                pistas: ["Divide los dos resultados anteriores."],
                solucion: R`$2{,}47/1{,}23 = 2{,}0$. Es la relación $U = -2K$ de toda órbita circular. La energía total es $E = -1{,}23 \times 10^{13}$ J: habría que aportar esa energía para liberar la estación de la Tierra.` }
            ] },
          { id: "e2", nivel: 2, titulo: "El cometa Halley",
            enunciado: R`<p>El cometa Halley pasa por el perihelio a 0,586 UA del Sol con una velocidad de 54,5 km/s. Su afelio está a 35,1 UA, más allá de Neptuno.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad en el afelio", tipo: "num", unidad: "km/s", respuesta: 0.910, tol: 0.03,
                errores: [{ v: 3264, msg: "Has invertido el cociente. Lejos del Sol el cometa va más despacio." }],
                pistas: ["En esos dos puntos, r · v vale lo mismo. No hace falta pasar las UA a metros, porque se cancelan."],
                solucion: R`$v_a = 54{,}5 \times \dfrac{0{,}586}{35{,}1} = 0{,}910$ km/s.` },
              { id: "b", pregunta: "¿Cuántas veces más rápido va en el perihelio que en el afelio?", tipo: "num", unidad: "veces", respuesta: 59.9, tol: 0.03,
                pistas: ["Es el cociente de las dos distancias."],
                solucion: R`$35{,}1/0{,}586 = 59{,}9$ veces.` },
              { id: "c", pregunta: "Según la ley de las áreas, ¿dónde pasa el cometa la mayor parte de su periodo de 75 años?", tipo: "opcion", respuesta: 2,
                opciones: ["Cerca del Sol, donde la gravedad es más intensa", "Reparte el tiempo por igual a lo largo de la órbita", "Lejos del Sol, donde se mueve muy despacio", "No se puede saber sin conocer su masa"],
                pistas: ["Para barrer la misma área con un radio largo basta un desplazamiento pequeño."],
                solucion: R`Lejos del Sol. Pasa unos pocos meses en el interior del sistema solar y décadas más allá de Saturno.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Escapar del Sol y encoger una estrella",
            enunciado: R`<p>Para el Sol, $GM = 1{,}327 \times 10^{20}\ \text{m}^3/\text{s}^2$, y $1\ \text{UA} = 1{,}496 \times 10^{11}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "La sonda Voyager 1 está a unas 160 UA del Sol. ¿Cuánto vale allí la velocidad de escape del Sol?", tipo: "num", unidad: "km/s", respuesta: 3.33, tol: 0.03,
                errores: [{ v: 2.35, msg: "Esa es la velocidad de una órbita circular. La de escape lleva un factor 2 dentro de la raíz." }],
                pistas: ["Pasa la distancia a metros y usa v = √(2GM/r)."],
                solucion: R`$r = 160 \times 1{,}496 \times 10^{11} = 2{,}394 \times 10^{13}$ m. $v = \sqrt{\dfrac{2 \times 1{,}327 \times 10^{20}}{2{,}394 \times 10^{13}}} = \sqrt{1{,}109 \times 10^{7}} = 3{,}33 \times 10^{3}$ m/s.` },
              { id: "b", pregunta: "Voyager 1 se aleja a 17,0 km/s. Su energía total respecto al Sol es:", tipo: "opcion", respuesta: 2,
                opciones: ["Negativa: acabará volviendo", "Cero: va justo a la velocidad de escape", "Positiva: no volverá", "No está definida tan lejos del Sol"],
                pistas: ["Compara su velocidad con la de escape a esa distancia."],
                solucion: R`Positiva. Va cinco veces más rápido que la velocidad de escape local, así que sigue una hipérbola y no regresará.` },
              { id: "c", pregunta: "El núcleo de una estrella, de 6000 km de radio, gira una vez cada 1000 s. Colapsa a una estrella de neutrones de 12 km de radio sin perder masa ni momento angular. ¿Cuál es su nuevo periodo, en milisegundos?", tipo: "num", unidad: "ms", respuesta: 4.0, tol: 0.03,
                errores: [{ v: 2000, msg: "El periodo va con el cuadrado del radio, no con el radio." }, { v: 0.004, msg: "Ese valor está en segundos. Se pide en milisegundos." }],
                pistas: ["Si M R² / T no cambia, T es proporcional a R².", "El radio se divide entre 500. El periodo se divide entre 500²."],
                solucion: R`$T_2 = T_1\left(\dfrac{R_2}{R_1}\right)^{2} = 1000 \times \left(\dfrac{12}{6000}\right)^{2} = 1000 \times 4 \times 10^{-6} = 4 \times 10^{-3}$ s. Los números de partida son ilustrativos, pero el resultado es realista: los púlsares jóvenes giran con periodos de milisegundos a décimas de segundo.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Una órbita calculada paso a paso</h3>
<p>Este programa hace justo lo que las leyes de conservación evitan: avanza una órbita a pasos pequeños, usando la definición de derivada de la Lección 6. Trabaja en UA y años, donde $GM_\odot = 4\pi^{2}$. En cada paso calcula la aceleración, actualiza la velocidad y después la posición.</p>
<div class="tabla"><pre>import math

GM = 4 * math.pi**2      # en UA^3 / año^2
x, y = 1.0, 0.0          # posición inicial, en UA
vx, vy = 0.0, 5.0        # velocidad inicial, en UA/año
dt = 0.001               # paso de tiempo, en años

for paso in range(2001):
    r = math.sqrt(x**2 + y**2)
    if paso % 250 == 0:
        E = 0.5 * (vx**2 + vy**2) - GM / r
        L = x * vy - y * vx
        print(round(paso * dt, 2), round(r, 3), round(E, 3), round(L, 3))
    ax = -GM * x / r**3
    ay = -GM * y / r**3
    vx = vx + ax * dt
    vy = vy + ay * dt
    x = x + vx * dt
    y = y + vy * dt</pre></div>
<p>Cada línea muestra el tiempo, la distancia al Sol, la energía por unidad de masa y el momento angular por unidad de masa.</p>
<ol>
<li>Ejecútalo. La distancia $r$ oscila entre 1 UA y menos de 0,5 UA: la órbita es una elipse. La energía se mantiene cerca de $-27$ y el momento angular en 5.</li>
<li>Cambia la velocidad inicial a <code>6.283</code>, que es $2\pi$. ¿Qué órbita sale y por qué?</li>
<li>Prueba con <code>9.0</code>. Calcula antes la velocidad de escape a 1 UA en estas unidades, $\sqrt{2GM} = 8{,}89$, y predice el signo de la energía.</li>
<li>Sube el paso a <code>dt = 0.02</code> y observa cómo se degrada la energía. Es el error de aproximar una derivada con un paso finito.</li>
</ol>`,
          notas: [{ id: "orbita", label: "Qué órbita sale con cada velocidad inicial y cómo cambian la energía y el momento angular" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La energía mecánica se conserva:</strong> $E = \frac{1}{2}mv^{2} - GMm/r$. Lo que gana la parte cinética lo pierde la potencial.`,
          R`<strong>En una órbita circular</strong>, $U = -2K$ y $E = -GMm/2r$. Un satélite que pierde energía baja y se acelera.`,
          R`<strong>El signo de $E$ decide:</strong> negativo, órbita ligada; cero, escape justo; positivo, el cuerpo se va para siempre.`,
          R`<strong>El momento angular $L = m\,r\,v_\perp$ se conserva</strong> bajo cualquier fuerza central. De ahí $r_p v_p = r_a v_a$.`,
          R`<strong>La segunda ley de Kepler</strong> es la conservación del momento angular: $dA/dt = L/2m$.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 12 ───────────────────────── */
    {
      id: "leccion-12", n: 12, fase: 1, codigo: "B2.2",
      titulo: "Las leyes de Kepler y las órbitas elípticas",
      sub: "La geometría de la elipse, la ecuación que da la velocidad en cualquier punto y cómo se viaja a Marte.",
      horas: "6 horas",
      contexto: "Elipse: semieje mayor a, excentricidad e, distancia focal c = a e, semieje menor b = a raíz(1 - e^2); perihelio r_p = a(1 - e), afelio r_a = a(1 + e); ecuación polar r = a(1 - e^2)/(1 + e cos theta); las tres leyes de Kepler; tercera ley general T^2 = 4 pi^2 a^3 / (G(M + m)); energía E = -G M m / 2a; ecuación vis-viva v^2 = G M (2/r - 1/a); en UA y con la velocidad de la Tierra, v = 29,78 km/s por raíz(2/r - 1/a); órbita de transferencia de Hohmann, a = (r1 + r2)/2 y duración medio periodo.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Hasta ahora las órbitas eran círculos. Las reales son elipses, y bastan dos números para describirlas: uno para el tamaño y otro para lo achatadas que están.</p>
<p>Una elipse se dibuja con dos chinchetas, un cordel y un lápiz. Las chinchetas son los <em>focos</em>, y el lápiz, al tensar el cordel, recorre los puntos cuya suma de distancias a los dos focos es constante. Si juntas las chinchetas obtienes un círculo. Si las separas, la elipse se alarga.</p>
<p>El Sol no está en el centro de la elipse, sino en uno de los focos. En el otro no hay nada.</p>
<div class="nota"><strong>Las órbitas excéntricas tienen uso en comunicaciones.</strong> Un satélite geoestacionario se ve muy bajo sobre el horizonte desde latitudes altas. La solución soviética fue la órbita Molniya: una elipse muy alargada, de 12 horas, con el punto más lejano sobre el hemisferio norte. Por la ley de las áreas, el satélite pasa casi todo el tiempo cerca de ese punto, alto en el cielo. La calcularás en los ejercicios.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La geometría de la elipse</h3>
<ul>
<li><strong>Semieje mayor</strong> $a$: la mitad del diámetro más largo. Fija el tamaño.</li>
<li><strong>Excentricidad</strong> $e$: un número entre 0 y 1 que fija la forma. Con $e = 0$ es un círculo. Cuanto más se acerca a 1, más alargada.</li>
<li><strong>Distancia del centro a cada foco:</strong> $c = a\,e$.</li>
<li><strong>Semieje menor:</strong> $b = a\sqrt{1 - e^{2}}$.</li>
</ul>
<p>La suma de distancias de cualquier punto a los dos focos es $2a$.</p>

<h3>2. Perihelio y afelio</h3>
<p>El punto más cercano al Sol, el <em>perihelio</em>, está en el extremo del eje mayor del lado del foco ocupado. Su distancia es el semieje menos la distancia focal. El más lejano, el <em>afelio</em>, está en el extremo opuesto:</p>
$$r_p = a - a\,e = a\,(1 - e) \qquad r_a = a + a\,e = a\,(1 + e)$$
<p>Sumándolas, $r_p + r_a = 2a$: el semieje mayor es la media de las dos distancias extremas. Para órbitas alrededor de la Tierra los nombres son <em>perigeo</em> y <em>apogeo</em>.</p>

<h3>3. La ecuación de la órbita</h3>
<p>Si $\theta$ es el ángulo medido desde el perihelio, visto desde el Sol, la distancia es:</p>
$$r(\theta) = \frac{a\,(1 - e^{2})}{1 + e\cos\theta}$$
<p>Comprobación en el perihelio, $\theta = 0$, usando que $1 - e^{2} = (1 - e)(1 + e)$:</p>
$$r(0) = \frac{a\,(1-e)(1+e)}{1 + e} = a\,(1 - e)$$
<p>Y en el afelio, $\theta = 180^\circ$, el coseno vale $-1$ y queda $a\,(1 + e)$.</p>

<h3>4. Las tres leyes de Kepler</h3>
<ol>
<li><strong>Ley de las órbitas.</strong> Cada planeta describe una elipse con el Sol en uno de los focos.</li>
<li><strong>Ley de las áreas.</strong> El radio que une el planeta con el Sol barre áreas iguales en tiempos iguales. La dedujiste en la lección anterior.</li>
<li><strong>Ley de los periodos.</strong> El cuadrado del periodo es proporcional al cubo del semieje mayor.</li>
</ol>
<p>La tercera es la de la Lección 8 con $a$ en lugar del radio. La deducción para una elipse es más larga y el resultado es el mismo. En su forma completa aparece la suma de las dos masas:</p>
$$T^{2} = \frac{4\pi^{2}}{G\,(M + m)}\,a^{3}$$
<p>Para un planeta, $m$ es despreciable frente a $M$. Para dos estrellas que orbitan una en torno a la otra no lo es, y esta fórmula da la masa total del par. Así se miden las masas de las estrellas.</p>

<h3>5. La energía solo depende del semieje mayor</h3>
<p>Aplicamos las dos leyes de conservación en el perihelio y en el afelio. Del momento angular, $v_a = v_p\,r_p/r_a$. De la energía por unidad de masa:</p>
$$\frac{1}{2}v_p^{2} - \frac{GM}{r_p} = \frac{1}{2}v_a^{2} - \frac{GM}{r_a}$$
<p>Sustituimos $v_a$ y agrupamos las velocidades a un lado:</p>
$$\frac{1}{2}v_p^{2}\left(1 - \frac{r_p^{2}}{r_a^{2}}\right) = GM\left(\frac{1}{r_p} - \frac{1}{r_a}\right)$$
<p>El paréntesis de la izquierda es una diferencia de cuadrados, $(r_a - r_p)(r_a + r_p)/r_a^{2}$. El de la derecha es $(r_a - r_p)/(r_p\,r_a)$. El factor $(r_a - r_p)$ se cancela, y con $r_a + r_p = 2a$ queda:</p>
$$\frac{1}{2}v_p^{2} = \frac{GM\,r_a}{2a\,r_p}$$
<p>Lo llevamos a la energía en el perihelio, usando $r_a - 2a = -r_p$:</p>
$$\frac{E}{m} = \frac{GM\,r_a}{2a\,r_p} - \frac{GM}{r_p} = \frac{GM\,(r_a - 2a)}{2a\,r_p} = -\frac{GM}{2a}$$
<p>La energía de una órbita elíptica es la de una órbita circular de radio $a$:</p>
$$E = -\frac{G\,M\,m}{2a}$$
<p>No depende de la excentricidad. Todas las órbitas con el mismo semieje mayor tienen la misma energía y, por la tercera ley, el mismo periodo.</p>

<h3>6. La ecuación vis-viva</h3>
<p>Igualamos la energía en un punto cualquiera con ese valor:</p>
$$\frac{1}{2}v^{2} - \frac{GM}{r} = -\frac{GM}{2a}$$
<p>Despejamos $v^{2}$ multiplicando por 2:</p>
$$v^{2} = GM\left(\frac{2}{r} - \frac{1}{a}\right)$$
<p>Es la <em>ecuación vis-viva</em>, y da la velocidad en cualquier punto de cualquier órbita. Dos comprobaciones: con $r = a$ queda $v^{2} = GM/r$, la órbita circular. Con $a$ infinito queda $v^{2} = 2GM/r$, la velocidad de escape.</p>
<p>Para órbitas alrededor del Sol hay un atajo. Con $r$ y $a$ en UA, $GM_\odot$ equivale al cuadrado de la velocidad orbital de la Tierra:</p>
$$v = 29{,}78\ \text{km/s} \times \sqrt{\frac{2}{r} - \frac{1}{a}}$$

<h3>7. Cómo se viaja a otro planeta</h3>
<p>La ruta que menos combustible gasta entre dos órbitas circulares es media elipse tangente a las dos: la <em>órbita de transferencia de Hohmann</em>. Su perihelio toca la órbita interior y su afelio la exterior, luego:</p>
$$a_\text{t} = \frac{r_1 + r_2}{2}$$
<p>El viaje dura medio periodo de esa elipse. Hacen falta dos encendidos de motor: uno para pasar de la órbita de salida a la elipse y otro para pasar de la elipse a la órbita de llegada.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Un viaje a Marte</h3>
<p>Tomamos las órbitas de la Tierra y Marte como círculos de 1 UA y 1,524 UA.</p>
<p><strong>Semieje de la transferencia:</strong></p>
$$a_\text{t} = \frac{1 + 1{,}524}{2} = 1{,}262\ \text{UA}$$
<p><strong>Duración.</strong> Con la tercera ley en años y UA:</p>
$$T = a^{3/2} = 1{,}262 \times \sqrt{1{,}262} = 1{,}262 \times 1{,}1234 = 1{,}418\ \text{años}$$
<p>El viaje es la mitad: $0{,}709$ años, es decir, 259 días.</p>
<p><strong>Velocidad de salida.</strong> La nave parte del perihelio de la elipse, a $r = 1$ UA:</p>
$$v = 29{,}78 \times \sqrt{\frac{2}{1} - \frac{1}{1{,}262}} = 29{,}78 \times \sqrt{1{,}2076} = 29{,}78 \times 1{,}0989 = 32{,}73\ \text{km/s}$$
<p>La Tierra ya se mueve a 29,78 km/s. El motor solo tiene que aportar la diferencia:</p>
$$\Delta v = 32{,}73 - 29{,}78 = 2{,}95\ \text{km/s}$$
<p>Ese es el cambio de velocidad respecto al Sol. Falta sumar lo necesario para salir del pozo de la Tierra, pero el orden de magnitud explica por qué se lanza siempre hacia delante, en el sentido de la órbita terrestre.</p>
<p><strong>Excentricidad de la elipse:</strong> de $r_p = a\,(1 - e)$, $e = 1 - 1/1{,}262 = 0{,}208$.</p>
<p>Marte tiene que estar en el punto de llegada 259 días después. Esa configuración solo se da una vez por periodo sinódico, cada 780 días: son las ventanas de lanzamiento de la Lección 10.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "La órbita de Marte",
            enunciado: R`<p>Marte tiene $a = 1{,}524$ UA y $e = 0{,}0934$.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia en el perihelio", tipo: "num", unidad: "UA", respuesta: 1.382, tol: 0.01,
                pistas: ["r = a (1 − e)."],
                solucion: R`$1{,}524 \times (1 - 0{,}0934) = 1{,}382$ UA.` },
              { id: "b", pregunta: "Distancia en el afelio", tipo: "num", unidad: "UA", respuesta: 1.666, tol: 0.01,
                pistas: ["r = a (1 + e)."],
                solucion: R`$1{,}524 \times 1{,}0934 = 1{,}666$ UA. Marte recibe en el perihelio un 45 % más de luz que en el afelio, porque $(1{,}666/1{,}382)^{2} = 1{,}45$.` },
              { id: "c", pregunta: "Periodo orbital", tipo: "num", unidad: "años", respuesta: 1.881, tol: 0.01,
                pistas: ["T = a^(3/2) en años y UA. Puedes calcularlo como a por la raíz cuadrada de a."],
                solucion: R`$1{,}524 \times \sqrt{1{,}524} = 1{,}524 \times 1{,}2345 = 1{,}881$ años.` }
            ] },
          { id: "e2", nivel: 2, titulo: "La órbita del cometa Halley",
            enunciado: R`<p>El cometa Halley vuelve cada 75,3 años y su perihelio está a 0,586 UA. Dato: $75{,}3^{2/3} = 17{,}83$.</p>`,
            partes: [
              { id: "a", pregunta: "Semieje mayor", tipo: "num", unidad: "UA", respuesta: 17.83, tol: 0.01,
                errores: [{ v: 653.4, msg: "Has elevado a 3/2. Para despejar a de T = a^(3/2) hay que elevar a 2/3." }],
                pistas: ["De T² = a³ se obtiene a = T^(2/3)."],
                solucion: R`$a = T^{2/3} = 75{,}3^{2/3} = 17{,}83$ UA.` },
              { id: "b", pregunta: "Excentricidad", tipo: "num", respuesta: 0.967, tol: 0.005,
                pistas: ["Despeja e de r_p = a (1 − e)."],
                solucion: R`$e = 1 - \dfrac{r_p}{a} = 1 - \dfrac{0{,}586}{17{,}83} = 0{,}967$. Una elipse muy alargada.` },
              { id: "c", pregunta: "Distancia en el afelio", tipo: "num", unidad: "UA", respuesta: 35.07, tol: 0.01,
                pistas: ["La suma de perihelio y afelio es 2a."],
                solucion: R`$r_a = 2a - r_p = 35{,}66 - 0{,}586 = 35{,}07$ UA, más allá de la órbita de Neptuno, que está a 30 UA.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Vis-viva, Júpiter y una órbita Molniya",
            enunciado: R`<p>Para órbitas solares usa $v = 29{,}78\sqrt{2/r - 1/a}$ km/s con distancias en UA. Para la Tierra, $GM = 3{,}986 \times 10^{14}\ \text{m}^3/\text{s}^2$ y su radio es 6371 km.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad de la Tierra en el perihelio (r = 0,9833 UA, a = 1 UA)", tipo: "num", unidad: "km/s", respuesta: 30.28, tol: 0.005,
                pistas: ["Sustituye en la fórmula: 2/0,9833 − 1."],
                solucion: R`$29{,}78 \times \sqrt{2{,}0340 - 1} = 29{,}78 \times 1{,}0169 = 30{,}28$ km/s, el valor del ejemplo de la lección anterior.` },
              { id: "b", pregunta: "Duración de un viaje de Hohmann a Júpiter (5,203 UA)", tipo: "num", unidad: "años", respuesta: 2.73, tol: 0.01,
                errores: [{ v: 5.46, msg: "Ese es el periodo completo de la elipse. El viaje es solo la mitad." }],
                pistas: ["El semieje es la media de 1 y 5,203 UA.", "Calcula el periodo con T = a^(3/2) y divide entre dos."],
                solucion: R`$a = 3{,}1015$ UA. $T = 3{,}1015 \times \sqrt{3{,}1015} = 5{,}462$ años. El viaje dura $2{,}73$ años.` },
              { id: "c", pregunta: "Una órbita Molniya tiene un periodo de 43 082 s (medio día sidéreo). ¿Cuánto vale su semieje mayor, en km?", tipo: "num", unidad: "km", respuesta: 26560, tol: 0.02,
                errores: [{ v: 26560000, msg: "Ese valor está en metros. Se pide en kilómetros." }],
                pistas: ["De la tercera ley, a³ = GM T² / 4π².", "a³ = 1,874 × 10²² m³. Falta la raíz cúbica."],
                solucion: R`$a^{3} = \dfrac{3{,}986 \times 10^{14} \times (4{,}3082 \times 10^{4})^{2}}{39{,}48} = 1{,}874 \times 10^{22}\ \text{m}^3$, luego $a = 2{,}656 \times 10^{7}$ m $= 26\,560$ km.` },
              { id: "d", pregunta: "Si su perigeo está a 500 km de altura, ¿a qué altura sobre la superficie está el apogeo?", tipo: "num", unidad: "km", respuesta: 39880, tol: 0.02,
                errores: [{ v: 46250, msg: "Esa es la distancia al centro de la Tierra. Resta el radio terrestre para obtener la altura." }],
                pistas: ["Las distancias de la fórmula se miden desde el centro de la Tierra: r_p = 6371 + 500 km.", "r_a = 2a − r_p."],
                solucion: R`$r_p = 6871$ km. $r_a = 2 \times 26\,560 - 6871 = 46\,250$ km. Altura: $46\,250 - 6371 = 39\,880$ km, más que la órbita geoestacionaria.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Dibuja las órbitas</h3>
<p>Este programa usa la ecuación polar de la elipse para dibujar la órbita de la Tierra, la de Marte y la transferencia de Hohmann del ejemplo. Utiliza dos bibliotecas que Colab ya incluye: <code>numpy</code>, para operar con listas de números de una vez, y <code>matplotlib</code>, para dibujar.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

def orbita(a, e):
    theta = np.linspace(0, 2 * np.pi, 500)
    r = a * (1 - e**2) / (1 + e * np.cos(theta))
    return r * np.cos(theta), r * np.sin(theta)

for nombre, a, e in [("Tierra", 1.0, 0.0167),
                     ("Marte", 1.524, 0.0934),
                     ("Transferencia", 1.262, 0.208)]:
    x, y = orbita(a, e)
    plt.plot(x, y, label=nombre)

plt.plot(0, 0, "o", color="orange")
plt.axis("equal")
plt.legend()
plt.show()</pre></div>
<ol>
<li>Ejecútalo. Las órbitas de la Tierra y Marte parecen círculos, pero fíjate en que el Sol no queda en el centro de la de Marte.</li>
<li>Añade el cometa Halley con los valores del ejercicio 2 y observa el cambio de escala.</li>
<li>Dibuja varias elipses con el mismo $a$ y excentricidades 0, 0,3, 0,6 y 0,9. Todas tienen el mismo periodo y la misma energía.</li>
</ol>
<p>El dibujo simplifica una cosa: coloca todos los perihelios en la misma dirección. En el sistema solar real cada órbita está orientada de forma distinta.</p>`,
          notas: [{ id: "elipses", label: "Qué has observado al cambiar la excentricidad y al añadir el cometa Halley" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Una elipse se describe con $a$ y $e$.</strong> Perihelio en $a(1-e)$, afelio en $a(1+e)$, y el Sol en un foco.`,
          R`<strong>Las tres leyes de Kepler:</strong> órbitas elípticas, áreas iguales en tiempos iguales y $T^{2} \propto a^{3}$.`,
          R`<strong>La energía solo depende del semieje mayor:</strong> $E = -GMm/2a$.`,
          R`<strong>Ecuación vis-viva:</strong> $v^{2} = GM\,(2/r - 1/a)$ da la velocidad en cualquier punto de la órbita.`,
          R`<strong>Transferencia de Hohmann:</strong> media elipse con $a = (r_1 + r_2)/2$. A Marte son 259 días.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 13 ───────────────────────── */
    {
      id: "leccion-13", n: 13, fase: 1, codigo: "C2.1",
      titulo: "Python y astropy: tu calculadora astronómica",
      sub: "Unidades que no se pueden mezclar por error, constantes ya tabuladas y coordenadas que se transforman solas.",
      horas: "5 horas",
      contexto: "Python en Google Colab con astropy: astropy.units (u.pc, u.lyr, u.au, .to()), astropy.constants (const.G, const.M_sun, const.c, const.au, const.M_earth, const.R_earth, const.M_jup, const.R_jup), SkyCoord con ra y dec, EarthLocation, Time (en UTC), AltAz y transform_to para pasar de coordenadas ecuatoriales a altura y azimut, sidereal_time, separation, Distance(parallax=...) y distmod.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">En las lecciones anteriores has hecho a mano conversiones de unidades, velocidades de escape y alturas de culminación. Hacerlo a mano sirve para entenderlo. A partir de aquí conviene tener una herramienta que lo haga rápido y que no se equivoque con las unidades.</p>
<p>Esa herramienta es <strong>astropy</strong>, la biblioteca de Python que usa la comunidad astronómica profesional. Su idea principal es que un número va siempre unido a su unidad. No se escribe 4,2 sino 4,2 años luz, y la biblioteca se encarga de las conversiones y se niega a sumar metros con segundos.</p>
<div class="nota"><strong>Un error de unidades costó una sonda.</strong> En 1999 la Mars Climate Orbiter se perdió al llegar a Marte porque un programa entregaba el impulso de los motores en libras-fuerza por segundo y otro lo esperaba en newtons por segundo. Es el mismo tipo de fallo que confundir dBm con dBW en un cálculo de enlace: el número es correcto y el resultado está mal por un factor fijo. Las unidades explícitas lo evitan.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Preparación</h3>
<p>Abre un cuaderno en <a href="https://colab.research.google.com" target="_blank" rel="noopener">Google Colab</a>. Cada bloque de código de esta lección va en una celda, y se ejecuta con el botón de la izquierda o con Mayúsculas y Entrar. Colab suele traer astropy instalado. Si la primera celda da un error de módulo no encontrado, ejecuta antes una celda con <code>!pip install astropy</code>.</p>

<h3>2. Cantidades con unidades</h3>
<p>Una cantidad se crea multiplicando un número por una unidad, y se convierte con <code>.to()</code>:</p>
<div class="tabla"><pre>from astropy import units as u

d = 4.246 * u.lyr        # distancia a Próxima Centauri
print(d.to(u.pc))        # 1.3018 pc
print(d.to(u.m))         # 4.017e+16 m</pre></div>
<p>Las unidades que más usarás: <code>u.m</code>, <code>u.km</code>, <code>u.au</code>, <code>u.lyr</code>, <code>u.pc</code>, <code>u.s</code>, <code>u.yr</code>, <code>u.kg</code>, <code>u.deg</code>, <code>u.arcsec</code> y <code>u.mas</code>, que es la milésima de segundo de arco.</p>

<h3>3. Constantes</h3>
<p>Las constantes físicas y astronómicas están tabuladas con sus unidades:</p>
<div class="tabla"><pre>from astropy import constants as const
import numpy as np

print(const.G)           # constante de gravitación
print(const.M_sun)       # masa del Sol
print(const.c)           # velocidad de la luz

v = np.sqrt(2 * const.G * const.M_earth / const.R_earth)
print(v.to(u.km / u.s))  # 11.18 km / s</pre></div>
<p>Es la velocidad de escape de la Lección 7 en dos líneas. Las unidades se combinan solas dentro de la raíz, y <code>.to()</code> comprueba que el resultado es de verdad una velocidad.</p>

<h3>4. La tercera ley de Kepler</h3>
<p>El periodo de Marte, de la Lección 12, con $T = 2\pi\sqrt{a^{3}/GM}$:</p>
<div class="tabla"><pre>a = 1.524 * u.au
T = 2 * np.pi * np.sqrt(a**3 / (const.G * const.M_sun))
print(T.to(u.yr))        # 1.8814 yr</pre></div>

<h3>5. Posiciones en el cielo</h3>
<p>Una posición se guarda en un objeto <code>SkyCoord</code> con su ascensión recta y su declinación. Para saber dónde está en tu cielo hacen falta además un lugar y un instante:</p>
<div class="tabla"><pre>from astropy.coordinates import SkyCoord, EarthLocation, AltAz
from astropy.time import Time

vega = SkyCoord(ra="18h36m56s", dec="+38d47m01s")
madrid = EarthLocation(lat=40.42 * u.deg, lon=-3.70 * u.deg, height=650 * u.m)
t = Time("2027-07-15 22:00:00")      # siempre en hora UTC

horizonte = AltAz(obstime=t, location=madrid)
vega_local = vega.transform_to(horizonte)
print(vega_local.alt.deg, vega_local.az.deg)   # 74.8 y 89.7</pre></div>
<p>Vega está a $74{,}8^\circ$ de altura, casi exactamente al este. Tres detalles:</p>
<ul>
<li>La longitud es negativa hacia el oeste de Greenwich.</li>
<li>La hora va en UTC. En la península, la hora oficial es UTC más 2 en verano y UTC más 1 en invierno.</li>
<li>Para fechas futuras puede aparecer un aviso sobre la precisión de la rotación terrestre. No afecta a lo que hacemos aquí.</li>
</ul>

<h3>6. Tiempo sidéreo y separaciones</h3>
<div class="tabla"><pre>print(t.sidereal_time("apparent", longitude=madrid.lon))   # 17h19m19s

betelgeuse = SkyCoord(ra="05h55m10s", dec="+07d24m25s")
rigel = SkyCoord(ra="05h14m32s", dec="-08d12m06s")
print(betelgeuse.separation(rigel).deg)</pre></div>
<p>Comprueba el tiempo sidéreo con la regla de la Lección 10. El 15 de julio han pasado 9,75 meses desde el 22 de septiembre, así que a medianoche local el tiempo sidéreo es de unas 19,5 h. Las 22:00 UTC en Madrid son las 21:45 de hora solar media, 2,25 horas antes de la medianoche: $19{,}5 - 2{,}25 = 17{,}25$ h. La regla acierta dentro de unos minutos.</p>

<h3>7. Distancias y magnitudes</h3>
<div class="tabla"><pre>from astropy.coordinates import Distance

d = Distance(parallax=768.07 * u.mas)   # paralaje de Próxima Centauri
print(d.to(u.pc))        # 1.302 pc
print(d.distmod)         # -4.43 mag</pre></div>
<p><code>distmod</code> es el módulo de distancia $m - M$ de la Lección 3. Es negativo porque Próxima está a menos de 10 pc.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La culminación de Sirio, sin fórmulas</h3>
<p>En la Lección 9 calculaste que Sirio culmina en Madrid a $32{,}9^\circ$. Vamos a comprobarlo de otra manera: calculando su altura cada 6 minutos durante un día entero y buscando el máximo.</p>
<div class="tabla"><pre>sirio = SkyCoord(ra="06h45m09s", dec="-16d42m58s")

horas = np.arange(0, 24, 0.1) * u.hour
tiempos = Time("2027-01-15 00:00:00") + horas

alturas = sirio.transform_to(AltAz(obstime=tiempos, location=madrid)).alt
print(alturas.max())                  # 32d49m53s
print(tiempos[alturas.argmax()])      # 2027-01-15 23:18</pre></div>
<p>Cada línea hace una cosa:</p>
<ol>
<li><code>np.arange(0, 24, 0.1)</code> crea la lista 0, 0,1, 0,2 y así hasta 23,9. Al multiplicarla por <code>u.hour</code> se convierte en 240 intervalos de tiempo.</li>
<li>Sumada a un instante, produce 240 instantes.</li>
<li>La transformación se aplica a los 240 a la vez y devuelve 240 alturas.</li>
<li><code>max()</code> da la mayor, y <code>argmax()</code> la posición que ocupa, con la que se recupera la hora.</li>
</ol>
<p>El resultado es $32{,}8^\circ$ a las 23:18 UTC, las 00:18 en hora oficial. Coincide con el cálculo a mano dentro de una décima de grado. La pequeña diferencia se debe a que hemos usado una latitud algo más precisa y a que la biblioteca tiene en cuenta la precesión desde el año 2000.</p>
<p>La hora también encaja con la Lección 10: a mediados de enero, casi cuatro meses después del 22 de septiembre, el tiempo sidéreo a medianoche ronda las 7,5 h, y la ascensión recta de Sirio es 6,75 h. Culmina, por tanto, algo antes de la medianoche solar.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Conversiones",
            enunciado: R`<p>Resuelve cada apartado con una línea de astropy y escribe el resultado.</p>`,
            partes: [
              { id: "a", pregunta: "¿Cuántos años luz es 1 pársec?", tipo: "num", unidad: "años luz", respuesta: 3.262, tol: 0.005,
                pistas: ["(1 * u.pc).to(u.lyr)"],
                solucion: R`<code>(1 * u.pc).to(u.lyr)</code> devuelve $3{,}2616$ años luz.` },
              { id: "b", pregunta: "¿Cuántas UA es 1 año luz?", tipo: "num", unidad: "UA", respuesta: 63241, tol: 0.005,
                pistas: ["(1 * u.lyr).to(u.au)"],
                solucion: R`<code>(1 * u.lyr).to(u.au)</code> devuelve $63\,241$ UA.` },
              { id: "c", pregunta: "¿Qué ocurre al ejecutar 3 * u.m + 2 * u.s?", tipo: "opcion", respuesta: 2,
                opciones: ["Devuelve 5, sin unidades", "Devuelve 5 m, porque toma la primera unidad", "Da un error: las unidades no son compatibles", "Devuelve 3 m y 2 s por separado"],
                pistas: ["Pruébalo en una celda."],
                solucion: R`Da un error del tipo <code>UnitConversionError</code>. Es justo la protección que se busca: una suma sin sentido físico no pasa desapercibida.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Constantes y órbitas",
            enunciado: R`<p>Adapta los bloques de las secciones 3 y 4 del desarrollo.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad de escape de Júpiter, con const.M_jup y const.R_jup", tipo: "num", unidad: "km/s", respuesta: 59.5, tol: 0.01,
                errores: [{ v: 42.1, msg: "Ese valor es la velocidad orbital rasante. Revisa el factor 2 dentro de la raíz." }],
                pistas: ["Es el bloque de la velocidad de escape de la Tierra cambiando dos constantes."],
                solucion: R`<code>np.sqrt(2 * const.G * const.M_jup / const.R_jup).to(u.km / u.s)</code> devuelve $59{,}5$ km/s, más de cinco veces la de la Tierra.` },
              { id: "b", pregunta: "Periodo orbital de Júpiter, con a = 5,203 UA", tipo: "num", unidad: "años", respuesta: 11.87, tol: 0.005,
                pistas: ["Es el bloque de Marte cambiando el semieje."],
                solucion: R`$11{,}87$ años. Comprobación a mano: $5{,}203 \times \sqrt{5{,}203} = 11{,}87$.` },
              { id: "c", pregunta: "Tiempo que tarda la luz del Sol en llegar a la Tierra, en minutos", tipo: "num", unidad: "min", respuesta: 8.32, tol: 0.01,
                errores: [{ v: 499, msg: "Ese valor está en segundos. Añade .to(u.min)." }],
                pistas: ["Divide const.au entre const.c y convierte a u.min."],
                solucion: R`<code>(const.au / const.c).to(u.min)</code> devuelve $8{,}32$ minutos, el valor de la Lección 1.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Coordenadas",
            enunciado: R`<p>Usa los objetos <code>betelgeuse</code>, <code>rigel</code>, <code>madrid</code> y <code>t</code> definidos en el desarrollo.</p>`,
            partes: [
              { id: "a", pregunta: "Separación angular entre Betelgeuse y Rigel", tipo: "num", unidad: "°", respuesta: 18.6, tol: 0.01,
                pistas: ["betelgeuse.separation(rigel).deg"],
                solucion: R`$18{,}6^\circ$, casi dos puños. Es la diagonal de Orión, y sirve para calibrar tu mano.` },
              { id: "b", pregunta: "Altura de Betelgeuse desde Madrid el 15 de julio de 2027 a las 22:00 UTC", tipo: "num", unidad: "°", respuesta: -41.4, tol: 0.02,
                errores: [{ v: 41.4, msg: "Revisa el signo que devuelve el programa." }],
                pistas: ["Repite la transformación de Vega con betelgeuse."],
                solucion: R`$-41{,}4^\circ$. Una altura negativa significa que está bajo el horizonte: Orión no se ve en las noches de verano.` },
              { id: "c", pregunta: "Módulo de distancia de Vega, que está a 7,69 pc", tipo: "num", respuesta: -0.57, tol: 0.03,
                errores: [{ v: 0.57, msg: "Vega está a menos de 10 pc, así que el módulo de distancia es negativo." }],
                pistas: ["Distance(7.69 * u.pc).distmod"],
                solucion: R`$-0{,}57$. Es el valor que usaste a mano en el repaso de la Fase 0: $5\log 0{,}769 = -0{,}57$.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Planifica una noche real</h3>
<p>Vas a escribir tu primera herramienta útil: un programa que dice qué altura tendrá una lista de objetos desde tu casa, a la hora a la que piensas salir.</p>
<div class="tabla"><pre>casa = EarthLocation(lat=40.42 * u.deg, lon=-3.70 * u.deg, height=650 * u.m)
cuando = Time("2027-07-15 22:00:00")     # hora UTC
horizonte = AltAz(obstime=cuando, location=casa)

objetos = {
    "Vega": SkyCoord(ra="18h36m56s", dec="+38d47m01s"),
    "Arturo": SkyCoord(ra="14h15m40s", dec="+19d10m57s"),
    "Antares": SkyCoord(ra="16h29m24s", dec="-26d25m55s"),
}

for nombre, coord in objetos.items():
    local = coord.transform_to(horizonte)
    print(nombre, round(local.alt.deg, 1), round(local.az.deg, 1))</pre></div>
<ol>
<li>Cambia la latitud, la longitud y la altitud por las de tu lugar de observación.</li>
<li>Pon la fecha y la hora de tu próxima salida, en UTC.</li>
<li>Añade tres objetos que quieras ver. Sus coordenadas están en Stellarium, al hacer clic sobre ellos, en la línea de la época J2000.</li>
<li>Quédate con los que superen los $30^\circ$ de altura. Más abajo, la atmósfera degrada mucho la imagen.</li>
</ol>
<p>Para los planetas y la Luna, que cambian de coordenadas, astropy calcula la posición por ti con <code>get_body("jupiter", cuando, casa)</code>, que se importa también de <code>astropy.coordinates</code>.</p>`,
          notas: [{ id: "plan", label: "Tu lista de objetos con su altura y azimut, y cuáles superan los 30°" }],
          tareasTitulo: "Lista de la práctica",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Ejecutar todos los bloques del desarrollo en un cuaderno de Colab." },
            { id: "t2", texto: "Reproducir el ejemplo de Sirio con mi latitud y longitud." },
            { id: "t3", texto: "Adaptar el planificador a mi lugar y a mi próxima noche de observación." },
            { id: "t4", texto: "Guardar el cuaderno: lo reutilizaré durante todo el curso." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>En astropy, cada número lleva su unidad.</strong> Se convierte con <code>.to()</code>, y las operaciones sin sentido físico dan error.`,
          R`<strong>Las constantes están tabuladas</strong> en <code>astropy.constants</code>: no hace falta copiarlas ni recordar sus unidades.`,
          R`<strong>Una posición en el cielo es un <code>SkyCoord</code>.</strong> Con un lugar y un instante se transforma a altura y azimut.`,
          R`<strong>La hora va siempre en UTC</strong> y la longitud es negativa hacia el oeste.`,
          R`<strong>Calcular a mano y con el programa</strong> es la mejor comprobación: si no coinciden, uno de los dos razonamientos falla.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 14 · REPASO ───────────────────────── */
    {
      id: "leccion-14", n: 14, fase: 1, codigo: "Repaso acumulativo",
      titulo: "Repaso de la Fase 1",
      sub: "Tres problemas que combinan el cielo, la gravitación y las órbitas, para decidir el ritmo de la Fase 2.",
      horas: "4 horas",
      contexto: "Repaso de la Fase 1: derivadas e integrales, leyes de Newton, gravitación, velocidad orbital v = raíz(GM/r) y de escape v = raíz(2GM/r), masa por la tercera ley M = 4 pi^2 r^3 / (G T^2), esfera celeste, altura al culminar h = 90 - latitud + declinación, tiempo sidéreo (2 h por mes desde el 22 de septiembre), adelanto de 3,94 min por día, periodo sinódico, energía y momento angular, elipses (r_p = a(1-e), r_a = a(1+e)), vis-viva v = 29,78 raíz(2/r - 1/a) km/s.",
      secciones: [
        { id: "mapa", titulo: "Mapa de ideas", html: R`
<p class="lead">En esta fase has pasado de describir el cielo a explicarlo. Con dos leyes de conservación y una ley de fuerza has deducido las tres leyes de Kepler, y has aprendido a pesar cualquier astro que tenga algo girando a su alrededor.</p>
<div class="tabla"><table>
<thead><tr><th>Idea</th><th>Fórmula</th><th>Lección</th></tr></thead>
<tbody>
<tr><td>Derivada de una potencia</td><td>$\dfrac{d}{dx}x^{n} = n\,x^{n-1}$</td><td>6</td></tr>
<tr><td>Integral de una potencia</td><td>$\displaystyle\int x^{n}\,dx = \dfrac{x^{n+1}}{n+1}$</td><td>7</td></tr>
<tr><td>Velocidad de escape</td><td>$v = \sqrt{2GM/r}$</td><td>7</td></tr>
<tr><td>Gravitación</td><td>$F = GMm/r^{2}$</td><td>8</td></tr>
<tr><td>Velocidad orbital circular</td><td>$v = \sqrt{GM/r}$</td><td>8</td></tr>
<tr><td>Masa del cuerpo central</td><td>$M = 4\pi^{2}r^{3}/(G\,T^{2})$</td><td>8</td></tr>
<tr><td>Altura al culminar</td><td>$h = 90^\circ - \varphi + \delta$</td><td>9</td></tr>
<tr><td>Ángulo horario</td><td>$H = \text{TSL} - \alpha$</td><td>9</td></tr>
<tr><td>Adelanto del cielo</td><td>3,94 min por día, 2 h por mes</td><td>10</td></tr>
<tr><td>Periodo sinódico</td><td>$1/S = |1/T_1 - 1/T_2|$</td><td>10</td></tr>
<tr><td>Energía de una órbita</td><td>$E = -GMm/2a$</td><td>11 y 12</td></tr>
<tr><td>Momento angular</td><td>$r_p\,v_p = r_a\,v_a$</td><td>11</td></tr>
<tr><td>Perihelio y afelio</td><td>$a\,(1-e)$ y $a\,(1+e)$</td><td>12</td></tr>
<tr><td>Vis-viva</td><td>$v^{2} = GM\,(2/r - 1/a)$</td><td>12</td></tr>
</tbody></table></div>
<p>Como en el repaso anterior, intenta los problemas sin volver a las lecciones y apunta cuáles has tenido que consultar. Puedes usar la calculadora o astropy para las operaciones.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "r1", nivel: 2, titulo: "Pesar Saturno con Titán",
            enunciado: R`<p>Titán orbita Saturno a $r = 1{,}222 \times 10^{9}$ m con un periodo de 15,945 días. Usa $G = 6{,}674 \times 10^{-11}$ en el SI y días de 86 400 s.</p>`,
            partes: [
              { id: "a", pregunta: "Periodo en segundos", tipo: "sci", unidad: "s", respuesta: 1.378e6,
                pistas: ["Multiplica los días por 86 400."],
                solucion: R`$15{,}945 \times 86\,400 = 1{,}378 \times 10^{6}$ s.` },
              { id: "b", pregunta: "Masa de Saturno", tipo: "sci", unidad: "kg", respuesta: 5.69e26, tol: 0.03,
                errores: [{ v: 4.65e17, msg: "Has usado r al cuadrado. En la tercera ley la distancia va al cubo." }],
                pistas: ["M = 4π² r³ / (G T²).", "r³ = 1,825 × 10²⁷ y T² = 1,898 × 10¹²."],
                solucion: R`$M = \dfrac{39{,}48 \times 1{,}825 \times 10^{27}}{6{,}674 \times 10^{-11} \times 1{,}898 \times 10^{12}} = \dfrac{7{,}204 \times 10^{28}}{126{,}7} = 5{,}69 \times 10^{26}$ kg, unas 95 veces la masa de la Tierra.` },
              { id: "c", pregunta: "Velocidad orbital de Titán", tipo: "num", unidad: "km/s", respuesta: 5.57, tol: 0.02,
                pistas: ["Recorre una circunferencia de radio r en un periodo: v = 2πr/T."],
                solucion: R`$v = \dfrac{2\pi \times 1{,}222 \times 10^{9}}{1{,}378 \times 10^{6}} = 5{,}57 \times 10^{3}$ m/s.` },
              { id: "d", pregunta: "Velocidad de escape de Saturno desde la órbita de Titán", tipo: "num", unidad: "km/s", respuesta: 7.88, tol: 0.02,
                pistas: ["A una misma distancia, la velocidad de escape es √2 veces la orbital circular."],
                solucion: R`$5{,}57 \times \sqrt{2} = 7{,}88$ km/s. No hace falta volver a usar $G$ ni la masa.` }
            ] },
          { id: "r2", nivel: 2, titulo: "Arturo en el cielo",
            enunciado: R`<p>Arturo tiene $\alpha = 14\ \text{h}\ 16\ \text{min}$ y $\delta = +19{,}2^\circ$. Observas desde latitud $40^\circ$ N.</p>`,
            partes: [
              { id: "a", pregunta: "Altura al culminar", tipo: "num", unidad: "°", respuesta: 69.2, tol: 0.01,
                pistas: ["h = 90° − φ + δ."],
                solucion: R`$90^\circ - 40^\circ + 19{,}2^\circ = 69{,}2^\circ$.` },
              { id: "b", pregunta: "¿Es circumpolar desde esa latitud?", tipo: "opcion", respuesta: 1,
                opciones: ["Sí, porque su declinación es positiva", "No, porque su declinación es menor de 50°", "Sí, porque culmina a más de 50°", "No, porque su ascensión recta es mayor de 12 h"],
                pistas: ["La condición es δ > 90° − φ."],
                solucion: R`No. Haría falta $\delta > 50^\circ$. La ascensión recta no interviene: solo decide cuándo se ve, no cuánto tiempo.` },
              { id: "c", pregunta: "¿En qué época culmina a medianoche?", tipo: "opcion", respuesta: 2,
                opciones: ["Finales de diciembre", "Finales de febrero", "Finales de abril", "Finales de julio"],
                pistas: ["El tiempo sidéreo a medianoche vale 0 h el 22 de septiembre y gana 2 h por mes.", "14 h 16 min son 14,27 h. Divide entre 2 h por mes."],
                solucion: R`$14{,}27/2 = 7{,}1$ meses después del 22 de septiembre: finales de abril. Arturo es la estrella de las noches de primavera.` },
              { id: "d", pregunta: "¿Cuántos minutos antes culminará diez días después?", tipo: "num", unidad: "min", respuesta: 39.4, tol: 0.03,
                pistas: ["El cielo se adelanta 3,94 minutos por día."],
                solucion: R`$10 \times 3{,}94 = 39{,}4$ min.` }
            ] },
          { id: "r3", nivel: 3, titulo: "El cometa de la misión Rosetta",
            enunciado: R`<p>El cometa 67P/Churiumov-Guerasimenko, que la sonda Rosetta acompañó entre 2014 y 2016, tiene $a = 3{,}463$ UA y $e = 0{,}641$. Usa $v = 29{,}78\sqrt{2/r - 1/a}$ km/s con distancias en UA.</p>`,
            partes: [
              { id: "a", pregunta: "Periodo orbital", tipo: "num", unidad: "años", respuesta: 6.44, tol: 0.01,
                pistas: ["T = a^(3/2), que es a por la raíz cuadrada de a."],
                solucion: R`$3{,}463 \times \sqrt{3{,}463} = 3{,}463 \times 1{,}861 = 6{,}44$ años.` },
              { id: "b", pregunta: "Distancia en el perihelio", tipo: "num", unidad: "UA", respuesta: 1.243, tol: 0.01,
                pistas: ["r = a (1 − e)."],
                solucion: R`$3{,}463 \times 0{,}359 = 1{,}243$ UA, entre las órbitas de la Tierra y Marte.` },
              { id: "c", pregunta: "Distancia en el afelio", tipo: "num", unidad: "UA", respuesta: 5.683, tol: 0.01,
                pistas: ["r = a (1 + e)."],
                solucion: R`$3{,}463 \times 1{,}641 = 5{,}683$ UA, algo más allá de Júpiter.` },
              { id: "d", pregunta: "Velocidad en el perihelio", tipo: "num", unidad: "km/s", respuesta: 34.2, tol: 0.01,
                errores: [{ v: 26.7, msg: "Esa es la velocidad de una órbita circular a 1,243 UA. Usa la fórmula completa, con el término 1/a." }],
                pistas: ["2/1,243 − 1/3,463 = 1,320."],
                solucion: R`$29{,}78 \times \sqrt{1{,}6090 - 0{,}2888} = 29{,}78 \times 1{,}149 = 34{,}2$ km/s.` },
              { id: "e", pregunta: "Velocidad en el afelio", tipo: "num", unidad: "km/s", respuesta: 7.48, tol: 0.02,
                pistas: ["Lo más corto es el momento angular: r · v vale lo mismo en los dos extremos."],
                solucion: R`$v_a = 34{,}2 \times \dfrac{1{,}243}{5{,}683} = 7{,}48$ km/s. La ecuación vis-viva con $r = 5{,}683$ da el mismo resultado.` }
            ] }
        ] },

        { id: "ritmo", titulo: "Ajuste de ritmo", html: R`
<h3>Cómo interpretar tu resultado</h3>
<div class="tabla"><table>
<thead><tr><th>Lo que ha pasado</th><th>Qué significa</th><th>Qué hacer</th></tr></thead>
<tbody>
<tr><td>Los tres problemas bien, con pocas consultas</td><td>La mecánica orbital está asentada</td><td>Pasar a la Fase 2</td></tr>
<tr><td>Bien las cuentas, dudas al elegir la fórmula</td><td>Falta ver más problemas distintos</td><td>Repetir los ejercicios de nivel 3 de las lecciones 8, 11 y 12 antes de seguir</td></tr>
<tr><td>Dificultades con las derivadas o las integrales</td><td>El cálculo necesita más práctica</td><td>Dedicar dos semanas más a las lecciones 6 y 7. La Fase 2 las usa a diario</td></tr>
<tr><td>Dificultades con la parte de cielo</td><td>Falta práctica de observación</td><td>Más sesiones con Stellarium y con el planificador de la Lección 13</td></tr>
</tbody></table></div>
<p>Los fallos más habituales en esta fase son cuatro: medir las distancias desde la superficie en lugar de desde el centro del astro, olvidar pasar los kilómetros a metros o los días a segundos, confundir la velocidad orbital con la de escape, y elevar al cuadrado donde va un cubo en la tercera ley.</p>
<p>La Fase 2 cambia de tema. Hasta ahora has usado la luz solo para saber dónde están los astros y cuánto brillan. A partir de ahora vas a estudiar la propia luz: qué es, qué información lleva y cómo la recogen los telescopios y las antenas. Es la parte del curso donde más te va a ayudar tu formación.</p>`,
          notas: [{ id: "balance", label: "Qué te ha costado más, qué lecciones has consultado y cuántas horas reales has dedicado por semana" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Sabes orientarte en el cielo:</strong> coordenadas, culminación, tiempo sidéreo y el ritmo de los planetas.`,
          R`<strong>Sabes pesar astros:</strong> un tamaño de órbita y un periodo bastan para obtener la masa del cuerpo central.`,
          R`<strong>Energía y momento angular</strong> resuelven una órbita sin seguirla paso a paso, y de ellos salen las leyes de Kepler.`,
          R`<strong>Tienes una herramienta de cálculo</strong>, Python con astropy, para comprobar lo que haces a mano.`,
          R`<strong>Lo siguiente es la Fase 2:</strong> ondas, radiación de cuerpo negro, espectros, telescopios e interferometría.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 15 ───────────────────────── */
    {
      id: "leccion-15", n: 15, fase: 2, codigo: "A2.1",
      titulo: "Oscilaciones, ondas y números complejos",
      sub: "El lenguaje común de toda la Fase 2: qué es una onda, cómo se suman dos y por qué los fasores simplifican las cuentas.",
      horas: "6 horas",
      contexto: "Oscilador armónico x = A cos(omega t + phi), omega = 2 pi f = 2 pi / T; onda viajera y = A cos(k x - omega t), k = 2 pi / lambda, v = lambda f; números complejos, módulo y argumento, fórmula de Euler e^(i theta) = cos theta + i sin theta, fasores; superposición de dos ondas iguales desfasadas delta: amplitud 2A cos(delta/2), intensidad I = 4 I0 cos^2(delta/2); desfase por diferencia de camino delta = 2 pi Delta / lambda; la intensidad es proporcional al cuadrado de la amplitud.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Casi todo lo que sabemos del universo llega en forma de ondas. Antes de hablar de luz hace falta precisar qué es una onda y, sobre todo, qué ocurre cuando dos ondas se encuentran.</p>
<p>Una <em>oscilación</em> es algo que se repite en el tiempo en un mismo sitio: un péndulo, la tensión en un circuito. Una <em>onda</em> es una oscilación que además viaja: cada punto del espacio repite el movimiento del anterior con un pequeño retraso.</p>
<p>Lo más importante de las ondas es que se suman. Dos ondas que llegan al mismo punto pueden reforzarse o cancelarse según cómo estén sincronizadas. De esa propiedad sale el funcionamiento de los telescopios, el límite de su nitidez y la interferometría.</p>
<div class="nota"><strong>Este terreno lo conoces.</strong> Portadoras, fase, fasores, la suma coherente de señales en una agrupación de antenas: es la misma matemática. Esta lección la repasa desde el principio y fija la notación. Si los fasores te vuelven a la memoria rápido, puedes ir directo a los ejercicios.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El oscilador armónico</h3>
<p>La oscilación más sencilla es un coseno:</p>
$$x(t) = A\cos(\omega t + \phi)$$
<ul>
<li>$A$ es la <strong>amplitud</strong>: el valor máximo.</li>
<li>$\omega$ es la <strong>frecuencia angular</strong>, en radianes por segundo.</li>
<li>$\phi$ es la <strong>fase inicial</strong>: en qué punto del ciclo empieza.</li>
</ul>
<p>El coseno se repite cada $2\pi$ radianes. El tiempo que tarda en hacerlo es el <strong>periodo</strong> $T$, y su inverso es la <strong>frecuencia</strong> $f$, en hercios:</p>
$$\omega T = 2\pi \;\Rightarrow\; T = \frac{2\pi}{\omega} \qquad f = \frac{1}{T} = \frac{\omega}{2\pi}$$
<p>Derivando dos veces con la regla de la cadena de la Lección 6:</p>
$$v = \frac{dx}{dt} = -A\,\omega\sin(\omega t + \phi) \qquad a = \frac{dv}{dt} = -A\,\omega^{2}\cos(\omega t + \phi) = -\omega^{2}x$$
<p>La aceleración es proporcional a la posición y de signo contrario. Cualquier sistema con una fuerza que tira hacia el equilibrio en proporción al desplazamiento oscila así. Para una masa $m$ en un muelle de constante $k$, la fuerza es $-kx$, luego $ma = -kx$ y $\omega = \sqrt{k/m}$.</p>

<h3>2. La onda viajera</h3>
<p>Una onda que avanza en el sentido positivo de $x$ se escribe:</p>
$$y(x, t) = A\cos(kx - \omega t)$$
<p>Si congelas el tiempo, es un coseno en el espacio que se repite cada <strong>longitud de onda</strong> $\lambda$. Por eso el <strong>número de onda</strong> $k$ cumple $k\lambda = 2\pi$:</p>
$$k = \frac{2\pi}{\lambda}$$
<p>Para hallar la velocidad seguimos una cresta, es decir, un punto de fase constante. Si $kx - \omega t$ no cambia, al derivar respecto al tiempo:</p>
$$k\,\frac{dx}{dt} - \omega = 0 \;\Rightarrow\; v = \frac{dx}{dt} = \frac{\omega}{k} = \frac{2\pi f}{2\pi/\lambda} = \lambda f$$
<p>Es la relación fundamental de cualquier onda: <strong>velocidad igual a longitud de onda por frecuencia</strong>.</p>

<h3>3. Números complejos</h3>
<p>Sumar cosenos con fases distintas usando identidades trigonométricas es engorroso. Los números complejos lo convierten en sumar flechas.</p>
<p>Se define la unidad imaginaria $i$ por $i^{2} = -1$. Un número complejo $z = a + ib$ tiene una parte real $a$ y una parte imaginaria $b$, y se representa como un punto del plano, o como la flecha que va del origen a ese punto. La longitud de la flecha es el <strong>módulo</strong> y su ángulo con el eje real es el <strong>argumento</strong>:</p>
$$|z| = \sqrt{a^{2} + b^{2}} \qquad \theta = \arctan\frac{b}{a}$$
<p>Por trigonometría, $a = |z|\cos\theta$ y $b = |z|\sin\theta$, así que $z = |z|\,(\cos\theta + i\sin\theta)$.</p>

<h3>4. La fórmula de Euler</h3>
$$e^{i\theta} = \cos\theta + i\sin\theta$$
<p>Una forma de convencerse: llamemos $g(\theta) = \cos\theta + i\sin\theta$. Su derivada es</p>
$$g'(\theta) = -\sin\theta + i\cos\theta = i\,(\cos\theta + i\sin\theta) = i\,g(\theta)$$
<p>donde hemos usado que $i \cdot i = -1$. Una función cuya derivada es ella misma multiplicada por una constante, y que vale 1 en el origen, es la exponencial con esa constante: $e^{i\theta}$.</p>
<p>Con esto, todo número complejo se escribe $z = |z|\,e^{i\theta}$, y multiplicar dos complejos es multiplicar los módulos y <em>sumar</em> los ángulos. Multiplicar por $e^{i\theta}$ es girar la flecha un ángulo $\theta$.</p>

<h3>5. Fasores</h3>
<p>Una oscilación es la parte real de una flecha que gira:</p>
$$A\cos(\omega t + \phi) = \text{Re}\left[A\,e^{i\phi}\,e^{i\omega t}\right]$$
<p>El factor $e^{i\omega t}$ es el giro, común a todas las señales de la misma frecuencia. Lo que distingue a una de otra es el <strong>fasor</strong> $A\,e^{i\phi}$, que guarda la amplitud y la fase. Para sumar dos oscilaciones de la misma frecuencia basta sumar sus fasores.</p>

<h3>6. Interferencia de dos ondas</h3>
<p>Sumamos dos ondas de la misma amplitud $A$, una de ellas con un desfase $\delta$. Sus fasores son $A$ y $A\,e^{i\delta}$:</p>
$$A + A\,e^{i\delta} = A\,e^{i\delta/2}\left(e^{-i\delta/2} + e^{i\delta/2}\right)$$
<p>Hemos sacado factor común $e^{i\delta/2}$. Dentro del paréntesis, por la fórmula de Euler, las partes imaginarias se cancelan y las reales se suman:</p>
$$e^{-i\delta/2} + e^{i\delta/2} = 2\cos\frac{\delta}{2}$$
<p>El fasor suma es $2A\cos(\delta/2)\,e^{i\delta/2}$. Su módulo es la amplitud resultante:</p>
$$A_\text{total} = 2A\left|\cos\frac{\delta}{2}\right|$$

<h3>7. Intensidad</h3>
<p>La energía que transporta una onda es proporcional al <em>cuadrado</em> de su amplitud. Lo que mide un detector es esa <strong>intensidad</strong>. Si cada onda por separado tiene intensidad $I_0$:</p>
$$I = 4\,I_0\cos^{2}\frac{\delta}{2}$$
<ul>
<li><strong>En fase</strong>, $\delta = 0$: $I = 4I_0$. Interferencia constructiva.</li>
<li><strong>En oposición</strong>, $\delta = 180^\circ$: $I = 0$. Interferencia destructiva.</li>
</ul>
<p>Dos ondas en fase dan cuatro veces la intensidad de una, no dos. La energía no se crea: en otros puntos la interferencia es destructiva y allí falta la que aquí sobra. La interferencia redistribuye la energía.</p>

<h3>8. De dónde sale el desfase</h3>
<p>Lo habitual es que las dos ondas salgan sincronizadas y una recorra un camino más largo. Cada longitud de onda de camino adicional equivale a un ciclo completo, $2\pi$ radianes. Para una diferencia de camino $\Delta$:</p>
$$\delta = 2\pi\,\frac{\Delta}{\lambda}$$
<p>Hay interferencia constructiva cuando $\Delta$ es un número entero de longitudes de onda, y destructiva cuando es un número entero más media.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La línea de 21 cm y dos antenas</h3>
<p>El hidrógeno neutro de la galaxia emite una onda de radio de frecuencia $f = 1420{,}4$ MHz. Es la señal más importante de la radioastronomía.</p>
<p><strong>Longitud de onda y periodo.</strong> Las ondas electromagnéticas viajan a $c = 2{,}998 \times 10^{8}$ m/s:</p>
$$\lambda = \frac{c}{f} = \frac{2{,}998 \times 10^{8}}{1{,}4204 \times 10^{9}} = 0{,}2111\ \text{m} \qquad T = \frac{1}{f} = 7{,}04 \times 10^{-10}\ \text{s}$$
<p><strong>Dos antenas.</strong> Colocamos dos antenas separadas $d = 100$ m y sumamos sus señales. Una fuente situada justo en la vertical llega a las dos a la vez: $\delta = 0$ e intensidad máxima. Si la fuente se aparta un ángulo pequeño $\theta$ de la vertical, la onda llega antes a una antena que a la otra. La diferencia de camino es:</p>
$$\Delta = d\sin\theta \approx d\,\theta$$
<p>La señal se anula por primera vez cuando esa diferencia vale media longitud de onda:</p>
$$d\,\theta = \frac{\lambda}{2} \;\Rightarrow\; \theta = \frac{\lambda}{2d} = \frac{0{,}2111}{200} = 1{,}056 \times 10^{-3}\ \text{rad}$$
<p>En segundos de arco, con el factor de la Lección 2:</p>
$$\theta = 1{,}056 \times 10^{-3} \times 206\,265 = 218'' = 3{,}6'$$
<p>La pareja de antenas distingue si la fuente se ha movido 3,6 minutos de arco, la octava parte del diámetro de la Luna. Una sola antena de tamaño razonable no podría a esa longitud de onda. Cuanto mayor es la separación medida en longitudes de onda, más fino es el detalle. Esta es la idea de la interferometría, que desarrollaremos al final de la fase.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Frecuencia, longitud de onda y periodo",
            enunciado: R`<p>Usa $c = 2{,}998 \times 10^{8}$ m/s y $\lambda f = c$.</p>`,
            partes: [
              { id: "a", pregunta: "Longitud de onda de una emisora de FM a 100 MHz", tipo: "num", unidad: "m", respuesta: 3.0, tol: 0.01,
                pistas: ["100 MHz son 1,00 × 10⁸ Hz."],
                solucion: R`$\lambda = \dfrac{2{,}998 \times 10^{8}}{1{,}00 \times 10^{8}} = 3{,}00$ m.` },
              { id: "b", pregunta: "Frecuencia de la luz verde de 550 nm", tipo: "sci", unidad: "Hz", respuesta: 5.45e14,
                errores: [{ v: 5.45e5, msg: "Un nanómetro son 10⁻⁹ m. Pasa la longitud de onda a metros antes de dividir." }],
                pistas: ["550 nm = 5,50 × 10⁻⁷ m."],
                solucion: R`$f = \dfrac{2{,}998 \times 10^{8}}{5{,}50 \times 10^{-7}} = 5{,}45 \times 10^{14}$ Hz.` },
              { id: "c", pregunta: "Periodo de esa onda", tipo: "sci", unidad: "s", respuesta: 1.835e-15,
                pistas: ["El periodo es el inverso de la frecuencia."],
                solucion: R`$T = 1/f = 1{,}83 \times 10^{-15}$ s. Ningún detector sigue una oscilación tan rápida: en el visible solo se mide la intensidad, mientras que en radio se registra la onda con su fase.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Números complejos",
            enunciado: R`<p>Representa cada número como una flecha en el plano antes de calcular.</p>`,
            partes: [
              { id: "a", pregunta: "Módulo de 3 + 4i", tipo: "num", respuesta: 5,
                errores: [{ v: 7, msg: "El módulo no es la suma de las partes, sino la hipotenusa del triángulo que forman." }],
                pistas: ["Es el teorema de Pitágoras con catetos 3 y 4."],
                solucion: R`$\sqrt{3^{2} + 4^{2}} = \sqrt{25} = 5$.` },
              { id: "b", pregunta: "Argumento de 1 + i, en grados", tipo: "num", unidad: "°", respuesta: 45,
                pistas: ["Las dos partes son iguales: la flecha va por la diagonal."],
                solucion: R`$\arctan(1/1) = 45^\circ$.` },
              { id: "c", pregunta: "Parte real de e^(iπ)", tipo: "num", respuesta: -1,
                pistas: ["Fórmula de Euler con θ = π radianes, que son 180°."],
                solucion: R`$e^{i\pi} = \cos\pi + i\sin\pi = -1 + 0i$. Es media vuelta: la flecha apunta en sentido contrario.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Interferencia",
            enunciado: R`<p>Dos ondas de la misma frecuencia y la misma intensidad $I_0$ se suman con un desfase $\delta$. Usa $I = 4I_0\cos^{2}(\delta/2)$.</p>`,
            partes: [
              { id: "a", pregunta: "Intensidad con δ = 90°, en unidades de I₀", tipo: "num", unidad: "I₀", respuesta: 2,
                errores: [{ v: 0, msg: "Has puesto el coseno de 90°. En la fórmula aparece la mitad del desfase." }],
                pistas: ["cos 45° = 0,707, y su cuadrado es 0,5."],
                solucion: R`$4\cos^{2}45^\circ = 4 \times 0{,}5 = 2$. Con un cuarto de ciclo de desfase, las intensidades simplemente se suman.` },
              { id: "b", pregunta: "Intensidad con δ = 120°, en unidades de I₀", tipo: "num", unidad: "I₀", respuesta: 1,
                pistas: ["cos 60° = 0,5."],
                solucion: R`$4\cos^{2}60^\circ = 4 \times 0{,}25 = 1$. El resultado es como si solo hubiera una onda.` },
              { id: "c", pregunta: "Desfase que produce una diferencia de camino de media longitud de onda, en grados", tipo: "num", unidad: "°", respuesta: 180,
                pistas: ["Una longitud de onda completa son 360°."],
                solucion: R`$\delta = 360^\circ \times \dfrac{\lambda/2}{\lambda} = 180^\circ$: interferencia destructiva.` },
              { id: "d", pregunta: "Dos antenas iguales emiten en fase. En la dirección en la que sus ondas llegan sincronizadas, la intensidad es 4 veces la de una sola. ¿De dónde sale la energía que sobra?", tipo: "opcion", respuesta: 1,
                opciones: ["Cada antena emite más potencia al tener otra cerca", "De otras direcciones, donde la interferencia es destructiva y la intensidad es menor", "No sobra: la fórmula solo vale para desfases grandes", "De la energía del propio medio en el que viaja la onda"],
                pistas: ["La potencia total emitida es la suma de las dos. Piensa en el diagrama de radiación."],
                solucion: R`De otras direcciones. La potencia total es la de dos antenas, pero se reparte de forma desigual: es la ganancia de una agrupación, y es también lo que hace un telescopio al concentrar la luz en un punto.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Suma de ondas en Python</h3>
<p>Este programa suma dos ondas iguales con un desfase que tú eliges, y dibuja las dos y el resultado.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

desfase = 60                          # en grados
delta = np.radians(desfase)

t = np.linspace(0, 2, 500)            # dos periodos
onda1 = np.cos(2 * np.pi * t)
onda2 = np.cos(2 * np.pi * t + delta)
suma = onda1 + onda2

plt.plot(t, onda1, "--", label="onda 1")
plt.plot(t, onda2, "--", label="onda 2")
plt.plot(t, suma, label="suma")
plt.legend()
plt.show()

print("amplitud medida:", round(suma.max(), 3))
print("amplitud prevista:", round(2 * abs(np.cos(delta / 2)), 3))</pre></div>
<ol>
<li>Ejecútalo con desfases de 0, 60, 90, 120 y 180 grados, y compara la amplitud medida con la prevista.</li>
<li>Calcula a mano la intensidad relativa en cada caso, como el cuadrado de la amplitud, y comprueba los valores de los ejercicios.</li>
<li>Cambia la frecuencia de la segunda onda de <code>2 * np.pi * t</code> a <code>2.2 * np.pi * t</code> y amplía el tiempo a 20 periodos. La suma crece y se anula de forma periódica: es un batido, la misma resta de frecuencias que viste en la Lección 10.</li>
</ol>`,
          notas: [{ id: "ondas", label: "Amplitud medida y prevista para cada desfase, y qué has visto en el batido" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Toda onda cumple $v = \lambda f$.</strong> Para la luz y las ondas de radio, $v = c$.`,
          R`<strong>Fórmula de Euler:</strong> $e^{i\theta} = \cos\theta + i\sin\theta$. Una oscilación es la parte real de una flecha que gira.`,
          R`<strong>Un fasor $A\,e^{i\phi}$</strong> guarda la amplitud y la fase. Sumar ondas de la misma frecuencia es sumar fasores.`,
          R`<strong>Interferencia de dos ondas iguales:</strong> $I = 4I_0\cos^{2}(\delta/2)$, con $\delta = 2\pi\Delta/\lambda$.`,
          R`<strong>La intensidad va con el cuadrado de la amplitud</strong>, y la interferencia redistribuye la energía sin crearla.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 16 ───────────────────────── */
    {
      id: "leccion-16", n: 16, fase: 2, codigo: "A2.2 · B3.1",
      titulo: "La luz: ondas electromagnéticas y fotones",
      sub: "Del radio a los rayos gamma, una sola cosa. Qué energía lleva y qué parte atraviesa la atmósfera.",
      horas: "5 horas",
      contexto: "Ondas electromagnéticas, c = 1/raíz(mu0 epsilon0) = 2,998e8 m/s; espectro electromagnético (radio, microondas, infrarrojo, visible 380-750 nm, ultravioleta, rayos X, gamma); fotón E = h f = h c / lambda, h = 6,626e-34 J s, 1 eV = 1,602e-19 J, h c = 1240 eV nm; flujo F = L / 4 pi d^2, constante solar 1361 W/m^2; ventanas atmosféricas óptica y de radio; unidad jansky 1 Jy = 1e-26 W m^-2 Hz^-1; potencia recogida P = S A B; ruido térmico k T B con k = 1,381e-23 J/K.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">La luz visible, las ondas de radio y los rayos X son el mismo fenómeno. Solo cambia la frecuencia. Lo que aprendiste sobre propagación de señales de radio vale tal cual para la luz de una estrella.</p>
<p>La diferencia práctica entre unas bandas y otras está en cómo se detectan. A frecuencias bajas la onda es lenta y se puede registrar con su fase, como hace cualquier receptor. A frecuencias altas eso es imposible, y además la energía llega en paquetes sueltos, los <em>fotones</em>, que se cuentan uno a uno.</p>
<div class="nota"><strong>Onda y fotón no compiten.</strong> La luz se propaga e interfiere como una onda, y entrega su energía en cantidades discretas, como partículas. Las dos descripciones son correctas y están comprobadas. Se usa la que conviene: en radio casi siempre la onda, en rayos X casi siempre el fotón, y en el visible las dos.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Qué es una onda electromagnética</h3>
<p>Las ecuaciones de Maxwell dicen dos cosas que aquí importan: un campo magnético que cambia en el tiempo crea un campo eléctrico, y un campo eléctrico que cambia crea uno magnético. Los dos campos se sostienen mutuamente y la perturbación se propaga sola, sin necesidad de un medio.</p>
<p>La velocidad de propagación sale de dos constantes medidas en el laboratorio con condensadores y bobinas, la permitividad $\varepsilon_0 = 8{,}854 \times 10^{-12}$ F/m y la permeabilidad $\mu_0 = 1{,}2566 \times 10^{-6}$ H/m:</p>
$$c = \frac{1}{\sqrt{\mu_0\,\varepsilon_0}} = \frac{1}{\sqrt{1{,}1126 \times 10^{-17}}} = 2{,}998 \times 10^{8}\ \text{m/s}$$
<p>Cuando Maxwell obtuvo este número en 1865 coincidía con la velocidad medida de la luz. Así se supo que la luz es una onda electromagnética.</p>
<p>Los campos eléctrico y magnético oscilan perpendiculares entre sí y a la dirección de avance. La dirección en la que oscila el campo eléctrico es la <em>polarización</em>.</p>

<h3>2. El espectro electromagnético</h3>
<div class="tabla"><table>
<thead><tr><th>Banda</th><th>Longitud de onda</th><th>Qué se observa</th></tr></thead>
<tbody>
<tr><td>Radio</td><td>más de 1 mm</td><td>Hidrógeno neutro, púlsares, galaxias activas</td></tr>
<tr><td>Infrarrojo</td><td>de 750 nm a 1 mm</td><td>Polvo, estrellas frías, galaxias lejanas</td></tr>
<tr><td>Visible</td><td>de 380 a 750 nm</td><td>Estrellas, nebulosas, galaxias</td></tr>
<tr><td>Ultravioleta</td><td>de 10 a 380 nm</td><td>Estrellas calientes, gas caliente</td></tr>
<tr><td>Rayos X</td><td>de 0,01 a 10 nm</td><td>Gas a millones de grados, agujeros negros</td></tr>
<tr><td>Rayos gamma</td><td>menos de 0,01 nm</td><td>Explosiones, procesos nucleares</td></tr>
</tbody></table></div>
<p>Los límites son convenios. El visible ocupa menos de una octava en un espectro que abarca más de cuarenta.</p>

<h3>3. El fotón</h3>
<p>La energía de la luz de frecuencia $f$ se intercambia en paquetes de valor:</p>
$$E = h\,f = \frac{h\,c}{\lambda} \qquad h = 6{,}626 \times 10^{-34}\ \text{J}\cdot\text{s}$$
<p>$h$ es la <em>constante de Planck</em>. Las energías de un fotón son minúsculas en julios, así que se usa el <em>electronvoltio</em>, la energía que gana un electrón al atravesar un voltio:</p>
$$1\ \text{eV} = 1{,}602 \times 10^{-19}\ \text{J}$$
<p>Con la longitud de onda en nanómetros hay un atajo que conviene memorizar:</p>
$$h\,c = \frac{6{,}626 \times 10^{-34} \times 2{,}998 \times 10^{8}}{1{,}602 \times 10^{-19}} = 1{,}240 \times 10^{-6}\ \text{eV}\cdot\text{m} = 1240\ \text{eV}\cdot\text{nm}$$
$$E\,[\text{eV}] = \frac{1240}{\lambda\,[\text{nm}]}$$

<h3>4. Flujo y luminosidad</h3>
<p>De la Lección 3: una fuente de luminosidad $L$ reparte su potencia sobre una esfera, y a distancia $d$ el flujo es $F = L/4\pi d^{2}$, en vatios por metro cuadrado. Para el Sol visto desde la Tierra:</p>
$$F = \frac{3{,}828 \times 10^{26}}{4\pi\,(1{,}496 \times 10^{11})^{2}} = \frac{3{,}828 \times 10^{26}}{2{,}812 \times 10^{23}} = 1361\ \text{W/m}^2$$
<p>Es la <em>constante solar</em>. Si toda esa luz fuera de una sola longitud de onda, el número de fotones por segundo y metro cuadrado sería el flujo dividido entre la energía de cada fotón.</p>

<h3>5. Las ventanas de la atmósfera</h3>
<p>La atmósfera es opaca a casi todo el espectro. Solo deja pasar dos bandas anchas:</p>
<ul>
<li><strong>La ventana óptica</strong>, del ultravioleta cercano al infrarrojo cercano, con algunas franjas más en el infrarrojo.</li>
<li><strong>La ventana de radio</strong>, entre unos milímetros y unos 20 metros de longitud de onda. Por el lado corto absorbe el vapor de agua, y por el largo refleja la ionosfera.</li>
</ul>
<p>El ozono bloquea el ultravioleta, y los rayos X y gamma no pasan de las capas altas. Por eso esas bandas se observan desde el espacio, y los radiotelescopios milimétricos se instalan en desiertos de gran altitud.</p>

<h3>6. Cómo se mide en radio</h3>
<p>En radio no se mide el flujo total, sino el flujo por unidad de ancho de banda, la <em>densidad de flujo</em> $S$. Su unidad es el <strong>jansky</strong>:</p>
$$1\ \text{Jy} = 10^{-26}\ \frac{\text{W}}{\text{m}^2\,\text{Hz}}$$
<p>La potencia que entrega una antena de área $A$ que observa con un ancho de banda $B$ es:</p>
$$P = S\,A\,B$$
<p>Esa potencia compite con el ruido térmico del receptor, que conoces bien: $P_\text{ruido} = k\,T\,B$, con $k = 1{,}381 \times 10^{-23}$ J/K la constante de Boltzmann y $T$ la temperatura de ruido del sistema.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Un fotón verde frente a un fotón de 21 cm</h3>
<p><strong>Luz verde, $\lambda = 550$ nm:</strong></p>
$$E = \frac{1240}{550} = 2{,}25\ \text{eV} = 2{,}25 \times 1{,}602 \times 10^{-19} = 3{,}61 \times 10^{-19}\ \text{J}$$
<p><strong>Línea del hidrógeno, $f = 1420{,}4$ MHz:</strong></p>
$$E = h\,f = 6{,}626 \times 10^{-34} \times 1{,}4204 \times 10^{9} = 9{,}41 \times 10^{-25}\ \text{J} = 5{,}87 \times 10^{-6}\ \text{eV}$$
<p><strong>Cociente:</strong></p>
$$\frac{2{,}25}{5{,}87 \times 10^{-6}} = 3{,}8 \times 10^{5}$$
<p>Un fotón visible lleva casi 400 000 veces más energía que uno de radio. Las consecuencias son prácticas. Un fotón visible tiene energía suficiente para liberar un electrón en un detector de silicio, y por eso una cámara cuenta fotones. Un fotón de radio no puede, pero llegan tantísimos a la vez que se comportan como una onda continua, y el receptor mide el campo eléctrico con su fase.</p>
<h3>Cuántos fotones manda el Sol</h3>
<p>Suponiendo que toda su luz fuera verde:</p>
$$\frac{1361\ \text{W/m}^2}{3{,}61 \times 10^{-19}\ \text{J}} = 3{,}8 \times 10^{21}\ \text{fotones por segundo y metro cuadrado}$$
<p>Es una aproximación, porque el Sol emite en muchas longitudes de onda, pero el orden de magnitud es correcto.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Longitudes de onda y energías",
            enunciado: R`<p>Usa $c = 2{,}998 \times 10^{8}$ m/s y $E\,[\text{eV}] = 1240/\lambda\,[\text{nm}]$.</p>`,
            partes: [
              { id: "a", pregunta: "Longitud de onda de una red wifi a 2,4 GHz, en centímetros", tipo: "num", unidad: "cm", respuesta: 12.5, tol: 0.01,
                errores: [{ v: 0.125, msg: "Ese valor está en metros. Se pide en centímetros." }],
                pistas: ["2,4 GHz son 2,4 × 10⁹ Hz."],
                solucion: R`$\lambda = \dfrac{2{,}998 \times 10^{8}}{2{,}4 \times 10^{9}} = 0{,}125$ m $= 12{,}5$ cm.` },
              { id: "b", pregunta: "Energía de un fotón de 500 nm", tipo: "num", unidad: "eV", respuesta: 2.48, tol: 0.01,
                pistas: ["Divide 1240 entre la longitud de onda en nanómetros."],
                solucion: R`$1240/500 = 2{,}48$ eV.` },
              { id: "c", pregunta: "¿Qué bandas se pueden observar desde el suelo?", tipo: "opcion", respuesta: 2,
                opciones: ["Todas, con el instrumento adecuado", "Solo la visible", "La visible y la de radio, con algunas franjas del infrarrojo", "La visible y los rayos X"],
                pistas: ["Repasa las ventanas de la atmósfera."],
                solucion: R`La visible, la de radio y algunas franjas infrarrojas. El resto exige subir instrumentos al espacio.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Flujo y fotones",
            enunciado: R`<p>La constante solar a 1 UA es 1361 W/m². Un fotón de 550 nm tiene $3{,}61 \times 10^{-19}$ J.</p>`,
            partes: [
              { id: "a", pregunta: "Flujo solar a la distancia de Marte, 1,524 UA", tipo: "num", unidad: "W/m²", respuesta: 586, tol: 0.01,
                errores: [{ v: 893, msg: "Has dividido entre la distancia. El flujo cae con el cuadrado de la distancia." }],
                pistas: ["El flujo va como 1/d². No hace falta volver a la luminosidad."],
                solucion: R`$\dfrac{1361}{1{,}524^{2}} = \dfrac{1361}{2{,}323} = 586$ W/m². Los paneles solares en Marte rinden menos de la mitad.` },
              { id: "b", pregunta: "Fotones por segundo y metro cuadrado en la Tierra, si toda la luz fuera de 550 nm", tipo: "sci", respuesta: 3.77e21, tol: 0.03,
                pistas: ["Divide la potencia por metro cuadrado entre la energía de un fotón."],
                solucion: R`$\dfrac{1361}{3{,}61 \times 10^{-19}} = 3{,}77 \times 10^{21}$.` },
              { id: "c", pregunta: "Longitud de onda de un fotón de rayos X de 1 keV, en nanómetros", tipo: "num", unidad: "nm", respuesta: 1.24, tol: 0.01,
                errores: [{ v: 1240, msg: "1 keV son 1000 eV." }],
                pistas: ["Despeja la longitud de onda: λ = 1240 / E, con E en eV."],
                solucion: R`$\lambda = 1240/1000 = 1{,}24$ nm, del tamaño de unos pocos átomos.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Un radiotelescopio de 100 metros",
            enunciado: R`<p>Una antena de 100 m de diámetro observa una fuente de 1 Jy con un ancho de banda de 100 MHz. Su receptor tiene una temperatura de ruido de 20 K. Supón que aprovecha toda su área. Datos: $1\ \text{Jy} = 10^{-26}\ \text{W}\,\text{m}^{-2}\,\text{Hz}^{-1}$ y $k = 1{,}381 \times 10^{-23}$ J/K.</p>`,
            partes: [
              { id: "a", pregunta: "Área de la antena", tipo: "num", unidad: "m²", respuesta: 7854, tol: 0.01,
                errores: [{ v: 31416, msg: "Has usado el diámetro como radio. El radio es 50 m." }],
                pistas: ["Es un círculo de 50 m de radio."],
                solucion: R`$\pi \times 50^{2} = 7854\ \text{m}^2$.` },
              { id: "b", pregunta: "Potencia recogida de la fuente", tipo: "sci", unidad: "W", respuesta: 7.85e-15,
                pistas: ["P = S · A · B, con todo en el SI."],
                solucion: R`$10^{-26} \times 7854 \times 10^{8} = 7{,}85 \times 10^{-15}$ W.` },
              { id: "c", pregunta: "Esa potencia en dBm", tipo: "num", unidad: "dBm", respuesta: -111, tol: 0.01,
                errores: [{ v: -141, msg: "Eso son dBW. Los dBm se refieren a un milivatio: suma 30." }],
                pistas: ["Pasa a milivatios y calcula 10 log."],
                solucion: R`$7{,}85 \times 10^{-12}$ mW. $10\log(7{,}85 \times 10^{-12}) = -111$ dBm.` },
              { id: "d", pregunta: "Potencia de ruido del receptor en ese ancho de banda", tipo: "sci", unidad: "W", respuesta: 2.76e-14,
                pistas: ["P = k · T · B."],
                solucion: R`$1{,}381 \times 10^{-23} \times 20 \times 10^{8} = 2{,}76 \times 10^{-14}$ W. La señal es 3,5 veces más débil que el ruido, y aun así 1 Jy es una fuente intensa. En radioastronomía la señal casi siempre está por debajo del ruido, y se recupera promediando durante mucho tiempo.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Un espectroscopio con un CD</h3>
<p>Los surcos de un CD o un DVD están tan juntos que separan la luz en colores, igual que una red de difracción. Sirve para ver que no todas las luces son iguales, aunque a simple vista parezcan del mismo color.</p>
<ol>
<li>En una habitación a oscuras, sujeta el disco cerca del ojo e inclínalo hasta ver el reflejo de una lámpara desplegado en colores.</li>
<li>Mira una bombilla LED blanca. Verás una banda continua de colores, a menudo con el azul separado del resto.</li>
<li>Mira un tubo fluorescente o una bombilla de bajo consumo. En lugar de una banda continua aparecen franjas de colores separadas.</li>
<li>Mira una farola de luz anaranjada, si queda alguna cerca. Casi toda su luz está en una sola franja amarilla.</li>
</ol>
<p><strong>No mires nunca el Sol</strong>, ni directamente ni reflejado en el disco.</p>
<p>La diferencia entre una banda continua y unas franjas sueltas es el tema de las dos lecciones siguientes.</p>`,
          notas: [{ id: "cd", label: "Qué has visto con cada tipo de lámpara" }],
          tareasTitulo: "Lista de la práctica",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Ver el espectro de una bombilla LED con un CD." },
            { id: "t2", texto: "Ver el espectro de un fluorescente y contar las franjas." },
            { id: "t3", texto: "Comparar una luz cálida y una fría: qué colores sobran o faltan." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La luz es una onda electromagnética</strong> que viaja a $c = 1/\sqrt{\mu_0\varepsilon_0}$. Radio, visible y rayos X solo se diferencian en la frecuencia.`,
          R`<strong>La energía llega en fotones:</strong> $E = hf = hc/\lambda$. Atajo: $E\,[\text{eV}] = 1240/\lambda\,[\text{nm}]$.`,
          R`<strong>El flujo cae con el cuadrado de la distancia.</strong> A 1 UA del Sol vale 1361 W/m².`,
          R`<strong>La atmósfera solo tiene dos ventanas anchas:</strong> la óptica y la de radio.`,
          R`<strong>En radio se mide en janskys</strong>, $10^{-26}$ W m⁻² Hz⁻¹, y la señal suele quedar por debajo del ruido $kTB$.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 17 ───────────────────────── */
    {
      id: "leccion-17", n: 17, fase: 2, codigo: "B3.2",
      titulo: "El cuerpo negro: la luz de lo caliente",
      sub: "Por qué el color de una estrella dice su temperatura, y cómo se obtiene su tamaño sin verla como un disco.",
      horas: "6 horas",
      contexto: "Cuerpo negro; ley de Planck B_lambda = (2 h c^2 / lambda^5) / (e^(h c / lambda k T) - 1); ley de Wien lambda_max T = 2,898e-3 m K; ley de Stefan-Boltzmann F = sigma T^4 con sigma = 5,670e-8 W m^-2 K^-4; luminosidad L = 4 pi R^2 sigma T^4 y en unidades solares L = R^2 (T/5772)^4; límite de Rayleigh-Jeans B_nu = 2 k T f^2 / c^2 y temperatura de brillo; temperatura de equilibrio de un planeta T = [(1 - A) F / (4 sigma)]^(1/4), Tierra 255 K frente a 288 K reales por el efecto invernadero.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Todo cuerpo caliente emite luz por el hecho de estar caliente. La cantidad y el color de esa luz dependen de una sola cosa: su temperatura.</p>
<p>Un trozo de hierro en la fragua pasa de no brillar a rojo oscuro, después a naranja y a blanco amarillento. No cambia de material, solo de temperatura. Con las estrellas ocurre lo mismo: las rojizas, como Betelgeuse, son frías, y las blanco azuladas, como Rigel, son muy calientes. Las dos están en Orión y la diferencia se aprecia a simple vista.</p>
<div class="nota"><strong>Ya has trabajado con un cuerpo negro.</strong> El ruido térmico de una resistencia, $kTB$, es radiación de cuerpo negro en la banda de radio. La temperatura de ruido de una antena es literalmente la temperatura del cuerpo negro que produciría esa misma potencia. En esta lección verás que esa expresión es el límite de baja frecuencia de una ley más general.</div>
<p>Mueve la temperatura y observa dos cosas: hacia dónde se desplaza el máximo y cuánto crece la emisión total.</p>
<div data-widget="planck"></div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Qué es un cuerpo negro</h3>
<p>Un <em>cuerpo negro</em> es un objeto ideal que absorbe toda la luz que le llega. No refleja nada, y por eso la luz que emite depende solo de su temperatura y no del material. El nombre confunde: un cuerpo negro caliente brilla, y mucho.</p>
<p>Una estrella se parece bastante a uno. Su gas es tan opaco que la luz se absorbe y se reemite innumerables veces antes de salir, y lo que escapa refleja la temperatura de la capa superficial.</p>

<h3>2. La ley de Planck</h3>
<p>La potencia emitida por unidad de superficie, de ángulo sólido y de longitud de onda es:</p>
$$B_\lambda(T) = \frac{2\,h\,c^{2}}{\lambda^{5}}\;\frac{1}{e^{hc/\lambda kT} - 1}$$
<p>No la vamos a deducir: hace falta la física estadística de la Fase 3. Sí conviene leerla. El exponente $hc/\lambda kT$ compara la energía de un fotón, $hc/\lambda$, con la energía térmica típica, $kT$.</p>
<ul>
<li><strong>A longitudes de onda cortas</strong>, los fotones son caros frente a $kT$. La exponencial es enorme y la emisión se hunde.</li>
<li><strong>A longitudes de onda largas</strong>, los fotones son baratos, pero el factor $1/\lambda^{5}$ hace caer la curva.</li>
</ul>
<p>Entre los dos extremos hay un máximo. Planck obtuvo esta fórmula en 1900 suponiendo que la energía se intercambia en paquetes $hf$. Fue el comienzo de la física cuántica.</p>

<h3>3. La ley de Wien</h3>
<p>El máximo se encuentra derivando $B_\lambda$ respecto a $\lambda$ e igualando a cero, como en la Lección 6. La ecuación resultante no se resuelve a mano, pero su solución numérica es $hc/\lambda kT = 4{,}965$. Despejando:</p>
$$\lambda_\text{máx}\,T = \frac{h\,c}{4{,}965\,k} = \frac{1{,}9865 \times 10^{-25}}{4{,}965 \times 1{,}381 \times 10^{-23}} = 2{,}898 \times 10^{-3}\ \text{m}\cdot\text{K}$$
<p>Cuanto más caliente es el cuerpo, más corta es la longitud de onda del máximo. Con $\lambda$ en nanómetros, la constante vale $2{,}898 \times 10^{6}$ nm·K.</p>

<h3>4. La ley de Stefan-Boltzmann</h3>
<p>Integrando la ley de Planck sobre todas las longitudes de onda y todas las direcciones, se obtiene la potencia total que emite cada metro cuadrado de superficie:</p>
$$F = \sigma\,T^{4} \qquad \sigma = 5{,}670 \times 10^{-8}\ \frac{\text{W}}{\text{m}^2\,\text{K}^4}$$
<p>La dependencia es muy fuerte. Duplicar la temperatura multiplica la emisión por $2^{4} = 16$.</p>

<h3>5. La luminosidad de una estrella</h3>
<p>Una estrella de radio $R$ tiene una superficie $4\pi R^{2}$, y cada metro cuadrado emite $\sigma T^{4}$:</p>
$$L = 4\pi R^{2}\,\sigma\,T^{4}$$
<p>Dividiendo esta expresión entre la misma escrita para el Sol, las constantes se cancelan:</p>
$$\frac{L}{L_\odot} = \left(\frac{R}{R_\odot}\right)^{2}\left(\frac{T}{T_\odot}\right)^{4} \qquad T_\odot = 5772\ \text{K}$$
<p>Esta relación une tres magnitudes. La temperatura sale del color o del espectro. La luminosidad sale del brillo aparente y la distancia, con las herramientas de la Fase 0. Con las dos se obtiene el radio de una estrella que en el telescopio es solo un punto.</p>

<h3>6. El límite de radio: Rayleigh-Jeans</h3>
<p>La ley de Planck también se puede escribir por unidad de frecuencia:</p>
$$B_\nu(T) = \frac{2\,h\,f^{3}}{c^{2}}\;\frac{1}{e^{hf/kT} - 1}$$
<p>En radio, los fotones son tan poco energéticos que $hf \ll kT$. Para un exponente pequeño $x$, la aproximación lineal de la Lección 6 da $e^{x} \approx 1 + x$, así que $e^{x} - 1 \approx x = hf/kT$. Sustituyendo:</p>
$$B_\nu \approx \frac{2\,h\,f^{3}}{c^{2}} \cdot \frac{kT}{hf} = \frac{2\,k\,T\,f^{2}}{c^{2}} = \frac{2\,k\,T}{\lambda^{2}}$$
<p>La constante de Planck se cancela y el brillo queda <em>proporcional a la temperatura</em>. Por eso en radioastronomía el brillo se expresa directamente en kelvin, como <em>temperatura de brillo</em>, y por eso el ruido de un receptor se da como temperatura.</p>

<h3>7. La temperatura de un planeta</h3>
<p>Un planeta de radio $R$ intercepta la luz de su estrella con su sección, un disco de área $\pi R^{2}$, y refleja una fracción $A$, su <em>albedo</em>. Si el flujo que le llega es $F$, absorbe:</p>
$$P_\text{abs} = (1 - A)\,F\,\pi R^{2}$$
<p>Y emite como cuerpo negro por toda su superficie, $4\pi R^{2}$:</p>
$$P_\text{em} = 4\pi R^{2}\,\sigma\,T^{4}$$
<p>En equilibrio las dos potencias son iguales. El radio se cancela:</p>
$$T = \left[\frac{(1 - A)\,F}{4\,\sigma}\right]^{1/4}$$
<p>Para la Tierra, con $A = 0{,}30$ y $F = 1361\ \text{W/m}^2$:</p>
$$T = \left[\frac{0{,}70 \times 1361}{4 \times 5{,}670 \times 10^{-8}}\right]^{1/4} = \left(4{,}20 \times 10^{9}\right)^{1/4} = 255\ \text{K}$$
<p>Son $-18\ ^\circ\text{C}$. La temperatura media real de la superficie es de unos 288 K, $+15\ ^\circ\text{C}$. Los 33 grados de diferencia son el efecto invernadero natural: la atmósfera deja pasar la luz visible del Sol y absorbe parte del infrarrojo que emite el suelo. Es física bien establecida, y la misma cuenta se usa para estimar si un exoplaneta puede tener agua líquida.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El Sol como cuerpo negro</h3>
<p>La temperatura efectiva de la superficie del Sol es $T = 5772$ K y su radio $R = 6{,}957 \times 10^{8}$ m.</p>
<p><strong>Máximo de emisión</strong>, con la ley de Wien:</p>
$$\lambda_\text{máx} = \frac{2{,}898 \times 10^{-3}}{5772} = 5{,}02 \times 10^{-7}\ \text{m} = 502\ \text{nm}$$
<p>Cae en el verde azulado, en mitad del visible. No es casualidad que nuestros ojos sean sensibles justo a esa banda. El Sol se ve blanco y no verde porque emite con intensidad parecida en todos los colores visibles.</p>
<p><strong>Potencia por metro cuadrado de superficie.</strong> Primero la cuarta potencia, en dos pasos:</p>
$$5772^{2} = 3{,}332 \times 10^{7} \qquad (3{,}332 \times 10^{7})^{2} = 1{,}110 \times 10^{15}$$
$$F = \sigma T^{4} = 5{,}670 \times 10^{-8} \times 1{,}110 \times 10^{15} = 6{,}29 \times 10^{7}\ \text{W/m}^2$$
<p>Cada metro cuadrado de la superficie solar emite 63 megavatios.</p>
<p><strong>Luminosidad:</strong></p>
$$L = 4\pi R^{2} F = 4\pi\,(6{,}957 \times 10^{8})^{2} \times 6{,}29 \times 10^{7} = 6{,}082 \times 10^{18} \times 6{,}29 \times 10^{7} = 3{,}83 \times 10^{26}\ \text{W}$$
<p>Coincide con el valor de $L_\odot$ que usamos desde la Lección 3. En la práctica el camino es el inverso: se miden la luminosidad y el radio, y de ahí se define la temperatura efectiva.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "La ley de Wien",
            enunciado: R`<p>Usa $\lambda_\text{máx}\,T = 2{,}898 \times 10^{6}$ nm·K.</p>`,
            partes: [
              { id: "a", pregunta: "Máximo de emisión de Betelgeuse, T = 3600 K", tipo: "num", unidad: "nm", respuesta: 805, tol: 0.01,
                pistas: ["Divide la constante entre la temperatura."],
                solucion: R`$2{,}898 \times 10^{6}/3600 = 805$ nm. Está en el infrarrojo. Del visible solo vemos la cola, más intensa en el rojo: por eso se ve anaranjada.` },
              { id: "b", pregunta: "Máximo de emisión de Sirio, T = 9940 K", tipo: "num", unidad: "nm", respuesta: 292, tol: 0.01,
                pistas: ["Es la misma división."],
                solucion: R`$2{,}898 \times 10^{6}/9940 = 292$ nm, en el ultravioleta. En el visible domina el extremo azul.` },
              { id: "c", pregunta: "Máximo de emisión del cuerpo humano, T = 310 K, en micrómetros", tipo: "num", unidad: "µm", respuesta: 9.35, tol: 0.01,
                errores: [{ v: 9348, msg: "Ese valor está en nanómetros. Un micrómetro son 1000 nm." }],
                pistas: ["Calcula en nanómetros y divide entre 1000."],
                solucion: R`$2{,}898 \times 10^{6}/310 = 9348$ nm $= 9{,}35$ µm. Es la banda en la que trabajan las cámaras térmicas.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Luminosidad, radio y temperatura",
            enunciado: R`<p>Usa $F = \sigma T^{4}$ con $\sigma = 5{,}670 \times 10^{-8}$ en el SI, y $L/L_\odot = (R/R_\odot)^{2}(T/T_\odot)^{4}$ con $T_\odot = 5772$ K.</p>`,
            partes: [
              { id: "a", pregunta: "Potencia que emite cada metro cuadrado de una estrella a 3000 K", tipo: "sci", unidad: "W/m²", respuesta: 4.59e6,
                pistas: ["3000⁴ = 8,1 × 10¹³."],
                solucion: R`$5{,}670 \times 10^{-8} \times 8{,}1 \times 10^{13} = 4{,}59 \times 10^{6}\ \text{W/m}^2$, catorce veces menos que el Sol.` },
              { id: "b", pregunta: "Luminosidad de una estrella con el doble de radio y el doble de temperatura que el Sol, en luminosidades solares", tipo: "num", unidad: "L☉", respuesta: 64,
                errores: [{ v: 16, msg: "Falta el factor del radio. La superficie crece con el cuadrado del radio." }, { v: 8, msg: "La temperatura va elevada a la cuarta, no al cuadrado." }],
                pistas: ["El radio entra al cuadrado y la temperatura a la cuarta."],
                solucion: R`$2^{2} \times 2^{4} = 4 \times 16 = 64$.` },
              { id: "c", pregunta: "Betelgeuse tiene T = 3600 K. Tomando L = 100 000 L☉, ¿cuál es su radio en radios solares?", tipo: "num", unidad: "R☉", respuesta: 813, tol: 0.03,
                pistas: ["Despeja: R/R☉ = √(L/L☉) / (T/T☉)².", "T/T☉ = 0,6237, y su cuadrado es 0,389."],
                solucion: R`$\dfrac{R}{R_\odot} = \dfrac{\sqrt{10^{5}}}{0{,}389} = \dfrac{316}{0{,}389} = 813$. Son 3,8 UA: puesta en el lugar del Sol, llegaría más allá de la órbita de Marte. Su luminosidad y su distancia no se conocen con precisión, así que el radio tiene una incertidumbre del orden del 20 %.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Planetas, el universo y el límite de radio",
            enunciado: R`<p>Usa $T = \left[(1 - A)\,F/4\sigma\right]^{1/4}$ y la ley de Wien.</p>`,
            partes: [
              { id: "a", pregunta: "Temperatura de equilibrio de Marte: albedo 0,25 y flujo solar 586 W/m²", tipo: "num", unidad: "K", respuesta: 210, tol: 0.01,
                pistas: ["El corchete vale 0,75 × 586 / (4 × 5,670 × 10⁻⁸) = 1,938 × 10⁹.", "La raíz cuarta es la raíz cuadrada de la raíz cuadrada."],
                solucion: R`$\left(1{,}938 \times 10^{9}\right)^{1/4} = \sqrt{44\,020} = 210$ K, unos $-63\ ^\circ\text{C}$. Coincide con la temperatura media real, porque la atmósfera de Marte es muy tenue y apenas retiene calor.` },
              { id: "b", pregunta: "El fondo cósmico de microondas es un cuerpo negro a 2,725 K. ¿Dónde está su máximo, en milímetros?", tipo: "num", unidad: "mm", respuesta: 1.06, tol: 0.01,
                pistas: ["Usa la constante en metros, 2,898 × 10⁻³ m·K, y pasa a milímetros."],
                solucion: R`$\dfrac{2{,}898 \times 10^{-3}}{2{,}725} = 1{,}06 \times 10^{-3}$ m $= 1{,}06$ mm. Es el cuerpo negro más perfecto que se ha medido.` },
              { id: "c", pregunta: "Una nube de gas se observa en radio, en el régimen de Rayleigh-Jeans. Si su temperatura se duplica, su brillo a una frecuencia dada:", tipo: "opcion", respuesta: 1,
                opciones: ["No cambia", "Se duplica", "Se multiplica por 16", "Se desplaza de frecuencia sin cambiar de valor"],
                pistas: ["Mira la fórmula del límite de radio: ¿cómo depende de T?"],
                solucion: R`Se duplica: $B_\nu = 2kTf^{2}/c^{2}$ es lineal en $T$. El factor 16 corresponde a la emisión total, sumada a todas las frecuencias.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Las curvas de Planck en Python</h3>
<p>Este programa dibuja la ley de Planck para tres temperaturas y busca numéricamente el máximo de cada curva.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

h = 6.626e-34
c = 2.998e8
k = 1.381e-23

def planck(lam, T):
    return 2 * h * c**2 / lam**5 / (np.exp(h * c / (lam * k * T)) - 1)

lam = np.linspace(100e-9, 3000e-9, 2000)     # de 100 a 3000 nm

for T in [4000, 5772, 8000]:
    B = planck(lam, T)
    plt.plot(lam * 1e9, B, label=str(T) + " K")
    print(T, "K: máximo en", round(lam[B.argmax()] * 1e9), "nm")

plt.xlabel("longitud de onda (nm)")
plt.legend()
plt.show()</pre></div>
<ol>
<li>Ejecútalo. Los máximos deberían salir en 724, 502 y 363 nm. Comprueba con la ley de Wien que coinciden.</li>
<li>Fíjate en la altura de las curvas. La de 8000 K no es el doble de alta que la de 4000 K, sino mucho más.</li>
<li>Añade una curva a 3000 K, la de una bombilla de filamento, y observa cuánta de su emisión cae fuera del visible. Por eso eran tan poco eficientes.</li>
</ol>
<h3>Colores de estrellas a simple vista</h3>
<p>En una noche despejada, compara el color de dos estrellas brillantes de temperatura distinta. En invierno, Betelgeuse y Rigel, las dos en Orión. En verano, Antares y Vega. Desenfocar un poco la vista ayuda a apreciar el color.</p>`,
          notas: [{ id: "planck", label: "Máximos obtenidos, y qué estrellas has comparado y de qué color las has visto" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Un cuerpo negro emite según su temperatura y nada más.</strong> Las estrellas se parecen bastante a uno.`,
          R`<strong>Ley de Wien:</strong> $\lambda_\text{máx}\,T = 2{,}898 \times 10^{-3}$ m·K. Más caliente significa más azul.`,
          R`<strong>Ley de Stefan-Boltzmann:</strong> cada metro cuadrado emite $\sigma T^{4}$, y una estrella entera $L = 4\pi R^{2}\sigma T^{4}$.`,
          R`<strong>En radio</strong>, el brillo es proporcional a la temperatura: $B_\nu = 2kT/\lambda^{2}$. De ahí la temperatura de brillo.`,
          R`<strong>Temperatura de equilibrio de un planeta:</strong> $T = [(1-A)F/4\sigma]^{1/4}$. Para la Tierra da 255 K, y el efecto invernadero la sube a 288 K.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 18 ───────────────────────── */
    {
      id: "leccion-18", n: 18, fase: 2, codigo: "B3.3",
      titulo: "Espectros y efecto Doppler",
      sub: "Cómo se sabe de qué está hecha una estrella y a qué velocidad se mueve sin salir de casa.",
      horas: "6 horas",
      contexto: "Leyes de Kirchhoff (espectro continuo, de emisión y de absorción); niveles del hidrógeno E_n = -13,6 eV / n^2; fórmula de Rydberg 1/lambda = R (1/n1^2 - 1/n2^2) con R = 1,097e7 m^-1; series de Lyman y Balmer, H-alfa 656,3 nm, H-beta 486,2 nm; efecto Doppler no relativista Delta lambda / lambda = v / c, positivo si se aleja; corrimiento al rojo z; en frecuencia Delta f / f = -v / c; tipos espectrales OBAFGKM; velocidad radial y exoplanetas, M v_estrella = m v_planeta, 51 Pegasi 56 m/s.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Un cuerpo negro da un arcoíris liso. El espectro de una estrella real es ese arcoíris cruzado por cientos de líneas oscuras y finas. Esas líneas son la fuente de información más rica de toda la astronomía.</p>
<p>Cada elemento químico absorbe y emite luz solo en unas longitudes de onda concretas, siempre las mismas. El conjunto de sus líneas funciona como un código de barras. Si en el espectro de una estrella aparece el código del sodio, hay sodio en esa estrella.</p>
<p>Y si todo el código aparece un poco desplazado hacia el rojo o hacia el azul, la estrella se aleja o se acerca.</p>
<div class="nota"><strong>El desplazamiento Doppler lo has compensado alguna vez.</strong> La frecuencia de la baliza de un satélite en órbita baja sube varios kilohercios mientras se acerca y baja cuando se aleja, y el receptor tiene que seguirla. Con la luz de las estrellas se hace lo contrario: se mide el desplazamiento y de él se deduce la velocidad. El helio se descubrió así en el espectro del Sol en 1868, antes de encontrarlo en la Tierra.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Los tres tipos de espectro</h3>
<p>Las <em>leyes de Kirchhoff</em>, de 1859, resumen lo que se observa:</p>
<ol>
<li>Un cuerpo caliente y denso emite un <strong>espectro continuo</strong>: el del cuerpo negro.</li>
<li>Un gas caliente y poco denso emite solo en ciertas longitudes de onda: un <strong>espectro de emisión</strong>, de líneas brillantes sobre fondo oscuro.</li>
<li>Un gas más frío situado delante de una fuente continua absorbe esas mismas longitudes de onda: un <strong>espectro de absorción</strong>, de líneas oscuras sobre el continuo.</li>
</ol>
<p>Una estrella es el tercer caso: el interior denso da el continuo y las capas exteriores, más frías, le restan las líneas. Una nebulosa iluminada es el segundo. En la práctica de la Lección 16 viste el primero y el segundo con una bombilla LED y un fluorescente.</p>

<h3>2. Por qué hay líneas</h3>
<p>En un átomo, el electrón solo puede tener ciertas energías, llamadas <em>niveles</em>. Para el hidrógeno, el más sencillo, valen:</p>
$$E_n = -\frac{13{,}6\ \text{eV}}{n^{2}} \qquad n = 1, 2, 3, \dots$$
<p>El signo negativo significa lo mismo que en una órbita: el electrón está ligado. El nivel $n = 1$ es el más profundo, y con $n$ muy grande la energía tiende a cero, el electrón libre.</p>
<p>Cuando el electrón baja de un nivel $n_2$ a otro $n_1$, emite un fotón con exactamente la diferencia de energía. Cuando absorbe un fotón con esa energía, sube. Ningún otro fotón le sirve:</p>
$$E_\text{fotón} = E_{n_2} - E_{n_1} = 13{,}6\ \text{eV}\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right)$$
<p>La fórmula de los niveles está confirmada con enorme precisión. La explicación de por qué las energías están cuantizadas es la mecánica cuántica, que veremos en la Fase 3.</p>

<h3>3. La fórmula de Rydberg</h3>
<p>Como $E = hc/\lambda$, dividiendo la expresión anterior entre $hc$ se obtiene directamente la longitud de onda:</p>
$$\frac{1}{\lambda} = R\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right) \qquad R = 1{,}097 \times 10^{7}\ \text{m}^{-1}$$
<p>Las transiciones se agrupan en series según el nivel de llegada:</p>
<ul>
<li><strong>Serie de Lyman</strong>, $n_1 = 1$: en el ultravioleta.</li>
<li><strong>Serie de Balmer</strong>, $n_1 = 2$: en el visible. Sus líneas se llaman H-alfa, H-beta, H-gamma y así sucesivamente.</li>
</ul>
<p>Para H-alfa, de $n = 3$ a $n = 2$:</p>
$$\frac{1}{\lambda} = 1{,}097 \times 10^{7}\left(\frac{1}{4} - \frac{1}{9}\right) = 1{,}097 \times 10^{7} \times 0{,}1389 = 1{,}524 \times 10^{6}\ \text{m}^{-1}$$
$$\lambda = 6{,}563 \times 10^{-7}\ \text{m} = 656{,}3\ \text{nm}$$
<p>Es una línea roja, y da su color rosado a las nebulosas de las fotografías.</p>

<h3>4. El efecto Doppler</h3>
<p>Una fuente emite una cresta cada periodo $T$. Si está quieta, las crestas viajan separadas una distancia $\lambda = cT$. Si se aleja de nosotros a velocidad $v$, entre una cresta y la siguiente la fuente ha retrocedido $vT$, y la segunda cresta sale desde más lejos. La separación observada es:</p>
$$\lambda_\text{obs} = cT + vT = \lambda\left(1 + \frac{v}{c}\right)$$
<p>Restando $\lambda$ y dividiendo entre $\lambda$:</p>
$$\frac{\Delta\lambda}{\lambda} = \frac{\lambda_\text{obs} - \lambda}{\lambda} = \frac{v}{c}$$
<ul>
<li>Si la fuente <strong>se aleja</strong>, $v > 0$ y la longitud de onda aumenta: <em>corrimiento al rojo</em>.</li>
<li>Si <strong>se acerca</strong>, $v < 0$ y disminuye: <em>corrimiento al azul</em>.</li>
</ul>
<p>Dos advertencias. Solo cuenta la componente de la velocidad a lo largo de la línea de visión, la <em>velocidad radial</em>: el movimiento lateral no desplaza las líneas. Y la fórmula vale para velocidades mucho menores que la de la luz. La versión relativista llegará en la Fase 4.</p>
<p>El desplazamiento relativo se llama $z$:</p>
$$z = \frac{\Delta\lambda}{\lambda} \approx \frac{v}{c}$$
<p>En radio se trabaja con frecuencias. Como $f = c/\lambda$, cuando la longitud de onda sube la frecuencia baja en la misma proporción:</p>
$$\frac{\Delta f}{f} = -\frac{v}{c}$$

<h3>5. Lo que cuenta un espectro</h3>
<div class="tabla"><table>
<thead><tr><th>Lo que se mide</th><th>Lo que se deduce</th></tr></thead>
<tbody>
<tr><td>Qué líneas aparecen</td><td>Composición química</td></tr>
<tr><td>Forma del continuo e intensidad relativa de las líneas</td><td>Temperatura</td></tr>
<tr><td>Desplazamiento de las líneas</td><td>Velocidad radial</td></tr>
<tr><td>Anchura de las líneas</td><td>Rotación, presión y agitación del gas</td></tr>
</tbody></table></div>
<p>Las estrellas se clasifican por su espectro en los tipos <strong>O, B, A, F, G, K, M</strong>, de más caliente a más fría. Las O superan los 30 000 K y las M no llegan a 3700 K. El Sol es de tipo G. Todas tienen una composición parecida, unas tres cuartas partes de hidrógeno y casi una cuarta parte de helio en masa. Las diferencias entre sus espectros se deben sobre todo a la temperatura, que decide qué niveles están ocupados.</p>

<h3>6. Planetas que no se ven</h3>
<p>Una estrella y su planeta giran los dos alrededor de su centro de masas común. El momento lineal total se conserva, así que la estrella, mucho más pesada, se mueve mucho más despacio:</p>
$$M_\star\,v_\star = m_\text{p}\,v_\text{p}$$
<p>Ese bamboleo se detecta como un desplazamiento Doppler periódico de las líneas de la estrella. En 1995, Mayor y Queloz midieron una oscilación de 56 m/s con un periodo de 4,2 días en la estrella 51 Pegasi. Fue el primer planeta descubierto alrededor de una estrella como el Sol, y les valió el premio Nobel de 2019.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La velocidad de una galaxia</h3>
<p>En el espectro de una galaxia cercana, la línea H-alfa aparece en 660,0 nm. En el laboratorio está en 656,3 nm.</p>
<p><strong>Desplazamiento relativo:</strong></p>
$$z = \frac{660{,}0 - 656{,}3}{656{,}3} = \frac{3{,}7}{656{,}3} = 0{,}00564$$
<p><strong>Velocidad radial:</strong></p>
$$v = z\,c = 0{,}00564 \times 2{,}998 \times 10^{5}\ \text{km/s} = 1690\ \text{km/s}$$
<p>La línea está desplazada hacia longitudes de onda mayores, así que la galaxia se aleja. Como $v$ es mucho menor que $c$, la fórmula sencilla es suficiente.</p>
<p><strong>Comprobación con otra línea.</strong> Si la interpretación es correcta, H-beta, que en reposo está en 486,2 nm, debe aparecer en:</p>
$$486{,}2 \times (1 + 0{,}00564) = 488{,}9\ \text{nm}$$
<p>Todas las líneas se desplazan en la misma proporción. Eso es lo que permite identificarlas: se busca el patrón, y el desplazamiento común da la velocidad.</p>
<h3>El mismo cálculo con un satélite</h3>
<p>La Estación Espacial se mueve a 7,66 km/s y lleva emisores en torno a 437 MHz. En el caso extremo en que toda esa velocidad fuera radial:</p>
$$\Delta f = f\,\frac{v}{c} = 437 \times 10^{6} \times \frac{7{,}66}{2{,}998 \times 10^{5}} = 1{,}12 \times 10^{4}\ \text{Hz} \approx 11\ \text{kHz}$$
<p>Es el orden de magnitud de la corrección que aplican los radioaficionados durante un pase.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Las líneas del hidrógeno",
            enunciado: R`<p>Usa $1/\lambda = R\,(1/n_1^{2} - 1/n_2^{2})$ con $R = 1{,}097 \times 10^{7}\ \text{m}^{-1}$, y $E\,[\text{eV}] = 1240/\lambda\,[\text{nm}]$.</p>`,
            partes: [
              { id: "a", pregunta: "Longitud de onda de H-beta, de n = 4 a n = 2", tipo: "num", unidad: "nm", respuesta: 486.2, tol: 0.005,
                errores: [{ v: 2057, msg: "Ese número sale de 1/λ. Falta invertirlo y pasar a nanómetros." }],
                pistas: ["1/4 − 1/16 = 0,1875.", "1/λ = 2,057 × 10⁶ m⁻¹. Invierte y pasa a nanómetros."],
                solucion: R`$\dfrac{1}{\lambda} = 1{,}097 \times 10^{7} \times 0{,}1875 = 2{,}057 \times 10^{6}\ \text{m}^{-1}$, luego $\lambda = 4{,}862 \times 10^{-7}$ m $= 486{,}2$ nm. Es una línea azul verdosa.` },
              { id: "b", pregunta: "Energía de un fotón de H-alfa, 656,3 nm", tipo: "num", unidad: "eV", respuesta: 1.89, tol: 0.01,
                pistas: ["Divide 1240 entre la longitud de onda en nanómetros."],
                solucion: R`$1240/656{,}3 = 1{,}89$ eV. Coincide con la diferencia de niveles: $13{,}6\,(1/4 - 1/9) = 1{,}89$ eV.` },
              { id: "c", pregunta: "La luz del interior denso de una estrella atraviesa sus capas exteriores, más frías. El espectro que vemos es:", tipo: "opcion", respuesta: 2,
                opciones: ["Continuo, sin líneas", "De líneas brillantes sobre fondo oscuro", "Continuo con líneas oscuras", "Una sola línea en el máximo de Wien"],
                pistas: ["Es el tercer caso de Kirchhoff."],
                solucion: R`Continuo con líneas oscuras: un espectro de absorción. El gas frío retira del continuo justo las longitudes de onda que sus átomos pueden absorber.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Velocidades radiales",
            enunciado: R`<p>Usa $\Delta\lambda/\lambda = v/c$ con $c = 2{,}998 \times 10^{5}$ km/s.</p>`,
            partes: [
              { id: "a", pregunta: "Una línea que en reposo está en 500,00 nm se observa en 500,10 nm en una estrella. ¿Cuál es su velocidad radial?", tipo: "num", unidad: "km/s", respuesta: 60, tol: 0.02,
                pistas: ["El desplazamiento es 0,10 nm sobre 500 nm."],
                solucion: R`$v = \dfrac{0{,}10}{500} \times 2{,}998 \times 10^{5} = 60$ km/s.` },
              { id: "b", pregunta: "Esa estrella:", tipo: "opcion", respuesta: 0,
                opciones: ["Se aleja de nosotros", "Se acerca a nosotros", "Se mueve de lado", "No se puede saber"],
                pistas: ["La longitud de onda observada es mayor que la de reposo."],
                solucion: R`Se aleja. La línea está desplazada hacia longitudes de onda mayores, hacia el rojo.` },
              { id: "c", pregunta: "Una nube de hidrógeno se acerca a 100 km/s. ¿Cuántos kilohercios sube su línea de 1420,406 MHz?", tipo: "num", unidad: "kHz", respuesta: 474, tol: 0.01,
                errores: [{ v: 0.474, msg: "Ese valor está en megahercios. Se pide en kilohercios." }],
                pistas: ["El cambio de frecuencia es f · v / c."],
                solucion: R`$\Delta f = 1420{,}406 \times \dfrac{100}{2{,}998 \times 10^{5}} = 0{,}474$ MHz $= 474$ kHz. Midiendo ese desplazamiento en distintas direcciones se trazó el mapa de la rotación de la Vía Láctea.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Exoplanetas e ionización",
            enunciado: R`<p>Para el último apartado, recuerda que ionizar un átomo es llevar su electrón hasta la energía cero.</p>`,
            partes: [
              { id: "a", pregunta: "La estrella 51 Pegasi oscila a 56 m/s. ¿Cuánto se desplaza una línea de 500 nm, en nanómetros?", tipo: "sci", unidad: "nm", respuesta: 9.34e-5,
                errores: [{ v: 9.34e-2, msg: "La velocidad está en m/s. Usa c en m/s también, 2,998 × 10⁸." }],
                pistas: ["Δλ = λ · v / c, con v y c en las mismas unidades."],
                solucion: R`$500 \times \dfrac{56}{2{,}998 \times 10^{8}} = 9{,}34 \times 10^{-5}$ nm. Es una diezmilésima de nanómetro, mucho menos que la anchura de la propia línea. Se consigue midiendo miles de líneas a la vez.` },
              { id: "b", pregunta: "Júpiter orbita a 13,06 km/s y su masa es 9,54 × 10⁻⁴ veces la del Sol. ¿A qué velocidad se mueve el Sol por su causa?", tipo: "num", unidad: "m/s", respuesta: 12.5, tol: 0.02,
                errores: [{ v: 0.0125, msg: "Ese valor está en km/s. Se pide en m/s." }],
                pistas: ["M · v de la estrella es igual a m · v del planeta."],
                solucion: R`$v_\odot = 13\,060 \times 9{,}54 \times 10^{-4} = 12{,}5$ m/s. Un observador lejano necesitaría esa precisión, mantenida durante los 12 años del periodo, para descubrir Júpiter. La Tierra produce solo 9 cm/s.` },
              { id: "c", pregunta: "¿Cuál es la mayor longitud de onda capaz de ionizar un átomo de hidrógeno en su nivel n = 1?", tipo: "num", unidad: "nm", respuesta: 91.2, tol: 0.01,
                pistas: ["Hay que aportar 13,6 eV.", "λ = 1240 / E."],
                solucion: R`$1240/13{,}6 = 91{,}2$ nm, en el ultravioleta. Solo las estrellas más calientes, de tipos O y B, emiten suficientes fotones de esa energía para ionizar el gas que las rodea y hacerlo brillar en H-alfa.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Identifica un espectro</h3>
<p>Primero, calcula con Python la serie de Balmer:</p>
<div class="tabla"><pre>R = 1.097e7

for n in range(3, 7):
    lam = 1 / (R * (1/4 - 1/n**2))
    print("de", n, "a 2:", round(lam * 1e9, 1), "nm")</pre></div>
<p>Deberías obtener 656,3, 486,2, 434,1 y 410,2 nm.</p>
<p>Ahora el problema real. En el espectro de una galaxia has medido tres líneas de emisión en <strong>673,1 nm, 498,6 nm y 445,2 nm</strong>.</p>
<ol>
<li>Calcula los cocientes entre ellas y compáralos con los cocientes de las líneas de Balmer. Si coinciden, son H-alfa, H-beta y H-gamma desplazadas.</li>
<li>Calcula $z$ con cada una de las tres. Deben dar casi lo mismo.</li>
<li>Con el valor medio, calcula la velocidad de la galaxia.</li>
</ol>
<p>Escribe tu resultado en las notas. El valor correcto de $z$ ronda 0,0256.</p>
<h3>El sodio de las farolas</h3>
<p>Con el CD de la Lección 16, vuelve a mirar una farola anaranjada o echa una pizca de sal de mesa en la llama de una cocina de gas, con cuidado. El color amarillo intenso es la línea del sodio, en 589 nm. Esa misma línea aparece en absorción en el espectro del Sol.</p>`,
          notas: [{ id: "espectro", label: "Cocientes, valor de z con cada línea y velocidad de la galaxia" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Tres espectros:</strong> continuo, de emisión y de absorción. Las estrellas muestran un continuo con líneas oscuras.`,
          R`<strong>Las líneas son saltos entre niveles.</strong> Para el hidrógeno, $E_n = -13{,}6\ \text{eV}/n^{2}$ y $1/\lambda = R\,(1/n_1^{2} - 1/n_2^{2})$.`,
          R`<strong>Efecto Doppler:</strong> $\Delta\lambda/\lambda = v/c$. Hacia el rojo si se aleja, hacia el azul si se acerca. Solo mide la velocidad radial.`,
          R`<strong>Un espectro da</strong> la composición, la temperatura, la velocidad y la rotación de un astro.`,
          R`<strong>Los exoplanetas se delatan</strong> por el bamboleo Doppler de su estrella: metros por segundo.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 19 ───────────────────────── */
    {
      id: "leccion-19", n: 19, fase: 2, codigo: "A2.3",
      titulo: "Óptica y difracción: qué puede ver un telescopio",
      sub: "Cómo se forma una imagen y por qué el diámetro de la abertura fija el detalle más fino que se puede distinguir.",
      horas: "6 horas",
      contexto: "Reflexión y ley de Snell n1 sen(theta1) = n2 sen(theta2); distancia focal f, tamaño de imagen h = f theta, escala de placa 206265/f segundos de arco por mm; relación focal N = f/D; área colectora proporcional a D^2, ganancia frente al ojo (D / 7 mm)^2, magnitud límite aproximada 6 + 5 log(D / 7 mm); difracción: primer mínimo de una rendija en sen(theta) = lambda/D, abertura circular theta = 1,22 lambda/D (criterio de Rayleigh), en el visible theta = 138/D[mm] segundos de arco; seeing atmosférico de 1 a 2 segundos de arco.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Un telescopio hace dos cosas: recoge más luz que el ojo y distingue detalles más finos. Las dos dependen del mismo número, el diámetro de su abertura. Los aumentos, que es lo que anuncian las cajas de los telescopios de juguete, importan mucho menos.</p>
<p>Recoger luz es fácil de entender: un cubo más ancho recoge más lluvia. Lo del detalle es menos evidente. Aunque las lentes fueran perfectas, la imagen de una estrella no sería un punto, sino una mancha pequeña. La causa es que la luz es una onda y la abertura la recorta.</p>
<div class="nota"><strong>Es el ancho de haz de una antena.</strong> Una parabólica de diámetro $D$ que trabaja a longitud de onda $\lambda$ tiene un haz de anchura aproximada $\lambda/D$ radianes. No puede distinguir dos fuentes más juntas que eso. Un telescopio óptico es una antena para luz y cumple la misma ley. Solo cambia que su $\lambda$ es un millón de veces menor.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Reflexión y refracción</h3>
<p>Para seguir el camino de la luz en un instrumento basta tratarla como rayos rectos. Dos leyes dicen qué ocurre al llegar a una superficie.</p>
<p><strong>Reflexión:</strong> el ángulo con el que sale el rayo es igual al ángulo con el que llega, medidos los dos desde la perpendicular a la superficie.</p>
<p><strong>Refracción:</strong> al pasar de un medio a otro, la luz cambia de velocidad y el rayo se dobla. Cada medio tiene un <em>índice de refracción</em> $n = c/v$, que vale 1 en el vacío, 1,0003 en el aire y alrededor de 1,5 en el vidrio. La <em>ley de Snell</em> relaciona los ángulos:</p>
$$n_1\sin\theta_1 = n_2\sin\theta_2$$
<p>El índice del vidrio depende ligeramente de la longitud de onda. Por eso un prisma separa los colores, y por eso una lente simple enfoca el azul y el rojo en puntos distintos. Ese defecto se llama <em>aberración cromática</em>. Un espejo no lo tiene, porque la reflexión no depende del color.</p>

<h3>2. Distancia focal</h3>
<p>Una lente convergente o un espejo cóncavo reúnen en un punto los rayos que llegan paralelos. Ese punto es el <em>foco</em>, y su distancia a la lente o al espejo es la <strong>distancia focal</strong> $f$. La luz de una estrella llega prácticamente paralela, así que su imagen se forma en el plano focal.</p>

<h3>3. Tamaño de la imagen</h3>
<p>Dos estrellas separadas un ángulo pequeño $\theta$ en el cielo forman imágenes separadas una distancia $h$ en el plano focal. El rayo que pasa por el centro de la lente no se desvía, así que por la aproximación de ángulos pequeños de la Lección 2:</p>
$$h = f\,\theta \qquad (\theta\ \text{en radianes})$$
<p>La <em>escala de placa</em> dice cuánto cielo cabe en cada milímetro del plano focal:</p>
$$\text{escala} = \frac{206\,265''}{f\,[\text{mm}]}\ \text{por milímetro}$$
<p>Una focal larga da imágenes grandes de una zona pequeña del cielo. Una focal corta, lo contrario.</p>

<h3>4. Relación focal</h3>
<p>El cociente entre la distancia focal y el diámetro $D$ de la abertura es la <strong>relación focal</strong>:</p>
$$N = \frac{f}{D}$$
<p>Se escribe f/5, f/10. Es el mismo número f de la fotografía. Para objetos extensos, como nebulosas, el brillo de la imagen por unidad de superficie va como $1/N^{2}$: un instrumento f/5 es cuatro veces más luminoso que uno f/10.</p>

<h3>5. Recoger luz</h3>
<p>La potencia que recoge un telescopio es el flujo por el área de su abertura, que va con $D^{2}$. La pupila del ojo adaptado a la oscuridad mide unos 7 mm. Frente a ella:</p>
$$\text{ganancia} = \left(\frac{D}{7\ \text{mm}}\right)^{2}$$
<p>Traducido a magnitudes con la fórmula de la Lección 3, $\Delta m = 2{,}5\log(\text{ganancia})$:</p>
$$\Delta m = 2{,}5\log\left(\frac{D}{7\ \text{mm}}\right)^{2} = 5\log\frac{D}{7\ \text{mm}}$$
<p>Si a simple vista se llega a magnitud 6, con un telescopio se llega aproximadamente a $6 + 5\log(D/7\ \text{mm})$.</p>

<h3>6. Difracción en una rendija</h3>
<p>Imagina una onda plana que atraviesa una rendija de anchura $D$. Cada punto de la rendija actúa como un pequeño emisor. Hacia delante, todas las contribuciones llegan en fase y se suman.</p>
<p>Miremos en una dirección inclinada un ángulo $\theta$. Emparejamos cada punto de la mitad superior de la rendija con el que está $D/2$ más abajo. La diferencia de camino entre los dos es $(D/2)\sin\theta$. Si esa diferencia vale media longitud de onda, cada pareja se cancela, como viste en la Lección 15, y con ella toda la rendija:</p>
$$\frac{D}{2}\sin\theta = \frac{\lambda}{2} \;\Rightarrow\; \sin\theta = \frac{\lambda}{D}$$
<p>En esa dirección no llega luz. La onda no sale como un haz perfectamente recto, sino abierta en un abanico de anchura angular aproximada $\lambda/D$.</p>

<h3>7. Abertura circular y criterio de Rayleigh</h3>
<p>Para una abertura circular el razonamiento es el mismo, pero la suma sobre un círculo da un factor numérico:</p>
$$\theta = 1{,}22\,\frac{\lambda}{D}$$
<p>La imagen de una estrella es una mancha central, el <em>disco de Airy</em>, rodeada de anillos débiles, y este ángulo es el radio de la mancha. El <strong>criterio de Rayleigh</strong> dice que dos estrellas se distinguen si están separadas al menos ese ángulo. Es el <em>poder de resolución</em> del telescopio.</p>
<p>Para luz visible de 550 nm, pasando a segundos de arco:</p>
$$\theta = 1{,}22 \times \frac{5{,}5 \times 10^{-7}\ \text{m}}{D} \times 206\,265 = \frac{0{,}138''}{D\,[\text{m}]} = \frac{138''}{D\,[\text{mm}]}$$

<h3>8. La atmósfera pone su propio límite</h3>
<p>El aire está en movimiento y mezcla capas de distinta temperatura, que desvían la luz de forma irregular. La imagen de una estrella tiembla y se emborrona. Ese efecto se llama <em>seeing</em>, y en un sitio corriente vale entre 1 y 2 segundos de arco.</p>
<p>La consecuencia es importante al elegir equipo. Por encima de unos 10 o 15 cm de abertura, el detalle ya no lo limita la difracción, sino la atmósfera. Un telescopio mayor sigue recogiendo más luz, pero no ve más fino, salvo en momentos de aire muy estable. Los observatorios profesionales lo resuelven con sitios de montaña, con <em>óptica adaptativa</em>, que corrige la deformación en tiempo real, o saliendo al espacio.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Un telescopio Dobson de 200 mm</h3>
<p>Es un reflector muy común entre aficionados: espejo de $D = 200$ mm y focal $f = 1200$ mm.</p>
<p><strong>Relación focal:</strong> $N = 1200/200 = 6$. Es un f/6.</p>
<p><strong>Ganancia de luz frente al ojo:</strong></p>
$$\left(\frac{200}{7}\right)^{2} = 28{,}6^{2} = 816\ \text{veces}$$
<p><strong>Magnitud límite aproximada:</strong></p>
$$6 + 5\log 28{,}6 = 6 + 5 \times 1{,}456 = 13{,}3$$
<p>A simple vista se ven unas pocas miles de estrellas. Hasta magnitud 13 hay varios millones.</p>
<p><strong>Poder de resolución:</strong></p>
$$\theta = \frac{138}{200} = 0{,}69''$$
<p>Es mejor que el seeing habitual, así que casi todas las noches mandará la atmósfera.</p>
<p><strong>Escala de placa:</strong> $206\,265/1200 = 172''$ por milímetro.</p>
<p><strong>Tamaño de las imágenes en el plano focal.</strong> La Luna mide unos $1865''$ y Júpiter $46''$:</p>
$$h_\text{Luna} = \frac{1865}{172} = 10{,}8\ \text{mm} \qquad h_\text{Júpiter} = \frac{46}{172} = 0{,}27\ \text{mm}$$
<p>La Luna llena casi por completo un sensor pequeño. Júpiter es un punto gordo de un cuarto de milímetro: por eso para fotografiar planetas se alarga la focal con una lente adicional.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Rayos y focales",
            enunciado: R`<p>Un pequeño refractor tiene una lente de 80 mm de diámetro y 480 mm de focal.</p>`,
            partes: [
              { id: "a", pregunta: "Un rayo llega desde el aire a un vidrio de índice 1,5 con un ángulo de 30° respecto a la perpendicular. ¿Con qué ángulo sigue dentro del vidrio?", tipo: "num", unidad: "°", respuesta: 19.5, tol: 0.01,
                errores: [{ v: 20, msg: "Los ángulos no son proporcionales a los índices. Lo son sus senos." }, { v: 48.6, msg: "Has multiplicado por 1,5 en lugar de dividir. Al entrar en un medio más denso, el rayo se acerca a la perpendicular." }],
                pistas: ["sen θ₂ = sen 30° / 1,5 = 0,333."],
                solucion: R`$\sin\theta_2 = \dfrac{1 \times 0{,}5}{1{,}5} = 0{,}333 \Rightarrow \theta_2 = 19{,}5^\circ$.` },
              { id: "b", pregunta: "Relación focal del refractor", tipo: "num", respuesta: 6,
                pistas: ["N = f / D."],
                solucion: R`$480/80 = 6$. Es un f/6.` },
              { id: "c", pregunta: "Tamaño de la imagen de la Luna (0,52°) en su plano focal", tipo: "num", unidad: "mm", respuesta: 4.36, tol: 0.02,
                errores: [{ v: 250, msg: "Has usado el ángulo en grados. En h = f θ el ángulo va en radianes." }],
                pistas: ["Pasa 0,52° a radianes multiplicando por π/180."],
                solucion: R`$\theta = 0{,}52 \times \dfrac{\pi}{180} = 9{,}08 \times 10^{-3}$ rad. $h = 480 \times 9{,}08 \times 10^{-3} = 4{,}36$ mm.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Un reflector de 114 mm",
            enunciado: R`<p>Es el tamaño típico de un primer telescopio. Toma la pupila del ojo como 7 mm.</p>`,
            partes: [
              { id: "a", pregunta: "¿Cuántas veces más luz recoge que el ojo?", tipo: "num", unidad: "veces", respuesta: 265, tol: 0.02,
                errores: [{ v: 16.3, msg: "Ese es el cociente de diámetros. La luz recogida va con el área, es decir, con el cuadrado." }],
                pistas: ["Es el cociente de diámetros al cuadrado."],
                solucion: R`$(114/7)^{2} = 16{,}3^{2} = 265$.` },
              { id: "b", pregunta: "Magnitud límite aproximada, si a simple vista se llega a 6", tipo: "num", respuesta: 12.1, tol: 0.01,
                pistas: ["6 + 5 log(114/7).", "log 16,3 = 1,212."],
                solucion: R`$6 + 5 \times 1{,}212 = 12{,}1$.` },
              { id: "c", pregunta: "Poder de resolución en luz visible", tipo: "num", unidad: "″", respuesta: 1.21, tol: 0.02,
                pistas: ["θ = 138 / D, con D en milímetros."],
                solucion: R`$138/114 = 1{,}21''$. Separa sin problema una estrella doble como Albireo, cuyas componentes distan $35''$.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Del Hubble a la radio",
            enunciado: R`<p>Usa $\theta = 1{,}22\,\lambda/D$ y el factor $206\,265''$ por radián.</p>`,
            partes: [
              { id: "a", pregunta: "Poder de resolución del telescopio espacial Hubble (D = 2,4 m) a 550 nm", tipo: "num", unidad: "″", respuesta: 0.0577, tol: 0.02,
                pistas: ["En el visible, θ = 0,138″ / D con D en metros."],
                solucion: R`$0{,}138/2{,}4 = 0{,}058''$. Al estar fuera de la atmósfera, lo alcanza de verdad.` },
              { id: "b", pregunta: "Anchura del haz del radiotelescopio de Effelsberg (D = 100 m) a 21,1 cm, en minutos de arco", tipo: "num", unidad: "′", respuesta: 8.85, tol: 0.02,
                errores: [{ v: 531, msg: "Ese valor está en segundos de arco. Divide entre 60." }],
                pistas: ["Calcula en radianes, pasa a segundos de arco y divide entre 60."],
                solucion: R`$1{,}22 \times \dfrac{0{,}211}{100} = 2{,}57 \times 10^{-3}$ rad $= 531'' = 8{,}85'$. Una antena cuarenta veces mayor que el Hubble ve diez mil veces más borroso.` },
              { id: "c", pregunta: "¿Qué diámetro necesitaría un radiotelescopio para igualar al Hubble a 21,1 cm, en kilómetros?", tipo: "num", unidad: "km", respuesta: 921, tol: 0.03,
                pistas: ["Pasa 0,0577″ a radianes y despeja D = 1,22 λ / θ."],
                solucion: R`$\theta = \dfrac{0{,}0577}{206\,265} = 2{,}80 \times 10^{-7}$ rad. $D = \dfrac{1{,}22 \times 0{,}211}{2{,}80 \times 10^{-7}} = 9{,}2 \times 10^{5}$ m. Ninguna antena puede medir 900 km. La solución es repartir varias antenas por esa distancia: la interferometría de la Lección 22.` },
              { id: "d", pregunta: "Un telescopio de 300 mm observa una noche con un seeing de 2″. El detalle más fino que distingue es:", tipo: "opcion", respuesta: 1,
                opciones: ["0,46″, su límite de difracción", "Unos 2″, limitado por la atmósfera", "2,46″, la suma de los dos", "Depende de los aumentos que se usen"],
                pistas: ["Compara el límite de difracción, 138/300, con el seeing."],
                solucion: R`Unos $2''$. Manda el peor de los dos límites, y esa noche es la atmósfera. Los aumentos agrandan la imagen, pero no añaden detalle.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Mide la resolución de tu ojo</h3>
<p>El ojo es un instrumento óptico con una abertura, la pupila, y cumple las mismas leyes.</p>
<ol>
<li>Dibuja en un papel dos líneas negras gruesas, paralelas y separadas 2 mm. Pégalo en una pared bien iluminada.</li>
<li>Aléjate despacio hasta que las dos líneas se confundan en una. Mide esa distancia $d$.</li>
<li>El ángulo que separaba las líneas es $\theta = 2\ \text{mm}/d$. Pásalo a segundos de arco.</li>
</ol>
<p>Un ojo sano da alrededor de un minuto de arco, lo que corresponde a unos 7 metros. De día la pupila mide unos 3 mm, y su límite de difracción es $138/3 = 46''$. El ojo trabaja muy cerca de su límite teórico.</p>
<h3>Unos prismáticos, sobre el papel</h3>
<p>Unos prismáticos 10×50 tienen 10 aumentos y lentes de 50 mm. Calcula su ganancia de luz, su magnitud límite y su poder de resolución. Son, con diferencia, el mejor primer instrumento.</p>`,
          notas: [{ id: "ojo", label: "Distancia a la que se confunden las líneas, resolución de tu ojo y cálculos de los prismáticos" }],
          tareasTitulo: "Lista de la práctica",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Medir la resolución de mi ojo con las dos líneas." },
            { id: "t2", texto: "Calcular ganancia, magnitud límite y resolución de unos prismáticos 10×50." },
            { id: "t3", texto: "Si tengo prismáticos: comprobar si separan Mizar y Alcor, en la Osa Mayor." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La abertura manda.</strong> La luz recogida va con $D^{2}$ y el detalle con $1/D$.`,
          R`<strong>Tamaño de imagen:</strong> $h = f\,\theta$. La escala de placa es $206\,265''/f$ por milímetro.`,
          R`<strong>Criterio de Rayleigh:</strong> $\theta = 1{,}22\,\lambda/D$. En el visible, $138''/D\,[\text{mm}]$.`,
          R`<strong>Magnitud límite aproximada:</strong> $6 + 5\log(D/7\ \text{mm})$.`,
          R`<strong>La atmósfera limita el detalle</strong> a 1 o 2 segundos de arco. Por encima de unos 15 cm, más abertura da más luz, no más nitidez.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 20 ───────────────────────── */
    {
      id: "leccion-20", n: 20, fase: 2, codigo: "C3.1 · B3.4",
      titulo: "Telescopios, monturas y detectores",
      sub: "Los tipos de telescopio, cómo se calculan los aumentos y por qué el ruido de una imagen baja con la raíz del tiempo.",
      horas: "5 horas",
      contexto: "Refractor, reflector Newton, catadióptricos; aumento M = f_telescopio / f_ocular, máximo útil 2 D[mm], pupila de salida D / M, campo real = campo aparente / M; montura altazimutal y ecuatorial, el cielo gira 15 segundos de arco por segundo; sensores CCD/CMOS, eficiencia cuántica, escala de píxel 206265 x tamaño de píxel / f; ruido de fotones (Poisson): sigma = raíz(N), S/R = raíz(N), crece con raíz(t); S/R = S / raíz(S + B) con fondo de cielo; apilar n imágenes mejora raíz(n).",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Esta lección es la más práctica de la fase. Aún no tienes telescopio, así que es el momento adecuado para entender qué distingue a unos de otros, antes de gastar dinero.</p>
<p>Hay tres decisiones: la óptica, que recoge la luz; la montura, que apunta y sigue; y el detector, que puede ser tu ojo o una cámara. De las tres, la montura es la que más se subestima. Un buen tubo sobre una montura que vibra es un mal telescopio.</p>
<div class="nota"><strong>El ruido de una imagen astronómica es ruido de disparo.</strong> Los fotones llegan de uno en uno y al azar, igual que los electrones que cruzan una unión. Si esperas $N$, la fluctuación es $\sqrt{N}$. Toda la astrofotografía, desde un móvil hasta el James Webb, consiste en acumular fotones hasta que $\sqrt{N}$ sea pequeño frente a $N$.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Tres familias de telescopios</h3>
<div class="tabla"><table>
<thead><tr><th>Tipo</th><th>Cómo funciona</th><th>A favor</th><th>En contra</th></tr></thead>
<tbody>
<tr><td><strong>Refractor</strong></td><td>Una lente al frente del tubo</td><td>Imagen contrastada, sin mantenimiento</td><td>Caro por centímetro de abertura. Los sencillos tienen aberración cromática</td></tr>
<tr><td><strong>Reflector Newton</strong></td><td>Un espejo cóncavo al fondo y un espejo plano que saca la luz por un lado</td><td>La mayor abertura por euro. Sin aberración cromática</td><td>Voluminoso. Hay que alinear los espejos de vez en cuando</td></tr>
<tr><td><strong>Catadióptrico</strong></td><td>Espejos y una lente correctora. La luz se pliega dentro del tubo</td><td>Compacto, focal larga, bueno para planetas</td><td>Más caro. Campo estrecho</td></tr>
</tbody></table></div>
<p>Un Newton sobre una base sencilla de madera que gira en dos ejes se llama <em>Dobson</em>. Es la recomendación habitual para empezar a observar con los ojos: toda la inversión va a la abertura.</p>
<div data-widget="telescopio"></div>

<h3>2. Aumentos</h3>
<p>El objetivo forma una imagen en su plano focal, y el <em>ocular</em> es una lupa con la que se mira esa imagen. El aumento es el cociente de focales:</p>
$$M = \frac{f_\text{telescopio}}{f_\text{ocular}}$$
<p>Los aumentos se cambian cambiando de ocular, y tienen límites por los dos lados.</p>
<p><strong>Pupila de salida.</strong> El haz de luz que sale del ocular tiene un diámetro igual a la abertura dividida entre el aumento:</p>
$$d_\text{salida} = \frac{D}{M}$$
<p>Si es mayor que la pupila del ojo, unos 7 mm, parte de la luz se pierde. Eso fija el aumento mínimo en $D/7$ con $D$ en milímetros.</p>
<p><strong>Aumento máximo útil.</strong> Cuando la pupila de salida baja de medio milímetro, la imagen se oscurece y la difracción se hace visible. Eso ocurre hacia $M = 2D$, con $D$ en milímetros. En la práctica, la atmósfera rara vez deja pasar de 200 o 250 aumentos.</p>
<p><strong>Campo.</strong> Cada ocular tiene un <em>campo aparente</em>, normalmente entre 50° y 70°. El trozo de cielo que se ve es:</p>
$$\text{campo real} = \frac{\text{campo aparente}}{M}$$

<h3>3. Monturas</h3>
<p>Aquí vuelven los dos sistemas de coordenadas de la Lección 9.</p>
<ul>
<li><strong>Altazimutal.</strong> Dos ejes: uno horizontal y otro vertical. Es intuitiva y estable. Para seguir un astro hay que mover los dos ejes a la vez. El Dobson es de este tipo.</li>
<li><strong>Ecuatorial.</strong> Uno de los ejes se orienta paralelo al eje de la Tierra, apuntando al polo celeste. Para seguir un astro basta girar ese eje a velocidad constante, una vuelta por día sidéreo. Es la necesaria para fotografía de larga exposición.</li>
</ul>
<p>El cielo gira 360° en un día sidéreo. En el ecuador celeste eso supone:</p>
$$\frac{360 \times 3600''}{86\,164\ \text{s}} = 15{,}04''\ \text{por segundo}$$
<p>A 100 aumentos, un planeta cruza todo el campo de visión en un par de minutos si no se le sigue.</p>

<h3>4. Detectores</h3>
<p>El ojo no acumula luz: renueva la imagen varias veces por segundo. Un sensor electrónico sí acumula, y esa es su gran ventaja.</p>
<p>Un sensor CCD o CMOS es una matriz de píxeles de silicio. Cada fotón que llega tiene una cierta probabilidad de liberar un electrón, la <em>eficiencia cuántica</em>, que hoy supera el 80 %. La del ojo adaptado a la oscuridad es de unas pocas unidades por ciento. Al terminar la exposición se cuentan los electrones de cada píxel.</p>
<p>El trozo de cielo que ve cada píxel sale de la escala de placa de la lección anterior:</p>
$$\text{escala de píxel} = 206\,265'' \times \frac{\text{tamaño del píxel}}{f}$$
<p>con el tamaño del píxel y la focal en las mismas unidades.</p>

<h3>5. El ruido de fotones</h3>
<p>Los fotones llegan al azar. Si en una exposición esperas $N$ de media, en una exposición concreta contarás $N$ más o menos una fluctuación. Para sucesos independientes que llegan a ritmo constante, la estadística de Poisson dice que esa fluctuación es:</p>
$$\sigma = \sqrt{N}$$
<p>La <strong>relación señal/ruido</strong> es entonces:</p>
$$\frac{S}{R} = \frac{N}{\sqrt{N}} = \sqrt{N}$$
<p>Si la estrella entrega $r$ fotones por segundo y se expone un tiempo $t$, $N = r\,t$ y:</p>
$$\frac{S}{R} = \sqrt{r\,t}$$
<p>La calidad mejora con la raíz del tiempo. Para duplicarla hay que exponer cuatro veces más. Para multiplicarla por diez, cien veces más.</p>

<h3>6. El fondo de cielo</h3>
<p>El cielo no es negro. La contaminación lumínica y el brillo natural de la atmósfera añaden $B$ fotones al mismo píxel. La media de ese fondo se puede restar, pero su fluctuación no. Las fluctuaciones independientes se suman en cuadratura, así que con $S$ fotones de la fuente:</p>
$$\frac{S}{R} = \frac{S}{\sqrt{S + B}}$$
<p>Por eso un cielo oscuro vale más que un telescopio grande para los objetos débiles. Los sensores añaden además su propio ruido, de lectura y térmico, que aparecería como más términos dentro de la raíz.</p>

<h3>7. Apilar imágenes</h3>
<p>Promediar $n$ exposiciones iguales equivale a una exposición $n$ veces más larga:</p>
$$\left(\frac{S}{R}\right)_n = \sqrt{n}\,\left(\frac{S}{R}\right)_1$$
<p>Es la técnica habitual: muchas exposiciones cortas, que toleran mejor los errores de seguimiento, sumadas después por software.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El Dobson de 200 mm con dos oculares</h3>
<p>Telescopio con $D = 200$ mm y $f = 1200$ mm. Oculares de 25 mm y 10 mm, los dos con 52° de campo aparente.</p>
<div class="tabla"><table>
<thead><tr><th></th><th>Ocular de 25 mm</th><th>Ocular de 10 mm</th></tr></thead>
<tbody>
<tr><td>Aumento</td><td>$1200/25 = 48$</td><td>$1200/10 = 120$</td></tr>
<tr><td>Pupila de salida</td><td>$200/48 = 4{,}2$ mm</td><td>$200/120 = 1{,}7$ mm</td></tr>
<tr><td>Campo real</td><td>$52^\circ/48 = 1{,}08^\circ$</td><td>$52^\circ/120 = 0{,}43^\circ$</td></tr>
</tbody></table></div>
<p>Con el de 25 mm caben dos lunas llenas en el campo: es el ocular para localizar objetos y para cúmulos y nebulosas. Con el de 10 mm la Luna ya no cabe entera: es el de los planetas. El aumento máximo útil sería $2 \times 200 = 400$, que la atmósfera casi nunca permite.</p>
<h3>Cuánto hay que exponer</h3>
<p>Una estrella débil deja en el sensor 100 electrones por segundo.</p>
<p>En 10 segundos: $N = 1000$ y $S/R = \sqrt{1000} = 31{,}6$.</p>
<p>Para llegar a $S/R = 100$ hacen falta $N = 100^{2} = 10\,000$ electrones:</p>
$$t = \frac{10\,000}{100} = 100\ \text{s}$$
<p>Diez veces más tiempo para mejorar la calidad en un factor $\sqrt{10} = 3{,}16$.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Aumentos y campo",
            enunciado: R`<p>Un reflector tiene 130 mm de abertura y 900 mm de focal. Se usa con un ocular de 20 mm y 50° de campo aparente.</p>`,
            partes: [
              { id: "a", pregunta: "Aumento", tipo: "num", unidad: "×", respuesta: 45,
                pistas: ["Focal del telescopio entre focal del ocular."],
                solucion: R`$900/20 = 45$ aumentos.` },
              { id: "b", pregunta: "Pupila de salida", tipo: "num", unidad: "mm", respuesta: 2.89, tol: 0.02,
                pistas: ["Abertura entre aumento."],
                solucion: R`$130/45 = 2{,}89$ mm.` },
              { id: "c", pregunta: "Campo real", tipo: "num", unidad: "°", respuesta: 1.11, tol: 0.02,
                pistas: ["Campo aparente entre aumento."],
                solucion: R`$50^\circ/45 = 1{,}11^\circ$, algo más de dos lunas llenas.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Una cámara en el telescopio",
            enunciado: R`<p>Una cámara con píxeles de 4,63 µm y 4144 píxeles de ancho se acopla a un telescopio de 650 mm de focal.</p>`,
            partes: [
              { id: "a", pregunta: "Escala de píxel", tipo: "num", unidad: "″/píxel", respuesta: 1.47, tol: 0.02,
                errores: [{ v: 1469, msg: "Pasa el tamaño del píxel a milímetros: 4,63 µm son 0,00463 mm." }],
                pistas: ["206 265 × tamaño del píxel / focal, con las dos longitudes en milímetros."],
                solucion: R`$206\,265 \times \dfrac{0{,}00463}{650} = 1{,}47''$ por píxel.` },
              { id: "b", pregunta: "Campo que abarca el ancho del sensor, en grados", tipo: "num", unidad: "°", respuesta: 1.69, tol: 0.02,
                pistas: ["Multiplica la escala por el número de píxeles y pasa de segundos de arco a grados."],
                solucion: R`$4144 \times 1{,}47 = 6090'' = 1{,}69^\circ$. La galaxia de Andrómeda, con casi 3° de largo, no cabe.` },
              { id: "c", pregunta: "Sin seguimiento, ¿cuánto tarda una estrella del ecuador celeste en cruzar un píxel?", tipo: "num", unidad: "s", respuesta: 0.098, tol: 0.03,
                pistas: ["El cielo se mueve 15,04″ por segundo."],
                solucion: R`$1{,}47/15{,}04 = 0{,}098$ s. En una décima de segundo la estrella ya ha cambiado de píxel: sin una montura que siga el cielo no hay exposiciones largas.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Señal y ruido",
            enunciado: R`<p>Usa $S/R = \sqrt{N}$ sin fondo y $S/R = S/\sqrt{S + B}$ con fondo de cielo.</p>`,
            partes: [
              { id: "a", pregunta: "Relación señal/ruido con 400 fotones detectados", tipo: "num", respuesta: 20,
                pistas: ["Es la raíz cuadrada del número de fotones."],
                solucion: R`$\sqrt{400} = 20$.` },
              { id: "b", pregunta: "Una estrella entrega 50 fotones por segundo. ¿Cuánto hay que exponer para llegar a S/R = 100?", tipo: "num", unidad: "s", respuesta: 200,
                errores: [{ v: 2, msg: "La señal/ruido es la raíz del número de fotones. Para S/R = 100 hacen falta 100² fotones." }],
                pistas: ["Hacen falta 10 000 fotones."],
                solucion: R`$N = 100^{2} = 10\,000$ fotones. $t = 10\,000/50 = 200$ s.` },
              { id: "c", pregunta: "Con 10 000 fotones de la estrella y 30 000 de fondo de cielo en la misma zona, ¿cuál es la S/R?", tipo: "num", respuesta: 50,
                errores: [{ v: 100, msg: "Ese valor ignora el fondo. Sus fluctuaciones también cuentan dentro de la raíz." }],
                pistas: ["S / √(S + B) = 10 000 / √40 000."],
                solucion: R`$\dfrac{10\,000}{\sqrt{40\,000}} = \dfrac{10\,000}{200} = 50$. El cielo brillante ha reducido la calidad a la mitad.` },
              { id: "d", pregunta: "Al promediar 16 exposiciones iguales, la S/R mejora en un factor:", tipo: "opcion", respuesta: 1,
                opciones: ["2", "4", "8", "16"],
                pistas: ["Mejora con la raíz del número de exposiciones."],
                solucion: R`$\sqrt{16} = 4$.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Comprueba la raíz de N</h3>
<p>Este programa simula 5000 exposiciones para tres niveles de luz y mide la fluctuación:</p>
<div class="tabla"><pre>import numpy as np

for N in [100, 10000, 1000000]:
    medidas = np.random.poisson(N, 5000)
    ruido = medidas.std()
    print(N, round(ruido, 1), round(N / ruido, 1))</pre></div>
<p>La segunda columna debe salir cerca de 10, 100 y 1000, y la tercera, que es la relación señal/ruido, también.</p>
<h3>Diseña tu equipo sobre el papel</h3>
<p>Busca en una tienda de astronomía las características de dos telescopios que te llamen la atención, por ejemplo un Dobson de 150 o 200 mm y un refractor de 80 mm. Para cada uno calcula:</p>
<ol>
<li>Relación focal, ganancia de luz y magnitud límite.</li>
<li>Poder de resolución.</li>
<li>Aumento, pupila de salida y campo con los oculares que incluye.</li>
<li>Aumento máximo útil. Si el fabricante anuncia más, desconfía.</li>
</ol>
<p>Después consulta un mapa de contaminación lumínica y localiza el cielo oscuro más cercano a tu casa. Esa información pesa tanto como el telescopio en la decisión.</p>
<div class="nota"><strong>Una sugerencia sin prisa.</strong> No hace falta comprar nada todavía. Unos prismáticos 10×50 y un cielo oscuro enseñan más que un telescopio mediocre en una ciudad. Cuando llegue el momento, la abertura y la solidez de la montura son los dos criterios que más importan.</div>`,
          notas: [{ id: "equipo", label: "Los dos telescopios comparados, con sus números, y el cielo oscuro más cercano" }],
          tareasTitulo: "Lista de la práctica",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Ejecutar la simulación de Poisson y comprobar la raíz de N." },
            { id: "t2", texto: "Calcular los números de dos telescopios reales." },
            { id: "t3", texto: "Localizar en un mapa de contaminación lumínica un sitio oscuro al que pueda ir." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Refractor, Newton o catadióptrico.</strong> Para empezar a observar, un Dobson da la mayor abertura por euro.`,
          R`<strong>Aumento:</strong> $M = f_\text{telescopio}/f_\text{ocular}$, con un máximo útil de $2D$ en milímetros.`,
          R`<strong>La montura ecuatorial</strong> sigue el cielo con un solo eje, a 15″ por segundo.`,
          R`<strong>Ruido de fotones:</strong> $S/R = \sqrt{N}$. La calidad mejora con la raíz del tiempo de exposición.`,
          R`<strong>El fondo de cielo también mete ruido:</strong> $S/R = S/\sqrt{S + B}$. Un cielo oscuro es parte del equipo.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 21 ───────────────────────── */
    {
      id: "leccion-21", n: 21, fase: 2, codigo: "A2.4",
      titulo: "La transformada de Fourier",
      sub: "Descomponer cualquier señal en frecuencias, y por qué esa misma operación describe la difracción y la interferometría.",
      horas: "6 horas",
      contexto: "Series de Fourier, armónicos, ortogonalidad; onda cuadrada = (4/pi) suma de sen(n omega t)/n con n impar; transformada F(nu) = integral de f(t) e^(-2 pi i nu t) dt; pulso rectangular de duración tau tiene transformada tau sinc con primer cero en nu = 1/tau; relación de anchuras delta t por delta nu del orden de 1; muestreo y Nyquist, frecuencia máxima 1/(2 delta t), aliasing; transformada discreta, resolución en frecuencia 1/(N delta t); usos en astronomía: periodos de púlsares y estrellas variables, difracción como transformada de la abertura, interferometría.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Cualquier señal, por irregular que sea, se puede escribir como una suma de senos y cosenos de distintas frecuencias. La transformada de Fourier es la receta que dice cuánto hay de cada frecuencia.</p>
<p>Un acorde de piano es una sola onda de presión complicada. El oído la separa en notas sin esfuerzo. Eso es un análisis de Fourier. Un prisma hace lo mismo con la luz, y un analizador de espectros con una señal eléctrica.</p>
<div class="nota"><strong>Esta herramienta la conoces mejor que casi nadie que empieza en astronomía.</strong> Espectros, ancho de banda, muestreo, Nyquist: es tu oficio. Lo nuevo de esta lección no son las matemáticas, sino dónde aparecen. La imagen de una estrella en un telescopio es la transformada de Fourier de la abertura. Un interferómetro mide directamente la transformada de Fourier del cielo. Y casi todos los planetas y púlsares conocidos se han encontrado buscando un pico en un espectro.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Series de Fourier</h3>
<p>Una señal que se repite con periodo $T$ se puede escribir como suma de una frecuencia fundamental $\omega = 2\pi/T$ y sus múltiplos, los <em>armónicos</em>:</p>
$$f(t) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\left[a_n\cos(n\omega t) + b_n\sin(n\omega t)\right]$$
<p>El símbolo $\sum$ indica una suma sobre todos los valores de $n$. Los coeficientes $a_n$ y $b_n$ dicen cuánto pesa cada armónico.</p>

<h3>2. Cómo se obtienen los coeficientes</h3>
<p>La clave es una propiedad llamada <em>ortogonalidad</em>. Si multiplicas dos armónicos distintos y sumas el producto a lo largo de un periodo, las partes positivas y negativas se compensan exactamente y el resultado es cero. Solo el producto de un armónico por sí mismo da algo distinto de cero, porque un seno al cuadrado es siempre positivo y su valor medio es $1/2$.</p>
<p>Así que para extraer el peso de un armónico se multiplica la señal por ese armónico y se integra. Todos los demás desaparecen:</p>
$$a_n = \frac{2}{T}\int_0^T f(t)\cos(n\omega t)\,dt \qquad b_n = \frac{2}{T}\int_0^T f(t)\sin(n\omega t)\,dt$$
<p>Es la misma operación que hace un receptor al mezclar la señal con un oscilador local y filtrar: solo sobrevive la componente que coincide con él.</p>

<h3>3. Un ejemplo: la onda cuadrada</h3>
<p>Una onda cuadrada que alterna entre $+1$ y $-1$ tiene esta serie:</p>
$$f(t) = \frac{4}{\pi}\left[\sin(\omega t) + \frac{\sin(3\omega t)}{3} + \frac{\sin(5\omega t)}{5} + \dots\right]$$
<p>Solo aparecen los armónicos impares, y su peso decrece como $1/n$. Los armónicos altos son los responsables de los flancos abruptos: todo cambio brusco en el tiempo exige frecuencias altas.</p>

<h3>4. La transformada</h3>
<p>Para señales que no se repiten, la suma sobre armónicos se convierte en una integral sobre todas las frecuencias. Con la notación compleja de la Lección 15, senos y cosenos se reúnen en una exponencial:</p>
$$F(\nu) = \int_{-\infty}^{\infty} f(t)\,e^{-2\pi i\,\nu t}\,dt$$
<p>$F(\nu)$ es un número complejo para cada frecuencia $\nu$. Su módulo dice cuánta señal hay en esa frecuencia y su argumento con qué fase. El módulo al cuadrado, $|F(\nu)|^{2}$, es el <em>espectro de potencia</em>. La operación es reversible: conocida $F(\nu)$ se recupera $f(t)$.</p>

<h3>5. El par más útil: rectángulo y sinc</h3>
<p>Calculamos la transformada de un pulso rectangular de altura 1 y duración $\tau$, centrado en cero. La integral solo se extiende mientras dura el pulso:</p>
$$F(\nu) = \int_{-\tau/2}^{\tau/2} e^{-2\pi i\,\nu t}\,dt = \left[\frac{e^{-2\pi i\,\nu t}}{-2\pi i\,\nu}\right]_{-\tau/2}^{\tau/2} = \frac{e^{i\pi\nu\tau} - e^{-i\pi\nu\tau}}{2\pi i\,\nu}$$
<p>Por la fórmula de Euler, la diferencia de exponenciales del numerador vale $2i\sin(\pi\nu\tau)$:</p>
$$F(\nu) = \frac{\sin(\pi\nu\tau)}{\pi\nu} = \tau\,\frac{\sin(\pi\nu\tau)}{\pi\nu\tau}$$
<p>Es la función <em>sinc</em>: un lóbulo central y lóbulos laterales cada vez menores. Se anula por primera vez cuando $\pi\nu\tau = \pi$, es decir, en:</p>
$$\nu = \frac{1}{\tau}$$

<h3>6. Estrecho en un lado, ancho en el otro</h3>
<p>Un pulso más corto tiene un espectro más ancho, y al revés. Las anchuras cumplen siempre, salvo un factor numérico:</p>
$$\Delta t \cdot \Delta\nu \sim 1$$
<p>Ahora la conexión con la óptica. Una rendija de anchura $D$ es un rectángulo en el espacio. Su patrón de difracción resulta ser la transformada de Fourier de ese rectángulo, y el primer cero de la sinc, $\nu = 1/\tau$, se traduce en $\sin\theta = \lambda/D$: el resultado de la Lección 19. La regla general es la misma: <strong>una abertura estrecha da un haz ancho</strong>. El poder de resolución de un telescopio es esta relación de anchuras aplicada al espacio.</p>

<h3>7. Muestreo</h3>
<p>En la práctica no se tiene la señal continua, sino $N$ muestras tomadas cada $\Delta t$. Dos consecuencias:</p>
<ul>
<li><strong>Frecuencia máxima.</strong> Hacen falta al menos dos muestras por ciclo para reconocer una oscilación. La frecuencia más alta que se puede medir es la de <em>Nyquist</em>, $\nu_\text{máx} = 1/(2\Delta t)$. Una frecuencia mayor no desaparece: se disfraza de otra más baja. Es el <em>aliasing</em>.</li>
<li><strong>Resolución.</strong> Dos frecuencias se distinguen si a lo largo de toda la observación llegan a desfasarse un ciclo. La resolución es el inverso de la duración total: $\Delta\nu = 1/(N\Delta t)$.</li>
</ul>
<p>La versión para muestras es la transformada discreta, que los ordenadores calculan con un algoritmo muy eficiente, la FFT.</p>

<h3>8. Dónde aparece en astronomía</h3>
<ul>
<li><strong>Buscar periodos.</strong> Un púlsar, una estrella variable o un planeta que transita dejan una señal periódica enterrada en ruido. En el espectro de potencia aparece como un pico.</li>
<li><strong>Difracción.</strong> La imagen de un punto es la transformada de la abertura del telescopio.</li>
<li><strong>Interferometría.</strong> Cada pareja de antenas mide un valor de la transformada de Fourier del cielo. Es el tema de la próxima lección.</li>
</ul>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Buscar un púlsar</h3>
<p>Un radiotelescopio registra la potencia recibida de una región del cielo, una muestra cada milisegundo, durante 10 segundos.</p>
<p><strong>Número de muestras:</strong> $N = 10/0{,}001 = 10\,000$.</p>
<p><strong>Frecuencia máxima</strong> que se puede detectar:</p>
$$\nu_\text{máx} = \frac{1}{2\Delta t} = \frac{1}{2 \times 0{,}001} = 500\ \text{Hz}$$
<p><strong>Resolución en frecuencia:</strong></p>
$$\Delta\nu = \frac{1}{N\Delta t} = \frac{1}{10\ \text{s}} = 0{,}1\ \text{Hz}$$
<p>El púlsar del Cangrejo gira unas 30 veces por segundo: su periodo ronda los 33 ms. En el espectro de potencia aparecerá un pico en 30 Hz. Como cada casilla del espectro mide 0,1 Hz, caerá en la casilla número $30/0{,}1 = 300$.</p>
<p>Los pulsos son muy estrechos comparados con el periodo. Por la sección 3, un perfil con flancos abruptos tiene armónicos intensos: junto al pico de 30 Hz aparecerán otros en 60, 90 y 120 Hz. Lejos de ser un estorbo, esa peineta de picos equidistantes es la firma con la que se reconoce un púlsar.</p>
<p>Para medir el periodo con más precisión no sirve muestrear más rápido. Hay que observar más tiempo: con 1000 segundos la resolución baja a 0,001 Hz.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Armónicos",
            enunciado: R`<p>Usa la serie de la onda cuadrada de la sección 3.</p>`,
            partes: [
              { id: "a", pregunta: "Frecuencia fundamental de una señal de periodo 4 ms", tipo: "num", unidad: "Hz", respuesta: 250,
                errores: [{ v: 0.25, msg: "Pasa el periodo a segundos: 4 ms son 0,004 s." }],
                pistas: ["La frecuencia es el inverso del periodo, en segundos."],
                solucion: R`$1/0{,}004 = 250$ Hz.` },
              { id: "b", pregunta: "En una onda cuadrada, amplitud del tercer armónico respecto a la del fundamental", tipo: "num", respuesta: 0.333, tol: 0.02,
                pistas: ["Los pesos decrecen como 1/n."],
                solucion: R`$1/3 = 0{,}333$.` },
              { id: "c", pregunta: "¿Qué frecuencias contiene una onda cuadrada de 250 Hz?", tipo: "opcion", respuesta: 2,
                opciones: ["Solo 250 Hz", "250, 500, 750, 1000 Hz y sucesivas", "250, 750, 1250 Hz y sucesivas", "Todas las frecuencias por encima de 250 Hz"],
                pistas: ["Solo aparecen los armónicos impares."],
                solucion: R`Los múltiplos impares: 250, 750, 1250 Hz y así sucesivamente.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Pulsos y muestreo",
            enunciado: R`<p>Usa el primer cero de la sinc, $\nu = 1/\tau$, y la frecuencia de Nyquist.</p>`,
            partes: [
              { id: "a", pregunta: "Un pulso rectangular dura 1 µs. ¿En qué frecuencia está el primer cero de su espectro, en MHz?", tipo: "num", unidad: "MHz", respuesta: 1,
                pistas: ["ν = 1/τ, con τ = 10⁻⁶ s."],
                solucion: R`$1/10^{-6}\ \text{s} = 10^{6}$ Hz $= 1$ MHz.` },
              { id: "b", pregunta: "Se muestrea una señal a 2000 muestras por segundo. ¿Cuál es la frecuencia más alta que se puede medir?", tipo: "num", unidad: "Hz", respuesta: 1000,
                pistas: ["La mitad de la frecuencia de muestreo."],
                solucion: R`$2000/2 = 1000$ Hz.` },
              { id: "c", pregunta: "En esa misma grabación hay un tono de 1300 Hz. ¿En qué frecuencia aparece en el espectro?", tipo: "num", unidad: "Hz", respuesta: 700,
                errores: [{ v: 1300, msg: "1300 Hz supera la frecuencia de Nyquist: no puede aparecer en su sitio." }, { v: 300, msg: "No se refleja respecto a 1000 Hz restando: aparece en la frecuencia de muestreo menos la del tono." }],
                pistas: ["Las frecuencias por encima de Nyquist se pliegan: aparecen en la frecuencia de muestreo menos la suya."],
                solucion: R`$2000 - 1300 = 700$ Hz. Es un alias: un tono falso, indistinguible de uno real de 700 Hz.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Buscar periodos en el cielo",
            enunciado: R`<p>Se mide el brillo de una estrella variable una vez cada 0,5 días, durante 100 días.</p>`,
            partes: [
              { id: "a", pregunta: "Resolución en frecuencia, en ciclos por día", tipo: "num", unidad: "d⁻¹", respuesta: 0.01,
                pistas: ["Es el inverso de la duración total."],
                solucion: R`$1/100 = 0{,}01$ ciclos por día.` },
              { id: "b", pregunta: "Periodo más corto que se puede detectar sin ambigüedad", tipo: "num", unidad: "días", respuesta: 1,
                errores: [{ v: 0.5, msg: "Hacen falta dos muestras por ciclo. El periodo mínimo es el doble del intervalo entre medidas." }],
                pistas: ["La frecuencia de Nyquist es 1 / (2 × 0,5 días)."],
                solucion: R`$\nu_\text{máx} = 1$ ciclo por día, luego el periodo mínimo es 1 día.` },
              { id: "c", pregunta: "El primer púlsar descubierto, en 1967, tiene un periodo de 1,337 s. ¿En qué frecuencia aparece su pico?", tipo: "num", unidad: "Hz", respuesta: 0.748, tol: 0.01,
                pistas: ["La frecuencia es el inverso del periodo."],
                solucion: R`$1/1{,}337 = 0{,}748$ Hz. Lo encontró Jocelyn Bell revisando a mano los registros en papel.` },
              { id: "d", pregunta: "Dos estrellas variables tienen periodos casi iguales y sus picos se confunden en el espectro. Para separarlos conviene:", tipo: "opcion", respuesta: 0,
                opciones: ["Observar durante más tiempo", "Tomar medidas más seguidas", "Usar un telescopio mayor", "Restar el valor medio de la señal"],
                pistas: ["¿De qué depende la resolución en frecuencia?"],
                solucion: R`Observar durante más tiempo. La resolución es $1/(N\Delta t)$, el inverso de la duración total. Medir más seguido solo sube la frecuencia máxima.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Encuentra una señal enterrada en ruido</h3>
<p>El programa fabrica una señal de 30 Hz cinco veces más débil que el ruido, y la busca con la FFT.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

dt = 0.001                               # una muestra cada milisegundo
t = np.arange(0, 10, dt)                 # diez segundos
senal = 0.2 * np.sin(2 * np.pi * 30 * t)
ruido = np.random.normal(0, 1, len(t))
datos = senal + ruido

plt.plot(t[:500], datos[:500])           # medio segundo de datos
plt.show()

potencia = np.abs(np.fft.rfft(datos))**2
frec = np.fft.rfftfreq(len(t), dt)

plt.plot(frec, potencia)
plt.xlim(0, 100)
plt.show()

print("pico en", frec[potencia[1:].argmax() + 1], "Hz")</pre></div>
<ol>
<li>Mira la primera gráfica. No se aprecia ninguna oscilación.</li>
<li>Mira la segunda. El pico en 30 Hz destaca con claridad. La FFT ha concentrado en una casilla toda la señal, mientras que el ruido se reparte entre las 5000.</li>
<li>Baja la amplitud de <code>0.2</code> a <code>0.05</code>. ¿Sigue viéndose? Alarga la observación de 10 a 100 segundos y vuelve a mirar.</li>
<li>Cambia la frecuencia de la señal a 700 Hz, por encima de Nyquist. ¿Dónde aparece el pico?</li>
</ol>`,
          notas: [{ id: "fft", label: "Hasta qué amplitud se ve el pico con 10 y con 100 segundos, y dónde aparece la señal de 700 Hz" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Toda señal es una suma de senos y cosenos.</strong> La transformada de Fourier dice cuánto hay de cada frecuencia.`,
          R`<strong>Un rectángulo de duración $\tau$</strong> tiene por transformada una sinc con el primer cero en $1/\tau$.`,
          R`<strong>Estrecho en un dominio, ancho en el otro:</strong> $\Delta t \cdot \Delta\nu \sim 1$. Es el origen del límite de difracción.`,
          R`<strong>Muestreo:</strong> la frecuencia máxima es $1/(2\Delta t)$ y la resolución es $1/(N\Delta t)$.`,
          R`<strong>Una señal periódica débil</strong> se vuelve evidente en el espectro de potencia. Así se encuentran púlsares y planetas.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 22 ───────────────────────── */
    {
      id: "leccion-22", n: 22, fase: 2, codigo: "B3.5",
      titulo: "Radioastronomía e interferometría",
      sub: "Cómo se consigue con antenas separadas la nitidez de un telescopio del tamaño de la Tierra.",
      horas: "6 horas",
      contexto: "Radiotelescopio: área efectiva A_e = eta pi D^2 / 4, haz 1,22 lambda/D; temperatura de antena T_A = S A_e / (2k), un receptor recoge una polarización; ecuación del radiómetro delta T = T_sis / raíz(B t); interferómetro de dos elementos: retardo geométrico tau = b sen(theta)/c, franjas separadas lambda/b, resolución lambda/b_max; cada línea de base mide una componente de Fourier del cielo (visibilidad), síntesis de abertura por rotación terrestre; N antenas dan N(N-1)/2 líneas de base; VLA, ALMA, VLBI, Event Horizon Telescope (1,3 mm, unos 25 microsegundos de arco, anillo de M87* de 42 microsegundos de arco).",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">En la Lección 19 salió una cuenta desalentadora: para ver en radio con la nitidez del Hubble haría falta una antena de 900 km. La interferometría es la manera de conseguirlo sin construirla.</p>
<p>La idea es que el detalle fino depende de la distancia entre los extremos de la abertura, no de que la abertura esté llena. Si colocas dos antenas pequeñas en los extremos de donde estaría la antena gigante y combinas sus señales respetando la fase, obtienes parte de la información que daría la grande. Con más antenas y más separaciones distintas, la vas completando.</p>
<div class="nota"><strong>Estás en casa.</strong> Una agrupación de antenas con conformación de haz, un receptor superheterodino, un correlador, la ecuación del enlace: todo lo que sigue es ingeniería de telecomunicación aplicada a fuentes muy débiles y muy lejanas. La diferencia principal es que aquí no hay emisor que coopere, y la señal es ruido que hay que distinguir de otro ruido mucho mayor.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El radiotelescopio</h3>
<p>Es una antena de gran ganancia con un receptor de muy bajo ruido. El reflector parabólico concentra la onda en el alimentador, y un amplificador enfriado a unos 15 o 20 K hace la primera etapa.</p>
<p>No toda la superficie se aprovecha. El <em>área efectiva</em> es el área geométrica multiplicada por una eficiencia $\eta$, normalmente entre 0,5 y 0,7:</p>
$$A_e = \eta\,\frac{\pi D^{2}}{4}$$
<p>La anchura de su haz es el límite de difracción de la Lección 19, $\theta \approx 1{,}22\,\lambda/D$.</p>

<h3>2. Temperatura de antena</h3>
<p>En la Lección 16 calculamos la potencia de una fuente como $S\,A\,B$. Un receptor recoge una sola polarización, la mitad de la potencia de una fuente no polarizada:</p>
$$P = \frac{1}{2}\,S\,A_e\,B$$
<p>En radio, las potencias se expresan como temperaturas. Se llama <em>temperatura de antena</em> $T_A$ a la temperatura de una resistencia que entregaría esa misma potencia de ruido, $P = k\,T_A\,B$. Igualando las dos expresiones, el ancho de banda se cancela:</p>
$$T_A = \frac{S\,A_e}{2k}$$
<p>La señal de la fuente se suma a la <em>temperatura de sistema</em> $T_\text{sis}$, que reúne el ruido del receptor, el de la atmósfera, el del suelo que se cuela por los lóbulos laterales y el fondo cósmico. Lo normal es que $T_A$ sea una fracción minúscula de $T_\text{sis}$.</p>

<h3>3. La ecuación del radiómetro</h3>
<p>¿Cómo se detecta un aumento de milésimas de kelvin sobre un ruido de decenas? Promediando, como en la Lección 20.</p>
<p>Una señal de ancho de banda $B$ produce un valor independiente cada $1/B$ segundos, por la relación de anchuras de la lección anterior. En un tiempo $t$ se reúnen $B\,t$ valores independientes. Cada uno fluctúa del orden de $T_\text{sis}$, y el promedio de $n$ valores fluctúa $\sqrt{n}$ veces menos:</p>
$$\Delta T = \frac{T_\text{sis}}{\sqrt{B\,t}}$$
<p>Es la <strong>ecuación del radiómetro</strong>. Dice cuál es la señal más débil que se puede distinguir. Mejora con más ancho de banda, con más tiempo y, sobre todo, con un receptor más frío.</p>

<h3>4. El interferómetro de dos antenas</h3>
<p>Dos antenas separadas una distancia $b$, la <em>línea de base</em>, observan una fuente que está a un ángulo $\theta$ de la vertical. El frente de onda llega antes a una que a otra. El camino adicional es $b\sin\theta$, y el <em>retardo geométrico</em>:</p>
$$\tau = \frac{b\sin\theta}{c}$$
<p>Las dos señales se multiplican y se promedian en un <em>correlador</em>. El resultado depende del desfase entre ellas, que por la Lección 15 es $2\pi\,b\sin\theta/\lambda$. Cuando la Tierra gira y la fuente cruza el cielo, la salida oscila entre máximos y mínimos: son las <em>franjas</em>. Dos máximos consecutivos están separados un ángulo:</p>
$$\theta_\text{franja} = \frac{\lambda}{b}$$
<p>Es el ejemplo de la Lección 15, ahora con nombre.</p>

<h3>5. Resolución</h3>
<p>Una fuente de tamaño angular menor que la separación entre franjas produce franjas nítidas. Una fuente mayor cubre varias franjas a la vez y las emborrona. De cuánto se emborronan se deduce su tamaño. El detalle más fino que distingue un conjunto de antenas lo fija la línea de base más larga:</p>
$$\theta \approx \frac{\lambda}{b_\text{máx}}$$

<h3>6. Cada línea de base mide una componente de Fourier</h3>
<p>Este es el resultado central, y se enuncia sin demostración: la salida del correlador para una línea de base, llamada <em>visibilidad</em>, es el valor de la transformada de Fourier de la distribución de brillo del cielo, en la frecuencia espacial $b/\lambda$.</p>
<ul>
<li>Las líneas de base cortas miden las estructuras grandes y suaves.</li>
<li>Las líneas de base largas miden el detalle fino.</li>
</ul>
<p>Si se midieran todas las frecuencias espaciales, bastaría invertir la transformada para obtener la imagen. Con $N$ antenas hay tantas líneas de base como parejas:</p>
$$\frac{N\,(N - 1)}{2}$$
<p>Además, la rotación de la Tierra cambia la orientación de cada línea de base vista desde la fuente, de modo que a lo largo de unas horas cada pareja mide muchas componentes distintas. Esa técnica, la <em>síntesis de abertura</em>, le valió a Martin Ryle el premio Nobel de 1974.</p>

<h3>7. Los grandes instrumentos</h3>
<div class="tabla"><table>
<thead><tr><th>Instrumento</th><th>Antenas</th><th>Separación máxima</th><th>Banda</th></tr></thead>
<tbody>
<tr><td>VLA, Nuevo México</td><td>27 de 25 m</td><td>36 km</td><td>Centimétrica</td></tr>
<tr><td>ALMA, Chile</td><td>66 de 12 y 7 m</td><td>16 km</td><td>Milimétrica</td></tr>
<tr><td>VLBI</td><td>Antenas de varios continentes</td><td>Miles de km</td><td>Centimétrica y milimétrica</td></tr>
<tr><td>Event Horizon Telescope</td><td>Una red de VLBI a 1,3 mm</td><td>Unos 10 000 km</td><td>Milimétrica</td></tr>
</tbody></table></div>
<p>En VLBI las antenas están demasiado lejos para unirlas por cable. Cada una graba su señal con la referencia de un reloj atómico, y la correlación se hace después.</p>

<h3>8. Lo que la interferometría no da</h3>
<ul>
<li><strong>Área colectora.</strong> La sensibilidad es la de la suma de las antenas, no la de una antena del tamaño de la red.</li>
<li><strong>Todas las frecuencias espaciales.</strong> Siempre quedan huecos, sobre todo en las separaciones más cortas. La imagen se reconstruye con algoritmos que rellenan lo que falta con hipótesis razonables.</li>
</ul>
<p>Las imágenes de un interferómetro son por eso reconstrucciones. Cuando se publicó la primera imagen de la sombra de un agujero negro, en 2019, cuatro equipos la reconstruyeron por separado con métodos distintos para comprobar que el anillo no dependía del algoritmo.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La resolución del Event Horizon Telescope</h3>
<p>Observa a $\lambda = 1{,}3$ mm con líneas de base de hasta unos 10 000 km.</p>
$$\theta \approx \frac{\lambda}{b} = \frac{1{,}3 \times 10^{-3}}{1{,}0 \times 10^{7}} = 1{,}3 \times 10^{-10}\ \text{rad}$$
<p>En segundos de arco:</p>
$$1{,}3 \times 10^{-10} \times 206\,265 = 2{,}7 \times 10^{-5}{}'' = 27\ \text{microsegundos de arco}$$
<p>Es el tamaño aparente de una naranja en la Luna.</p>
<p><strong>¿Basta para ver un agujero negro?</strong> El anillo medido en la galaxia M87 tiene un diámetro de 42 microsegundos de arco, vez y media la resolución. Se distingue, pero por poco: por eso la imagen es borrosa.</p>
<p><strong>Tamaño real del anillo.</strong> M87 está a 16,8 megapársecs. Con la fórmula del tamaño angular de la Lección 2:</p>
$$\theta = \frac{42 \times 10^{-6}}{206\,265} = 2{,}04 \times 10^{-10}\ \text{rad}$$
$$D = \theta\,d = 2{,}04 \times 10^{-10} \times 16{,}8 \times 10^{6} \times 3{,}086 \times 10^{16}\ \text{m} = 1{,}06 \times 10^{14}\ \text{m}$$
<p>Son unas 700 UA, más de veinte veces el tamaño de la órbita de Neptuno. En la Fase 4 calcularás la masa que hace falta para producir una sombra así.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Antenas y líneas de base",
            enunciado: R`<p>Usa $\theta = 1{,}22\,\lambda/D$ para una antena y $N(N-1)/2$ para las líneas de base.</p>`,
            partes: [
              { id: "a", pregunta: "Anchura del haz de una antena de 25 m a 6 cm, en minutos de arco", tipo: "num", unidad: "′", respuesta: 10.1, tol: 0.02,
                errores: [{ v: 604, msg: "Ese valor está en segundos de arco. Divide entre 60." }],
                pistas: ["Calcula en radianes, multiplica por 206 265 y divide entre 60."],
                solucion: R`$1{,}22 \times \dfrac{0{,}06}{25} = 2{,}93 \times 10^{-3}$ rad $= 604'' = 10{,}1'$.` },
              { id: "b", pregunta: "Líneas de base del VLA, con 27 antenas", tipo: "num", respuesta: 351,
                errores: [{ v: 702, msg: "Has contado cada pareja dos veces. Divide entre 2." }],
                pistas: ["27 × 26 / 2."],
                solucion: R`$\dfrac{27 \times 26}{2} = 351$.` },
              { id: "c", pregunta: "Líneas de base de ALMA, con 66 antenas", tipo: "num", respuesta: 2145,
                pistas: ["66 × 65 / 2."],
                solucion: R`$\dfrac{66 \times 65}{2} = 2145$. El número de líneas de base crece con el cuadrado del número de antenas.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Franjas y retardos",
            enunciado: R`<p>Usa $\theta \approx \lambda/b$ y $\tau = b\sin\theta/c$, con $c = 2{,}998 \times 10^{8}$ m/s.</p>`,
            partes: [
              { id: "a", pregunta: "Resolución del VLA a 6 cm con su separación máxima de 36 km", tipo: "num", unidad: "″", respuesta: 0.344, tol: 0.02,
                pistas: ["λ/b en radianes, por 206 265."],
                solucion: R`$\dfrac{0{,}06}{36\,000} = 1{,}67 \times 10^{-6}$ rad $= 0{,}344''$. Frente a los $604''$ de una sola de sus antenas, 1750 veces más fino.` },
              { id: "b", pregunta: "Separación entre franjas para una línea de base de 1 km a 21,1 cm", tipo: "num", unidad: "″", respuesta: 43.5, tol: 0.02,
                pistas: ["λ/b = 0,211 / 1000 rad."],
                solucion: R`$2{,}11 \times 10^{-4}$ rad $\times 206\,265 = 43{,}5''$.` },
              { id: "c", pregunta: "Retardo geométrico con esa línea de base y una fuente a 30° de la vertical, en microsegundos", tipo: "num", unidad: "µs", respuesta: 1.67, tol: 0.02,
                pistas: ["El camino adicional es 1000 × sen 30° = 500 m."],
                solucion: R`$\tau = \dfrac{500}{2{,}998 \times 10^{8}} = 1{,}67 \times 10^{-6}$ s. El correlador tiene que compensar este retardo, que cambia de forma continua con la rotación de la Tierra.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Sensibilidad",
            enunciado: R`<p>Usa $\Delta T = T_\text{sis}/\sqrt{B\,t}$ y $T_A = S\,A_e/2k$, con $k = 1{,}381 \times 10^{-23}$ J/K y $1\ \text{Jy} = 10^{-26}$ en el SI.</p>`,
            partes: [
              { id: "a", pregunta: "Ruido con T_sis = 30 K, B = 100 MHz y t = 1 s, en milikelvin", tipo: "num", unidad: "mK", respuesta: 3,
                errores: [{ v: 0.003, msg: "Ese valor está en kelvin. Se pide en milikelvin." }],
                pistas: ["B · t = 10⁸, y su raíz es 10⁴."],
                solucion: R`$\dfrac{30}{\sqrt{10^{8}}} = \dfrac{30}{10^{4}} = 3 \times 10^{-3}$ K $= 3$ mK. En un segundo, el promedio ha reducido el ruido diez mil veces.` },
              { id: "b", pregunta: "¿Cuánto tiempo hay que integrar para bajar el ruido a 0,1 mK?", tipo: "num", unidad: "s", respuesta: 900,
                errores: [{ v: 30, msg: "El ruido baja con la raíz del tiempo. Para reducirlo 30 veces hace falta 30² veces más tiempo." }],
                pistas: ["Hay que reducir el ruido 30 veces respecto al apartado anterior."],
                solucion: R`Reducir el ruido 30 veces exige $30^{2} = 900$ veces más tiempo: 900 s, un cuarto de hora.` },
              { id: "c", pregunta: "Temperatura de antena que produce una fuente de 1 Jy en una antena con A_e = 5500 m²", tipo: "num", unidad: "K", respuesta: 1.99, tol: 0.02,
                errores: [{ v: 3.98, msg: "Falta el factor 1/2: el receptor recoge una sola polarización." }],
                pistas: ["T_A = 10⁻²⁶ × 5500 / (2 × 1,381 × 10⁻²³)."],
                solucion: R`$\dfrac{10^{-26} \times 5500}{2 \times 1{,}381 \times 10^{-23}} = 1{,}99$ K. Es la sensibilidad de una antena de 100 m: unos 2 K por jansky.` },
              { id: "d", pregunta: "Un interferómetro duplica su separación máxima sin añadir antenas. Entonces:", tipo: "opcion", respuesta: 1,
                opciones: ["Detecta fuentes el doble de débiles y con el doble de detalle", "Distingue detalles el doble de finos, con la misma sensibilidad", "Detecta fuentes el doble de débiles, con el mismo detalle", "Nada cambia hasta que se añadan antenas"],
                pistas: ["La resolución depende de la separación. La sensibilidad, del área colectora total."],
                solucion: R`Gana detalle, pero no sensibilidad. El área colectora es la misma. Además pierde información sobre las estructuras grandes, que miden las separaciones cortas.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Construye un haz con líneas de base</h3>
<p>Cada línea de base responde al cielo con un patrón de franjas, un coseno en función del ángulo. El programa dibuja primero las franjas de una sola línea de base de 500 m, y después promedia las de ocho distintas.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

lam = 0.21                                     # longitud de onda, en metros
theta = np.linspace(-0.002, 0.002, 2000)       # ángulo, en radianes

def franjas(b):
    return np.cos(2 * np.pi * b * theta / lam)

plt.plot(theta * 206265, franjas(500))
plt.xlabel("segundos de arco")
plt.show()

bases = [100, 230, 370, 480, 610, 750, 880, 1000]
haz = sum(franjas(b) for b in bases) / len(bases)

plt.plot(theta * 206265, haz)
plt.xlabel("segundos de arco")
plt.show()</pre></div>
<ol>
<li>En la primera gráfica todas las franjas son iguales: una sola línea de base no sabe en cuál de ellas está la fuente.</li>
<li>En la segunda solo sobrevive el pico central, donde todas las líneas de base coinciden. Ese es el haz sintetizado. Mide su anchura a media altura. Sale de unos $24''$, del mismo orden que $\lambda/b_\text{máx} = 43''$: el factor exacto depende de cómo se repartan las separaciones.</li>
<li>Cambia las separaciones por otras igualmente espaciadas, de 125 en 125 m. Aparecen picos repetidos. Por eso las antenas de un interferómetro se colocan a distancias irregulares.</li>
</ol>
<div class="nota"><strong>Un proyecto a tu medida.</strong> Con una antena de bocina casera, un amplificador de bajo ruido y un receptor SDR de bajo coste se detecta la línea de 21 cm del hidrógeno de la Vía Láctea, y con el desplazamiento Doppler de la Lección 18 se mide su rotación. Es una opción seria para el proyecto final de la Fase 5, y con tu formación tienes media tarea hecha.</div>`,
          notas: [{ id: "haz", label: "Anchura del haz sintetizado, y qué pasa con separaciones regulares" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Temperatura de antena:</strong> $T_A = S\,A_e/2k$. Las potencias en radio se expresan en kelvin.`,
          R`<strong>Ecuación del radiómetro:</strong> $\Delta T = T_\text{sis}/\sqrt{B\,t}$. El ruido baja con la raíz del ancho de banda por el tiempo.`,
          R`<strong>Resolución de un interferómetro:</strong> $\theta \approx \lambda/b_\text{máx}$. Cuenta la separación, no el tamaño de las antenas.`,
          R`<strong>Cada línea de base mide una componente de Fourier del cielo.</strong> Con $N$ antenas hay $N(N-1)/2$.`,
          R`<strong>La sensibilidad sigue dependiendo del área colectora</strong>, y la imagen es una reconstrucción a partir de medidas incompletas.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 23 · REPASO ───────────────────────── */
    {
      id: "leccion-23", n: 23, fase: 2, codigo: "Repaso acumulativo",
      titulo: "Repaso de la Fase 2",
      sub: "Tres problemas sobre la luz y los instrumentos, para decidir el ritmo de la Fase 3.",
      horas: "4 horas",
      contexto: "Repaso de la Fase 2: ondas (v = lambda f), interferencia, fotones (E = 1240/lambda[nm] eV), cuerpo negro (Wien 2,898e6 nm K, Stefan-Boltzmann, L = R^2 (T/5772)^4 en unidades solares), espectros y Doppler (delta lambda / lambda = v/c), óptica (138/D[mm] segundos de arco, magnitud límite 6 + 5 log(D/7 mm), aumento), señal/ruido raíz(N), Fourier y Nyquist, radiómetro delta T = T_sis / raíz(B t), interferometría theta = lambda/b.",
      secciones: [
        { id: "mapa", titulo: "Mapa de ideas", html: R`
<p class="lead">En esta fase has aprendido a leer la luz. De un punto en el cielo ya puedes obtener la temperatura, la composición, la velocidad y el tamaño de una estrella, y sabes qué limita a los instrumentos que recogen esa luz.</p>
<div class="tabla"><table>
<thead><tr><th>Idea</th><th>Fórmula</th><th>Lección</th></tr></thead>
<tbody>
<tr><td>Relación de las ondas</td><td>$v = \lambda f$</td><td>15</td></tr>
<tr><td>Interferencia de dos ondas</td><td>$I = 4I_0\cos^{2}(\delta/2)$</td><td>15</td></tr>
<tr><td>Energía de un fotón</td><td>$E\,[\text{eV}] = 1240/\lambda\,[\text{nm}]$</td><td>16</td></tr>
<tr><td>Ley de Wien</td><td>$\lambda_\text{máx}\,T = 2{,}898 \times 10^{6}$ nm·K</td><td>17</td></tr>
<tr><td>Luminosidad</td><td>$L = 4\pi R^{2}\sigma T^{4}$</td><td>17</td></tr>
<tr><td>Líneas del hidrógeno</td><td>$1/\lambda = R\,(1/n_1^{2} - 1/n_2^{2})$</td><td>18</td></tr>
<tr><td>Efecto Doppler</td><td>$\Delta\lambda/\lambda = v/c$</td><td>18</td></tr>
<tr><td>Poder de resolución</td><td>$\theta = 1{,}22\,\lambda/D$</td><td>19</td></tr>
<tr><td>Magnitud límite</td><td>$6 + 5\log(D/7\ \text{mm})$</td><td>19</td></tr>
<tr><td>Aumento</td><td>$M = f_\text{telescopio}/f_\text{ocular}$</td><td>20</td></tr>
<tr><td>Ruido de fotones</td><td>$S/R = \sqrt{N}$</td><td>20</td></tr>
<tr><td>Muestreo</td><td>$\nu_\text{máx} = 1/(2\Delta t)$, $\Delta\nu = 1/(N\Delta t)$</td><td>21</td></tr>
<tr><td>Radiómetro</td><td>$\Delta T = T_\text{sis}/\sqrt{B\,t}$</td><td>22</td></tr>
<tr><td>Interferómetro</td><td>$\theta \approx \lambda/b$</td><td>22</td></tr>
</tbody></table></div>
<p>Hay una idea que ha aparecido cuatro veces con ropa distinta: lo estrecho en un dominio es ancho en el otro. Es el haz de una antena, el límite de difracción, la resolución en frecuencia y la resolución de un interferómetro.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "r1", nivel: 2, titulo: "Rigel, leída en su luz",
            enunciado: R`<p>Rigel, la estrella azulada de Orión, tiene una temperatura de 12 100 K y una luminosidad de unas 120 000 veces la del Sol. Se aleja de nosotros a 17,8 km/s. Usa $T_\odot = 5772$ K y $c = 2{,}998 \times 10^{5}$ km/s.</p>`,
            partes: [
              { id: "a", pregunta: "Longitud de onda de su máximo de emisión", tipo: "num", unidad: "nm", respuesta: 239.5, tol: 0.01,
                pistas: ["Ley de Wien: 2,898 × 10⁶ nm·K entre la temperatura."],
                solucion: R`$2{,}898 \times 10^{6}/12\,100 = 239{,}5$ nm, en el ultravioleta. La mayor parte de su luz no la vemos.` },
              { id: "b", pregunta: "Radio, en radios solares", tipo: "num", unidad: "R☉", respuesta: 78.8, tol: 0.03,
                pistas: ["R/R☉ = √(L/L☉) / (T/T☉)².", "T/T☉ = 2,096, y su cuadrado es 4,395."],
                solucion: R`$\dfrac{\sqrt{1{,}2 \times 10^{5}}}{4{,}395} = \dfrac{346{,}4}{4{,}395} = 78{,}8$ radios solares. Es una supergigante.` },
              { id: "c", pregunta: "Energía de un fotón en el máximo de emisión", tipo: "num", unidad: "eV", respuesta: 5.18, tol: 0.01,
                pistas: ["E = 1240 / λ, con λ en nanómetros."],
                solucion: R`$1240/239{,}5 = 5{,}18$ eV.` },
              { id: "d", pregunta: "Desplazamiento Doppler de su línea H-alfa (656,3 nm), en nanómetros", tipo: "num", unidad: "nm", respuesta: 0.039, tol: 0.03,
                pistas: ["Δλ = λ · v / c."],
                solucion: R`$656{,}3 \times \dfrac{17{,}8}{2{,}998 \times 10^{5}} = 0{,}039$ nm, hacia el rojo.` }
            ] },
          { id: "r2", nivel: 2, titulo: "Un Dobson de 150 mm",
            enunciado: R`<p>Telescopio reflector con $D = 150$ mm y $f = 1200$ mm. Pupila del ojo: 7 mm.</p>`,
            partes: [
              { id: "a", pregunta: "Relación focal", tipo: "num", respuesta: 8,
                pistas: ["N = f / D."],
                solucion: R`$1200/150 = 8$.` },
              { id: "b", pregunta: "Poder de resolución en el visible", tipo: "num", unidad: "″", respuesta: 0.92, tol: 0.02,
                pistas: ["138 / D, con D en milímetros."],
                solucion: R`$138/150 = 0{,}92''$.` },
              { id: "c", pregunta: "Aumento con un ocular de 10 mm", tipo: "num", unidad: "×", respuesta: 120,
                pistas: ["Focal del telescopio entre focal del ocular."],
                solucion: R`$1200/10 = 120$ aumentos.` },
              { id: "d", pregunta: "Magnitud límite aproximada", tipo: "num", respuesta: 12.7, tol: 0.01,
                pistas: ["6 + 5 log(150/7).", "log 21,43 = 1,331."],
                solucion: R`$6 + 5 \times 1{,}331 = 12{,}7$.` },
              { id: "e", pregunta: "Una cámara acoplada recoge 2500 fotones de una estrella. ¿Cuál es la relación señal/ruido?", tipo: "num", respuesta: 50,
                pistas: ["La raíz cuadrada del número de fotones."],
                solucion: R`$\sqrt{2500} = 50$.` }
            ] },
          { id: "r3", nivel: 3, titulo: "El hidrógeno de una galaxia, en radio",
            enunciado: R`<p>Una antena de 64 m observa la línea del hidrógeno, de 1420,406 MHz y 21,1 cm, en una galaxia que se aleja a 1500 km/s. Usa $c = 2{,}998 \times 10^{5}$ km/s.</p>`,
            partes: [
              { id: "a", pregunta: "Anchura del haz de la antena, en minutos de arco", tipo: "num", unidad: "′", respuesta: 13.8, tol: 0.02,
                pistas: ["1,22 λ / D en radianes, por 206 265, entre 60."],
                solucion: R`$1{,}22 \times \dfrac{0{,}211}{64} = 4{,}02 \times 10^{-3}$ rad $= 830'' = 13{,}8'$.` },
              { id: "b", pregunta: "¿Cuántos MHz por debajo de 1420,406 hay que sintonizar?", tipo: "num", unidad: "MHz", respuesta: 7.11, tol: 0.01,
                pistas: ["Δf = f · v / c."],
                solucion: R`$1420{,}406 \times \dfrac{1500}{2{,}998 \times 10^{5}} = 7{,}11$ MHz. La línea aparece en 1413,30 MHz.` },
              { id: "c", pregunta: "Línea de base necesaria para distinguir detalles de 1″ a esa longitud de onda, en kilómetros", tipo: "num", unidad: "km", respuesta: 43.5, tol: 0.02,
                pistas: ["θ = λ / b. Pasa 1″ a radianes dividiendo entre 206 265."],
                solucion: R`$b = \dfrac{\lambda}{\theta} = 0{,}211 \times 206\,265 = 4{,}35 \times 10^{4}$ m $= 43{,}5$ km.` },
              { id: "d", pregunta: "Ruido tras 100 s con T_sis = 25 K y un canal de 1 MHz, en milikelvin", tipo: "num", unidad: "mK", respuesta: 2.5,
                pistas: ["B · t = 10⁸."],
                solucion: R`$\dfrac{25}{\sqrt{10^{6} \times 100}} = \dfrac{25}{10^{4}} = 2{,}5$ mK.` }
            ] }
        ] },

        { id: "ritmo", titulo: "Ajuste de ritmo", html: R`
<h3>Cómo interpretar tu resultado</h3>
<div class="tabla"><table>
<thead><tr><th>Lo que ha pasado</th><th>Qué significa</th><th>Qué hacer</th></tr></thead>
<tbody>
<tr><td>Los tres problemas bien, con pocas consultas</td><td>La fase está asimilada</td><td>Pasar a la Fase 3</td></tr>
<tr><td>Dudas con el cuerpo negro o los espectros</td><td>Son la base de toda la Fase 3</td><td>Repetir los ejercicios de las lecciones 17 y 18 antes de seguir</td></tr>
<tr><td>Dudas con los números complejos o Fourier</td><td>Volverán en la física cuántica</td><td>Rehacer las prácticas de Python de las lecciones 15 y 21</td></tr>
<tr><td>Dudas con los instrumentos</td><td>No bloquean la Fase 3</td><td>Seguir adelante y volver a ellas cuando elijas telescopio</td></tr>
</tbody></table></div>
<p>Los fallos más habituales en esta fase: mezclar nanómetros con metros, olvidar que la luz recogida va con el cuadrado del diámetro y el detalle con su inverso, confundir la frecuencia de muestreo con la de Nyquist, y esperar que el ruido baje en proporción al tiempo en lugar de con su raíz.</p>
<p>La Fase 3 entra dentro de las estrellas. Ya sabes medir desde fuera su temperatura, su luminosidad y su radio. Lo siguiente es explicar por qué tienen esos valores: qué las sostiene, de dónde sacan la energía y cómo cambian con el tiempo.</p>`,
          notas: [{ id: "balance", label: "Qué te ha costado más, qué lecciones has consultado y cuántas horas reales has dedicado por semana" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La luz lleva cuatro mensajes:</strong> temperatura en el continuo, composición en las líneas, velocidad en su desplazamiento y distancia en el brillo.`,
          R`<strong>La abertura fija dos límites:</strong> cuánta luz se recoge y qué detalle se distingue.`,
          R`<strong>Todo detector lucha contra el ruido</strong>, y lo vence con la raíz del tiempo.`,
          R`<strong>Fourier une la fase:</strong> espectros, difracción e interferometría son la misma operación.`,
          R`<strong>Lo siguiente es la Fase 3:</strong> gases, equilibrio, física cuántica y fusión para entender las estrellas por dentro.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 24 ───────────────────────── */
    {
      id: "leccion-24", n: 24, fase: 3, codigo: "A3.1",
      titulo: "Gases, presión y temperatura",
      sub: "Qué significa que algo esté caliente, vista partícula a partícula, y por qué la Luna no tiene atmósfera.",
      horas: "6 horas",
      contexto: "Gas ideal P = n k T, con n partículas por metro cúbico y k = 1,381e-23 J/K = 8,617e-5 eV/K; teoría cinética P = n m <v^2> / 3; energía media por partícula 3kT/2; velocidad cuadrática media v = raíz(3 k T / m); peso molecular medio mu, P = rho k T / (mu m_H), mu = 0,5 para hidrógeno ionizado y 0,6 para la mezcla solar; factor de Boltzmann e^(-E/kT); distribución de Maxwell-Boltzmann; 1 eV equivale a 11 600 K; retención de atmósferas: velocidad de escape mayor que unas 6 veces la velocidad térmica.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Una estrella es una bola de gas. Para entender qué la sostiene hay que saber primero qué es la presión de un gas y qué relación tiene con su temperatura.</p>
<p>Un gas es una multitud de partículas que se mueven al azar y chocan entre sí y con las paredes. La <em>temperatura</em> mide la energía media de ese movimiento. La <em>presión</em> es el empuje acumulado de todos los choques. Más caliente significa partículas más rápidas, y partículas más rápidas golpean más fuerte y más a menudo.</p>
<div class="nota"><strong>La temperatura es la del ruido térmico.</strong> La potencia $kTB$ de una resistencia sale de la agitación de sus electrones, y la constante $k$ es la misma que aparece aquí. Es el factor de conversión entre temperatura y energía: $kT$ es, en orden de magnitud, la energía que tiene cada partícula por estar a temperatura $T$.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La ley de los gases ideales</h3>
<p>En un gas poco denso, la presión es proporcional al número de partículas por unidad de volumen, $n$, y a la temperatura absoluta:</p>
$$P = n\,k\,T \qquad k = 1{,}381 \times 10^{-23}\ \text{J/K}$$
<p>La presión se mide en pascales: $1\ \text{Pa} = 1\ \text{N/m}^2$. La presión atmosférica a nivel del mar es $1{,}013 \times 10^{5}$ Pa.</p>
<p>Fíjate en que no importa de qué sean las partículas. Un electrón libre cuenta lo mismo que un núcleo de hierro. Esto tendrá consecuencias en las estrellas.</p>

<h3>2. De dónde sale: los choques</h3>
<p>Tomemos una pared de área $A$ y partículas de masa $m$ que se mueven hacia ella con velocidad $v_x$. Al rebotar, cada una invierte su velocidad, y su cantidad de movimiento cambia en $2mv_x$.</p>
<p>En un tiempo $\Delta t$ llegan a la pared las partículas que están a menos de $v_x\,\Delta t$ de distancia y se dirigen hacia ella. De las $n$ por metro cúbico, la mitad va en ese sentido. Son:</p>
$$\frac{n}{2}\,A\,v_x\,\Delta t$$
<p>La fuerza es la cantidad de movimiento transferida por unidad de tiempo, y la presión es la fuerza por unidad de área:</p>
$$P = \frac{1}{A\,\Delta t}\cdot\frac{n}{2}\,A\,v_x\,\Delta t\cdot 2mv_x = n\,m\,v_x^{2}$$
<p>Las partículas tienen velocidades distintas, así que se usa el valor medio, $\langle v_x^{2}\rangle$. Y como ninguna dirección es especial, las tres componentes contribuyen por igual al cuadrado de la velocidad total: $\langle v_x^{2}\rangle = \langle v^{2}\rangle/3$. Queda:</p>
$$P = \frac{1}{3}\,n\,m\,\langle v^{2}\rangle$$

<h3>3. Qué es la temperatura</h3>
<p>Igualamos las dos expresiones de la presión:</p>
$$n\,k\,T = \frac{1}{3}\,n\,m\,\langle v^{2}\rangle \;\Rightarrow\; \frac{1}{2}\,m\,\langle v^{2}\rangle = \frac{3}{2}\,k\,T$$
<p>La temperatura es, salvo un factor, la <strong>energía cinética media de una partícula</strong>. De aquí sale la velocidad típica, llamada <em>velocidad cuadrática media</em>:</p>
$$v_\text{t} = \sqrt{\langle v^{2}\rangle} = \sqrt{\frac{3\,k\,T}{m}}$$
<p>A la misma temperatura, las partículas ligeras son más rápidas.</p>

<h3>4. Temperaturas en electronvoltios</h3>
<p>En astrofísica es cómodo expresar $kT$ en electronvoltios, para compararlo directamente con las energías de los átomos:</p>
$$k = 8{,}617 \times 10^{-5}\ \text{eV/K} \qquad 1\ \text{eV} \leftrightarrow 11\,600\ \text{K}$$
<p>A temperatura ambiente, $kT = 0{,}026$ eV. Para arrancar el electrón de un átomo de hidrógeno hacen falta 13,6 eV. Por eso el aire no está ionizado y el interior de una estrella sí.</p>

<h3>5. La presión en función de la densidad</h3>
<p>Lo que se suele conocer de una estrella es su densidad de masa $\rho$, en kg/m³, no el número de partículas. Se relacionan mediante la masa media por partícula, que se escribe $\mu\,m_\text{H}$, donde $m_\text{H} = 1{,}673 \times 10^{-27}$ kg es la masa del átomo de hidrógeno y $\mu$ es el <em>peso molecular medio</em>:</p>
$$n = \frac{\rho}{\mu\,m_\text{H}} \;\Rightarrow\; P = \frac{\rho\,k\,T}{\mu\,m_\text{H}}$$
<p>En hidrógeno neutro, $\mu = 1$. En hidrógeno ionizado, cada átomo se ha convertido en dos partículas, un protón y un electrón, con la misma masa total: $\mu = 0{,}5$. Para la mezcla de hidrógeno y helio del Sol, ionizada, $\mu \approx 0{,}6$.</p>

<h3>6. No todas van igual de rápido</h3>
<p>Las velocidades de las partículas se reparten según la <em>distribución de Maxwell-Boltzmann</em>. La fracción de partículas con velocidad cercana a $v$ es proporcional a:</p>
$$f(v) \propto v^{2}\,e^{-mv^{2}/2kT}$$
<p>El factor $v^{2}$ cuenta cuántas maneras hay de tener esa velocidad, y crece. La exponencial es el <strong>factor de Boltzmann</strong>, que aparece en toda la física térmica:</p>
$$e^{-E/kT}$$
<p>Dice que los estados de energía $E$ muy superior a $kT$ son exponencialmente raros, pero no imposibles. La distribución tiene una cola de partículas mucho más rápidas que la media. Esa cola, por pequeña que sea, es la que hace posible la fusión nuclear y la que vacía las atmósferas de los planetas pequeños.</p>

<h3>7. Por qué unos astros retienen atmósfera y otros no</h3>
<p>Una molécula escapa si supera la velocidad de escape de la Lección 7. Aunque la velocidad típica sea menor, la cola de la distribución va perdiendo partículas. La regla empírica es que un astro conserva un gas durante miles de millones de años si:</p>
$$v_\text{esc} \gtrsim 6\,v_\text{t}$$
<p>Por eso la Tierra retiene nitrógeno y oxígeno, pero ha perdido casi todo su hidrógeno y su helio, que son ligeros y rápidos. Y por eso Júpiter, frío y masivo, lo conserva todo.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El hidrógeno en la superficie y en el centro del Sol</h3>
<p><strong>En la superficie</strong>, $T = 5772$ K. Para un átomo de hidrógeno:</p>
$$v_\text{t} = \sqrt{\frac{3 \times 1{,}381 \times 10^{-23} \times 5772}{1{,}673 \times 10^{-27}}} = \sqrt{1{,}429 \times 10^{8}} = 1{,}20 \times 10^{4}\ \text{m/s}$$
<p>Son 12 km/s. La velocidad de escape en la superficie del Sol, de la Lección 7, es 618 km/s: cincuenta veces más. El Sol no pierde su hidrógeno por agitación térmica.</p>
<p>Energía térmica: $kT = 8{,}617 \times 10^{-5} \times 5772 = 0{,}50$ eV. Es mucho menos que los 13,6 eV de ionización, así que en la superficie el hidrógeno es casi todo neutro.</p>
<p><strong>En el centro</strong>, $T = 1{,}57 \times 10^{7}$ K. Para un protón:</p>
$$v_\text{t} = \sqrt{\frac{3 \times 1{,}381 \times 10^{-23} \times 1{,}57 \times 10^{7}}{1{,}673 \times 10^{-27}}} = \sqrt{3{,}888 \times 10^{11}} = 6{,}24 \times 10^{5}\ \text{m/s}$$
<p>Son 624 km/s. Y $kT = 8{,}617 \times 10^{-5} \times 1{,}57 \times 10^{7} = 1350$ eV, cien veces la energía de ionización: no queda ni un átomo entero. El gas es una mezcla de núcleos y electrones sueltos, un <em>plasma</em>.</p>
<p><strong>Presión en el centro.</strong> La densidad central es $1{,}5 \times 10^{5}\ \text{kg/m}^3$, y allí $\mu \approx 0{,}85$ porque parte del hidrógeno ya es helio:</p>
$$P = \frac{1{,}5 \times 10^{5} \times 1{,}381 \times 10^{-23} \times 1{,}57 \times 10^{7}}{0{,}85 \times 1{,}673 \times 10^{-27}} = 2{,}3 \times 10^{16}\ \text{Pa}$$
<p>Más de doscientos mil millones de atmósferas. En la próxima lección veremos que es justo la presión necesaria para sostener el peso del Sol.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Velocidades y energías térmicas",
            enunciado: R`<p>Usa $v_\text{t} = \sqrt{3kT/m}$, con $k = 1{,}381 \times 10^{-23}$ J/K $= 8{,}617 \times 10^{-5}$ eV/K.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad térmica de una molécula de nitrógeno (m = 4,65 × 10⁻²⁶ kg) a 300 K", tipo: "num", unidad: "m/s", respuesta: 517, tol: 0.02,
                pistas: ["3kT/m = 2,673 × 10⁵. Falta la raíz."],
                solucion: R`$\sqrt{\dfrac{3 \times 1{,}381 \times 10^{-23} \times 300}{4{,}65 \times 10^{-26}}} = \sqrt{2{,}673 \times 10^{5}} = 517$ m/s. Es algo más que la velocidad del sonido, y no por casualidad: el sonido lo transmiten esas moléculas.` },
              { id: "b", pregunta: "Valor de kT a 300 K", tipo: "num", unidad: "eV", respuesta: 0.0259, tol: 0.02,
                pistas: ["Multiplica k en eV/K por la temperatura."],
                solucion: R`$8{,}617 \times 10^{-5} \times 300 = 0{,}0259$ eV.` },
              { id: "c", pregunta: "¿A qué temperatura vale kT lo mismo que la energía de ionización del hidrógeno, 13,6 eV?", tipo: "sci", unidad: "K", respuesta: 1.58e5,
                pistas: ["T = E / k, con k en eV/K."],
                solucion: R`$\dfrac{13{,}6}{8{,}617 \times 10^{-5}} = 1{,}58 \times 10^{5}$ K. En la práctica el hidrógeno se ioniza mucho antes, hacia los 10 000 K, gracias a la cola de la distribución.` }
            ] },
          { id: "e2", nivel: 2, titulo: "La atmósfera que la Luna no tiene",
            enunciado: R`<p>De día, la superficie de la Luna alcanza 390 K. Su velocidad de escape es 2,38 km/s. Una molécula de hidrógeno tiene $m = 3{,}35 \times 10^{-27}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad térmica del hidrógeno molecular en la superficie lunar", tipo: "num", unidad: "km/s", respuesta: 2.20, tol: 0.02,
                errores: [{ v: 2196, msg: "Ese valor está en m/s. Se pide en km/s." }],
                pistas: ["3kT/m = 4,823 × 10⁶."],
                solucion: R`$\sqrt{4{,}823 \times 10^{6}} = 2196$ m/s $= 2{,}20$ km/s.` },
              { id: "b", pregunta: "Cociente entre la velocidad de escape y la velocidad térmica", tipo: "num", respuesta: 1.08, tol: 0.03,
                pistas: ["2,38 entre el resultado anterior."],
                solucion: R`$2{,}38/2{,}20 = 1{,}08$.` },
              { id: "c", pregunta: "Con ese cociente, el hidrógeno en la Luna:", tipo: "opcion", respuesta: 2,
                opciones: ["Queda retenido indefinidamente", "Se pierde lentamente, en miles de millones de años", "Escapa casi de inmediato", "Se congela en la superficie"],
                pistas: ["La regla pide un cociente de al menos 6."],
                solucion: R`Escapa casi de inmediato: la molécula típica ya va casi a la velocidad de escape. Incluso para gases pesados el cociente es insuficiente, y la Luna no conserva atmósfera.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Presión y factor de Boltzmann",
            enunciado: R`<p>Usa $P = \rho kT/(\mu\,m_\text{H})$ con $m_\text{H} = 1{,}673 \times 10^{-27}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Presión en la fotosfera del Sol: ρ = 2,0 × 10⁻⁴ kg/m³, T = 5772 K, μ = 1,3", tipo: "sci", unidad: "Pa", respuesta: 7.33e3, tol: 0.03,
                pistas: ["Numerador: ρ k T = 1,594 × 10⁻²³. Denominador: 2,175 × 10⁻²⁷."],
                solucion: R`$\dfrac{2{,}0 \times 10^{-4} \times 1{,}381 \times 10^{-23} \times 5772}{1{,}3 \times 1{,}673 \times 10^{-27}} = 7{,}3 \times 10^{3}$ Pa. Menos de una décima de atmósfera: la superficie visible del Sol es un gas muy tenue.` },
              { id: "b", pregunta: "¿Cuántas veces mayor es la presión central del Sol, 2,3 × 10¹⁶ Pa?", tipo: "sci", unidad: "veces", respuesta: 3.14e12, tol: 0.05,
                pistas: ["Divide las dos presiones."],
                solucion: R`$\dfrac{2{,}3 \times 10^{16}}{7{,}33 \times 10^{3}} = 3{,}1 \times 10^{12}$. Doce órdenes de magnitud entre la superficie y el centro.` },
              { id: "c", pregunta: "Factor de Boltzmann para un estado con energía 10 veces kT", tipo: "sci", respuesta: 4.54e-5,
                pistas: ["Es e elevado a −10."],
                solucion: R`$e^{-10} = 4{,}54 \times 10^{-5}$. Una partícula de cada 22 000. Raro, pero en un gas con $10^{30}$ partículas por metro cúbico son muchísimas.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>La distribución de velocidades</h3>
<p>El programa dibuja la distribución de Maxwell-Boltzmann para átomos de hidrógeno a dos temperaturas y marca la velocidad térmica.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

k = 1.381e-23
m = 1.673e-27                    # átomo de hidrógeno

v = np.linspace(0, 40000, 1000)  # de 0 a 40 km/s

for T in [3000, 5772, 10000]:
    f = v**2 * np.exp(-m * v**2 / (2 * k * T))
    f = f / f.sum()              # para que las tres sumen lo mismo
    plt.plot(v / 1000, f, label=str(T) + " K")
    print(T, "K: velocidad térmica", round(np.sqrt(3 * k * T / m) / 1000, 1), "km/s")

plt.xlabel("velocidad (km/s)")
plt.legend()
plt.show()</pre></div>
<ol>
<li>Observa cómo la curva se ensancha y se desplaza hacia la derecha al subir la temperatura.</li>
<li>Fíjate en la cola: a 10 000 K hay una fracción apreciable de átomos por encima de 30 km/s, casi el triple de la velocidad típica a 5772 K.</li>
<li>Cambia la masa por la del nitrógeno molecular, <code>4.65e-26</code>, y las temperaturas por 250 y 300 K. Compara la curva con la velocidad de escape de la Tierra, 11,2 km/s.</li>
</ol>`,
          notas: [{ id: "maxwell", label: "Qué has observado en la cola de la distribución y en el caso del nitrógeno en la Tierra" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Gas ideal:</strong> $P = nkT = \rho kT/(\mu\,m_\text{H})$. Cada partícula libre cuenta, sea cual sea su masa.`,
          R`<strong>La temperatura es energía cinética media:</strong> $\frac{1}{2}m\langle v^{2}\rangle = \frac{3}{2}kT$.`,
          R`<strong>Velocidad térmica:</strong> $v_\text{t} = \sqrt{3kT/m}$. Las partículas ligeras son más rápidas.`,
          R`<strong>Factor de Boltzmann:</strong> $e^{-E/kT}$. Las energías muy superiores a $kT$ son raras, pero existen.`,
          R`<strong>Un electronvoltio equivale a 11 600 K.</strong> Comparar $kT$ con la energía de un proceso dice si ocurre o no.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 25 ───────────────────────── */
    {
      id: "leccion-25", n: 25, fase: 3, codigo: "B4.1",
      titulo: "Equilibrio hidrostático: qué sostiene una estrella",
      sub: "Una sola ecuación de equilibrio basta para estimar la presión y la temperatura en el centro del Sol.",
      horas: "6 horas",
      contexto: "Equilibrio hidrostático dP/dr = -G M(r) rho / r^2; conservación de la masa dM/dr = 4 pi r^2 rho; estimación de orden de magnitud P_c del orden de G M^2 / R^4 y k T_c del orden de G M mu m_H / R (Sol: 1,4e7 K frente a 1,57e7 K reales); tiempo de caída libre 1/raíz(G rho), unos 54 minutos para el Sol; teorema del virial 2K + U = 0, una estrella que pierde energía se contrae y se calienta; tiempo de Kelvin-Helmholtz G M^2 / (R L), unos 30 millones de años.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">El Sol lleva 4600 millones de años con el mismo tamaño. Su propia gravedad lo aplastaría en menos de una hora si nada se opusiera. Lo que se opone es la presión del gas caliente.</p>
<p>Imagina una pila de colchones. El de abajo está más comprimido que el de arriba porque soporta el peso de todos los demás. En una estrella pasa lo mismo: cada capa aguanta el peso de las que tiene encima, y para eso la presión tiene que aumentar hacia dentro.</p>
<div class="nota"><strong>Es un sistema con realimentación negativa.</strong> Si la estrella se comprime un poco, el gas se calienta, la presión sube y la empuja hacia fuera. Si se expande, se enfría, la presión baja y la gravedad la recoge. El punto de equilibrio es estable, como el de un regulador bien diseñado. Toda la vida de una estrella consiste en mantener ese equilibrio mientras cambia poco a poco aquello que lo alimenta.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La ecuación de equilibrio</h3>
<p>Aislamos una rebanada delgada de gas dentro de la estrella, a distancia $r$ del centro, con área $A$ y espesor $dr$. Sobre ella actúan tres fuerzas radiales.</p>
<ul>
<li><strong>La presión de abajo</strong> la empuja hacia fuera: $P(r)\,A$.</li>
<li><strong>La presión de arriba</strong> la empuja hacia dentro: $P(r + dr)\,A$.</li>
<li><strong>Su peso</strong> tira hacia dentro. Su masa es la densidad por el volumen, $\rho\,A\,dr$, y la gravedad a esa distancia es $GM(r)/r^{2}$, donde $M(r)$ es la masa que queda por dentro del radio $r$.</li>
</ul>
<p>En equilibrio la suma es cero:</p>
$$P(r)\,A - P(r + dr)\,A - \frac{G\,M(r)}{r^{2}}\,\rho\,A\,dr = 0$$
<p>La diferencia de presiones es $-dP$, el cambio de presión al subir $dr$. Dividiendo entre $A\,dr$:</p>
$$\frac{dP}{dr} = -\frac{G\,M(r)\,\rho}{r^{2}}$$
<p>Es la <strong>ecuación del equilibrio hidrostático</strong>. El signo negativo dice que la presión disminuye hacia fuera. Vale igual para una estrella, para un planeta y para la atmósfera de la Tierra.</p>

<h3>2. La masa interior</h3>
<p>Una capa esférica de radio $r$ y espesor $dr$ tiene un volumen $4\pi r^{2}\,dr$, la superficie por el espesor. La masa que aporta es:</p>
$$\frac{dM}{dr} = 4\pi r^{2}\,\rho$$
<p>Estas dos ecuaciones, junto con la ley de los gases, forman el núcleo de un modelo estelar.</p>

<h3>3. Estimar sin resolver</h3>
<p>No hace falta resolver las ecuaciones para saber de qué orden son las cosas. Basta sustituir cada magnitud por su valor típico.</p>
<ul>
<li>La presión cae desde su valor central $P_c$ hasta cero en una distancia $R$: $dP/dr \sim -P_c/R$.</li>
<li>La masa interior es del orden de $M$ y la distancia del orden de $R$.</li>
<li>La densidad es del orden de la media: $\rho \sim M/R^{3}$.</li>
</ul>
<p>Sustituyendo en la ecuación de equilibrio:</p>
$$\frac{P_c}{R} \sim \frac{G\,M}{R^{2}}\cdot\frac{M}{R^{3}} \;\Rightarrow\; P_c \sim \frac{G\,M^{2}}{R^{4}}$$
<p>Este procedimiento da el orden de magnitud y la forma en que el resultado depende de $M$ y $R$. No da el factor numérico exacto.</p>

<h3>4. La temperatura central</h3>
<p>Con la ley de los gases de la lección anterior, $P = \rho kT/(\mu\,m_\text{H})$, y de nuevo $\rho \sim M/R^{3}$:</p>
$$\frac{M}{R^{3}}\cdot\frac{k\,T_c}{\mu\,m_\text{H}} \sim \frac{G\,M^{2}}{R^{4}} \;\Rightarrow\; k\,T_c \sim \frac{G\,M\,\mu\,m_\text{H}}{R}$$
<p>Tiene una lectura directa: la energía térmica de una partícula en el centro es del orden de su energía potencial gravitatoria. El gas está lo bastante caliente para no caer.</p>

<h3>5. Si la presión desapareciera</h3>
<p>Sin presión, la estrella caería sobre sí misma. El tiempo que tardaría se estima con la tercera ley de Kepler, o por análisis de unidades: la única combinación de $G$ y $\rho$ con unidades de tiempo es</p>
$$t_\text{caída} \sim \frac{1}{\sqrt{G\,\rho}}$$
<p>Para el Sol sale menos de una hora. Que el Sol no cambie de tamaño en miles de millones de años indica con qué precisión se cumple el equilibrio.</p>

<h3>6. El teorema del virial</h3>
<p>En la Lección 11 viste que en una órbita circular la energía potencial es menos dos veces la cinética, $U = -2K$. No es una propiedad de las órbitas circulares, sino de cualquier sistema ligado por la gravedad que esté en equilibrio:</p>
$$2K + U = 0$$
<p>Para una estrella, $K$ es la energía térmica total del gas. La energía total es $E = K + U = -K$.</p>
<p>La consecuencia es extraña y fundamental. Si la estrella pierde energía porque radia luz, $E$ disminuye, y como $E = -K$, la energía térmica <em>aumenta</em>. La estrella se contrae, y la mitad de la energía gravitatoria liberada calienta el gas mientras la otra mitad se va en forma de luz. <strong>Una estrella que pierde energía se calienta.</strong> Es el mismo comportamiento del satélite que acelera al frenarlo.</p>

<h3>7. El reloj de Kelvin</h3>
<p>En el siglo XIX se pensaba que el Sol brillaba gracias a esa contracción. La energía disponible es del orden de $GM^{2}/R$, y dividida entre la luminosidad da el tiempo que duraría:</p>
$$t_\text{KH} \sim \frac{G\,M^{2}}{R\,L}$$
<p>Es el <em>tiempo de Kelvin-Helmholtz</em>. Para el Sol salen unos 30 millones de años. Los geólogos y Darwin ya defendían entonces que la Tierra era mucho más antigua, y tenían razón. Faltaba una fuente de energía desconocida, que resultó ser la fusión nuclear.</p>
<p>El mecanismo no es falso, solo insuficiente para el Sol actual. Es lo que calienta una estrella antes de encender la fusión, y lo que la calienta de nuevo cada vez que agota un combustible.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El interior del Sol en cuatro cuentas</h3>
<p>Datos: $M = 1{,}989 \times 10^{30}$ kg, $R = 6{,}957 \times 10^{8}$ m, $L = 3{,}828 \times 10^{26}$ W, $\mu = 0{,}6$.</p>
<p><strong>Densidad media:</strong></p>
$$\rho = \frac{M}{\frac{4}{3}\pi R^{3}} = \frac{1{,}989 \times 10^{30}}{1{,}410 \times 10^{27}} = 1410\ \text{kg/m}^3$$
<p>Algo más que el agua. El Sol es gas, pero muy comprimido.</p>
<p><strong>Presión central estimada:</strong></p>
$$P_c \sim \frac{G\,M^{2}}{R^{4}} = \frac{6{,}674 \times 10^{-11} \times (1{,}989 \times 10^{30})^{2}}{(6{,}957 \times 10^{8})^{4}} = \frac{2{,}640 \times 10^{50}}{2{,}343 \times 10^{35}} = 1{,}1 \times 10^{15}\ \text{Pa}$$
<p>Los modelos detallados dan $2{,}3 \times 10^{16}$ Pa, veinte veces más. La estimación se queda corta porque el Sol no tiene densidad uniforme: su centro es cien veces más denso que la media.</p>
<p><strong>Temperatura central estimada:</strong></p>
$$T_c \sim \frac{G\,M\,\mu\,m_\text{H}}{R\,k} = \frac{6{,}674 \times 10^{-11} \times 1{,}989 \times 10^{30} \times 0{,}6 \times 1{,}673 \times 10^{-27}}{6{,}957 \times 10^{8} \times 1{,}381 \times 10^{-23}} = 1{,}4 \times 10^{7}\ \text{K}$$
<p>El valor de los modelos es $1{,}57 \times 10^{7}$ K. Con una ecuación de equilibrio y la ley de los gases, sin saber nada de reacciones nucleares, hemos obtenido la temperatura del centro del Sol con un error del 10 %. Así la estimó Eddington en los años veinte, antes de que se conociera la fuente de energía.</p>
<p><strong>Tiempo de caída libre:</strong></p>
$$t \sim \frac{1}{\sqrt{6{,}674 \times 10^{-11} \times 1410}} = \frac{1}{\sqrt{9{,}41 \times 10^{-8}}} = 3260\ \text{s} = 54\ \text{min}$$` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Presión y peso",
            enunciado: R`<p>La presión bajo una columna de fluido de densidad constante y altura $h$ es $P = \rho\,g\,h$: es la ecuación de equilibrio con gravedad constante.</p>`,
            partes: [
              { id: "a", pregunta: "¿Qué profundidad de agua (1000 kg/m³, g = 9,81 m/s²) produce una presión de una atmósfera, 1,013 × 10⁵ Pa?", tipo: "num", unidad: "m", respuesta: 10.3, tol: 0.02,
                pistas: ["Despeja h = P / (ρ g)."],
                solucion: R`$h = \dfrac{1{,}013 \times 10^{5}}{1000 \times 9{,}81} = 10{,}3$ m. Cada diez metros de inmersión añaden una atmósfera.` },
              { id: "b", pregunta: "Densidad media de la Tierra: M = 5,972 × 10²⁴ kg, R = 6,371 × 10⁶ m", tipo: "num", unidad: "kg/m³", respuesta: 5513, tol: 0.02,
                pistas: ["Volumen de una esfera: 4πR³/3 = 1,083 × 10²¹ m³."],
                solucion: R`$\dfrac{5{,}972 \times 10^{24}}{1{,}083 \times 10^{21}} = 5513\ \text{kg/m}^3$. Cuatro veces la del Sol: la Tierra es roca y hierro.` },
              { id: "c", pregunta: "En una estrella en equilibrio, el peso de cada capa lo compensa:", tipo: "opcion", respuesta: 1,
                opciones: ["La rotación de la estrella", "La diferencia de presión entre su cara inferior y la superior", "La presión, que es igual en toda la estrella", "La fusión nuclear, que empuja el gas hacia fuera"],
                pistas: ["Repasa las tres fuerzas sobre la rebanada."],
                solucion: R`La diferencia de presión. Lo que sostiene no es la presión en sí, sino que sea mayor abajo que arriba. La fusión no empuja nada: solo repone la energía que la estrella pierde.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Leyes de escala",
            enunciado: R`<p>Usa $P_c \propto M^{2}/R^{4}$ y $T_c \propto M/R$. Compara con el Sol una estrella de 2 masas solares y 1,7 radios solares.</p>`,
            partes: [
              { id: "a", pregunta: "Presión central, en unidades de la del Sol", tipo: "num", respuesta: 0.479, tol: 0.03,
                errores: [{ v: 1.38, msg: "El radio va elevado a la cuarta, no al cuadrado." }],
                pistas: ["2² / 1,7⁴."],
                solucion: R`$\dfrac{2^{2}}{1{,}7^{4}} = \dfrac{4}{8{,}35} = 0{,}48$. Tiene más masa, pero menos presión central: es más grande y menos densa.` },
              { id: "b", pregunta: "Temperatura central, en unidades de la del Sol", tipo: "num", respuesta: 1.18, tol: 0.02,
                pistas: ["2 / 1,7."],
                solucion: R`$2/1{,}7 = 1{,}18$. Las estrellas más masivas tienen el centro más caliente y menos denso.` },
              { id: "c", pregunta: "Tiempo de caída libre de una gigante roja con densidad media 10⁻³ kg/m³, en días", tipo: "num", unidad: "días", respuesta: 44.8, tol: 0.03,
                pistas: ["1/√(Gρ) en segundos, y divide entre 86 400."],
                solucion: R`$\dfrac{1}{\sqrt{6{,}674 \times 10^{-11} \times 10^{-3}}} = 3{,}87 \times 10^{6}$ s $= 44{,}8$ días. Las gigantes que pulsan lo hacen con periodos de ese orden: semanas o meses.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Virial y Kelvin-Helmholtz",
            enunciado: R`<p>Datos del Sol: $M = 1{,}989 \times 10^{30}$ kg, $R = 6{,}957 \times 10^{8}$ m, $L = 3{,}828 \times 10^{26}$ W. Un año son $3{,}156 \times 10^{7}$ s.</p>`,
            partes: [
              { id: "a", pregunta: "Tiempo de Kelvin-Helmholtz del Sol, en años", tipo: "sci", unidad: "años", respuesta: 3.14e7, tol: 0.03,
                errores: [{ v: 9.91e14, msg: "Ese valor está en segundos. Divide entre los segundos de un año." }],
                pistas: ["GM²/R = 3,795 × 10⁴¹ J.", "Divide entre L y pasa a años."],
                solucion: R`$\dfrac{3{,}795 \times 10^{41}}{3{,}828 \times 10^{26}} = 9{,}91 \times 10^{14}$ s $= 3{,}1 \times 10^{7}$ años.` },
              { id: "b", pregunta: "Presión central estimada de una enana blanca de 1 masa solar y radio 6,0 × 10⁶ m", tipo: "sci", unidad: "Pa", respuesta: 2.04e23, tol: 0.03,
                pistas: ["GM² = 2,640 × 10⁵⁰, y R⁴ = 1,296 × 10²⁷."],
                solucion: R`$\dfrac{2{,}640 \times 10^{50}}{1{,}296 \times 10^{27}} = 2{,}0 \times 10^{23}$ Pa. Cien millones de veces la del Sol. Un gas ordinario no puede dar esa presión: hará falta un efecto cuántico, que verás en la lección siguiente.` },
              { id: "c", pregunta: "Una estrella sin fuente nuclear radia energía. Según el teorema del virial:", tipo: "opcion", respuesta: 0,
                opciones: ["Se contrae y su interior se calienta", "Se contrae y su interior se enfría", "Se expande y se enfría", "Mantiene su tamaño y se enfría poco a poco"],
                pistas: ["E = −K. Si E baja, ¿qué le pasa a K?"],
                solucion: R`Se contrae y se calienta. Perder energía la hace más caliente. Así alcanza una nube de gas los millones de grados necesarios para encender la fusión.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Integra una estrella de densidad constante</h3>
<p>El modelo más sencillo de estrella tiene la misma densidad en todas partes. El programa recorre la estrella desde la superficie, donde la presión es cero, hasta el centro, sumando en cada capa el aumento de presión que dicta la ecuación de equilibrio.</p>
<div class="tabla"><pre>import math

G = 6.674e-11
M = 1.989e30
R = 6.957e8
rho = M / (4 / 3 * math.pi * R**3)

N = 100000
dr = R / N
P = 0.0
r = R

for i in range(N):
    m = 4 / 3 * math.pi * r**3 * rho      # masa interior a r
    P = P + G * m * rho / r**2 * dr       # aumento de presión al bajar dr
    r = r - dr

print("densidad media:", round(rho), "kg/m3")
print("presión central:", P, "Pa")</pre></div>
<ol>
<li>Ejecútalo. La presión central sale $1{,}35 \times 10^{14}$ Pa.</li>
<li>Compárala con la estimación $GM^{2}/R^{4} = 1{,}1 \times 10^{15}$ Pa y con el valor real, $2{,}3 \times 10^{16}$ Pa. Los tres difieren, y la razón es la distribución de densidad.</li>
<li>Para densidad constante existe solución exacta: $P_c = \frac{2\pi}{3}G\rho^{2}R^{2}$. Calcúlala y comprueba que coincide con el programa.</li>
<li>Reduce <code>N</code> a 10 y mira cuánto cambia el resultado. Es el error de sustituir una integral por una suma con pocos términos.</li>
</ol>`,
          notas: [{ id: "hidro", label: "Presión central numérica, exacta y estimada, y cómo cambia al reducir N" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Equilibrio hidrostático:</strong> $dP/dr = -GM(r)\rho/r^{2}$. El peso de cada capa lo sostiene la diferencia de presión.`,
          R`<strong>Órdenes de magnitud:</strong> $P_c \sim GM^{2}/R^{4}$ y $kT_c \sim GM\mu\,m_\text{H}/R$. Para el Sol, unos 14 millones de kelvin.`,
          R`<strong>Sin presión</strong>, el Sol colapsaría en menos de una hora.`,
          R`<strong>Teorema del virial:</strong> $2K + U = 0$. Una estrella que pierde energía se contrae y se calienta.`,
          R`<strong>La contracción gravitatoria</strong> solo mantendría al Sol unos 30 millones de años. Hace falta otra fuente.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 26 ───────────────────────── */
    {
      id: "leccion-26", n: 26, fase: 3, codigo: "A3.2",
      titulo: "Física cuántica para estrellas",
      sub: "Cuatro ideas cuánticas que hacen falta para entender los espectros, la fusión y los cadáveres estelares.",
      horas: "6 horas",
      contexto: "Longitud de onda de De Broglie lambda = h / p; principio de incertidumbre delta x delta p mayor o del orden de h barra / 2; partícula en una caja E_n = n^2 h^2 / (8 m L^2); población de niveles (Boltzmann) N2/N1 = (g2/g1) e^(-delta E / kT), para el hidrógeno g = 2 n^2 y delta E = 10,2 eV entre n = 1 y n = 2; ionización (Saha, cualitativo) y por qué las líneas de Balmer son máximas hacia 10 000 K; principio de exclusión de Pauli y presión de degeneración; efecto túnel, probabilidad del orden de e^(-2 kappa L); línea de 21 cm por inversión de espín.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">No hace falta toda la mecánica cuántica para entender las estrellas. Hacen falta cuatro ideas, y las cuatro salen de un solo hecho: las partículas de materia también se comportan como ondas.</p>
<p>En la Fase 2 viste que la luz, que es una onda, llega en paquetes. Lo contrario también es cierto: un electrón, que es una partícula, tiene asociada una longitud de onda y puede interferir consigo mismo. No es una interpretación: se mide en el laboratorio desde 1927.</p>
<div class="nota"><strong>Tu conocimiento de Fourier hace aquí medio trabajo.</strong> Una onda confinada en un espacio pequeño necesita muchas frecuencias espaciales, exactamente como un pulso corto necesita mucho ancho de banda. Aplicado a una partícula, ese hecho se llama principio de incertidumbre. Y una onda encerrada entre dos paredes solo puede vibrar en ciertos modos, como una cuerda de guitarra o una cavidad resonante: ese es el origen de los niveles de energía.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La longitud de onda de la materia</h3>
<p>Toda partícula con cantidad de movimiento $p = mv$ tiene una longitud de onda asociada, la de <em>De Broglie</em>:</p>
$$\lambda = \frac{h}{p} = \frac{h}{m\,v}$$
<p>Para un objeto cotidiano es tan pequeña que no tiene ningún efecto. Para un electrón dentro de un átomo es del tamaño del propio átomo, y entonces lo domina todo.</p>

<h3>2. El principio de incertidumbre</h3>
<p>Una onda de longitud bien definida se extiende por todo el espacio. Para localizarla en una región $\Delta x$ hay que sumar muchas longitudes de onda distintas, es decir, muchos valores de $p$. Es la relación $\Delta t \cdot \Delta\nu \sim 1$ de la Lección 21, trasladada al espacio. Con $p = h/\lambda$ se convierte en:</p>
$$\Delta x \cdot \Delta p \gtrsim \frac{\hbar}{2} \qquad \hbar = \frac{h}{2\pi} = 1{,}055 \times 10^{-34}\ \text{J}\cdot\text{s}$$
<p>No es un defecto de los aparatos de medida. Una partícula no tiene a la vez una posición y una velocidad exactas, igual que un pulso no tiene a la vez una duración y una frecuencia exactas.</p>
<p>La consecuencia práctica: <strong>confinar una partícula le da energía</strong>. Cuanto menor es el espacio, mayor es $\Delta p$ y mayor la energía cinética mínima.</p>

<h3>3. Por qué hay niveles: la partícula en una caja</h3>
<p>Encerremos un electrón en un segmento de longitud $L$ con paredes impenetrables. Su onda tiene que anularse en las dos paredes, así que en $L$ debe caber un número entero de medias longitudes de onda, como en una cuerda sujeta por los extremos:</p>
$$L = n\,\frac{\lambda}{2} \;\Rightarrow\; \lambda_n = \frac{2L}{n} \qquad n = 1, 2, 3, \dots$$
<p>Por De Broglie, $p_n = h/\lambda_n = nh/2L$. La energía es toda cinética, $E = p^{2}/2m$:</p>
$$E_n = \frac{p_n^{2}}{2m} = \frac{n^{2}\,h^{2}}{8\,m\,L^{2}}$$
<p>Solo son posibles ciertas energías. Y la más baja no es cero. En un átomo real la caja es la atracción del núcleo y la fórmula cambia, pero la causa de los niveles es esta: una onda confinada solo admite ciertos modos.</p>

<h3>4. Cuántos átomos hay en cada nivel</h3>
<p>A temperatura $T$, los choques reparten los átomos entre los niveles según el factor de Boltzmann de la Lección 24. El cociente entre las poblaciones de dos niveles separados una energía $\Delta E$ es:</p>
$$\frac{N_2}{N_1} = \frac{g_2}{g_1}\,e^{-\Delta E/kT}$$
<p>$g$ es el número de estados distintos que comparten esa energía. Para el nivel $n$ del hidrógeno, $g = 2n^{2}$.</p>
<p>Esto resuelve una duda de la Lección 18. Las líneas de Balmer nacen de átomos de hidrógeno que ya están en el nivel $n = 2$, a 10,2 eV sobre el fundamental. En una estrella fría casi ningún átomo está ahí arriba y las líneas son débiles, aunque la estrella sea casi toda de hidrógeno.</p>
<p>Al subir la temperatura, el nivel 2 se puebla y las líneas se refuerzan. Pero si se sube demasiado, los choques arrancan el electrón y el átomo queda ionizado, sin electrón que pueda absorber. La <em>ecuación de Saha</em> describe ese segundo efecto. El resultado de los dos juntos es que las líneas de Balmer son máximas hacia los 10 000 K, en las estrellas de tipo A como Vega y Sirio.</p>
<p>La intensidad de las líneas mide por tanto la temperatura, y no solo la abundancia. Cecilia Payne lo aplicó en 1925 y concluyó que las estrellas están hechas sobre todo de hidrógeno, en contra de la opinión de la época.</p>

<h3>5. El principio de exclusión</h3>
<p>Los electrones cumplen una regla adicional, el <em>principio de exclusión de Pauli</em>: dos electrones no pueden ocupar el mismo estado. En un átomo, eso los obliga a apilarse en niveles sucesivos y explica la tabla periódica.</p>
<p>En un gas muy comprimido tiene un efecto espectacular. Al reducir el volumen, los estados de baja energía se llenan y los electrones restantes se ven forzados a ocupar estados de energía cada vez mayor, aunque el gas esté frío. Eso produce una presión que no depende de la temperatura, la <strong>presión de degeneración</strong>. Es la que sostiene a las enanas blancas, y la que da la presión que faltaba en el ejercicio de la lección anterior.</p>

<h3>6. El efecto túnel</h3>
<p>Una partícula clásica que no tiene energía suficiente para superar una barrera rebota siempre. Una onda no: penetra un poco en la barrera, decayendo de forma exponencial, y si la barrera es delgada, parte de la onda aparece al otro lado. La probabilidad de atravesar una barrera de anchura $L$ es del orden de:</p>
$$\text{probabilidad} \sim e^{-2\kappa L} \qquad \kappa = \frac{\sqrt{2m\,(V - E)}}{\hbar}$$
<p>donde $V - E$ es lo que le falta a la partícula para superar la barrera. Es el mismo fenómeno que la onda evanescente que se cuela a través de un tramo de guía por debajo del corte.</p>
<p>La probabilidad es minúscula, pero no nula. Sin efecto túnel, el Sol no brillaría: lo verás en la próxima lección.</p>

<h3>7. El espín y la línea de 21 cm</h3>
<p>El electrón y el protón tienen una propiedad cuántica llamada <em>espín</em>, que los hace comportarse como imanes diminutos. En un átomo de hidrógeno, los dos espines pueden estar paralelos o antiparalelos, y la primera configuración tiene un poco más de energía: $5{,}9 \times 10^{-6}$ eV. Cuando el electrón invierte su espín, emite un fotón con esa energía, que corresponde a 1420 MHz.</p>
<p>La transición es improbable en extremo: un átomo aislado tarda de media unos diez millones de años en hacerla. Pero en la galaxia hay tanto hidrógeno que la línea se detecta sin dificultad.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Por qué Vega tiene líneas de Balmer más intensas que el Sol</h3>
<p>Calculamos qué fracción de los átomos de hidrógeno está en el nivel $n = 2$ respecto al nivel $n = 1$.</p>
<p>Datos: $\Delta E = 13{,}6\,(1 - 1/4) = 10{,}2$ eV, $g_1 = 2$ y $g_2 = 8$, luego $g_2/g_1 = 4$.</p>
<p><strong>En el Sol</strong>, $T = 5772$ K:</p>
$$kT = 8{,}617 \times 10^{-5} \times 5772 = 0{,}497\ \text{eV} \qquad \frac{\Delta E}{kT} = \frac{10{,}2}{0{,}497} = 20{,}5$$
$$\frac{N_2}{N_1} = 4\,e^{-20{,}5} = 4 \times 1{,}24 \times 10^{-9} = 5{,}0 \times 10^{-9}$$
<p>Cinco átomos de cada mil millones.</p>
<p><strong>En Vega</strong>, $T \approx 10\,000$ K:</p>
$$kT = 0{,}862\ \text{eV} \qquad \frac{\Delta E}{kT} = 11{,}8 \qquad \frac{N_2}{N_1} = 4\,e^{-11{,}8} = 2{,}9 \times 10^{-5}$$
<p><strong>Cociente:</strong></p>
$$\frac{2{,}9 \times 10^{-5}}{5{,}0 \times 10^{-9}} \approx 5800$$
<p>La temperatura ni siquiera se ha duplicado, y el número de átomos capaces de producir líneas de Balmer se ha multiplicado por casi seis mil. Es el efecto de tener la temperatura en el exponente. Las dos estrellas tienen casi la misma proporción de hidrógeno.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Ondas de materia",
            enunciado: R`<p>Usa $\lambda = h/(mv)$ con $h = 6{,}626 \times 10^{-34}$ J·s. La masa del electrón es $9{,}109 \times 10^{-31}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Longitud de onda de un electrón a 10⁶ m/s, en nanómetros", tipo: "num", unidad: "nm", respuesta: 0.727, tol: 0.02,
                errores: [{ v: 7.27e-10, msg: "Ese valor está en metros. Pásalo a nanómetros." }],
                pistas: ["p = 9,109 × 10⁻²⁵ kg·m/s."],
                solucion: R`$\dfrac{6{,}626 \times 10^{-34}}{9{,}109 \times 10^{-31} \times 10^{6}} = 7{,}27 \times 10^{-10}$ m $= 0{,}727$ nm, unas cuantas veces el tamaño de un átomo.` },
              { id: "b", pregunta: "Longitud de onda de una pelota de 0,145 kg a 40 m/s", tipo: "sci", unidad: "m", respuesta: 1.14e-34,
                pistas: ["p = 0,145 × 40 = 5,8 kg·m/s."],
                solucion: R`$\dfrac{6{,}626 \times 10^{-34}}{5{,}8} = 1{,}14 \times 10^{-34}$ m.` },
              { id: "c", pregunta: "¿Por qué no se observan efectos ondulatorios en la pelota?", tipo: "opcion", respuesta: 1,
                opciones: ["Porque los objetos grandes no tienen longitud de onda", "Porque su longitud de onda es inmensamente menor que cualquier abertura u obstáculo", "Porque va demasiado despacio", "Porque no tiene carga eléctrica"],
                pistas: ["La difracción se nota cuando la abertura es comparable a la longitud de onda."],
                solucion: R`Su longitud de onda es diecinueve órdenes de magnitud menor que un núcleo atómico. No hay rendija en la que pueda difractarse de forma apreciable.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Un electrón en una caja de 1 nm",
            enunciado: R`<p>Usa $E_n = n^{2}h^{2}/(8mL^{2})$ con $L = 10^{-9}$ m, y $1\ \text{eV} = 1{,}602 \times 10^{-19}$ J.</p>`,
            partes: [
              { id: "a", pregunta: "Energía del nivel más bajo", tipo: "num", unidad: "eV", respuesta: 0.376, tol: 0.02,
                pistas: ["h² = 4,390 × 10⁻⁶⁷ y 8mL² = 7,287 × 10⁻⁴⁸.", "Divide el resultado en julios entre 1,602 × 10⁻¹⁹."],
                solucion: R`$\dfrac{4{,}390 \times 10^{-67}}{7{,}287 \times 10^{-48}} = 6{,}02 \times 10^{-20}$ J $= 0{,}376$ eV.` },
              { id: "b", pregunta: "Energía del segundo nivel", tipo: "num", unidad: "eV", respuesta: 1.504, tol: 0.02,
                errores: [{ v: 0.752, msg: "La energía va con n al cuadrado, no con n." }],
                pistas: ["Es n² veces la del primero."],
                solucion: R`$4 \times 0{,}376 = 1{,}50$ eV.` },
              { id: "c", pregunta: "Longitud de onda del fotón emitido al pasar del segundo nivel al primero", tipo: "num", unidad: "nm", respuesta: 1099, tol: 0.02,
                pistas: ["La energía del fotón es la diferencia entre los niveles.", "λ = 1240 / E."],
                solucion: R`$\Delta E = 1{,}504 - 0{,}376 = 1{,}128$ eV. $\lambda = 1240/1{,}128 = 1099$ nm, en el infrarrojo cercano. Los puntos cuánticos de las pantallas funcionan así: su color se ajusta cambiando el tamaño de la caja.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Poblaciones y tipos espectrales",
            enunciado: R`<p>Usa $N_2/N_1 = 4\,e^{-10{,}2/kT}$ para el hidrógeno, con $kT$ en eV y $k = 8{,}617 \times 10^{-5}$ eV/K.</p>`,
            partes: [
              { id: "a", pregunta: "Valor de kT a 8000 K", tipo: "num", unidad: "eV", respuesta: 0.689, tol: 0.01,
                pistas: ["Multiplica k por la temperatura."],
                solucion: R`$8{,}617 \times 10^{-5} \times 8000 = 0{,}689$ eV.` },
              { id: "b", pregunta: "Cociente N₂/N₁ a 8000 K", tipo: "sci", respuesta: 1.5e-6, tol: 0.08,
                pistas: ["El exponente es −10,2 / 0,689 = −14,8."],
                solucion: R`$4\,e^{-14{,}8} = 4 \times 3{,}7 \times 10^{-7} = 1{,}5 \times 10^{-6}$.` },
              { id: "c", pregunta: "Una estrella de tipo O, a 40 000 K, tiene líneas de Balmer débiles. La causa es que:", tipo: "opcion", respuesta: 2,
                opciones: ["Contiene poco hidrógeno", "Casi ningún átomo llega al nivel n = 2", "Casi todo su hidrógeno está ionizado", "Sus líneas quedan fuera del visible"],
                pistas: ["A esa temperatura, ¿le queda al átomo su electrón?"],
                solucion: R`Está ionizado. Un protón sin electrón no puede absorber en las líneas de Balmer. Por abajo falta excitación y por arriba sobra ionización: de ahí el máximo hacia 10 000 K.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>La excitación del hidrógeno frente a la temperatura</h3>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

k = 8.617e-5                         # en eV/K
T = np.linspace(3000, 15000, 200)
cociente = 4 * np.exp(-10.2 / (k * T))

plt.semilogy(T, cociente)
plt.xlabel("temperatura (K)")
plt.ylabel("N2 / N1")
plt.show()

for t in [3600, 5772, 8000, 10000]:
    print(t, "K:", 4 * np.exp(-10.2 / (k * t)))</pre></div>
<ol>
<li>La gráfica usa escala logarítmica en el eje vertical: cada división es un factor 10. Entre 3600 K, la temperatura de Betelgeuse, y 10 000 K, el cociente cambia en nueve órdenes de magnitud.</li>
<li>Esta curva solo sube. La que falta, la de ionización, baja a partir de unos 10 000 K. El producto de las dos tiene un máximo.</li>
<li>Repite el cálculo para el salto de $n = 1$ a $n = 3$: $\Delta E = 12{,}09$ eV y $g_3/g_1 = 9$.</li>
</ol>`,
          notas: [{ id: "boltzmann", label: "Valores obtenidos para cada temperatura y para el nivel 3" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La materia tiene longitud de onda:</strong> $\lambda = h/p$. Confinar una partícula le da energía.`,
          R`<strong>Una onda confinada solo admite ciertos modos.</strong> De ahí los niveles de energía y las líneas espectrales.`,
          R`<strong>Población de niveles:</strong> $N_2/N_1 = (g_2/g_1)\,e^{-\Delta E/kT}$. La intensidad de las líneas mide la temperatura.`,
          R`<strong>Principio de exclusión:</strong> los electrones comprimidos ejercen una presión que no depende de la temperatura.`,
          R`<strong>Efecto túnel:</strong> una partícula puede atravesar una barrera que no puede superar. Hace posible la fusión.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 27 ───────────────────────── */
    {
      id: "leccion-27", n: 27, fase: 3, codigo: "B4.2",
      titulo: "Fusión nuclear: de dónde sale la luz del Sol",
      sub: "Cuatro protones pesan más que un núcleo de helio. Esa diferencia mantiene encendido el Sol durante diez mil millones de años.",
      horas: "6 horas",
      contexto: "E = m c^2; unidad de masa atómica 1 u = 1,6605e-27 kg = 931,5 MeV; fusión de 4 hidrógenos (4 x 1,007825 u) en helio-4 (4,002602 u): defecto de masa 0,028698 u, 26,73 MeV, 0,71 % de la masa; barrera de Coulomb del orden de 1 MeV frente a kT = 1,35 keV en el centro del Sol, superada por efecto túnel; cadena protón-protón y ciclo CNO; el Sol pierde 4,26e9 kg/s; tiempo de vida 10^10 años quemando el 10 % de su masa; neutrinos solares, 6,4e14 por m^2 y segundo en la Tierra; energía de enlace por nucleón con máximo en el hierro.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">El Sol ha brillado con una potencia casi constante durante miles de millones de años. Ninguna reacción química ni la contracción gravitatoria dan para tanto. La fuente es la conversión de masa en energía en su núcleo.</p>
<p>Si pesas cuatro núcleos de hidrógeno por separado y luego el núcleo de helio que forman al unirse, el helio pesa un 0,7 % menos. La masa que falta se ha convertido en energía. Parece poco, pero el factor de conversión es la velocidad de la luz al cuadrado.</p>
<div class="nota"><strong>La dificultad es que los protones se repelen.</strong> Para fusionarse tienen que acercarse hasta casi tocarse, y a esa distancia la repulsión eléctrica es enorme. La temperatura del centro del Sol es mil veces demasiado baja para vencerla. La fusión ocurre de todos modos por el efecto túnel de la lección anterior, y ocurre tan rara vez que el Sol tarda diez mil millones de años en gastar su combustible. Que la reacción sea tan improbable es lo que hace al Sol una estrella estable y no una bomba.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Masa y energía</h3>
<p>La relatividad, que estudiaremos en la Fase 4, establece que la masa es una forma de energía:</p>
$$E = m\,c^{2}$$
<p>Como $c^{2} = 8{,}988 \times 10^{16}\ \text{m}^2/\text{s}^2$, un kilogramo equivale a $9 \times 10^{16}$ J, la energía que produce una central eléctrica grande en tres años.</p>
<p>Las masas de los núcleos se miden en <em>unidades de masa atómica</em>, y las energías nucleares en millones de electronvoltios, MeV:</p>
$$1\ \text{u} = 1{,}6605 \times 10^{-27}\ \text{kg} \qquad 1\ \text{u}\cdot c^{2} = 931{,}5\ \text{MeV}$$

<h3>2. El defecto de masa</h3>
<p>Comparamos la masa de cuatro átomos de hidrógeno con la de un átomo de helio-4:</p>
$$4 \times 1{,}007825\ \text{u} = 4{,}031300\ \text{u} \qquad m(^{4}\text{He}) = 4{,}002602\ \text{u}$$
$$\Delta m = 4{,}031300 - 4{,}002602 = 0{,}028698\ \text{u}$$
<p>La energía liberada es:</p>
$$E = 0{,}028698 \times 931{,}5 = 26{,}73\ \text{MeV}$$
<p>Y la fracción de masa convertida:</p>
$$\frac{0{,}028698}{4{,}031300} = 0{,}0071 = 0{,}71\ \%$$
<p>Una reacción química típica libera unos pocos eV por átomo. La fusión libera millones de veces más.</p>

<h3>3. La barrera de Coulomb</h3>
<p>Dos protones se repelen por su carga eléctrica. La fuerza nuclear, que es la que los une, solo actúa a distancias del orden de $10^{-15}$ m, un femtómetro. La energía de repulsión eléctrica a esa distancia es de aproximadamente 1,4 MeV.</p>
<p>Para superarla por la fuerza bruta haría falta que $kT$ fuera de ese orden:</p>
$$T \sim \frac{1{,}44 \times 10^{6}\ \text{eV}}{8{,}617 \times 10^{-5}\ \text{eV/K}} = 1{,}7 \times 10^{10}\ \text{K}$$
<p>El centro del Sol está a $1{,}57 \times 10^{7}$ K, donde $kT = 1{,}35$ keV. Faltan tres órdenes de magnitud. Con física clásica, el Sol no podría fusionar.</p>

<h3>4. La solución cuántica</h3>
<p>Intervienen dos efectos de las lecciones anteriores.</p>
<ul>
<li><strong>La cola de Maxwell-Boltzmann.</strong> Unos pocos protones tienen energías muy superiores a $kT$.</li>
<li><strong>El efecto túnel.</strong> Un protón no necesita superar la barrera: tiene una pequeña probabilidad de atravesarla, que crece con rapidez al aumentar su energía.</li>
</ul>
<p>El número de protones cae con la energía y la probabilidad de túnel sube. El producto tiene un máximo estrecho, a una energía varias veces $kT$, donde ocurren casi todas las fusiones. Como los dos factores son exponenciales, el ritmo de fusión es extremadamente sensible a la temperatura. Ese es el termostato de la estrella: si el núcleo se calienta un poco, produce mucha más energía, se expande y se enfría.</p>

<h3>5. La cadena protón-protón</h3>
<p>En el Sol, la fusión sigue tres pasos:</p>
<ol>
<li>Dos protones se unen y uno se convierte en neutrón. Se forma un núcleo de deuterio y se emiten un positrón y un <em>neutrino</em>. Este paso exige la intervención de la fuerza débil y es lentísimo: un protón del núcleo solar espera de media miles de millones de años a que le ocurra.</li>
<li>El deuterio captura otro protón en cuestión de segundos y forma helio-3.</li>
<li>Dos núcleos de helio-3 se unen, forman helio-4 y devuelven dos protones.</li>
</ol>
<p>El balance neto es:</p>
$$4\,\text{p} \;\rightarrow\; {}^{4}\text{He} + 2\,e^{+} + 2\,\nu + 26{,}7\ \text{MeV}$$
<p>En estrellas con más de 1,3 masas solares domina otro camino, el <em>ciclo CNO</em>, que usa carbono, nitrógeno y oxígeno como catalizadores. El resultado es el mismo, pero es todavía más sensible a la temperatura.</p>

<h3>6. Los neutrinos</h3>
<p>Los neutrinos casi no interactúan con la materia. Salen del núcleo del Sol en línea recta y llegan a la Tierra en ocho minutos, mientras que la luz tarda decenas de miles de años en abrirse paso, como verás en la lección siguiente. Son la única forma de ver directamente el núcleo.</p>
<p>Durante treinta años se detectó solo un tercio de los previstos. Era el <em>problema de los neutrinos solares</em>. La explicación no estaba en el Sol: los neutrinos cambian de tipo por el camino, y los primeros detectores solo veían uno de los tres tipos. Se confirmó en 2001 y demostró que los neutrinos tienen masa. Es un caso zanjado, y un buen ejemplo de cómo una discrepancia persistente acaba en física nueva.</p>

<h3>7. Hasta dónde llega la fusión</h3>
<p>La <em>energía de enlace por nucleón</em> mide lo fuertemente unidas que están las partículas de un núcleo. Crece desde el hidrógeno hasta un máximo en torno al hierro y después disminuye. Fusionar núcleos ligeros libera energía hasta llegar al hierro. A partir de ahí, la fusión la consume.</p>
<p>Cuando una estrella agota el hidrógeno del núcleo, el virial la obliga a contraerse y calentarse. A cien millones de kelvin el helio se fusiona en carbono, y en las estrellas más masivas la secuencia continúa hasta el hierro. Ahí se detiene, con consecuencias que verás al final de la fase.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El presupuesto del Sol</h3>
<p><strong>Masa que el Sol convierte en energía cada segundo:</strong></p>
$$\frac{L}{c^{2}} = \frac{3{,}828 \times 10^{26}}{8{,}988 \times 10^{16}} = 4{,}26 \times 10^{9}\ \text{kg/s}$$
<p>Más de cuatro millones de toneladas por segundo.</p>
<p><strong>Hidrógeno que fusiona cada segundo.</strong> Solo el 0,71 % de la masa fusionada se convierte en energía:</p>
$$\frac{4{,}26 \times 10^{9}}{0{,}0071} = 6{,}0 \times 10^{11}\ \text{kg/s}$$
<p><strong>Cuánto durará.</strong> Solo el núcleo, aproximadamente el 10 % de la masa, alcanza la temperatura necesaria. La energía disponible es:</p>
$$E = 0{,}10 \times 0{,}0071 \times 1{,}989 \times 10^{30} \times 8{,}988 \times 10^{16} = 1{,}27 \times 10^{44}\ \text{J}$$
<p>Al ritmo actual:</p>
$$t = \frac{1{,}27 \times 10^{44}}{3{,}828 \times 10^{26}} = 3{,}3 \times 10^{17}\ \text{s} = 1{,}05 \times 10^{10}\ \text{años}$$
<p>Diez mil millones de años. El Sol tiene 4600 millones: está hacia la mitad de su vida. Compara con los 30 millones de años del reloj de Kelvin.</p>
<p><strong>Neutrinos.</strong> Cada 26,73 MeV liberados van acompañados de 2 neutrinos. En julios, $26{,}73\ \text{MeV} = 4{,}28 \times 10^{-12}$ J:</p>
$$\frac{2 \times 3{,}828 \times 10^{26}}{4{,}28 \times 10^{-12}} = 1{,}8 \times 10^{38}\ \text{neutrinos por segundo}$$
<p>Repartidos sobre una esfera de 1 UA de radio, de área $2{,}81 \times 10^{23}\ \text{m}^2$:</p>
$$\frac{1{,}8 \times 10^{38}}{2{,}81 \times 10^{23}} = 6{,}4 \times 10^{14}\ \text{por m}^2\ \text{y segundo}$$
<p>Por la uña de tu pulgar pasan unos sesenta mil millones cada segundo, de día y de noche, porque atraviesan la Tierra sin enterarse.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Masa convertida en energía",
            enunciado: R`<p>Usa $c^{2} = 8{,}988 \times 10^{16}\ \text{m}^2/\text{s}^2$ y $1\ \text{u}\cdot c^{2} = 931{,}5$ MeV.</p>`,
            partes: [
              { id: "a", pregunta: "Energía equivalente a 1 kg de masa", tipo: "sci", unidad: "J", respuesta: 8.99e16,
                pistas: ["E = m c²."],
                solucion: R`$1 \times 8{,}988 \times 10^{16} = 8{,}99 \times 10^{16}$ J.` },
              { id: "b", pregunta: "Energía liberada por un defecto de masa de 0,028698 u", tipo: "num", unidad: "MeV", respuesta: 26.73, tol: 0.01,
                pistas: ["Multiplica por 931,5 MeV."],
                solucion: R`$0{,}028698 \times 931{,}5 = 26{,}73$ MeV.` },
              { id: "c", pregunta: "La fusión de tres núcleos de helio-4 (4,002602 u cada uno) da carbono-12, de masa 12,000000 u. ¿Qué energía se libera?", tipo: "num", unidad: "MeV", respuesta: 7.27, tol: 0.02,
                pistas: ["Defecto de masa: 3 × 4,002602 − 12."],
                solucion: R`$\Delta m = 12{,}007806 - 12 = 0{,}007806$ u. $E = 0{,}007806 \times 931{,}5 = 7{,}27$ MeV. Es mucho menos que al fusionar hidrógeno: por eso la fase de helio de una estrella dura bastante menos.` }
            ] },
          { id: "e2", nivel: 2, titulo: "El Sol, en cifras",
            enunciado: R`<p>Usa $L_\odot = 3{,}828 \times 10^{26}$ W y $M_\odot = 1{,}989 \times 10^{30}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Masa que el Sol pierde por segundo en forma de luz", tipo: "sci", unidad: "kg", respuesta: 4.26e9,
                pistas: ["Divide la luminosidad entre c²."],
                solucion: R`$\dfrac{3{,}828 \times 10^{26}}{8{,}988 \times 10^{16}} = 4{,}26 \times 10^{9}$ kg.` },
              { id: "b", pregunta: "¿Qué porcentaje de su masa habrá perdido así en 10¹⁰ años (3,156 × 10¹⁷ s)?", tipo: "num", unidad: "%", respuesta: 0.068, tol: 0.03,
                errores: [{ v: 0.00068, msg: "Eso es la fracción. Multiplica por 100 para expresarla en porcentaje." }],
                pistas: ["Masa perdida: 4,26 × 10⁹ × 3,156 × 10¹⁷ kg.", "Divide entre la masa del Sol y multiplica por 100."],
                solucion: R`$\dfrac{1{,}34 \times 10^{27}}{1{,}989 \times 10^{30}} = 6{,}8 \times 10^{-4} = 0{,}068\ \%$. El Sol apenas adelgaza: lo que cambia es su composición.` },
              { id: "c", pregunta: "Un detector de neutrinos tiene una sección de 100 m². ¿Cuántos neutrinos solares lo atraviesan cada segundo?", tipo: "sci", respuesta: 6.4e16, tol: 0.03,
                pistas: ["El flujo es 6,4 × 10¹⁴ por m² y segundo."],
                solucion: R`$6{,}4 \times 10^{14} \times 100 = 6{,}4 \times 10^{16}$. De todos ellos, un detector grande registra unas pocas decenas al día.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Vidas de estrellas y barreras",
            enunciado: R`<p>El tiempo de vida es proporcional al combustible dividido entre el ritmo de gasto: $t \propto M/L$. Para el Sol, $t = 10^{10}$ años.</p>`,
            partes: [
              { id: "a", pregunta: "Tiempo de vida de una estrella de 10 masas solares y 10 000 luminosidades solares", tipo: "sci", unidad: "años", respuesta: 1e7,
                pistas: ["M/L es 10/10 000 veces el del Sol."],
                solucion: R`$10^{10} \times \dfrac{10}{10^{4}} = 10^{7}$ años. Diez millones de años: las estrellas masivas viven poco y mueren jóvenes.` },
              { id: "b", pregunta: "Tiempo de vida de una enana roja de 0,5 masas solares y 0,04 luminosidades solares", tipo: "sci", unidad: "años", respuesta: 1.25e11,
                pistas: ["M/L = 0,5 / 0,04 = 12,5 veces el del Sol."],
                solucion: R`$10^{10} \times 12{,}5 = 1{,}25 \times 10^{11}$ años. Nueve veces la edad del universo: ninguna enana roja ha tenido tiempo de morir.` },
              { id: "c", pregunta: "Para fusionar helio hay que acercar dos núcleos con carga doble. La barrera eléctrica es entonces:", tipo: "opcion", respuesta: 2,
                opciones: ["Igual que entre dos protones", "El doble", "Cuatro veces mayor", "Menor, porque el helio pesa más"],
                pistas: ["La energía de repulsión es proporcional al producto de las dos cargas."],
                solucion: R`Cuatro veces mayor: $2 \times 2$. Por eso el helio necesita unos cien millones de kelvin, y por eso cada combustible sucesivo exige un núcleo más caliente.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>La energía de enlace, núcleo a núcleo</h3>
<p>El programa calcula la energía de enlace por nucleón de varios núcleos a partir de sus masas atómicas. La masa de un átomo es menor que la suma de sus piezas, y la diferencia es la energía que las mantiene unidas.</p>
<div class="tabla"><pre>m_H = 1.007825       # átomo de hidrógeno, en u
m_n = 1.008665       # neutrón, en u

nucleos = [
    ("deuterio", 1, 2, 2.014102),
    ("helio-4", 2, 4, 4.002602),
    ("carbono-12", 6, 12, 12.000000),
    ("oxígeno-16", 8, 16, 15.994915),
    ("hierro-56", 26, 56, 55.934936),
    ("uranio-238", 92, 238, 238.050788),
]

for nombre, Z, A, masa in nucleos:
    defecto = Z * m_H + (A - Z) * m_n - masa
    enlace = defecto * 931.5 / A
    print(nombre, round(enlace, 2), "MeV por nucleón")</pre></div>
<ol>
<li>Ejecútalo. La energía de enlace por nucleón sube con rapidez hasta el helio, sigue subiendo despacio hasta el hierro y después baja.</li>
<li>El salto de hidrógeno a helio, de 0 a 7 MeV por nucleón, es con diferencia el mayor. Por eso las estrellas pasan casi toda su vida quemando hidrógeno.</li>
<li>El uranio está por debajo del hierro. Partirlo en dos acerca los fragmentos al máximo y libera energía: es la fisión.</li>
</ol>`,
          notas: [{ id: "enlace", label: "Energía de enlace de cada núcleo y dónde está el máximo" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>$E = mc^{2}$.</strong> Cuatro hidrógenos pesan un 0,71 % más que un helio, y la diferencia son 26,7 MeV.`,
          R`<strong>La repulsión eléctrica</strong> exigiría diez mil millones de kelvin. La fusión ocurre a quince millones gracias al efecto túnel.`,
          R`<strong>La cadena protón-protón</strong> es lentísima en su primer paso, y eso da al Sol una vida de $10^{10}$ años.`,
          R`<strong>Los neutrinos solares</strong> llegan directamente del núcleo y confirman el modelo.`,
          R`<strong>La fusión libera energía hasta el hierro.</strong> Más allá, la consume.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 28 ───────────────────────── */
    {
      id: "leccion-28", n: 28, fase: 3, codigo: "B4.3",
      titulo: "El viaje de la energía y la relación masa-luminosidad",
      sub: "Cómo sale la energía del núcleo, por qué tarda milenios y por qué la masa decide casi todo en una estrella.",
      horas: "6 horas",
      contexto: "Transporte radiativo como camino aleatorio: N pasos de longitud l avanzan raíz(N) l; recorrido libre medio l = 1/(kappa rho); tiempo de difusión R^2 / (l c), decenas de miles de años en el Sol; convección y granulación; relación masa-luminosidad L proporcional a M^3 (estimación) y a M^3,5 (observada, aproximada); tiempo de vida t = 10^10 años x M^(-2,5); límites de masa estelar, 0,08 masas solares por abajo y del orden de 150 por arriba; luminosidad de Eddington L = 4 pi G M c / kappa, unas 3,8e4 luminosidades solares por masa solar.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">La energía se produce en el centro de la estrella y se emite en la superficie. Entre los dos puntos hay cientos de miles de kilómetros de gas opaco, y la forma en que la energía los atraviesa determina cuánto brilla la estrella.</p>
<p>Un fotón no puede salir en línea recta. Avanza unos milímetros, lo absorbe un átomo o lo desvía un electrón, y sale reemitido en otra dirección cualquiera. Así una y otra vez, como una persona con los ojos vendados que da cada paso en una dirección al azar. Acaba saliendo, pero tarda muchísimo.</p>
<div class="nota"><strong>Es un problema de difusión.</strong> El mismo que el del calor en una barra o el de los portadores en un semiconductor: el flujo es proporcional al gradiente, y el tiempo para recorrer una distancia crece con su cuadrado. Una estrella es un horno muy bien aislado, y su luminosidad es la fuga que el aislamiento permite.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El camino aleatorio</h3>
<p>Un fotón da pasos de longitud $\ell$ en direcciones al azar. Tras $N$ pasos no se ha alejado $N\ell$, porque muchos pasos se deshacen entre sí. La distancia típica al punto de partida es:</p>
$$d = \sqrt{N}\,\ell$$
<p>La razón es la misma por la que el ruido crece con la raíz del número de medidas en la Lección 20: los cuadrados de pasos independientes se suman, y la distancia es la raíz de esa suma.</p>
<p>Para salir de una estrella de radio $R$ hacen falta $N = (R/\ell)^{2}$ pasos. La distancia total recorrida es $N\ell$, y a la velocidad de la luz eso lleva un tiempo:</p>
$$t = \frac{N\,\ell}{c} = \frac{R^{2}}{\ell\,c}$$

<h3>2. El recorrido libre medio</h3>
<p>La longitud del paso depende de lo opaco que sea el gas. La <em>opacidad</em> $\kappa$ mide la sección que cada kilogramo de material ofrece a la luz, en m²/kg. El recorrido libre medio es:</p>
$$\ell = \frac{1}{\kappa\,\rho}$$
<p>La opacidad mínima posible en un gas ionizado es la de los electrones libres, que dispersan la luz: $\kappa \approx 0{,}034\ \text{m}^2/\text{kg}$ para la composición solar. Con la densidad media del Sol:</p>
$$\ell = \frac{1}{0{,}034 \times 1410} = 0{,}021\ \text{m} = 2\ \text{cm}$$
<p>En el interior real hay más procesos de absorción y la densidad central es mucho mayor, de modo que el valor representativo está en torno al milímetro.</p>

<h3>3. Convección</h3>
<p>Si la temperatura cae demasiado deprisa hacia fuera, la radiación no da abasto y el gas empieza a moverse: las burbujas calientes suben, ceden su calor y bajan. Es la <em>convección</em>, la misma que mueve el agua de una olla.</p>
<ul>
<li><strong>En el Sol</strong>, el 70 % interior del radio transporta la energía por radiación y el 30 % exterior por convección. La superficie muestra las cimas de las células convectivas: la <em>granulación</em>, con celdas de unos 1000 km que duran minutos.</li>
<li><strong>En las estrellas de poca masa</strong>, por debajo de 0,35 masas solares, toda la estrella es convectiva y el combustible se mezcla por completo.</li>
<li><strong>En las estrellas masivas</strong> ocurre al revés: el núcleo es convectivo y la envoltura radiativa.</li>
</ul>

<h3>4. La relación masa-luminosidad</h3>
<p>Estimamos la luminosidad con el mismo método de órdenes de magnitud de la Lección 25.</p>
<p>La energía de radiación contenida en la estrella es su densidad de energía, proporcional a $T^{4}$, por el volumen, proporcional a $R^{3}$. Esa energía se escapa en el tiempo de difusión $R^{2}/(\ell c)$. La luminosidad es el cociente:</p>
$$L \sim \frac{T^{4}R^{3}}{R^{2}/\ell} = T^{4}\,R\,\ell = \frac{T^{4}\,R}{\kappa\,\rho}$$
<p>Ahora sustituimos lo que ya sabemos: $T \propto M/R$, de la Lección 25, y $\rho \propto M/R^{3}$:</p>
$$L \propto \frac{(M/R)^{4}\,R}{\kappa\,M/R^{3}} = \frac{M^{4}}{R^{4}}\cdot\frac{R^{4}}{\kappa\,M} = \frac{M^{3}}{\kappa}$$
<p>El radio se cancela por completo. Si la opacidad es parecida de una estrella a otra:</p>
$$L \propto M^{3}$$
<p>Las medidas en estrellas dobles, las únicas cuya masa se obtiene directamente con la tercera ley de Kepler, dan para las estrellas parecidas al Sol:</p>
$$\frac{L}{L_\odot} \approx \left(\frac{M}{M_\odot}\right)^{3{,}5}$$
<p>Es una ley empírica aproximada. El exponente varía entre 3 y 4 según el intervalo de masas, y una estrella concreta puede desviarse un factor 2. Aun así, es notable que la fusión no aparezca en la deducción. La luminosidad la fija la capacidad de la estrella para dejar escapar energía, y el ritmo de fusión se ajusta a esa demanda.</p>

<h3>5. Cuánto vive una estrella</h3>
<p>El combustible es proporcional a $M$ y el gasto a $L$:</p>
$$t \propto \frac{M}{L} \propto \frac{M}{M^{3{,}5}} = M^{-2{,}5} \qquad t \approx 10^{10}\ \text{años} \times \left(\frac{M}{M_\odot}\right)^{-2{,}5}$$
<p>Una estrella con más masa tiene más combustible, pero lo gasta tanto más deprisa que vive mucho menos.</p>

<h3>6. Los límites</h3>
<p><strong>Por abajo.</strong> Con menos de 0,08 masas solares, unas 80 veces Júpiter, el centro nunca llega a la temperatura necesaria para fusionar hidrógeno de forma sostenida. El objeto es una <em>enana marrón</em>, sostenida por la presión de degeneración.</p>
<p><strong>Por arriba.</strong> La luz ejerce presión. Si una estrella brilla demasiado, la radiación empuja sus capas exteriores con más fuerza que la gravedad. El máximo es la <em>luminosidad de Eddington</em>:</p>
$$L_\text{Edd} = \frac{4\pi\,G\,M\,c}{\kappa} \approx 3{,}8 \times 10^{4}\,L_\odot \times \frac{M}{M_\odot}$$
<p>Como $L$ crece más deprisa que $M$, las estrellas muy masivas se acercan a ese límite y pierden masa en vientos intensos. Se observan estrellas de hasta unas 150 masas solares. Si existen estrellas bastante mayores sigue en discusión: hay candidatas de más de 200 masas solares cuya medida no es segura.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Cuánto tarda la luz en salir del Sol</h3>
<p>Con $R = 6{,}957 \times 10^{8}$ m y un recorrido libre medio representativo de 1 mm:</p>
$$t = \frac{R^{2}}{\ell\,c} = \frac{(6{,}957 \times 10^{8})^{2}}{10^{-3} \times 2{,}998 \times 10^{8}} = \frac{4{,}84 \times 10^{17}}{2{,}998 \times 10^{5}} = 1{,}6 \times 10^{12}\ \text{s}$$
<p>Son unos 50 000 años. En línea recta habría tardado $R/c = 2{,}3$ segundos. Las estimaciones detalladas van de diez mil a más de cien mil años, según cómo se trate la opacidad. La luz que ves hoy se generó cuando en la Tierra aún había neandertales.</p>
<h3>Sirio A, puesta a prueba</h3>
<p>Sirio A tiene 2,06 masas solares, medidas gracias a que tiene una compañera.</p>
<p><strong>Luminosidad prevista:</strong></p>
$$\frac{L}{L_\odot} = 2{,}06^{3{,}5} = 12{,}5$$
<p>La luminosidad medida es de 25 luminosidades solares, el doble. La ley acierta el orden de magnitud y falla en un factor 2: en ese intervalo de masas el exponente real está más cerca de 4, y $2{,}06^{4} = 18$.</p>
<p><strong>Tiempo de vida</strong>, con la luminosidad medida:</p>
$$t = 10^{10} \times \frac{2{,}06}{25} = 8 \times 10^{8}\ \text{años}$$
<p>Sirio vivirá menos de mil millones de años. El ejemplo enseña cómo tratar estas leyes de escala: sirven para razonar y para estimar, y cuando hay un dato medido, manda el dato.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Caminos aleatorios",
            enunciado: R`<p>Usa $d = \sqrt{N}\,\ell$ y $\ell = 1/(\kappa\rho)$.</p>`,
            partes: [
              { id: "a", pregunta: "Con pasos de 1 cm al azar, ¿cuántos pasos hacen falta para alejarse 1 m?", tipo: "num", unidad: "pasos", respuesta: 10000,
                errores: [{ v: 100, msg: "Eso sería en línea recta. Al azar, la distancia crece con la raíz del número de pasos." }],
                pistas: ["N = (d / ℓ)²."],
                solucion: R`$(100\ \text{cm}/1\ \text{cm})^{2} = 10^{4}$ pasos. Ha recorrido 100 m para avanzar 1.` },
              { id: "b", pregunta: "Recorrido libre medio con κ = 0,034 m²/kg y ρ = 1410 kg/m³, en centímetros", tipo: "num", unidad: "cm", respuesta: 2.09, tol: 0.03,
                pistas: ["ℓ = 1 / (κ ρ), en metros."],
                solucion: R`$\dfrac{1}{0{,}034 \times 1410} = 0{,}0209$ m $= 2{,}09$ cm.` },
              { id: "c", pregunta: "La granulación que se ve en la superficie del Sol es la señal de:", tipo: "opcion", respuesta: 1,
                opciones: ["La fusión nuclear en la superficie", "La convección en las capas exteriores", "La rotación del Sol", "Las manchas solares"],
                pistas: ["¿Cómo se transporta la energía en el 30 % exterior?"],
                solucion: R`La convección. Cada gránulo es la cima de una columna de gas caliente que sube, y los bordes oscuros son el gas enfriado que baja.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Masa, luminosidad y vida",
            enunciado: R`<p>Usa $L \propto M^{3{,}5}$ y $t = 10^{10}\ \text{años} \times M^{-2{,}5}$, con $M$ en masas solares.</p>`,
            partes: [
              { id: "a", pregunta: "Luminosidad de una estrella de 3 masas solares", tipo: "num", unidad: "L☉", respuesta: 46.8, tol: 0.03,
                errores: [{ v: 27, msg: "Ese valor es 3³. El exponente observado es 3,5." }],
                pistas: ["3^3,5 = 3³ × √3."],
                solucion: R`$3^{3{,}5} = 27 \times 1{,}732 = 46{,}8$.` },
              { id: "b", pregunta: "Su tiempo de vida, en millones de años", tipo: "num", unidad: "millones de años", respuesta: 642, tol: 0.03,
                pistas: ["3^2,5 = 9 × √3 = 15,6.", "10 000 millones de años entre 15,6."],
                solucion: R`$\dfrac{10^{10}}{15{,}6} = 6{,}4 \times 10^{8}$ años, 642 millones.` },
              { id: "c", pregunta: "¿Qué masa tiene una estrella que vive 10¹¹ años, diez veces más que el Sol?", tipo: "num", unidad: "M☉", respuesta: 0.398, tol: 0.03,
                pistas: ["M^(−2,5) = 10, luego M = 10^(−1/2,5) = 10^(−0,4)."],
                solucion: R`$M = 10^{-0{,}4} = 0{,}40$ masas solares. Una enana roja.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Difusión y el límite de Eddington",
            enunciado: R`<p>Usa $t = R^{2}/(\ell c)$ y $L_\text{Edd} = 3{,}8 \times 10^{4}\,L_\odot$ por cada masa solar.</p>`,
            partes: [
              { id: "a", pregunta: "Tiempo de difusión en el Sol (R = 6,957 × 10⁸ m) si la única opacidad fuera la de los electrones, con ℓ = 2,09 cm, en años", tipo: "num", unidad: "años", respuesta: 2450, tol: 0.03,
                errores: [{ v: 7.72e10, msg: "Ese valor está en segundos. Divide entre 3,156 × 10⁷ para pasar a años." }],
                pistas: ["R² = 4,84 × 10¹⁷. Divide entre ℓ c, con ℓ en metros.", "Pasa a años con 3,156 × 10⁷ s."],
                solucion: R`$\dfrac{4{,}84 \times 10^{17}}{0{,}0209 \times 2{,}998 \times 10^{8}} = 7{,}72 \times 10^{10}$ s $= 2450$ años. Es un límite inferior: con la opacidad real, unas veinte veces mayor, salen las decenas de miles de años del ejemplo.` },
              { id: "b", pregunta: "Luminosidad de Eddington de una estrella de 100 masas solares", tipo: "sci", unidad: "L☉", respuesta: 3.8e6,
                pistas: ["Es proporcional a la masa."],
                solucion: R`$3{,}8 \times 10^{4} \times 100 = 3{,}8 \times 10^{6}$ luminosidades solares.` },
              { id: "c", pregunta: "La ley L ∝ M^3,5 daría 10⁷ L☉ para esa estrella, más que su límite de Eddington. Eso significa que:", tipo: "opcion", respuesta: 2,
                opciones: ["La estrella brilla por encima del límite sin problema", "El límite de Eddington no se aplica a estrellas masivas", "La ley de potencias deja de valer: la luminosidad crece más despacio y la estrella pierde masa", "Una estrella de 100 masas solares no puede fusionar hidrógeno"],
                pistas: ["Una ley empírica vale en el intervalo en el que se midió."],
                solucion: R`La ley deja de valer. Para las estrellas más masivas la luminosidad crece casi en proporción a la masa, cerca del límite de Eddington, y la presión de radiación les arranca material. Extrapolar una ley de escala fuera de su intervalo es un error habitual.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Un camino aleatorio</h3>
<p>El programa suelta mil fotones que dan pasos de longitud 1 en direcciones al azar, y mide a qué distancia media acaban.</p>
<div class="tabla"><pre>import numpy as np

for N in [100, 400, 1600, 6400]:
    angulos = np.random.uniform(0, 2 * np.pi, (1000, N))
    x = np.cos(angulos).sum(axis=1)
    y = np.sin(angulos).sum(axis=1)
    d = np.sqrt((x**2 + y**2).mean())
    print(N, "pasos:", round(d, 1), "  raíz de N:", round(np.sqrt(N), 1))</pre></div>
<ol>
<li>Comprueba que la distancia sigue a $\sqrt{N}$: al multiplicar los pasos por cuatro, solo se duplica.</li>
<li>Calcula cuántos pasos harían falta para alejarse 1000 unidades.</li>
</ol>
<h3>Una tabla de vidas estelares</h3>
<div class="tabla"><pre>for M in [0.1, 0.5, 1, 2, 5, 10, 30]:
    L = M**3.5
    t = 1e10 * M**-2.5
    print(M, "masas solares:", round(L, 4), "L_sol,", f"{t:.1e}", "años")</pre></div>
<p>Compara cada tiempo de vida con la edad del universo, $1{,}38 \times 10^{10}$ años. Las estrellas de menos de 0,9 masas solares que se han formado alguna vez siguen todas ahí. Recuerda que para las masas extremas de la tabla la ley es solo orientativa.</p>`,
          notas: [{ id: "aleatorio", label: "Distancias obtenidas, y qué estrellas de la tabla viven más que la edad del universo" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La energía sale por difusión:</strong> un camino aleatorio de $N$ pasos avanza $\sqrt{N}\,\ell$, y tarda $R^{2}/(\ell c)$.`,
          R`<strong>En el Sol</strong>, eso son decenas de miles de años. El 30 % exterior transporta por convección.`,
          R`<strong>Relación masa-luminosidad:</strong> $L \propto M^{3{,}5}$, aproximada. La fija el transporte, no la fusión.`,
          R`<strong>Tiempo de vida:</strong> $t \approx 10^{10}\ \text{años} \times M^{-2{,}5}$. Las estrellas masivas viven poco.`,
          R`<strong>Hay estrellas entre 0,08 y unas 150 masas solares.</strong> El límite superior exacto sigue en discusión.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 29 ───────────────────────── */
    {
      id: "leccion-29", n: 29, fase: 3, codigo: "B4.4",
      titulo: "El diagrama de Hertzsprung-Russell",
      sub: "Un solo gráfico que ordena todas las estrellas, y que sirve para medir edades y distancias.",
      horas: "5 horas",
      contexto: "Diagrama H-R: luminosidad o magnitud absoluta frente a temperatura, tipo espectral o color (B - V); secuencia principal, gigantes, supergigantes y enanas blancas; líneas de radio constante L = R^2 (T/5772)^4 en unidades solares; la secuencia principal es una secuencia de masas; clases de luminosidad I a V, el Sol es G2V; cúmulos estelares: misma edad y distancia, punto de salida de la secuencia principal y edad t = 10^10 M^(-2,5) años; ajuste de la secuencia principal para medir distancias; cúmulos globulares de 12 a 13 mil millones de años.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Hacia 1910, dos astrónomos tuvieron por separado la misma idea: representar las estrellas en un gráfico con la temperatura en un eje y la luminosidad en el otro. Las estrellas no se reparten al azar. Se agrupan en unas pocas zonas, y esas zonas cuentan su historia.</p>
<p>Imagina un gráfico con la altura y el peso de todas las personas de una ciudad. Los puntos formarían una franja, con los niños en un extremo y los adultos en otro. Sin conocer a nadie, verías que altura y peso están relacionados y que hay poblaciones distintas. El diagrama de Hertzsprung-Russell, o H-R, es eso mismo para las estrellas.</p>
<div class="nota"><strong>Es un diagrama de estados.</strong> Cada punto es una estrella en un instante. Una estrella concreta se mueve por el diagrama a lo largo de su vida, muy despacio. Donde hay muchos puntos es donde las estrellas pasan mucho tiempo. Leerlo es parecido a leer un diagrama de dispersión de un sistema que recorre lentamente sus modos de funcionamiento.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Los ejes</h3>
<p><strong>Eje vertical:</strong> la luminosidad, en escala logarítmica, o su equivalente en magnitudes absolutas. Las estrellas más luminosas van arriba.</p>
<p><strong>Eje horizontal:</strong> la temperatura superficial, y por una costumbre histórica crece hacia la <em>izquierda</em>. Las estrellas calientes y azules están a la izquierda y las frías y rojas a la derecha. En lugar de la temperatura se puede usar el tipo espectral, O B A F G K M, o el color.</p>
<p>El color se mide como una diferencia de magnitudes entre dos filtros, uno azul, B, y otro en el amarillo verdoso, V. El <em>índice de color</em> $B - V$ es pequeño o negativo para las estrellas azules y grande para las rojas: 0,00 para Vega, 0,65 para el Sol y 1,85 para Betelgeuse. Tiene una ventaja práctica enorme: no depende de la distancia.</p>

<h3>2. Las regiones</h3>
<div class="tabla"><table>
<thead><tr><th>Región</th><th>Dónde está</th><th>Qué estrellas son</th></tr></thead>
<tbody>
<tr><td><strong>Secuencia principal</strong></td><td>Una banda diagonal, de arriba a la izquierda a abajo a la derecha</td><td>Las que fusionan hidrógeno en el núcleo. Nueve de cada diez</td></tr>
<tr><td><strong>Gigantes rojas</strong></td><td>Arriba a la derecha</td><td>Frías y muy luminosas: han agotado el hidrógeno del núcleo</td></tr>
<tr><td><strong>Supergigantes</strong></td><td>En la parte más alta</td><td>Estrellas masivas evolucionadas, como Betelgeuse y Rigel</td></tr>
<tr><td><strong>Enanas blancas</strong></td><td>Abajo a la izquierda</td><td>Calientes y muy poco luminosas: restos de estrellas</td></tr>
</tbody></table></div>

<h3>3. El radio se lee en el diagrama</h3>
<p>De la Lección 17, en unidades solares:</p>
$$\frac{L}{L_\odot} = \left(\frac{R}{R_\odot}\right)^{2}\left(\frac{T}{5772\ \text{K}}\right)^{4}$$
<p>Cada punto del diagrama tiene una $L$ y una $T$, y por tanto un radio. Las estrellas del mismo tamaño caen sobre líneas diagonales.</p>
<ul>
<li>Una estrella <strong>fría y luminosa</strong> tiene que ser enorme: cada metro cuadrado emite poco, así que hace falta muchísima superficie. Por eso se llaman gigantes.</li>
<li>Una estrella <strong>caliente y débil</strong> tiene que ser diminuta. Por eso se llaman enanas.</li>
</ul>

<h3>4. La secuencia principal es una secuencia de masas</h3>
<p>En la lección anterior viste que la masa fija la luminosidad, $L \propto M^{3{,}5}$. También fija el radio y, con ambos, la temperatura. Una estrella que fusiona hidrógeno ocupa un punto de la banda determinado casi por completo por su masa: las masivas arriba a la izquierda y las ligeras abajo a la derecha.</p>
<p>Las estrellas no recorren la secuencia principal a lo largo de su vida. Permanecen casi quietas en su punto mientras les dura el hidrógeno, y por eso hay tantas ahí.</p>

<h3>5. Clases de luminosidad</h3>
<p>Dos estrellas con la misma temperatura pueden ser una enana o una gigante. Se distinguen en el espectro: en una gigante, el gas de la superficie está a muy baja presión y sus líneas son más estrechas. La <em>clase de luminosidad</em> lo indica con un número romano, de I para las supergigantes a V para la secuencia principal.</p>
<p>La clasificación completa del Sol es <strong>G2V</strong>: tipo G, subtipo 2, secuencia principal. Betelgeuse es M2I.</p>
<p>Esto da un método de distancia. Con el espectro se sitúa la estrella en el diagrama y se lee su magnitud absoluta. Comparándola con la aparente, el módulo de distancia de la Lección 3 da la distancia.</p>

<h3>6. Los cúmulos como relojes</h3>
<p>Un cúmulo estelar es un grupo de estrellas nacidas a la vez de la misma nube. Todas tienen la misma edad, la misma composición y están a la misma distancia. Solo difieren en la masa.</p>
<p>Como las estrellas masivas viven menos, con el tiempo la secuencia principal del cúmulo se va quedando sin su parte alta. El punto donde la secuencia se interrumpe y gira hacia las gigantes es el <strong>punto de salida</strong>. Las estrellas que están ahí acaban de agotar su hidrógeno, así que su tiempo de vida es la edad del cúmulo:</p>
$$t_\text{cúmulo} \approx 10^{10}\ \text{años} \times \left(\frac{M_\text{salida}}{M_\odot}\right)^{-2{,}5}$$
<p>Las Pléyades tienen unos 100 millones de años y conservan estrellas azules. Los <em>cúmulos globulares</em>, que orbitan la Vía Láctea, han perdido todo lo que supera las 0,9 masas solares: tienen entre 12 000 y 13 000 millones de años. Son los objetos más viejos que se conocen, y ponen un límite inferior a la edad del universo.</p>

<h3>7. Los cúmulos como reglas</h3>
<p>Si se dibuja el diagrama de un cúmulo con magnitudes aparentes, su secuencia principal sale desplazada hacia abajo respecto a la de referencia, que está en magnitudes absolutas. El desplazamiento vertical es directamente el módulo de distancia, $m - M$. El método se llama <em>ajuste de la secuencia principal</em>.</p>
<p>El satélite Gaia ha medido el paralaje y el color de más de mil millones de estrellas. Su diagrama H-R es hoy la referencia para todos estos métodos.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Tres estrellas, tres tamaños</h3>
<p>Despejamos el radio de la relación de la sección 3: $R/R_\odot = \sqrt{L/L_\odot}\,/\,(T/5772)^{2}$.</p>
<p><strong>Arturo</strong>, una gigante: $L = 170$, $T = 4290$ K.</p>
$$\frac{R}{R_\odot} = \frac{\sqrt{170}}{(4290/5772)^{2}} = \frac{13{,}0}{0{,}552} = 23{,}6$$
<p><strong>Sirio B</strong>, una enana blanca: $L = 0{,}025$, $T = 25\,000$ K.</p>
$$\frac{R}{R_\odot} = \frac{\sqrt{0{,}025}}{(25\,000/5772)^{2}} = \frac{0{,}158}{18{,}8} = 0{,}0084$$
<p>En kilómetros, $0{,}0084 \times 695\,700 = 5840$ km. Es más pequeña que la Tierra y tiene la masa del Sol.</p>
<p><strong>Betelgeuse</strong>, una supergigante: en la Lección 17 obtuviste unos 800 radios solares.</p>
<p>Entre Sirio B y Betelgeuse hay un factor cien mil en tamaño. El diagrama H-R abarca objetos tan distintos como una canica y un estadio.</p>
<h3>La edad de un cúmulo</h3>
<p>En el diagrama de un cúmulo, la secuencia principal termina en estrellas de 1,3 masas solares:</p>
$$t = 10^{10} \times 1{,}3^{-2{,}5} = \frac{10^{10}}{1{,}927} = 5{,}2 \times 10^{9}\ \text{años}$$
<p>El cúmulo tiene unos 5000 millones de años, parecido al Sol.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Leer el diagrama",
            enunciado: R`<p>Usa $L/L_\odot = (R/R_\odot)^{2}\,(T/5772)^{4}$.</p>`,
            partes: [
              { id: "a", pregunta: "Luminosidad de una estrella de 10 radios solares y 4500 K", tipo: "num", unidad: "L☉", respuesta: 36.9, tol: 0.03,
                errores: [{ v: 100, msg: "Falta el factor de la temperatura: la estrella es más fría que el Sol." }],
                pistas: ["(4500/5772)⁴ = 0,369."],
                solucion: R`$10^{2} \times 0{,}369 = 36{,}9$.` },
              { id: "b", pregunta: "Una estrella muy caliente y muy poco luminosa es:", tipo: "opcion", respuesta: 3,
                opciones: ["Una supergigante azul", "Una gigante roja", "Una estrella de la secuencia principal", "Una enana blanca"],
                pistas: ["Caliente significa que cada metro cuadrado emite mucho. Si aun así brilla poco, ¿cómo es su superficie?"],
                solucion: R`Una enana blanca. Emite mucho por metro cuadrado, pero tiene muy pocos metros cuadrados.` },
              { id: "c", pregunta: "¿En qué zona del diagrama pasa una estrella la mayor parte de su vida?", tipo: "opcion", respuesta: 0,
                opciones: ["En la secuencia principal", "En la rama de las gigantes", "Entre las supergigantes", "Entre las enanas blancas, mientras fusiona helio"],
                pistas: ["Donde hay más puntos es donde las estrellas pasan más tiempo."],
                solucion: R`En la secuencia principal, mientras fusiona hidrógeno: alrededor del 90 % de su vida activa.` }
            ] },
          { id: "e2", nivel: 2, titulo: "La compañera de Sirio",
            enunciado: R`<p>Sirio B tiene $L = 0{,}025\,L_\odot$, $T = 25\,000$ K y una masa de 1,02 masas solares. Datos: $R_\odot = 6{,}957 \times 10^{8}$ m, $M_\odot = 1{,}989 \times 10^{30}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Radio, en radios solares", tipo: "num", unidad: "R☉", respuesta: 0.0084, tol: 0.05,
                pistas: ["R = √L / (T/5772)².", "(25 000/5772)² = 18,8."],
                solucion: R`$\dfrac{0{,}158}{18{,}8} = 0{,}0084$.` },
              { id: "b", pregunta: "Radio, en kilómetros", tipo: "num", unidad: "km", respuesta: 5840, tol: 0.05,
                pistas: ["Un radio solar son 695 700 km."],
                solucion: R`$0{,}0084 \times 695\,700 = 5840$ km. El radio de la Tierra es 6371 km.` },
              { id: "c", pregunta: "Densidad media", tipo: "sci", unidad: "kg/m³", respuesta: 2.43e9, tol: 0.12,
                pistas: ["Volumen: 4πR³/3 con R = 5,84 × 10⁶ m, que da 8,34 × 10²⁰ m³."],
                solucion: R`$\dfrac{1{,}02 \times 1{,}989 \times 10^{30}}{8{,}34 \times 10^{20}} = 2{,}4 \times 10^{9}\ \text{kg/m}^3$. Un centímetro cúbico pesa más de dos toneladas. Ningún gas ordinario aguanta eso: es materia degenerada.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Edades y distancias de cúmulos",
            enunciado: R`<p>Usa $t = 10^{10}\,M^{-2{,}5}$ años y el módulo de distancia $m - M = 5\log(d/10\ \text{pc})$.</p>`,
            partes: [
              { id: "a", pregunta: "Edad de un cúmulo cuyo punto de salida está en 5 masas solares", tipo: "sci", unidad: "años", respuesta: 1.79e8, tol: 0.03,
                pistas: ["5^2,5 = 25 × √5 = 55,9."],
                solucion: R`$\dfrac{10^{10}}{55{,}9} = 1{,}8 \times 10^{8}$ años. Un cúmulo joven, con estrellas azules.` },
              { id: "b", pregunta: "Edad de un cúmulo globular con el punto de salida en 0,9 masas solares", tipo: "sci", unidad: "años", respuesta: 1.3e10, tol: 0.03,
                pistas: ["0,9^(−2,5) = 1,30."],
                solucion: R`$10^{10} \times 1{,}30 = 1{,}3 \times 10^{10}$ años.` },
              { id: "c", pregunta: "En un cúmulo, las estrellas como el Sol (M = 4,83) se ven con magnitud aparente 10,50. ¿A qué distancia está?", tipo: "num", unidad: "pc", respuesta: 136, tol: 0.03,
                errores: [{ v: 13.6, msg: "Falta el factor 10 de la fórmula: d = 10 pc × 10^((m−M)/5)." }],
                pistas: ["m − M = 5,67.", "d = 10 × 10^(5,67/5) pc."],
                solucion: R`$d = 10 \times 10^{1{,}134} = 136$ pc. Es la distancia de las Pléyades.` },
              { id: "d", pregunta: "Los cúmulos globulares más viejos tienen unos 13 000 millones de años y el universo 13 800 millones. Eso indica que:", tipo: "opcion", respuesta: 1,
                opciones: ["Hay una contradicción entre las dos medidas", "Las primeras estrellas se formaron pronto, y dos métodos independientes concuerdan", "Los cúmulos globulares son anteriores al universo", "La relación masa-luminosidad no sirve para estrellas viejas"],
                pistas: ["Lo preocupante sería que salieran más viejos que el universo."],
                solucion: R`Concuerdan. Una edad sale de la física estelar y la otra de la expansión del universo, con métodos que no comparten nada. En los años noventa las edades de los cúmulos salían mayores que la del universo, y la discrepancia impulsó a revisar ambas medidas.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Dibuja tu propio diagrama H-R</h3>
<p>El programa sitúa veinte estrellas conocidas. Los valores son aproximados.</p>
<div class="tabla"><pre>import matplotlib.pyplot as plt

estrellas = [
    ("Sol", 5772, 1), ("Sirio A", 9940, 25), ("Sirio B", 25000, 0.025),
    ("Vega", 9600, 40), ("Arturo", 4290, 170), ("Betelgeuse", 3600, 1e5),
    ("Rigel", 12100, 1.2e5), ("Próxima", 3040, 0.0017), ("Aldebarán", 3900, 440),
    ("Proción A", 6530, 6.9), ("Proción B", 7740, 0.0005), ("Altair", 7670, 10.6),
    ("Antares", 3660, 7.5e4), ("Espiga", 25300, 2e4), ("61 Cygni A", 4530, 0.15),
    ("Barnard", 3130, 0.0035), ("Alfa Centauri A", 5790, 1.5), ("Polar", 6015, 1260),
    ("Capella", 4970, 79), ("Deneb", 8525, 2e5),
]

for nombre, T, L in estrellas:
    plt.scatter(T, L, color="orange")
    plt.annotate(nombre, (T, L), fontsize=8)

plt.xscale("log")
plt.yscale("log")
plt.gca().invert_xaxis()              # la temperatura crece hacia la izquierda
plt.xlabel("temperatura (K)")
plt.ylabel("luminosidad (soles)")
plt.show()</pre></div>
<ol>
<li>Localiza la secuencia principal, de Espiga a Próxima pasando por el Sol.</li>
<li>Identifica las gigantes, las supergigantes y las dos enanas blancas.</li>
<li>Calcula el radio de tres estrellas de regiones distintas y comprueba que encaja con su nombre.</li>
</ol>
<h3>A simple vista</h3>
<p>Las Pléyades se ven sin instrumentos en las noches de otoño e invierno, como un grupo apretado de seis o siete estrellas azuladas. Con prismáticos aparecen decenas. Estás viendo un cúmulo de 100 millones de años a 136 pársecs.</p>`,
          notas: [{ id: "hr", label: "Qué estrellas has clasificado en cada región y los radios que has calculado" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>El diagrama H-R</strong> representa luminosidad frente a temperatura, con las estrellas calientes a la izquierda.`,
          R`<strong>Cuatro regiones:</strong> secuencia principal, gigantes, supergigantes y enanas blancas.`,
          R`<strong>La posición da el radio:</strong> $L = R^{2}(T/5772)^{4}$ en unidades solares.`,
          R`<strong>La secuencia principal es una secuencia de masas.</strong> Las estrellas pasan en ella el 90 % de su vida.`,
          R`<strong>El punto de salida de un cúmulo da su edad</strong>, y el desplazamiento de su secuencia principal da su distancia.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 30 ───────────────────────── */
    {
      id: "leccion-30", n: 30, fase: 3, codigo: "B4.5",
      titulo: "Nacimiento y evolución de las estrellas",
      sub: "De una nube fría a una gigante roja: qué decide cada etapa y cuánto dura.",
      horas: "6 horas",
      contexto: "Nubes moleculares (10 K); criterio de Jeans, masa de Jeans M_J = (5 k T / (G mu m_H))^(3/2) (3 / (4 pi rho))^(1/2); tiempo de caída libre t = raíz(3 pi / (32 G rho)); protoestrellas, discos y conservación del momento angular; secuencia principal; agotamiento del hidrógeno, contracción del núcleo, combustión en capa y gigante roja; fusión de helio a 10^8 K; rama asintótica, nebulosa planetaria; estrellas masivas en capas de cebolla hasta el hierro; cefeidas y relación periodo-luminosidad M = -2,43 (log P - 1) - 4,05; futuro del Sol.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Una estrella es una larga negociación entre la gravedad, que quiere comprimirla, y la presión, que lo impide. La gravedad no se cansa. La presión depende de un combustible que se acaba. Toda la evolución estelar es la historia de cómo la estrella va encontrando combustibles nuevos, y de lo que ocurre cuando ya no quedan.</p>
<p>El patrón se repite en cada etapa. Se agota un combustible en el centro. El núcleo, sin fuente de energía, se contrae y, por el teorema del virial, se calienta. Si alcanza la temperatura necesaria, enciende el siguiente combustible. Si no, la contracción sigue hasta que la detiene la presión de degeneración.</p>
<div class="nota"><strong>Nadie ha visto evolucionar una estrella.</strong> Los cambios duran millones de años. Lo que se observa son millones de estrellas en etapas distintas, como quien reconstruye la vida de un árbol paseando por un bosque. La teoría se comprueba con los cúmulos de la lección anterior: los modelos tienen que reproducir su diagrama H-R completo con una sola edad.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Dónde nacen</h3>
<p>Las estrellas se forman en <em>nubes moleculares</em>: regiones de gas y polvo muy frías, a unos 10 K, con masas de miles a millones de soles. Son opacas en el visible y se ven como manchas oscuras sobre el fondo de la Vía Láctea. En el infrarrojo y en radio se puede mirar dentro.</p>

<h3>2. Cuándo colapsa una nube</h3>
<p>Un fragmento de nube colapsa si su gravedad vence a la presión del gas. Por el teorema del virial, el equilibrio exige $2K = |U|$. Si la energía térmica es menor, gana la gravedad:</p>
$$2K < |U|$$
<p>Para una esfera de masa $M$ y radio $R$ con $N = M/(\mu\,m_\text{H})$ partículas, la energía térmica es $K = \frac{3}{2}NkT$ y la gravitatoria $|U| = \frac{3}{5}GM^{2}/R$. Sustituyendo:</p>
$$\frac{3\,M\,k\,T}{\mu\,m_\text{H}} < \frac{3}{5}\,\frac{G\,M^{2}}{R}$$
<p>Eliminando $R$ en favor de la densidad, con $R = (3M/4\pi\rho)^{1/3}$, y despejando la masa, se obtiene la masa mínima para colapsar, la <strong>masa de Jeans</strong>:</p>
$$M_J = \left(\frac{5\,k\,T}{G\,\mu\,m_\text{H}}\right)^{3/2}\left(\frac{3}{4\pi\,\rho}\right)^{1/2}$$
<p>Las nubes frías y densas colapsan con más facilidad. Al contraerse, la densidad sube, la masa de Jeans baja y la nube se rompe en fragmentos menores. Por eso las estrellas nacen en grupos.</p>
<p>El colapso dura del orden del tiempo de caída libre:</p>
$$t = \sqrt{\frac{3\pi}{32\,G\,\rho}}$$

<h3>3. De protoestrella a estrella</h3>
<p>El fragmento que colapsa gira, aunque sea muy despacio. Al encogerse, la conservación del momento angular de la Lección 11 lo hace girar cada vez más rápido. El gas no puede caer directamente al centro y forma un <em>disco</em> alrededor de la protoestrella. En esos discos se forman los planetas.</p>
<p>La protoestrella brilla por contracción gravitatoria, el mecanismo de Kelvin-Helmholtz. Cuando su centro llega a unos diez millones de kelvin, se enciende la fusión del hidrógeno, la contracción se detiene y la estrella queda en la secuencia principal. Para una estrella como el Sol, el proceso completo dura unas decenas de millones de años.</p>
<p>Se forman muchas más estrellas pequeñas que grandes: por cada estrella de más de 10 masas solares nacen cientos de enanas rojas. Esa distribución se ha medido bien. Por qué tiene esa forma sigue siendo objeto de investigación.</p>

<h3>4. La secuencia principal no es del todo estática</h3>
<p>Al convertir hidrógeno en helio, el núcleo tiene menos partículas para la misma masa. Para mantener la presión se contrae y se calienta un poco, y la fusión se acelera. El Sol es hoy un 30 % más luminoso que al nacer, y sigue aumentando alrededor de un 1 % cada cien millones de años. Dentro de unos mil millones de años, mucho antes de convertirse en gigante, habrá calentado la Tierra lo suficiente para evaporar los océanos.</p>

<h3>5. Gigante roja</h3>
<p>Cuando el hidrógeno del núcleo se acaba, queda una bola de helio inerte. Sin fuente de energía, se contrae y se calienta. El hidrógeno sigue fusionándose en una <em>capa</em> alrededor del núcleo, cada vez más caliente y más productiva.</p>
<p>La luminosidad aumenta mucho, y la envoltura responde hinchándose hasta cientos de veces su tamaño. Al expandirse se enfría. La estrella sube hacia la derecha en el diagrama H-R: es una <strong>gigante roja</strong>. El núcleo se contrae mientras la envoltura se expande.</p>

<h3>6. El helio</h3>
<p>Cuando el núcleo alcanza cien millones de kelvin, tres núcleos de helio se fusionan en uno de carbono. En estrellas como el Sol el encendido es brusco, porque el núcleo está degenerado y no puede regularse expandiéndose. La estrella se estabiliza después, más pequeña y más caliente, y fusiona helio durante unos cien millones de años.</p>
<p>Al acabarse el helio del núcleo, el ciclo se repite con dos capas activas, y la estrella vuelve a hincharse, aún más. En esta fase es inestable, pulsa y expulsa sus capas exteriores en un viento lento. El gas expulsado, iluminado por el núcleo caliente que queda al descubierto, forma una <em>nebulosa planetaria</em>. El nombre es histórico: no tienen nada que ver con planetas.</p>
<p>Una estrella de menos de 8 masas solares no llega nunca a la temperatura necesaria para fusionar carbono. Su núcleo desnudo es una enana blanca.</p>

<h3>7. Las estrellas masivas</h3>
<p>Por encima de 8 masas solares, la estrella sigue encendiendo combustibles: carbono, neón, oxígeno y silicio, cada uno en un núcleo más caliente y rodeado de capas donde se fusionan los anteriores. La estructura recuerda a una cebolla. Cada etapa dura menos que la anterior, porque libera menos energía y la estrella pierde cada vez más por neutrinos.</p>
<div class="tabla"><table>
<thead><tr><th>Combustible en el núcleo</th><th>Temperatura</th><th>Duración en una estrella de 25 masas solares</th></tr></thead>
<tbody>
<tr><td>Hidrógeno</td><td>40 millones de K</td><td>7 millones de años</td></tr>
<tr><td>Helio</td><td>200 millones de K</td><td>700 000 años</td></tr>
<tr><td>Carbono</td><td>800 millones de K</td><td>600 años</td></tr>
<tr><td>Oxígeno</td><td>2000 millones de K</td><td>6 meses</td></tr>
<tr><td>Silicio</td><td>3500 millones de K</td><td>1 día</td></tr>
</tbody></table></div>
<p>Las cifras son de modelos y dependen de detalles, pero la progresión es firme. El silicio produce hierro, y el hierro no da energía al fusionarse. Lo que ocurre entonces es el tema de la próxima lección.</p>

<h3>8. Estrellas que laten: las cefeidas</h3>
<p>En cierta fase de su evolución, algunas estrellas gigantes pulsan con regularidad: se hinchan y se encogen con periodos de días o semanas. Las más útiles son las <em>cefeidas</em>. En 1912, Henrietta Leavitt descubrió que su periodo está ligado a su luminosidad: cuanto más lento es el latido, más luminosa es la estrella. Para la magnitud absoluta visual:</p>
$$M = -2{,}43\,(\log P - 1) - 4{,}05 \qquad (P\ \text{en días})$$
<p>Basta medir el periodo, que es fácil, para conocer la magnitud absoluta. Comparada con la aparente, da la distancia. Las cefeidas son tan luminosas que se ven en otras galaxias. Con ellas demostró Hubble en 1924 que Andrómeda está fuera de la Vía Láctea.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El colapso de un núcleo de nube</h3>
<p>Un núcleo denso de nube molecular tiene $T = 10$ K y $10^{10}$ moléculas por metro cúbico. La masa media por partícula es $\mu = 2{,}33$, porque el hidrógeno está en forma molecular.</p>
<p><strong>Densidad:</strong></p>
$$\rho = 10^{10} \times 2{,}33 \times 1{,}673 \times 10^{-27} = 3{,}9 \times 10^{-17}\ \text{kg/m}^3$$
<p>Es un vacío mucho mejor que el de cualquier laboratorio, y aun así es una de las regiones más densas del espacio interestelar.</p>
<p><strong>Masa de Jeans.</strong> Los dos factores por separado:</p>
$$\frac{5\,k\,T}{G\,\mu\,m_\text{H}} = \frac{5 \times 1{,}381 \times 10^{-23} \times 10}{6{,}674 \times 10^{-11} \times 2{,}33 \times 1{,}673 \times 10^{-27}} = 2{,}65 \times 10^{15}$$
$$\frac{3}{4\pi\rho} = \frac{3}{4\pi \times 3{,}9 \times 10^{-17}} = 6{,}12 \times 10^{15}$$
$$M_J = (2{,}65 \times 10^{15})^{3/2} \times (6{,}12 \times 10^{15})^{1/2} = 1{,}37 \times 10^{23} \times 7{,}82 \times 10^{7} = 1{,}07 \times 10^{31}\ \text{kg}$$
<p>Son 5,4 masas solares. La física elemental de un gas frío da, sin ajustar nada, una masa del orden de la de una estrella.</p>
<p><strong>Tiempo de caída libre:</strong></p>
$$t = \sqrt{\frac{3\pi}{32 \times 6{,}674 \times 10^{-11} \times 3{,}9 \times 10^{-17}}} = 1{,}06 \times 10^{13}\ \text{s} = 3{,}4 \times 10^{5}\ \text{años}$$
<h3>El Sol dentro de 7000 millones de años</h3>
<p>Como gigante roja alcanzará unos 100 radios solares con una superficie a 3500 K:</p>
$$\frac{L}{L_\odot} = 100^{2} \times \left(\frac{3500}{5772}\right)^{4} = 10^{4} \times 0{,}135 = 1350$$
<p>La temperatura de equilibrio de un planeta va con $L^{1/4}$, por la fórmula de la Lección 17. Para la Tierra, si conservara su órbita y su albedo:</p>
$$T = 255 \times 1350^{1/4} = 255 \times 6{,}06 = 1550\ \text{K}$$
<p>Roca fundida. Al final de esa fase el Sol será aún mayor, del tamaño aproximado de la órbita terrestre. Si llegará a engullir la Tierra no está claro: el Sol habrá perdido masa y las órbitas se habrán ensanchado, y los cálculos no coinciden.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Nacer",
            enunciado: R`<p>Usa $t = \sqrt{3\pi/(32\,G\rho)}$ con $G = 6{,}674 \times 10^{-11}$ en el SI. Un año son $3{,}156 \times 10^{7}$ s.</p>`,
            partes: [
              { id: "a", pregunta: "Tiempo de caída libre de una nube diez veces menos densa que la del ejemplo, ρ = 3,9 × 10⁻¹⁸ kg/m³, en años", tipo: "sci", unidad: "años", respuesta: 1.07e6, tol: 0.05,
                pistas: ["El tiempo va como 1/√ρ. Si la densidad baja 10 veces, el tiempo sube √10 veces.", "√10 × 3,4 × 10⁵ años."],
                solucion: R`$3{,}4 \times 10^{5} \times \sqrt{10} = 1{,}07 \times 10^{6}$ años. Las nubes menos densas tardan más en colapsar.` },
              { id: "b", pregunta: "Una nube que colapsa forma un disco alrededor de la protoestrella porque:", tipo: "opcion", respuesta: 1,
                opciones: ["El campo magnético aplana el gas", "El momento angular se conserva y el gas no puede caer directamente al centro", "La radiación de la estrella empuja el gas hacia el ecuador", "La gravedad es más intensa en un plano"],
                pistas: ["Recuerda la patinadora de la Lección 11."],
                solucion: R`Por la conservación del momento angular. A lo largo del eje de giro nada impide caer, pero en el plano perpendicular el giro lo frena. El resultado es un disco. Que los planetas del sistema solar orbiten casi en un mismo plano y en el mismo sentido es la huella de aquel disco.` },
              { id: "c", pregunta: "Una estrella se convierte en gigante roja cuando:", tipo: "opcion", respuesta: 2,
                opciones: ["Se enfría porque se le acaba todo el combustible", "Empieza a fusionar hierro", "Agota el hidrógeno del núcleo: el núcleo se contrae y la envoltura se expande", "Captura materia de una nube cercana"],
                pistas: ["¿Qué le ocurre al núcleo cuando se queda sin fuente de energía?"],
                solucion: R`El núcleo de helio se contrae y se calienta, la fusión continúa en una capa cada vez más activa y la envoltura se hincha y se enfría.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Gigantes",
            enunciado: R`<p>Usa $L = R^{2}(T/5772)^{4}$ en unidades solares, y que la temperatura de equilibrio de un planeta va con $L^{1/4}$. Para la Tierra hoy es 255 K.</p>`,
            partes: [
              { id: "a", pregunta: "Luminosidad de una gigante de 50 radios solares y 4000 K", tipo: "num", unidad: "L☉", respuesta: 577, tol: 0.03,
                pistas: ["(4000/5772)⁴ = 0,2306."],
                solucion: R`$2500 \times 0{,}2306 = 577$.` },
              { id: "b", pregunta: "Temperatura de equilibrio de un planeta como la Tierra, a 1 UA de esa gigante", tipo: "num", unidad: "K", respuesta: 1250, tol: 0.03,
                pistas: ["577^(1/4) es la raíz cuadrada de la raíz cuadrada: 4,90."],
                solucion: R`$255 \times 4{,}90 = 1250$ K.` },
              { id: "c", pregunta: "Una estrella fusiona un núcleo de 0,5 masas solares de helio brillando a 50 L☉. El helio da 0,0907 veces la energía por kilogramo del hidrógeno, y el Sol tarda 10¹⁰ años en fusionar 0,1 masas solares de hidrógeno a 1 L☉. ¿Cuánto dura la fase de helio?", tipo: "sci", unidad: "años", respuesta: 9.07e7, tol: 0.05,
                pistas: ["El tiempo es proporcional a la masa de combustible y a la energía por kilogramo, e inversamente proporcional a la luminosidad.", "10¹⁰ × (0,5/0,1) × 0,0907 / 50."],
                solucion: R`$10^{10} \times 5 \times 0{,}0907 \times \dfrac{1}{50} = 9{,}1 \times 10^{7}$ años. Unos cien millones de años, el 1 % de lo que duró la fase de hidrógeno.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Una cefeida en otra galaxia",
            enunciado: R`<p>En la Gran Nube de Magallanes se observa una cefeida con un periodo de 30 días y una magnitud aparente media de 13,3. Usa $M = -2{,}43\,(\log P - 1) - 4{,}05$. Dato: $\log 30 = 1{,}477$.</p>`,
            partes: [
              { id: "a", pregunta: "Magnitud absoluta de la cefeida", tipo: "num", respuesta: -5.21, tol: 0.01,
                errores: [{ v: -2.89, msg: "Revisa los signos: los dos términos son negativos y se suman." }],
                pistas: ["log P − 1 = 0,477."],
                solucion: R`$-2{,}43 \times 0{,}477 - 4{,}05 = -1{,}16 - 4{,}05 = -5{,}21$. Diez mil veces la luminosidad del Sol.` },
              { id: "b", pregunta: "Distancia a la Gran Nube de Magallanes", tipo: "sci", unidad: "pc", respuesta: 5.04e4, tol: 0.06,
                pistas: ["m − M = 13,3 + 5,21 = 18,51.", "d = 10 pc × 10^(18,51/5)."],
                solucion: R`$d = 10 \times 10^{3{,}702} = 5{,}0 \times 10^{4}$ pc. Cincuenta mil pársecs, unos 164 000 años luz. No se ha tenido en cuenta el polvo, que oscurece la estrella y hace sobrestimar algo la distancia.` },
              { id: "c", pregunta: "Las cefeidas son buenas para medir distancias a otras galaxias porque:", tipo: "opcion", respuesta: 0,
                opciones: ["Son muy luminosas y su periodo delata su luminosidad", "Todas tienen exactamente la misma luminosidad", "Están siempre a la misma distancia", "Su paralaje es fácil de medir"],
                pistas: ["¿Qué es lo que se mide y qué es lo que se deduce?"],
                solucion: R`Se ven desde muy lejos y el periodo, que se mide con un simple cronometraje, da su luminosidad. Un objeto de luminosidad conocida se llama <em>candela estándar</em>.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>La masa de Jeans, variando las condiciones</h3>
<div class="tabla"><pre>import math

G = 6.674e-11
k = 1.381e-23
m_H = 1.673e-27
M_sol = 1.989e30
mu = 2.33

def jeans(T, n):
    rho = n * mu * m_H
    a = (5 * k * T / (G * mu * m_H))**1.5
    b = (3 / (4 * math.pi * rho))**0.5
    return a * b / M_sol

for T, n in [(10, 1e8), (10, 1e10), (10, 1e12), (50, 1e10), (100, 1e6)]:
    print("T =", T, "K, n =", n, "por m3:", round(jeans(T, n), 1), "masas solares")</pre></div>
<ol>
<li>Comprueba que con 10 K y $10^{10}$ partículas por metro cúbico salen 5,4 masas solares.</li>
<li>Observa cómo baja la masa de Jeans al aumentar la densidad a temperatura constante. Es la fragmentación.</li>
<li>Observa cuánto sube al calentar el gas. Las primeras estrellas del universo se formaron en gas sin elementos pesados, que se enfría mal, y se cree que por eso fueron mucho más masivas.</li>
</ol>
<h3>Una cefeida a simple vista</h3>
<p>Delta Cephei, la estrella que da nombre a la familia, varía entre magnitud 3,5 y 4,4 con un periodo de 5,37 días. Se ve sin instrumentos desde un cielo razonable. Búscala con Stellarium en la constelación de Cefeo y compara su brillo, noche tras noche, con dos vecinas que no cambian: Zeta Cephei, de magnitud 3,4, y Épsilon Cephei, de 4,2. En dos semanas habrás visto el ciclo completo más de dos veces.</p>`,
          notas: [{ id: "cefeida", label: "Estimaciones de brillo de Delta Cephei con fecha y hora, y masas de Jeans obtenidas" }],
          tareasTitulo: "Lista de observación",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Localizar la nebulosa de Orión, bajo el cinturón: una región donde nacen estrellas hoy." },
            { id: "t2", texto: "Estimar el brillo de Delta Cephei al menos cinco noches." },
            { id: "t3", texto: "Localizar una gigante roja visible esta temporada: Aldebarán, Arturo o Antares." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Una nube colapsa si supera la masa de Jeans.</strong> Las nubes frías y densas se fragmentan en estrellas.`,
          R`<strong>El momento angular</strong> convierte el gas que cae en un disco, donde nacen los planetas.`,
          R`<strong>Cada vez que se agota un combustible</strong>, el núcleo se contrae y se calienta hasta encender el siguiente.`,
          R`<strong>Gigante roja:</strong> núcleo en contracción, capa activa y envoltura hinchada. Después, helio a cien millones de kelvin.`,
          R`<strong>Las cefeidas</strong> tienen un periodo ligado a su luminosidad, y sirven para medir distancias a otras galaxias.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 31 ───────────────────────── */
    {
      id: "leccion-31", n: 31, fase: 3, codigo: "B4.6",
      titulo: "Enanas blancas, supernovas y estrellas de neutrones",
      sub: "Cómo terminan las estrellas, y de dónde salen el oxígeno que respiras y el hierro de tu sangre.",
      horas: "6 horas",
      contexto: "Enanas blancas: presión de degeneración de electrones, relación masa-radio R proporcional a M^(-1/3), límite de Chandrasekhar 1,4 masas solares; destinos según la masa inicial (menos de 8 masas solares enana blanca, de 8 a unas 20 estrella de neutrones, más agujero negro, con límites inciertos); supernova de colapso del núcleo, energía gravitatoria (3/5) G M^2 / R del orden de 3e46 J, 99 % en neutrinos, SN 1987A; supernovas de tipo Ia, M = -19,3, candelas estándar; nucleosíntesis, captura de neutrones y fusiones de estrellas de neutrones; estrellas de neutrones de 1,4 masas solares y 12 km, púlsares, nebulosa del Cangrejo (1054).",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Cuando una estrella se queda sin combustible, la gravedad cobra su deuda. El final depende de una sola cosa: cuánta masa queda en el núcleo, y qué puede oponerse a ella.</p>
<p>Hay tres desenlaces. Si el núcleo es ligero, lo sostiene la presión de degeneración de los electrones: una <em>enana blanca</em>. Si es demasiado pesado para eso, los electrones son forzados a entrar en los protones y lo sostienen los neutrones: una <em>estrella de neutrones</em>. Y si es demasiado pesado incluso para eso, nada lo sostiene: un <em>agujero negro</em>, que queda para la Fase 4.</p>
<div class="nota"><strong>Somos residuos de estrellas.</strong> El universo salió del Big Bang con hidrógeno, helio y trazas de litio. Todo lo demás se ha fabricado en estrellas y se ha dispersado al morir estas. El carbono y el nitrógeno de tu cuerpo salieron sobre todo de gigantes rojas, el oxígeno y el calcio de supernovas, y el oro de la colisión de dos estrellas de neutrones. No es una metáfora: se mide en los espectros.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Enanas blancas</h3>
<p>El núcleo desnudo de una estrella como el Sol es una bola de carbono y oxígeno del tamaño de la Tierra, sin fusión. No colapsa porque los electrones, apretados, ejercen la presión de degeneración de la Lección 26, que no depende de la temperatura. La enana blanca se limita a enfriarse durante miles de millones de años.</p>
<p>Esa presión crece con la densidad como $P \propto \rho^{5/3}$. La combinamos con las estimaciones de la Lección 25: $\rho \sim M/R^{3}$, y la presión necesaria para el equilibrio, $P \sim GM^{2}/R^{4}$:</p>
$$\left(\frac{M}{R^{3}}\right)^{5/3} \propto \frac{M^{2}}{R^{4}} \;\Rightarrow\; \frac{M^{5/3}}{R^{5}} \propto \frac{M^{2}}{R^{4}} \;\Rightarrow\; R \propto M^{-1/3}$$
<p>El resultado va contra la intuición: <strong>cuanta más masa tiene una enana blanca, más pequeña es</strong>.</p>

<h3>2. El límite de Chandrasekhar</h3>
<p>Al aumentar la masa y encogerse la estrella, los electrones se mueven cada vez más rápido, hasta acercarse a la velocidad de la luz. No pueden superarla, y la presión deja de crecer tan deprisa: pasa a ser $P \propto \rho^{4/3}$. Repetimos la cuenta:</p>
$$\left(\frac{M}{R^{3}}\right)^{4/3} \propto \frac{M^{2}}{R^{4}} \;\Rightarrow\; \frac{M^{4/3}}{R^{4}} \propto \frac{M^{2}}{R^{4}}$$
<p>El radio se cancela. La igualdad solo se cumple para una masa concreta, y por encima de ella no hay equilibrio para ningún radio. Esa masa es el <strong>límite de Chandrasekhar</strong>:</p>
$$M_\text{Ch} \approx 1{,}4\ M_\odot$$
<p>Lo calculó Subrahmanyan Chandrasekhar en 1930, con diecinueve años. No se conoce ninguna enana blanca que lo supere.</p>

<h3>3. Destinos según la masa</h3>
<div class="tabla"><table>
<thead><tr><th>Masa inicial</th><th>Final</th><th>Resto</th></tr></thead>
<tbody>
<tr><td>Menos de 0,08 masas solares</td><td>Nunca fusiona hidrógeno</td><td>Enana marrón</td></tr>
<tr><td>De 0,08 a 8</td><td>Nebulosa planetaria</td><td>Enana blanca</td></tr>
<tr><td>De 8 a unas 20</td><td>Supernova</td><td>Estrella de neutrones</td></tr>
<tr><td>Más de unas 20</td><td>Supernova o colapso directo</td><td>Agujero negro</td></tr>
</tbody></table></div>
<p>Las estrellas pierden mucha masa por el camino: una estrella de 5 masas solares deja una enana blanca de menos de una. Los dos primeros límites están bien establecidos. El que separa las estrellas de neutrones de los agujeros negros es incierto, y depende de la rotación y de la composición.</p>

<h3>4. Supernova por colapso del núcleo</h3>
<p>En una estrella masiva, el núcleo de hierro crece hasta alcanzar el límite de Chandrasekhar. No puede obtener energía de la fusión y la presión de degeneración ya no lo sostiene. Colapsa en menos de un segundo.</p>
<p>Los electrones son empujados dentro de los protones y forman neutrones, emitiendo un neutrino en cada conversión. Cuando la materia alcanza la densidad de un núcleo atómico, el colapso se detiene de golpe. Las capas que venían cayendo rebotan, y una onda de choque, ayudada por el flujo de neutrinos, expulsa el resto de la estrella.</p>
<p>La energía liberada es la gravitatoria de formar un objeto de 12 km de radio:</p>
$$E \approx \frac{3}{5}\,\frac{G\,M^{2}}{R} \sim 3 \times 10^{46}\ \text{J}$$
<p>Es cien veces lo que el Sol emitirá en toda su vida. El reparto sorprende: el 99 % se lo llevan los neutrinos, cerca del 1 % es la energía de movimiento del gas expulsado, y solo una centésima de ese 1 % sale como luz. Con eso basta para que la supernova brille durante semanas como una galaxia entera.</p>
<p>El esquema general está confirmado. En 1987 explotó una supernova en la Gran Nube de Magallanes, y tres detectores registraron dos docenas de neutrinos unas horas antes de que llegara la luz. Lo que no está resuelto del todo es el mecanismo detallado por el que la onda de choque consigue salir: en las simulaciones depende de la turbulencia y de la asimetría, y es un campo de investigación activo.</p>

<h3>5. Supernovas de tipo Ia</h3>
<p>Hay otra manera de explotar. Una enana blanca en un sistema doble puede ganar masa de su compañera. Al acercarse a 1,4 masas solares, el carbono se enciende en un interior degenerado que no puede regularse, y la fusión se propaga a toda la estrella en segundos. No queda resto.</p>
<p>Como todas explotan con una masa parecida, todas alcanzan un brillo máximo parecido, de magnitud absoluta:</p>
$$M \approx -19{,}3$$
<p>Son candelas estándar visibles a miles de millones de años luz, y con ellas se descubrió en 1998 que la expansión del universo se acelera. Las candelas no son perfectas: se corrigen con la forma de su curva de luz. Tampoco está cerrado cuál es el sistema que las origina. Puede ser una enana blanca que roba masa a una estrella normal, o dos enanas blancas que se fusionan. Hay indicios de las dos vías.</p>

<h3>6. De dónde salen los elementos</h3>
<ul>
<li><strong>Hasta el hierro:</strong> fusión en el interior de las estrellas, dispersada por vientos y supernovas. Las de tipo Ia producen gran parte del hierro.</li>
<li><strong>Más allá del hierro:</strong> la fusión no sirve. Los núcleos crecen capturando neutrones uno a uno. Si la captura es lenta, ocurre en gigantes en sus últimas fases. Si es rápida, hace falta un entorno con una densidad de neutrones extrema.</li>
</ul>
<p>En 2017 se detectó por primera vez la fusión de dos estrellas de neutrones, a la vez con ondas gravitacionales y con luz, y en el espectro del resto aparecieron elementos pesados recién formados. Quedó confirmado que esas colisiones fabrican oro, platino y uranio. Qué fracción del total aportan, frente a ciertas supernovas raras, sigue en discusión.</p>

<h3>7. Estrellas de neutrones y púlsares</h3>
<p>Lo que queda tras el colapso es una esfera de neutrones de unas 1,4 masas solares y unos 12 km de radio. La sostiene la presión de degeneración de los neutrones, junto con la repulsión nuclear a distancias muy cortas. Su masa máxima está entre 2 y 2,3 masas solares. El valor exacto no se conoce, porque no se sabe con seguridad cómo se comporta la materia a esas densidades.</p>
<p>Al encogerse desde miles de kilómetros hasta doce, el núcleo conserva su momento angular y su flujo magnético. El resultado es un objeto que gira muchas veces por segundo, con un campo magnético enorme. Emite haces de ondas de radio por sus polos magnéticos, y si uno de ellos barre la Tierra en cada vuelta, se recibe un pulso regular: un <strong>púlsar</strong>.</p>
<p>El más famoso está en la nebulosa del Cangrejo, el resto de una supernova que astrónomos chinos registraron en el año 1054. Gira 30 veces por segundo y se va frenando poco a poco. La energía que pierde es la que mantiene brillando la nebulosa.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Una estrella de neutrones en cifras</h3>
<p>Tomamos $M = 1{,}4\,M_\odot = 2{,}78 \times 10^{30}$ kg y $R = 12$ km.</p>
<p><strong>Densidad media:</strong></p>
$$\rho = \frac{2{,}78 \times 10^{30}}{\frac{4}{3}\pi\,(1{,}2 \times 10^{4})^{3}} = \frac{2{,}78 \times 10^{30}}{7{,}24 \times 10^{12}} = 3{,}8 \times 10^{17}\ \text{kg/m}^3$$
<p>Es algo más que la densidad de un núcleo atómico. Una cucharadita pesaría como una montaña.</p>
<p><strong>Velocidad de escape:</strong></p>
$$v = \sqrt{\frac{2GM}{R}} = \sqrt{\frac{2 \times 6{,}674 \times 10^{-11} \times 2{,}78 \times 10^{30}}{1{,}2 \times 10^{4}}} = \sqrt{3{,}10 \times 10^{16}} = 1{,}76 \times 10^{8}\ \text{m/s}$$
<p>Es el 59 % de la velocidad de la luz. La fórmula de Newton ya no es fiable a estas velocidades, pero el resultado indica lo cerca que está de ser un agujero negro.</p>
<p><strong>Energía liberada al formarse:</strong></p>
$$E = \frac{3}{5}\,\frac{G\,M^{2}}{R} = \frac{0{,}6 \times 6{,}674 \times 10^{-11} \times (2{,}78 \times 10^{30})^{2}}{1{,}2 \times 10^{4}} = 2{,}6 \times 10^{46}\ \text{J}$$
<h3>La edad de la nebulosa del Cangrejo</h3>
<p>El gas de la nebulosa se expande a unos 1500 km/s. Desde 1054 hasta 2026 han pasado 972 años:</p>
$$r = 1{,}5 \times 10^{6}\ \text{m/s} \times 972 \times 3{,}156 \times 10^{7}\ \text{s} = 4{,}6 \times 10^{16}\ \text{m} = 4{,}9\ \text{años luz}$$
<p>El radio medido de la nebulosa es de unos 5,5 años luz. La velocidad de expansión y la fecha de las crónicas concuerdan, y con ello la identificación de la nebulosa con aquella supernova.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Enanas blancas",
            enunciado: R`<p>Datos: $M_\odot = 1{,}989 \times 10^{30}$ kg y $G = 6{,}674 \times 10^{-11}$ en el SI.</p>`,
            partes: [
              { id: "a", pregunta: "Densidad media de una enana blanca de 0,6 masas solares y 8700 km de radio", tipo: "sci", unidad: "kg/m³", respuesta: 4.33e8, tol: 0.05,
                pistas: ["Volumen: 4πR³/3 con R = 8,7 × 10⁶ m, que da 2,76 × 10²¹ m³."],
                solucion: R`$\dfrac{0{,}6 \times 1{,}989 \times 10^{30}}{2{,}76 \times 10^{21}} = 4{,}3 \times 10^{8}\ \text{kg/m}^3$. Casi media tonelada por centímetro cúbico.` },
              { id: "b", pregunta: "Gravedad en la superficie de Sirio B: 1,02 masas solares y radio 5,84 × 10⁶ m", tipo: "sci", unidad: "m/s²", respuesta: 3.97e6, tol: 0.03,
                pistas: ["g = G M / R²."],
                solucion: R`$\dfrac{6{,}674 \times 10^{-11} \times 2{,}029 \times 10^{30}}{(5{,}84 \times 10^{6})^{2}} = 4{,}0 \times 10^{6}\ \text{m/s}^2$. Cuatrocientas mil veces la gravedad terrestre.` },
              { id: "c", pregunta: "Si una enana blanca gana masa, su radio:", tipo: "opcion", respuesta: 1,
                opciones: ["Aumenta", "Disminuye", "No cambia", "Aumenta primero y disminuye después"],
                pistas: ["R ∝ M^(−1/3)."],
                solucion: R`Disminuye. Más masa exige más presión, y la materia degenerada solo la da comprimiéndose.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Estrellas de neutrones",
            enunciado: R`<p>Usa los datos del ejemplo cuando hagan falta.</p>`,
            partes: [
              { id: "a", pregunta: "Densidad media de una estrella de neutrones de 2,0 masas solares y 12 km de radio", tipo: "sci", unidad: "kg/m³", respuesta: 5.5e17, tol: 0.05,
                pistas: ["El volumen es el del ejemplo: 7,24 × 10¹² m³."],
                solucion: R`$\dfrac{3{,}98 \times 10^{30}}{7{,}24 \times 10^{12}} = 5{,}5 \times 10^{17}\ \text{kg/m}^3$.` },
              { id: "b", pregunta: "Un núcleo estelar de 6000 km de radio que gira una vez cada 1000 s colapsa a 12 km. ¿Cuántas vueltas por segundo da la estrella de neutrones?", tipo: "num", unidad: "Hz", respuesta: 250, tol: 0.03,
                pistas: ["De la Lección 11: el periodo va con el cuadrado del radio.", "El nuevo periodo es 1000 × (12/6000)² s."],
                solucion: R`$T = 1000 \times 4 \times 10^{-6} = 4 \times 10^{-3}$ s, luego $1/T = 250$ vueltas por segundo.` },
              { id: "c", pregunta: "Radio de un resto de supernova que se expande a 2000 km/s durante 500 años, en años luz", tipo: "num", unidad: "años luz", respuesta: 3.34, tol: 0.03,
                pistas: ["Distancia = velocidad × tiempo, en metros.", "Un año luz son 9,461 × 10¹⁵ m."],
                solucion: R`$2 \times 10^{6} \times 500 \times 3{,}156 \times 10^{7} = 3{,}16 \times 10^{16}$ m $= 3{,}34$ años luz.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Supernovas",
            enunciado: R`<p>Usa $L_\odot = 3{,}828 \times 10^{26}$ W y el módulo de distancia.</p>`,
            partes: [
              { id: "a", pregunta: "Una supernova libera 2,6 × 10⁴⁶ J. ¿Cuántos años tardaría el Sol en emitir esa energía?", tipo: "sci", unidad: "años", respuesta: 2.15e12, tol: 0.05,
                pistas: ["Divide la energía entre la luminosidad solar y pasa de segundos a años."],
                solucion: R`$\dfrac{2{,}6 \times 10^{46}}{3{,}828 \times 10^{26}} = 6{,}8 \times 10^{19}$ s $= 2{,}2 \times 10^{12}$ años. Más de cien veces la edad del universo.` },
              { id: "b", pregunta: "Una supernova de tipo Ia (M = −19,3) alcanza una magnitud aparente máxima de 15,7. ¿A qué distancia está su galaxia?", tipo: "sci", unidad: "pc", respuesta: 1e8, tol: 0.05,
                pistas: ["m − M = 35,0.", "d = 10 pc × 10^(35/5)."],
                solucion: R`$d = 10 \times 10^{7} = 10^{8}$ pc: cien megapársecs, unos 330 millones de años luz.` },
              { id: "c", pregunta: "¿Cuántas veces más luminosa que el Sol (M = 4,83) es una supernova de tipo Ia en su máximo?", tipo: "sci", unidad: "veces", respuesta: 4.5e9, tol: 0.08,
                pistas: ["La diferencia de magnitudes es 24,13.", "El cociente de flujos es 10^(0,4 × 24,13)."],
                solucion: R`$10^{9{,}65} = 4{,}5 \times 10^{9}$. Durante unos días, tanto como una galaxia pequeña.` },
              { id: "d", pregunta: "El oro de un anillo se formó:", tipo: "opcion", respuesta: 2,
                opciones: ["En el Big Bang", "Por fusión en el núcleo de una estrella como el Sol", "Por captura rápida de neutrones, en sucesos como la fusión de dos estrellas de neutrones", "Por desintegración del hierro en una enana blanca"],
                pistas: ["El oro es mucho más pesado que el hierro, y la fusión no pasa del hierro."],
                solucion: R`Por captura rápida de neutrones. La fusión de estrellas de neutrones es una fuente confirmada desde 2017. Cuánto aportan otras fuentes aún se discute.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>La curva de luz de una supernova</h3>
<p>La luz de una supernova de tipo Ia no viene de la explosión misma, sino de la desintegración radiactiva del níquel-56 que fabrica. El níquel se convierte en cobalto-56 con un periodo de semidesintegración de 6,08 días, y el cobalto en hierro-56 con uno de 77,2 días. El programa calcula la potencia que liberan los dos pasos.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 300, 301)               # días desde la explosión
tau_ni = 6.08 / np.log(2)                  # vida media del níquel
tau_co = 77.2 / np.log(2)                  # vida media del cobalto

niquel = np.exp(-t / tau_ni)
cobalto = tau_co / (tau_co - tau_ni) * (np.exp(-t / tau_co) - np.exp(-t / tau_ni))

# cada desintegración libera 1,75 MeV (níquel) y 3,73 MeV (cobalto)
potencia = 1.75 * niquel / tau_ni + 3.73 * cobalto / tau_co

plt.semilogy(t, potencia)
plt.xlabel("días")
plt.ylabel("potencia (MeV por núcleo y día)")
plt.show()

mag = -2.5 * np.log10(potencia)
print("caída entre los días 200 y 300:", round((mag[300] - mag[200]) / 100, 4), "mag/día")</pre></div>
<ol>
<li>La curva tiene dos tramos: una caída rápida, dominada por el níquel, y una cola recta, dominada por el cobalto.</li>
<li>Una recta en escala logarítmica es una exponencial. La pendiente de la cola sale 0,0097 magnitudes por día.</li>
<li>Ese valor coincide con el que se mide en las supernovas reales. Fue la prueba de que su luz es radiactiva, y de que fabrican hierro.</li>
</ol>
<h3>Candidatas a simple vista</h3>
<p>Betelgeuse y Antares son supergigantes rojas en su última etapa. Explotarán como supernovas en algún momento de los próximos cien mil años, y se verán de día. No hay forma de afinar más la predicción.</p>`,
          notas: [{ id: "sn", label: "Pendiente de la cola de la curva de luz y qué has observado en la gráfica" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Las enanas blancas</strong> se sostienen por la presión de degeneración de los electrones. Más masa significa menos radio, hasta el límite de 1,4 masas solares.`,
          R`<strong>Las estrellas de más de 8 masas solares</strong> acaban con un núcleo de hierro que colapsa: una supernova.`,
          R`<strong>El 99 % de la energía de un colapso</strong> sale en neutrinos. Se comprobó con la supernova de 1987.`,
          R`<strong>Las supernovas de tipo Ia</strong> son candelas estándar. Su origen exacto aún se discute.`,
          R`<strong>Los elementos pesados</strong> se fabrican en estrellas, supernovas y colisiones de estrellas de neutrones.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 32 · REPASO ───────────────────────── */
    {
      id: "leccion-32", n: 32, fase: 3, codigo: "Repaso acumulativo",
      titulo: "Repaso de la Fase 3",
      sub: "El sistema de Sirio como hilo conductor: una estrella en plena vida y otra que ya la terminó.",
      horas: "4 horas",
      contexto: "Repaso de la Fase 3: gas ideal y velocidad térmica raíz(3kT/m), k = 8,617e-5 eV/K, equilibrio hidrostático (T_c proporcional a M/R), Boltzmann N2/N1 = 4 e^(-10,2/kT) para el hidrógeno, fusión (el Sol pierde 4,26e9 kg/s), L = R^2 (T/5772)^4, tiempo de vida 10^10 M/L o 10^10 M^(-2,5) años, enanas blancas y límite de Chandrasekhar de 1,4 masas solares.",
      secciones: [
        { id: "mapa", titulo: "Mapa de ideas", html: R`
<p class="lead">En esta fase has explicado las estrellas por dentro. Sabes qué las sostiene, de dónde sale su energía, por qué la masa lo decide casi todo y cómo terminan.</p>
<div class="tabla"><table>
<thead><tr><th>Idea</th><th>Fórmula</th><th>Lección</th></tr></thead>
<tbody>
<tr><td>Gas ideal</td><td>$P = \rho kT/(\mu\,m_\text{H})$</td><td>24</td></tr>
<tr><td>Velocidad térmica</td><td>$v_\text{t} = \sqrt{3kT/m}$</td><td>24</td></tr>
<tr><td>Equilibrio hidrostático</td><td>$dP/dr = -GM(r)\rho/r^{2}$</td><td>25</td></tr>
<tr><td>Temperatura central</td><td>$kT_c \sim GM\mu\,m_\text{H}/R$</td><td>25</td></tr>
<tr><td>Teorema del virial</td><td>$2K + U = 0$</td><td>25</td></tr>
<tr><td>Población de niveles</td><td>$N_2/N_1 = (g_2/g_1)\,e^{-\Delta E/kT}$</td><td>26</td></tr>
<tr><td>Masa y energía</td><td>$E = mc^{2}$, con un 0,71 % en la fusión del hidrógeno</td><td>27</td></tr>
<tr><td>Difusión de la luz</td><td>$t = R^{2}/(\ell c)$</td><td>28</td></tr>
<tr><td>Masa y luminosidad</td><td>$L \propto M^{3{,}5}$</td><td>28</td></tr>
<tr><td>Tiempo de vida</td><td>$t \approx 10^{10}\ \text{años} \times M^{-2{,}5}$</td><td>28</td></tr>
<tr><td>Radio en el diagrama H-R</td><td>$L = R^{2}(T/5772)^{4}$</td><td>29</td></tr>
<tr><td>Masa de Jeans</td><td>crece con $T^{3/2}$ y baja con $\rho^{1/2}$</td><td>30</td></tr>
<tr><td>Cefeidas</td><td>$M = -2{,}43\,(\log P - 1) - 4{,}05$</td><td>30</td></tr>
<tr><td>Límite de Chandrasekhar</td><td>$1{,}4\ M_\odot$</td><td>31</td></tr>
</tbody></table></div>
<p>El hilo que une la fase es el teorema del virial: cada vez que una estrella pierde energía sin reponerla, se contrae y se calienta. De ahí salen el nacimiento, cada cambio de combustible y el colapso final.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "r1", nivel: 2, titulo: "Sirio A por dentro",
            enunciado: R`<p>Sirio A tiene 2,06 masas solares, 1,71 radios solares y 25,4 luminosidades solares. Para el Sol, la temperatura central es $1{,}57 \times 10^{7}$ K y la pérdida de masa por radiación $4{,}26 \times 10^{9}$ kg/s.</p>`,
            partes: [
              { id: "a", pregunta: "Temperatura central, escalando desde el Sol con T ∝ M/R", tipo: "sci", unidad: "K", respuesta: 1.89e7, tol: 0.03,
                pistas: ["M/R = 2,06 / 1,71 = 1,205 veces el del Sol."],
                solucion: R`$1{,}57 \times 10^{7} \times 1{,}205 = 1{,}89 \times 10^{7}$ K. Suficiente para que domine el ciclo CNO.` },
              { id: "b", pregunta: "Temperatura superficial, a partir de L y R", tipo: "num", unidad: "K", respuesta: 9910, tol: 0.02,
                pistas: ["T = 5772 × (L / R²)^(1/4).", "L/R² = 8,69, y su raíz cuarta es 1,717."],
                solucion: R`$5772 \times \left(\dfrac{25{,}4}{1{,}71^{2}}\right)^{1/4} = 5772 \times 1{,}717 = 9910$ K. El valor medido es 9940 K.` },
              { id: "c", pregunta: "Tiempo de vida, con t = 10¹⁰ × M/L años", tipo: "sci", unidad: "años", respuesta: 8.1e8, tol: 0.03,
                pistas: ["M/L = 2,06 / 25,4."],
                solucion: R`$10^{10} \times 0{,}0811 = 8{,}1 \times 10^{8}$ años.` },
              { id: "d", pregunta: "Masa que convierte en energía cada segundo", tipo: "sci", unidad: "kg", respuesta: 1.08e11, tol: 0.03,
                pistas: ["Es proporcional a la luminosidad."],
                solucion: R`$25{,}4 \times 4{,}26 \times 10^{9} = 1{,}08 \times 10^{11}$ kg/s.` }
            ] },
          { id: "r2", nivel: 2, titulo: "El gas de Sirio A",
            enunciado: R`<p>Usa $k = 1{,}381 \times 10^{-23}$ J/K $= 8{,}617 \times 10^{-5}$ eV/K, la masa del protón $1{,}673 \times 10^{-27}$ kg y, para el hidrógeno, $N_2/N_1 = 4\,e^{-10{,}2/kT}$.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad térmica de un protón en el centro, a 1,89 × 10⁷ K", tipo: "num", unidad: "km/s", respuesta: 684, tol: 0.02,
                pistas: ["3kT/m = 4,68 × 10¹¹."],
                solucion: R`$\sqrt{4{,}68 \times 10^{11}} = 6{,}84 \times 10^{5}$ m/s $= 684$ km/s.` },
              { id: "b", pregunta: "Valor de kT en el centro, en keV", tipo: "num", unidad: "keV", respuesta: 1.63, tol: 0.02,
                errores: [{ v: 1629, msg: "Ese valor está en eV. Divide entre 1000." }],
                pistas: ["Multiplica k en eV/K por la temperatura y pasa a keV."],
                solucion: R`$8{,}617 \times 10^{-5} \times 1{,}89 \times 10^{7} = 1629$ eV $= 1{,}63$ keV. Sigue siendo mil veces menos que la barrera eléctrica: fusiona por efecto túnel, como el Sol.` },
              { id: "c", pregunta: "Cociente N₂/N₁ del hidrógeno en su superficie, a 9940 K", tipo: "sci", respuesta: 2.69e-5, tol: 0.08,
                pistas: ["kT = 0,8565 eV, y 10,2 / 0,8565 = 11,91."],
                solucion: R`$4\,e^{-11{,}91} = 4 \times 6{,}73 \times 10^{-6} = 2{,}7 \times 10^{-5}$.` },
              { id: "d", pregunta: "Las líneas de Balmer de Sirio A son mucho más intensas que las del Sol porque:", tipo: "opcion", respuesta: 1,
                opciones: ["Tiene más hidrógeno", "Su temperatura puebla el nivel n = 2 miles de veces más", "Es más grande", "Está más cerca"],
                pistas: ["Compara el cociente anterior con el del Sol, 5 × 10⁻⁹."],
                solucion: R`Por la temperatura. La composición de las dos estrellas es casi la misma.` }
            ] },
          { id: "r3", nivel: 3, titulo: "Sirio B: el final ya escrito",
            enunciado: R`<p>Sirio B es una enana blanca de 1,02 masas solares y 5840 km de radio. Nació a la vez que Sirio A, con unas 5 masas solares. $M_\odot = 1{,}989 \times 10^{30}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Tiempo que pasó en la secuencia principal, con t = 10¹⁰ × M^(−2,5) años", tipo: "sci", unidad: "años", respuesta: 1.79e8, tol: 0.03,
                pistas: ["5^2,5 = 55,9."],
                solucion: R`$\dfrac{10^{10}}{55{,}9} = 1{,}8 \times 10^{8}$ años.` },
              { id: "b", pregunta: "¿Qué fracción de su masa inicial conserva, en porcentaje?", tipo: "num", unidad: "%", respuesta: 20.4, tol: 0.02,
                pistas: ["1,02 / 5."],
                solucion: R`$1{,}02/5 = 0{,}204$: el 20 %. El otro 80 % volvió al espacio, enriquecido en carbono y nitrógeno.` },
              { id: "c", pregunta: "Las dos estrellas tienen la misma edad. Sirio B ya es una enana blanca y Sirio A sigue en la secuencia principal porque:", tipo: "opcion", respuesta: 0,
                opciones: ["Sirio B nació con más masa y evolucionó más deprisa", "Sirio B nació con menos masa y se apagó antes", "Sirio A le robó el combustible", "Sirio B nunca llegó a fusionar hidrógeno"],
                pistas: ["¿Cómo depende el tiempo de vida de la masa?"],
                solucion: R`Nació con más masa. La estrella que hoy es la menor del par fue en su día la mayor.` },
              { id: "d", pregunta: "¿Cuánta masa tendría que ganar Sirio B para alcanzar el límite de Chandrasekhar?", tipo: "num", unidad: "M☉", respuesta: 0.38, tol: 0.03,
                pistas: ["1,4 menos su masa actual."],
                solucion: R`$1{,}4 - 1{,}02 = 0{,}38$ masas solares. Las dos estrellas están demasiado separadas para intercambiar masa, así que no ocurrirá. En parejas más apretadas, ese es el camino hacia una supernova de tipo Ia.` }
            ] }
        ] },

        { id: "ritmo", titulo: "Ajuste de ritmo", html: R`
<h3>Cómo interpretar tu resultado</h3>
<div class="tabla"><table>
<thead><tr><th>Lo que ha pasado</th><th>Qué significa</th><th>Qué hacer</th></tr></thead>
<tbody>
<tr><td>Los tres problemas bien, con pocas consultas</td><td>La física estelar está asentada</td><td>Pasar a la Fase 4</td></tr>
<tr><td>Dudas con las leyes de escala</td><td>Falta soltura con las proporcionalidades</td><td>Repetir los ejercicios de las lecciones 25 y 28</td></tr>
<tr><td>Dudas con las exponenciales</td><td>El factor de Boltzmann volverá en cosmología</td><td>Rehacer la práctica de la Lección 26</td></tr>
<tr><td>Se confunden las etapas de la evolución</td><td>Falta una visión de conjunto</td><td>Dibujar en un papel el recorrido del Sol por el diagrama H-R, con las causas de cada giro</td></tr>
</tbody></table></div>
<p>Los fallos más habituales en esta fase: tomar una ley de escala por una ley exacta, extrapolarla fuera de su intervalo, olvidar que la temperatura de un factor de Boltzmann va en el denominador del exponente, y pensar que la fusión empuja la estrella hacia fuera, cuando lo único que hace es reponer la energía que se pierde.</p>
<p>La Fase 4 empieza donde esta termina. Un núcleo de más de dos o tres masas solares no puede sostenerse de ninguna manera conocida. Para describir lo que ocurre hace falta una teoría nueva de la gravedad, la relatividad general. Con ella llegarán los agujeros negros, las ondas gravitacionales y, al final, el universo entero.</p>`,
          notas: [{ id: "balance", label: "Qué te ha costado más, qué lecciones has consultado y cuántas horas reales has dedicado por semana" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Una estrella es un equilibrio</strong> entre gravedad y presión, y su temperatura central la fija ese equilibrio.`,
          R`<strong>Brilla por fusión</strong>, que es posible gracias al efecto túnel y lenta gracias a la fuerza débil.`,
          R`<strong>La masa lo decide casi todo:</strong> luminosidad, temperatura, tiempo de vida y final.`,
          R`<strong>El diagrama H-R</strong> ordena las estrellas y permite medir edades y distancias.`,
          R`<strong>Lo siguiente es la Fase 4:</strong> relatividad, agujeros negros, galaxias y cosmología.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 33 ───────────────────────── */
    {
      id: "leccion-33", n: 33, fase: 4, codigo: "A4.1",
      titulo: "Relatividad especial",
      sub: "Qué ocurre con el tiempo, las longitudes y la energía cuando algo se mueve casi a la velocidad de la luz.",
      horas: "6 horas",
      contexto: "Postulados de la relatividad especial; factor de Lorentz gamma = 1 / raíz(1 - v^2/c^2); dilatación del tiempo delta t = gamma delta t0; contracción de longitudes L = L0 / gamma; muones atmosféricos (vida media 2,197 microsegundos); efecto Doppler relativista 1 + z = raíz((1 + beta)/(1 - beta)); energía E = gamma m c^2, energía en reposo m c^2 (protón 938 MeV), E^2 = (p c)^2 + (m c^2)^2; corrección relativista del GPS, -7 microsegundos por día por velocidad.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">La velocidad de la luz es la misma para todos los observadores, se muevan como se muevan. Esa sola afirmación, comprobada hasta la saciedad, obliga a abandonar la idea de que el tiempo transcurre igual para todo el mundo.</p>
<p>Si vas en un tren a 100 km/h y lanzas una pelota hacia delante a 20 km/h, alguien en el andén la ve ir a 120. Con la luz no ocurre. Si enciendes una linterna en ese tren, tú mides que la luz se aleja a $c$, y la persona del andén mide también $c$, no $c$ más 100 km/h. Para que los dos obtengan el mismo resultado, sus reglas y sus relojes no pueden coincidir.</p>
<div class="nota"><strong>Lo usas a diario.</strong> Los relojes de los satélites GPS van a casi 4 km/s y están más arriba en el campo gravitatorio de la Tierra. Las dos cosas alteran su ritmo, y entre ambas adelantan 38 microsegundos al día respecto a los del suelo. Como el sistema mide distancias multiplicando tiempos por $c$, sin esa corrección el error de posición crecería unos 11 km por día. Cada vez que el móvil te sitúa en un mapa, está aplicando relatividad.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Los dos postulados</h3>
<ol>
<li>Las leyes de la física son las mismas para todos los observadores que se mueven con velocidad constante. Ningún experimento permite decir quién está «realmente» quieto.</li>
<li>La velocidad de la luz en el vacío vale $c$ para todos ellos.</li>
</ol>
<p>El segundo no es una hipótesis caprichosa. Sale de las ecuaciones de Maxwell, que dan $c = 1/\sqrt{\mu_0\varepsilon_0}$ sin referirse a ningún observador, y se ha medido de muchas formas.</p>

<h3>2. El reloj de luz</h3>
<p>Construimos un reloj con dos espejos enfrentados, separados una distancia $d$, y un pulso de luz que rebota entre ellos. Cada ida es un tic. Para quien viaja con el reloj:</p>
$$\Delta t_0 = \frac{d}{c}$$
<p>Ahora el reloj pasa por delante de nosotros a velocidad $v$, moviéndose de lado. Durante un tic, los espejos se desplazan una distancia $v\,\Delta t$. Vemos la luz recorrer una diagonal: la hipotenusa de un triángulo de catetos $d$ y $v\,\Delta t$. Como la luz también va a $c$ para nosotros, esa hipotenusa mide $c\,\Delta t$. Por Pitágoras:</p>
$$(c\,\Delta t)^{2} = d^{2} + (v\,\Delta t)^{2}$$
<p>Despejamos $\Delta t$. Agrupamos los términos que lo contienen y sustituimos $d = c\,\Delta t_0$:</p>
$$\Delta t^{2}\,(c^{2} - v^{2}) = c^{2}\,\Delta t_0^{2} \;\Rightarrow\; \Delta t = \frac{\Delta t_0}{\sqrt{1 - v^{2}/c^{2}}}$$

<h3>3. El factor de Lorentz</h3>
<p>La combinación que acaba de aparecer tiene nombre:</p>
$$\gamma = \frac{1}{\sqrt{1 - v^{2}/c^{2}}} \qquad \Delta t = \gamma\,\Delta t_0$$
<p>Como $\gamma$ es siempre mayor o igual que 1, el tic del reloj en movimiento dura más: <strong>los relojes en movimiento van más despacio</strong>. No es un efecto del mecanismo. Le ocurre a todo proceso físico, incluidos los biológicos y las desintegraciones radiactivas.</p>
<p>A velocidades cotidianas, $\gamma$ es indistinguible de 1. Para $v$ pequeña vale la aproximación $\gamma \approx 1 + v^{2}/2c^{2}$. Solo se aparta de forma apreciable por encima de una décima parte de $c$, y crece sin límite al acercarse a $c$. Ningún objeto con masa puede alcanzar esa velocidad.</p>

<h3>4. Contracción de longitudes</h3>
<p>La otra cara del mismo fenómeno: un objeto que se mueve se mide más corto en la dirección de su movimiento.</p>
$$L = \frac{L_0}{\gamma}$$
<p>Las dos descripciones encajan. Un observador dice que el reloj del otro va lento. El otro dice que la distancia recorrida es más corta. Los dos calculan lo mismo para cualquier cosa que se pueda comprobar.</p>

<h3>5. Efecto Doppler relativista</h3>
<p>La fórmula de la Lección 18, $z = v/c$, solo vale para velocidades pequeñas. Cuando la fuente se aleja a una fracción apreciable de $c$, hay que incluir que su reloj va lento. Llamando $\beta = v/c$:</p>
$$1 + z = \sqrt{\frac{1 + \beta}{1 - \beta}}$$
<p>Para $\beta$ pequeña se recupera $z \approx \beta$. Con esta fórmula, $z$ puede ser tan grande como se quiera sin que $v$ supere a $c$.</p>

<h3>6. Energía</h3>
<p>La energía total de un cuerpo de masa $m$ que se mueve a velocidad $v$ es:</p>
$$E = \gamma\,m\,c^{2}$$
<p>En reposo, $\gamma = 1$ y queda la <em>energía en reposo</em>, $E_0 = mc^{2}$, la de la Lección 27. Para velocidades pequeñas, con $\gamma \approx 1 + v^{2}/2c^{2}$:</p>
$$E \approx mc^{2} + \frac{1}{2}mv^{2}$$
<p>La energía cinética de Newton aparece como primera corrección. La relatividad no contradice la física anterior: la contiene como caso límite.</p>
<p>La relación general entre energía, cantidad de movimiento $p$ y masa es:</p>
$$E^{2} = (p\,c)^{2} + (m\,c^{2})^{2}$$
<p>Para una partícula sin masa, como el fotón, queda $E = pc$: la luz transporta cantidad de movimiento, y por eso ejerce presión.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Los muones que no deberían llegar</h3>
<p>Los rayos cósmicos chocan con la atmósfera a unos 10 km de altura y producen <em>muones</em>, partículas inestables con una vida media de $2{,}197 \times 10^{-6}$ s. Viajan hacia el suelo a $v = 0{,}998\,c$.</p>
<p><strong>Sin relatividad</strong>, en una vida media recorrerían:</p>
$$0{,}998 \times 2{,}998 \times 10^{8} \times 2{,}197 \times 10^{-6} = 657\ \text{m}$$
<p>Tras 10 km habrían pasado más de quince vidas medias y no quedaría prácticamente ninguno.</p>
<p><strong>Con relatividad.</strong> El factor de Lorentz:</p>
$$\gamma = \frac{1}{\sqrt{1 - 0{,}998^{2}}} = \frac{1}{\sqrt{0{,}003996}} = 15{,}8$$
<p>Visto desde el suelo, el reloj interno del muon va 15,8 veces más lento, y su vida media es $15{,}8 \times 2{,}197 = 34{,}8$ microsegundos. En ese tiempo recorre:</p>
$$15{,}8 \times 657\ \text{m} = 10{,}4\ \text{km}$$
<p>Una fracción apreciable llega al suelo, y eso es lo que se mide: unos cien por metro cuadrado y segundo.</p>
<p><strong>Visto desde el muon</strong>, su vida media es la normal, pero la atmósfera se le viene encima contraída:</p>
$$\frac{10\ \text{km}}{15{,}8} = 0{,}63\ \text{km}$$
<p>Le da tiempo a atravesarla. Las dos descripciones difieren en el motivo y coinciden en el resultado.</p>
<h3>El reloj de un satélite GPS</h3>
<p>Los satélites van a $v = 3874$ m/s. Con la aproximación para velocidades pequeñas, su reloj atrasa una fracción:</p>
$$\gamma - 1 \approx \frac{v^{2}}{2c^{2}} = \frac{(3874)^{2}}{2 \times 8{,}988 \times 10^{16}} = 8{,}35 \times 10^{-11}$$
<p>En un día de 86 400 s, eso son $7{,}2$ microsegundos de atraso. En la lección siguiente verás que la gravedad produce un adelanto de 45,7 microsegundos, y que el efecto neto es $+38{,}5$ microsegundos por día.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "El factor de Lorentz",
            enunciado: R`<p>Usa $\gamma = 1/\sqrt{1 - \beta^{2}}$ con $\beta = v/c$.</p>`,
            partes: [
              { id: "a", pregunta: "Factor γ a 0,6 c", tipo: "num", respuesta: 1.25, tol: 0.01,
                pistas: ["1 − 0,36 = 0,64, y su raíz es 0,8."],
                solucion: R`$\dfrac{1}{\sqrt{0{,}64}} = \dfrac{1}{0{,}8} = 1{,}25$.` },
              { id: "b", pregunta: "Factor γ a 0,99 c", tipo: "num", respuesta: 7.09, tol: 0.01,
                pistas: ["1 − 0,9801 = 0,0199."],
                solucion: R`$\dfrac{1}{\sqrt{0{,}0199}} = 7{,}09$. Entre 0,6 c y 0,99 c la velocidad sube un 65 % y γ se multiplica por casi 6.` },
              { id: "c", pregunta: "Una nave viaja a 0,6 c. Cuando en la Tierra han pasado 10 años, ¿cuántos han pasado a bordo?", tipo: "num", unidad: "años", respuesta: 8,
                errores: [{ v: 12.5, msg: "El reloj en movimiento va más despacio: a bordo pasa menos tiempo, no más." }],
                pistas: ["El tiempo a bordo es el de la Tierra dividido entre γ."],
                solucion: R`$10/1{,}25 = 8$ años.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Muones a 0,995 c",
            enunciado: R`<p>La vida media del muon es $2{,}197 \times 10^{-6}$ s y $c = 2{,}998 \times 10^{8}$ m/s.</p>`,
            partes: [
              { id: "a", pregunta: "Factor γ", tipo: "num", respuesta: 10.0, tol: 0.01,
                pistas: ["1 − 0,995² = 0,009975."],
                solucion: R`$\dfrac{1}{\sqrt{0{,}009975}} = 10{,}0$.` },
              { id: "b", pregunta: "Distancia que recorre en una vida media, medida desde el suelo, en kilómetros", tipo: "num", unidad: "km", respuesta: 6.56, tol: 0.02,
                errores: [{ v: 0.656, msg: "Esa es la distancia sin dilatación del tiempo. Multiplica por γ." }],
                pistas: ["γ × v × vida media."],
                solucion: R`$10{,}0 \times 0{,}995 \times 2{,}998 \times 10^{8} \times 2{,}197 \times 10^{-6} = 6560$ m.` },
              { id: "c", pregunta: "Para ese muon, ¿qué espesor tienen 10 km de atmósfera?", tipo: "num", unidad: "km", respuesta: 1.0, tol: 0.02,
                pistas: ["L = L₀ / γ."],
                solucion: R`$10/10{,}0 = 1{,}0$ km.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Doppler y energía",
            enunciado: R`<p>Usa $1 + z = \sqrt{(1+\beta)/(1-\beta)}$ y $E = \gamma mc^{2}$. La energía en reposo del protón es 938,3 MeV.</p>`,
            partes: [
              { id: "a", pregunta: "Corrimiento al rojo z de una fuente que se aleja a 0,1 c", tipo: "num", respuesta: 0.1055, tol: 0.01,
                pistas: ["√(1,1 / 0,9) = 1,1055."],
                solucion: R`$z = 1{,}1055 - 1 = 0{,}1055$. La fórmula clásica daría 0,1: a esta velocidad el error ya es del 5 %.` },
              { id: "b", pregunta: "Si el corrimiento al rojo de un cuásar, z = 2, se debiera a su velocidad, ¿cuál sería β?", tipo: "num", respuesta: 0.8, tol: 0.01,
                errores: [{ v: 2, msg: "Con la fórmula clásica saldría el doble de la velocidad de la luz, lo que es imposible. Usa la relativista." }],
                pistas: ["(1 + z)² = 9 = (1 + β) / (1 − β). Despeja β."],
                solucion: R`$9\,(1 - \beta) = 1 + \beta \Rightarrow \beta = 8/10 = 0{,}8$. En la Lección 38 verás que el corrimiento de las galaxias lejanas no es exactamente un efecto Doppler, sino la expansión del espacio.` },
              { id: "c", pregunta: "Factor γ de un protón del acelerador LHC, con una energía de 6,8 TeV (6,8 × 10⁶ MeV)", tipo: "num", respuesta: 7247, tol: 0.01,
                pistas: ["γ = E / (m c²)."],
                solucion: R`$\dfrac{6{,}8 \times 10^{6}}{938{,}3} = 7247$. Va a un 99,999999 % de $c$.` },
              { id: "d", pregunta: "Para duplicar la energía de ese protón hay que:", tipo: "opcion", respuesta: 1,
                opciones: ["Duplicar su velocidad", "Duplicar γ, con un aumento de velocidad casi nulo", "Aumentar su velocidad un 41 %", "No se puede: ya va a la velocidad máxima"],
                pistas: ["A estas velocidades, ¿de qué depende la energía?"],
                solucion: R`Duplicar $\gamma$. Cerca de $c$, la energía crece sin que la velocidad cambie apenas. La velocidad tiene un límite; la energía, no.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>El factor de Lorentz, de la bicicleta al acelerador</h3>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

c = 2.998e8

beta = np.linspace(0, 0.999, 1000)
gamma = 1 / np.sqrt(1 - beta**2)
plt.plot(beta, gamma)
plt.xlabel("v / c")
plt.ylabel("gamma")
plt.ylim(0, 25)
plt.show()

casos = [("avión", 250), ("Estación Espacial", 7660), ("satélite GPS", 3874),
         ("sonda Parker", 1.9e5), ("electrón de un televisor antiguo", 9e7)]
for nombre, v in casos:
    exceso = 1 / np.sqrt(1 - (v / c)**2) - 1
    print(nombre, ": gamma - 1 =", exceso)</pre></div>
<ol>
<li>La curva es plana casi todo el recorrido y se dispara al final. Por eso nadie notó estos efectos hasta el siglo XX.</li>
<li>Para la Estación Espacial, convierte $\gamma - 1$ en segundos de retraso acumulados en seis meses a bordo. Salen unos milisegundos, y se han medido.</li>
<li>La sonda Parker es el objeto más rápido construido, a casi 200 km/s en su paso más cercano al Sol. Su $\gamma - 1$ sigue siendo de dos partes en diez millones.</li>
</ol>`,
          notas: [{ id: "lorentz", label: "Valores de gamma menos 1 y el retraso de un astronauta en seis meses" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La velocidad de la luz es la misma para todos.</strong> De ahí sale todo lo demás.`,
          R`<strong>Factor de Lorentz:</strong> $\gamma = 1/\sqrt{1 - v^{2}/c^{2}}$. Los relojes en movimiento van $\gamma$ veces más lentos y las longitudes se acortan $\gamma$ veces.`,
          R`<strong>Doppler relativista:</strong> $1 + z = \sqrt{(1+\beta)/(1-\beta)}$.`,
          R`<strong>Energía:</strong> $E = \gamma mc^{2}$, con $mc^{2}$ en reposo. Nada con masa alcanza $c$.`,
          R`<strong>No es una curiosidad:</strong> muones, aceleradores y GPS la comprueban cada día.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 34 ───────────────────────── */
    {
      id: "leccion-34", n: 34, fase: 4, codigo: "A4.2 · B5.1",
      titulo: "Relatividad general y agujeros negros",
      sub: "La gravedad como geometría, las pruebas que lo confirman y el objeto más extremo que predice.",
      horas: "6 horas",
      contexto: "Principio de equivalencia; curvatura del espacio-tiempo; pruebas clásicas: perihelio de Mercurio (43 segundos de arco por siglo), desviación de la luz 4 G M / (c^2 R) = 1,75 segundos de arco en el borde del Sol, corrimiento al rojo gravitatorio z = G M / (r c^2); radio de Schwarzschild r_s = 2 G M / c^2 = 2,95 km por masa solar; horizonte de sucesos; dilatación gravitatoria raíz(1 - r_s/r); última órbita estable 3 r_s; sombra de 5,2 r_s; evidencias: Cygnus X-1, Sagitario A* (4,3e6 masas solares), M87* (6,5e9); radiación de Hawking, predicha y no observada.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Para Newton, la gravedad es una fuerza que actúa a distancia y al instante. Para Einstein no es una fuerza: la masa deforma el espacio y el tiempo a su alrededor, y los cuerpos siguen el camino más recto posible en esa geometría deformada.</p>
<p>El punto de partida es una observación que hizo ya Galileo: todos los cuerpos caen igual, sea cual sea su masa o su composición. Si la caída no depende del objeto, quizá no sea una propiedad de los objetos, sino del lugar por el que se mueven.</p>
<p>Einstein lo llevó a su consecuencia. Dentro de un ascensor que cae libremente no se nota la gravedad: todo flota. Y dentro de un cohete que acelera en el espacio vacío se nota un peso indistinguible del de la Tierra. Es el <em>principio de equivalencia</em>.</p>
<div class="nota"><strong>La imagen de la lámina elástica ayuda, con una reserva.</strong> Una bola pesada sobre una lámina tensa la hunde, y una canica que pasa cerca se desvía. Sirve para ver que la curvatura guía el movimiento. Pero en la realidad se curva también el tiempo, y para objetos lentos como los planetas es la curvatura del tiempo la que produce casi todo el efecto.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La idea central</h3>
<p>Se suele resumir en una frase: la materia le dice al espacio-tiempo cómo curvarse, y el espacio-tiempo le dice a la materia cómo moverse. Las ecuaciones que lo expresan son difíciles y no las usaremos. Sí usaremos sus resultados, que para campos débiles se desvían muy poco de Newton y para campos fuertes predicen cosas nuevas.</p>
<p>El número que mide lo fuerte que es la gravedad de un objeto de masa $M$ y radio $R$ es:</p>
$$\frac{G\,M}{R\,c^{2}}$$
<p>Para la Tierra vale $7 \times 10^{-10}$, para el Sol $2 \times 10^{-6}$, para una enana blanca $3 \times 10^{-4}$ y para una estrella de neutrones 0,2. Cuando se acerca a 1, Newton deja de servir.</p>

<h3>2. Tres pruebas clásicas</h3>
<p><strong>El perihelio de Mercurio.</strong> La órbita de Mercurio no se cierra del todo: su perihelio avanza un poco en cada vuelta. Las perturbaciones de los demás planetas explican casi todo el avance, pero sobraban 43 segundos de arco por siglo. La relatividad general los da exactamente.</p>
<p><strong>La desviación de la luz.</strong> La luz también sigue la geometría curvada. Un rayo que pasa a distancia $R$ de una masa $M$ se desvía un ángulo:</p>
$$\alpha = \frac{4\,G\,M}{c^{2}\,R}$$
<p>Es el doble de lo que daría un cálculo newtoniano. Para un rayo que roza el Sol son $1{,}75''$. Se midió en el eclipse de 1919, y hoy se comprueba con una precisión de una parte en diez mil.</p>
<p><strong>El tiempo y la gravedad.</strong> Un reloj situado más abajo en un campo gravitatorio va más despacio. La luz que sale de la superficie de un astro pierde energía al subir, y llega con la longitud de onda alargada:</p>
$$z = \frac{G\,M}{r\,c^{2}} \qquad (\text{para campos débiles})$$
<p>Es el <em>corrimiento al rojo gravitatorio</em>. En los satélites GPS, que están más arriba que nosotros, este efecto adelanta los relojes 45,7 microsegundos al día.</p>

<h3>3. El radio de Schwarzschild</h3>
<p>En la Lección 7 calculaste a qué radio habría que comprimir el Sol para que su velocidad de escape fuera la de la luz. Igualando $\sqrt{2GM/r}$ a $c$:</p>
$$r_s = \frac{2\,G\,M}{c^{2}}$$
<p>La relatividad general da exactamente la misma expresión, aunque con otro significado. Para una masa solar son 2,95 km, y crece en proporción a la masa:</p>
$$r_s = 2{,}95\ \text{km} \times \frac{M}{M_\odot}$$
<p>Si toda la masa de un objeto queda dentro de ese radio, se forma un <strong>agujero negro</strong>.</p>

<h3>4. El horizonte de sucesos</h3>
<p>La superficie de radio $r_s$ es el <em>horizonte de sucesos</em>. No es una superficie material. Es una frontera de no retorno: desde dentro, todos los caminos posibles, incluidos los de la luz, conducen hacia el centro.</p>
<p>Un reloj en reposo a distancia $r$ va más lento que uno lejano en un factor:</p>
$$\sqrt{1 - \frac{r_s}{r}}$$
<p>Al acercarse al horizonte, el factor tiende a cero. Visto desde lejos, un objeto que cae parece frenarse y enrojecerse hasta desaparecer, sin llegar a cruzar. Para el propio objeto no pasa nada especial en el horizonte: lo atraviesa en un tiempo finito.</p>
<p>Qué ocurre en el centro no se sabe. Las ecuaciones predicen una densidad infinita, una <em>singularidad</em>, y eso se interpreta como la señal de que la teoría deja de ser válida ahí. Falta una teoría cuántica de la gravedad.</p>

<h3>5. Qué hay alrededor</h3>
<ul>
<li>A gran distancia, un agujero negro atrae exactamente igual que cualquier otro objeto de su masa. No aspira nada.</li>
<li>Por debajo de $3\,r_s$ no existen órbitas circulares estables. La materia que llega ahí cae.</li>
<li>La luz puede orbitar a $1{,}5\,r_s$. Por eso, visto desde lejos, un agujero negro iluminado por detrás muestra una <em>sombra</em> de diámetro aproximado $5{,}2\,r_s$, mayor que el propio horizonte.</li>
<li>Las fuerzas de marea, que estiran un objeto porque la gravedad es más intensa en el extremo cercano, son enormes junto a un agujero negro pequeño y suaves junto a uno gigante.</li>
</ul>

<h3>6. Cómo sabemos que existen</h3>
<div class="tabla"><table>
<thead><tr><th>Objeto</th><th>Masa</th><th>Cómo se mide</th></tr></thead>
<tbody>
<tr><td>Cygnus X-1</td><td>Unas 21 masas solares</td><td>Órbita de la estrella compañera. Demasiada masa para una estrella de neutrones</td></tr>
<tr><td>Sagitario A*, en el centro de la galaxia</td><td>4,3 millones de masas solares</td><td>Órbitas de estrellas, como S2 en la Lección 8</td></tr>
<tr><td>M87*</td><td>6500 millones de masas solares</td><td>Movimiento del gas e imagen de la sombra</td></tr>
<tr><td>Decenas de parejas</td><td>De 5 a 150 masas solares</td><td>Ondas gravitacionales de su fusión</td></tr>
</tbody></table></div>
<p>Hoy la existencia de objetos con estas masas en volúmenes tan pequeños está fuera de duda. Que tengan exactamente las propiedades que predice la relatividad general se sigue comprobando, y hasta ahora todo encaja.</p>

<h3>7. La radiación de Hawking</h3>
<p>En 1974, Stephen Hawking calculó que, al combinar la relatividad con la física cuántica, un agujero negro debe emitir como un cuerpo negro de temperatura:</p>
$$T \approx 6 \times 10^{-8}\ \text{K} \times \frac{M_\odot}{M}$$
<p>Para cualquier agujero negro astronómico es muchísimo menos que los 2,7 K del fondo cósmico, así que absorbe más de lo que emite. Es una predicción teórica muy aceptada, pero <strong>no se ha observado</strong>, y es poco probable que se observe en un futuro próximo.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El agujero negro del centro de la galaxia</h3>
<p>Sagitario A* tiene 4,3 millones de masas solares y está a 8200 pársecs.</p>
<p><strong>Radio de Schwarzschild:</strong></p>
$$r_s = 2{,}95\ \text{km} \times 4{,}3 \times 10^{6} = 1{,}27 \times 10^{7}\ \text{km}$$
<p>En unidades astronómicas, $1{,}27 \times 10^{10}\ \text{m} / 1{,}496 \times 10^{11}\ \text{m} = 0{,}085$ UA. Cabría con holgura dentro de la órbita de Mercurio, que está a 0,39 UA.</p>
<p><strong>Tamaño de la sombra:</strong></p>
$$5{,}2 \times 1{,}27 \times 10^{10}\ \text{m} = 6{,}6 \times 10^{10}\ \text{m}$$
<p><strong>Tamaño angular.</strong> La distancia es $8200 \times 3{,}086 \times 10^{16} = 2{,}53 \times 10^{20}$ m:</p>
$$\theta = \frac{6{,}6 \times 10^{10}}{2{,}53 \times 10^{20}} = 2{,}6 \times 10^{-10}\ \text{rad} = 54\ \text{microsegundos de arco}$$
<p>El Event Horizon Telescope midió en 2022 un anillo de unos 52 microsegundos de arco. La masa, obtenida de las órbitas de las estrellas con la física de Newton, y el tamaño de la sombra, obtenido con interferometría de radio, concuerdan con la predicción de la relatividad general.</p>
<p><strong>La estrella S2</strong> pasa en su punto más cercano a 120 UA de Sagitario A*. Son $120/0{,}085 = 1400$ radios de Schwarzschild. Incluso tan lejos se han medido en su órbita el corrimiento al rojo gravitatorio y un avance del pericentro como el de Mercurio.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Radios de Schwarzschild",
            enunciado: R`<p>Usa $r_s = 2GM/c^{2}$, o su forma práctica, 2,95 km por masa solar. $c^{2} = 8{,}988 \times 10^{16}\ \text{m}^2/\text{s}^2$.</p>`,
            partes: [
              { id: "a", pregunta: "Radio de Schwarzschild de la Tierra (GM = 3,986 × 10¹⁴ m³/s²), en milímetros", tipo: "num", unidad: "mm", respuesta: 8.87, tol: 0.02,
                errores: [{ v: 0.00887, msg: "Ese valor está en metros. Se pide en milímetros." }],
                pistas: ["r_s = 2 × 3,986 × 10¹⁴ / c², en metros."],
                solucion: R`$\dfrac{2 \times 3{,}986 \times 10^{14}}{8{,}988 \times 10^{16}} = 8{,}87 \times 10^{-3}$ m. La Tierra tendría que caber en una canica.` },
              { id: "b", pregunta: "Radio de Schwarzschild de un agujero negro de 10 masas solares", tipo: "num", unidad: "km", respuesta: 29.5, tol: 0.01,
                pistas: ["2,95 km por masa solar."],
                solucion: R`$2{,}95 \times 10 = 29{,}5$ km.` },
              { id: "c", pregunta: "Si el Sol se sustituyera por un agujero negro de su misma masa, la órbita de la Tierra:", tipo: "opcion", respuesta: 2,
                opciones: ["Se cerraría en espiral hasta caer", "Se haría más pequeña", "No cambiaría", "Se abriría y la Tierra escaparía"],
                pistas: ["¿De qué depende la gravedad a 1 UA?"],
                solucion: R`No cambiaría. A esa distancia solo cuenta la masa. Haría mucho frío, eso sí.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Luz y gravedad",
            enunciado: R`<p>Para el Sol, $GM = 1{,}327 \times 10^{20}\ \text{m}^3/\text{s}^2$ y $R = 6{,}957 \times 10^{8}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "Desviación de un rayo de luz que roza el Sol, en segundos de arco", tipo: "num", unidad: "″", respuesta: 1.75, tol: 0.02,
                errores: [{ v: 0.875, msg: "Ese es el valor newtoniano. La relatividad general da el doble: el factor es 4, no 2." }],
                pistas: ["α = 4GM / (c² R), en radianes.", "Multiplica por 206 265."],
                solucion: R`$\dfrac{4 \times 1{,}327 \times 10^{20}}{8{,}988 \times 10^{16} \times 6{,}957 \times 10^{8}} = 8{,}49 \times 10^{-6}$ rad $= 1{,}75''$.` },
              { id: "b", pregunta: "Corrimiento al rojo gravitatorio de la luz que sale de Sirio B (GM = 1,354 × 10²⁰, R = 5,84 × 10⁶ m)", tipo: "sci", respuesta: 2.58e-4, tol: 0.03,
                pistas: ["z = GM / (R c²)."],
                solucion: R`$\dfrac{1{,}354 \times 10^{20}}{5{,}84 \times 10^{6} \times 8{,}988 \times 10^{16}} = 2{,}58 \times 10^{-4}$.` },
              { id: "c", pregunta: "¿A qué velocidad de alejamiento equivale ese corrimiento, en km/s?", tipo: "num", unidad: "km/s", respuesta: 77, tol: 0.03,
                pistas: ["v = z c."],
                solucion: R`$2{,}58 \times 10^{-4} \times 2{,}998 \times 10^{5} = 77$ km/s. El valor medido en su espectro es de unos 80 km/s. Fue una de las primeras confirmaciones de la teoría.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Cerca del horizonte",
            enunciado: R`<p>Usa el factor $\sqrt{1 - r_s/r}$ para el ritmo de un reloj en reposo a distancia $r$.</p>`,
            partes: [
              { id: "a", pregunta: "¿A qué ritmo va un reloj situado a r = 2 r_s, respecto a uno lejano?", tipo: "num", respuesta: 0.707, tol: 0.01,
                pistas: ["√(1 − 1/2)."],
                solucion: R`$\sqrt{0{,}5} = 0{,}707$. Por cada hora lejos del agujero, allí pasan 42 minutos.` },
              { id: "b", pregunta: "Densidad media dentro del horizonte de un agujero negro de 10⁹ masas solares", tipo: "num", unidad: "kg/m³", respuesta: 18.4, tol: 0.05,
                pistas: ["r_s = 2,95 × 10¹² m. Volumen: 4π r_s³ / 3 = 1,08 × 10³⁸ m³.", "Masa: 1,989 × 10³⁹ kg."],
                solucion: R`$\dfrac{1{,}989 \times 10^{39}}{1{,}08 \times 10^{38}} = 18{,}4\ \text{kg/m}^3$. Menos que el agua, y poco más que el aire. Como $r_s$ crece con la masa, la densidad media cae con su cuadrado. Un agujero negro no es necesariamente un objeto denso en ese sentido.` },
              { id: "c", pregunta: "La radiación de Hawking es hoy:", tipo: "opcion", respuesta: 1,
                opciones: ["Un hecho observado en varios agujeros negros", "Una predicción teórica aceptada, aún sin observar", "Una hipótesis descartada", "La causa del brillo de los cuásares"],
                pistas: ["Compara su temperatura con la del fondo cósmico."],
                solucion: R`Una predicción sin observar. Los cuásares brillan por el gas que cae, como verás en la lección siguiente.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Una tabla de agujeros negros</h3>
<div class="tabla"><pre>G = 6.674e-11
c = 2.998e8
M_sol = 1.989e30
UA = 1.496e11
pc = 3.086e16

casos = [
    ("Cygnus X-1", 21, 2200),
    ("Sagitario A*", 4.3e6, 8200),
    ("M87*", 6.5e9, 16.8e6),
]

for nombre, masa, distancia_pc in casos:
    rs = 2 * G * masa * M_sol / c**2
    sombra = 5.2 * rs
    angulo = sombra / (distancia_pc * pc) * 206265e6     # en microsegundos de arco
    print(nombre)
    print("   radio de Schwarzschild:", round(rs / 1000), "km =", rs / UA, "UA")
    print("   sombra:", round(angulo, 4), "microsegundos de arco")</pre></div>
<ol>
<li>Comprueba los 54 microsegundos de arco de Sagitario A* y compáralos con los de M87*, que es mil quinientas veces mayor pero está dos mil veces más lejos.</li>
<li>Mira la sombra de Cygnus X-1. Con la resolución de 25 microsegundos de arco de la Lección 22, ¿se podría ver?</li>
<li>Añade un agujero negro de la masa de la Tierra, $3 \times 10^{-6}$ masas solares, a 1 pársec.</li>
</ol>`,
          notas: [{ id: "sombras", label: "Tamaños de las sombras y cuáles están al alcance de la interferometría actual" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La gravedad es geometría:</strong> la masa curva el espacio-tiempo y los cuerpos, y la luz, siguen esa curvatura.`,
          R`<strong>Tres pruebas clásicas:</strong> el perihelio de Mercurio, la desviación de la luz y el corrimiento al rojo gravitatorio.`,
          R`<strong>Radio de Schwarzschild:</strong> $r_s = 2GM/c^{2}$, 2,95 km por masa solar.`,
          R`<strong>Los agujeros negros existen</strong> y se pesan con órbitas, con ondas gravitacionales y con la imagen de su sombra.`,
          R`<strong>Lo que ocurre en el centro</strong> y la radiación de Hawking siguen sin comprobación.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 35 ───────────────────────── */
    {
      id: "leccion-35", n: 35, fase: 4, codigo: "B5.2",
      titulo: "Acreción y ondas gravitacionales",
      sub: "Cómo se ve algo que no emite luz: por el gas que cae en él y por las ondas que produce al chocar.",
      horas: "5 horas",
      contexto: "Acreción: eficiencia eta = G M / (R c^2) = r_s / (2R), 0,17 para una estrella de neutrones, del orden de 0,1 para un agujero negro, frente a 0,007 de la fusión; L = eta m_punto c^2; cuásares y núcleos activos, binarias de rayos X, chorros; ondas gravitacionales: deformación h = delta L / L, púlsar de Hulse-Taylor, LIGO (brazos de 4 km, h del orden de 1e-21), GW150914 (36 + 29 masas solares, 3 radiadas), frecuencia de la onda igual al doble de la orbital, chirp; GW170817 y astronomía multimensajero; fondo de ondas gravitacionales con redes de púlsares.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Un agujero negro aislado es invisible. Los que se observan se delatan de dos maneras: por la materia que cae en ellos, que brilla más que ninguna otra cosa del universo, y por las ondas en el propio espacio que producen cuando dos de ellos se fusionan.</p>
<p>Lo primero parece una paradoja: los objetos más luminosos conocidos, los cuásares, son agujeros negros. La luz no sale del agujero. Sale del gas que gira a su alrededor antes de caer, calentado a millones de grados por el rozamiento.</p>
<div class="nota"><strong>Un detector de ondas gravitacionales es un problema de instrumentación.</strong> Hay que medir un cambio de longitud mil veces menor que un protón en un brazo de cuatro kilómetros, con un interferómetro láser como el de la Lección 15, y extraer una señal conocida de un ruido mucho mayor con un filtro adaptado, como en un receptor de radar. Lo que hizo falta para conseguirlo es, en buena parte, lo que has estudiado en la Fase 2.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La energía de caer</h3>
<p>Una masa $m$ que cae desde lejos hasta la superficie de un objeto de masa $M$ y radio $R$ libera la energía potencial gravitatoria de la Lección 11, $GMm/R$. Comparada con su energía en reposo, $mc^{2}$, la fracción convertida es la <strong>eficiencia</strong>:</p>
$$\eta = \frac{G\,M\,m/R}{m\,c^{2}} = \frac{G\,M}{R\,c^{2}} = \frac{r_s}{2R}$$
<p>Depende solo de lo compacto que sea el objeto.</p>
<div class="tabla"><table>
<thead><tr><th>Proceso</th><th>Fracción de la masa convertida en energía</th></tr></thead>
<tbody>
<tr><td>Combustión química</td><td>$10^{-10}$</td></tr>
<tr><td>Fusión de hidrógeno</td><td>0,007</td></tr>
<tr><td>Caída sobre una enana blanca</td><td>0,0003</td></tr>
<tr><td>Caída sobre una estrella de neutrones</td><td>0,17</td></tr>
<tr><td>Caída hacia un agujero negro</td><td>Entre 0,06 y 0,4, según su giro</td></tr>
</tbody></table></div>
<p>Dejar caer materia en un objeto compacto es la forma más eficiente de obtener energía que existe, quince veces mejor que la fusión.</p>

<h3>2. Discos de acreción</h3>
<p>El gas no cae en línea recta, porque tiene momento angular. Forma un disco, como en el nacimiento de una estrella. Dentro del disco, las capas interiores giran más rápido que las exteriores, por la tercera ley de Kepler. El rozamiento entre ellas calienta el gas y le quita momento angular, y el gas va cayendo en espiral.</p>
<p>La luminosidad es la eficiencia por la masa que cae por unidad de tiempo, $\dot{m}$:</p>
$$L = \eta\,\dot{m}\,c^{2}$$
<p>La presión de la luz emitida frena el gas que intenta caer, así que la luminosidad no puede superar el límite de Eddington de la Lección 28. Eso limita el ritmo al que puede crecer un agujero negro.</p>

<h3>3. Dónde se ve</h3>
<ul>
<li><strong>Binarias de rayos X.</strong> Una estrella de neutrones o un agujero negro que roba gas a una compañera. El disco interior alcanza millones de kelvin y emite rayos X. Así se encontró Cygnus X-1.</li>
<li><strong>Núcleos activos de galaxias y cuásares.</strong> Agujeros negros de millones a miles de millones de masas solares que tragan gas en el centro de una galaxia. Un cuásar puede brillar más que los cientos de miles de millones de estrellas de su galaxia, desde una región del tamaño del sistema solar.</li>
<li><strong>Chorros.</strong> Parte del gas no cae. Sale expulsado por los polos en dos haces estrechos, a velocidades cercanas a la de la luz, que llegan a medir más que la propia galaxia. Intervienen el campo magnético y el giro del agujero negro. El mecanismo exacto sigue en estudio.</li>
</ul>

<h3>4. Ondas gravitacionales</h3>
<p>Si la masa curva el espacio-tiempo, una masa que se acelera debe producir cambios en esa curvatura que se propagan. Son las <strong>ondas gravitacionales</strong>, y viajan a la velocidad de la luz.</p>
<p>Al pasar, una onda estira el espacio en una dirección y lo comprime en la perpendicular, alternativamente. Su amplitud se mide con la <em>deformación</em>, un número sin unidades:</p>
$$h = \frac{\Delta L}{L}$$
<p>El espacio es extraordinariamente rígido. Solo las masas más grandes moviéndose a las velocidades más altas producen ondas detectables: parejas de objetos compactos en órbita cerrada.</p>

<h3>5. La primera prueba, indirecta</h3>
<p>En 1974, Hulse y Taylor descubrieron un púlsar en órbita con otra estrella de neutrones, con un periodo de menos de ocho horas. Un sistema así pierde energía en forma de ondas gravitacionales, y por la física de la Lección 11 eso hace que la órbita se encoja y el periodo disminuya. El ritmo medido durante décadas coincide con el previsto con una precisión del 0,2 %.</p>

<h3>6. La detección directa</h3>
<p>Los detectores LIGO son interferómetros con dos brazos perpendiculares de 4 km. Un láser se divide, recorre los dos brazos y se recombina. Si una onda alarga un brazo y acorta el otro, cambia la interferencia.</p>
<p>El 14 de septiembre de 2015 se registró la primera señal, GW150914: dos agujeros negros de 36 y 29 masas solares que se fusionaron en uno de 62. Las tres masas solares que faltan se emitieron como ondas gravitacionales en unas décimas de segundo. La deformación medida fue $h \approx 10^{-21}$.</p>
<p>La señal tiene una forma característica, el <em>chirp</em>. A medida que los objetos se acercan, giran más rápido, por la tercera ley de Kepler, y emiten con más intensidad. La frecuencia y la amplitud suben juntas hasta la fusión. La frecuencia de la onda es <strong>el doble</strong> de la orbital, porque el sistema recupera la misma forma cada media vuelta.</p>
<p>La forma del chirp da las masas, y la amplitud da la distancia sin necesidad de ninguna calibración. Por eso estas fuentes se llaman <em>sirenas estándar</em>.</p>

<h3>7. Astronomía con varios mensajeros</h3>
<p>El 17 de agosto de 2017 se detectó la fusión de dos estrellas de neutrones, GW170817. Menos de dos segundos después, un satélite registró un destello de rayos gamma en la misma zona, y en las horas siguientes decenas de telescopios localizaron la fuente en una galaxia a 130 millones de años luz. De un solo suceso salieron tres resultados:</p>
<ul>
<li>Las ondas gravitacionales viajan a la velocidad de la luz, con una diferencia menor de una parte en $10^{15}$.</li>
<li>Estas fusiones producen los destellos cortos de rayos gamma.</li>
<li>Fabrican elementos pesados, como viste en la Lección 31.</li>
</ul>
<p>Desde entonces se han registrado cientos de fusiones. Además, en 2023 varias redes que cronometran púlsares presentaron indicios sólidos de un fondo de ondas gravitacionales de periodo muy largo, de años. Su origen más probable son parejas de agujeros negros gigantes, pero no está confirmado.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Lo que come un cuásar</h3>
<p>Un cuásar típico emite $L = 10^{39}$ W, unos dos billones y medio de veces la luminosidad del Sol. Con una eficiencia $\eta = 0{,}1$:</p>
$$\dot{m} = \frac{L}{\eta\,c^{2}} = \frac{10^{39}}{0{,}1 \times 8{,}988 \times 10^{16}} = 1{,}11 \times 10^{23}\ \text{kg/s}$$
<p>En masas solares por año:</p>
$$\frac{1{,}11 \times 10^{23} \times 3{,}156 \times 10^{7}}{1{,}989 \times 10^{30}} = 1{,}8\ \text{masas solares por año}$$
<p>Menos de dos soles al año bastan para superar en brillo a una galaxia entera.</p>
<h3>GW150914, en números</h3>
<p><strong>Energía radiada.</strong> Tres masas solares:</p>
$$E = 3 \times 1{,}989 \times 10^{30} \times 8{,}988 \times 10^{16} = 5{,}4 \times 10^{47}\ \text{J}$$
<p>Es veinte veces la energía de una supernova, emitida en dos décimas de segundo y sin un solo fotón.</p>
<p><strong>Lo que midió LIGO.</strong> Con $h = 10^{-21}$ y brazos de 4 km:</p>
$$\Delta L = h\,L = 10^{-21} \times 4000\ \text{m} = 4 \times 10^{-18}\ \text{m}$$
<p>Un protón mide unos $1{,}7 \times 10^{-15}$ m. El desplazamiento fue cuatrocientas veces menor.</p>
<p><strong>Qué eran.</strong> Cerca del final, la onda tenía una frecuencia de 150 Hz, así que la frecuencia orbital era 75 Hz. Con la tercera ley de Kepler en la forma $a^{3} = GM/(4\pi^{2}f^{2})$ y una masa total de 65 masas solares, $1{,}293 \times 10^{32}$ kg:</p>
$$a = \left(\frac{6{,}674 \times 10^{-11} \times 1{,}293 \times 10^{32}}{4\pi^{2} \times 75^{2}}\right)^{1/3} = \left(3{,}89 \times 10^{16}\right)^{1/3} = 3{,}4 \times 10^{5}\ \text{m}$$
<p>Los dos objetos estaban a 340 km uno de otro. La suma de sus radios de Schwarzschild es $2{,}95 \times 65 = 192$ km. Ninguna otra cosa con esas masas cabe en ese espacio: tenían que ser agujeros negros. La cuenta usa a Newton fuera de su límite de validez, pero el orden de magnitud es correcto.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Eficiencias",
            enunciado: R`<p>Usa $\eta = r_s/(2R)$ con $r_s = 2{,}95$ km por masa solar.</p>`,
            partes: [
              { id: "a", pregunta: "Eficiencia de la caída sobre una estrella de neutrones de 1,4 masas solares y 12 km de radio", tipo: "num", respuesta: 0.172, tol: 0.03,
                pistas: ["r_s = 2,95 × 1,4 = 4,13 km."],
                solucion: R`$\dfrac{4{,}13}{2 \times 12} = 0{,}172$. El 17 % de la masa que cae se convierte en energía.` },
              { id: "b", pregunta: "¿Cuántas veces más eficiente es que la fusión del hidrógeno, 0,0071?", tipo: "num", unidad: "veces", respuesta: 24.2, tol: 0.04,
                pistas: ["Divide las dos eficiencias."],
                solucion: R`$0{,}172/0{,}0071 = 24$.` },
              { id: "c", pregunta: "La luz de un cuásar procede de:", tipo: "opcion", respuesta: 1,
                opciones: ["El interior del agujero negro", "El disco de gas caliente que lo rodea", "Las estrellas de la galaxia", "La radiación de Hawking"],
                pistas: ["Del interior del horizonte no sale nada."],
                solucion: R`Del disco de acreción, calentado por el rozamiento del gas que cae en espiral.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Cuásares y detectores",
            enunciado: R`<p>Usa $L = \eta\,\dot{m}\,c^{2}$ con $c^{2} = 8{,}988 \times 10^{16}$, un año de $3{,}156 \times 10^{7}$ s y $M_\odot = 1{,}989 \times 10^{30}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Masa que traga por año un cuásar de 10⁴⁰ W con eficiencia 0,1, en masas solares", tipo: "num", unidad: "M☉/año", respuesta: 17.7, tol: 0.03,
                pistas: ["ṁ = L / (η c²) en kg/s.", "Multiplica por los segundos de un año y divide entre la masa del Sol."],
                solucion: R`$\dot{m} = \dfrac{10^{40}}{0{,}1 \times 8{,}988 \times 10^{16}} = 1{,}11 \times 10^{24}$ kg/s, que son 17,7 masas solares por año.` },
              { id: "b", pregunta: "Cambio de longitud de un brazo de 4 km con una deformación h = 5 × 10⁻²²", tipo: "sci", unidad: "m", respuesta: 2e-18,
                pistas: ["ΔL = h L."],
                solucion: R`$5 \times 10^{-22} \times 4000 = 2 \times 10^{-18}$ m.` },
              { id: "c", pregunta: "Energía radiada en una fusión que convierte 5 masas solares en ondas gravitacionales", tipo: "sci", unidad: "J", respuesta: 8.94e47, tol: 0.03,
                pistas: ["E = m c²."],
                solucion: R`$5 \times 1{,}989 \times 10^{30} \times 8{,}988 \times 10^{16} = 8{,}9 \times 10^{47}$ J.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Los últimos instantes",
            enunciado: R`<p>Dos agujeros negros con una masa total de 65 masas solares orbitan a 75 vueltas por segundo, separados 340 km.</p>`,
            partes: [
              { id: "a", pregunta: "Frecuencia de la onda gravitacional que emiten", tipo: "num", unidad: "Hz", respuesta: 150,
                errores: [{ v: 75, msg: "La onda tiene el doble de la frecuencia orbital: el sistema repite su forma cada media vuelta." }],
                pistas: ["Es el doble de la frecuencia orbital."],
                solucion: R`$2 \times 75 = 150$ Hz. Está en la banda audible: convertida en sonido, es un silbido que sube de tono.` },
              { id: "b", pregunta: "Velocidad relativa orbital, como fracción de c", tipo: "num", unidad: "c", respuesta: 0.53, tol: 0.03,
                pistas: ["v = 2π a f, con a = 3,4 × 10⁵ m y f = 75 Hz.", "Divide entre 2,998 × 10⁸."],
                solucion: R`$2\pi \times 3{,}4 \times 10^{5} \times 75 = 1{,}6 \times 10^{8}$ m/s, la mitad de la velocidad de la luz.` },
              { id: "c", pregunta: "Los objetos tenían que ser agujeros negros porque:", tipo: "opcion", respuesta: 0,
                opciones: ["Cualquier otro objeto de esa masa es mucho mayor y habría chocado antes", "No emitieron luz", "Su masa total superaba la de Chandrasekhar", "Giraban demasiado rápido"],
                pistas: ["Compara la separación con el tamaño de una estrella de 30 masas solares."],
                solucion: R`Por el tamaño. Una estrella de 30 masas solares mide millones de kilómetros. Solo dos agujeros negros pueden orbitar a 340 km sin haberse tocado.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Dibuja un chirp</h3>
<p>En la fase final, la frecuencia de la onda crece como una potencia del tiempo que falta para la fusión, con exponente $-3/8$. El programa construye una señal con esa ley.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 0.2, 4000)           # los últimos 0,2 segundos
falta = 0.21 - t                        # tiempo que queda hasta la fusión

f = 35 * (0.21 / falta)**(3 / 8)        # frecuencia, empieza en 35 Hz
fase = 2 * np.pi * np.cumsum(f) * (t[1] - t[0])
h = f**(2 / 3) * np.cos(fase)           # la amplitud crece con la frecuencia

plt.plot(t, h)
plt.xlabel("tiempo (s)")
plt.show()

print("frecuencia inicial:", round(f[0]), "Hz")
print("frecuencia final:", round(f[-1]), "Hz")</pre></div>
<ol>
<li>Observa cómo las oscilaciones se aprietan y crecen hacia el final. Es la forma que tenía la señal de 2015.</li>
<li>La línea <code>np.cumsum</code> suma la frecuencia paso a paso: es una integral numérica, porque la fase es la integral de la frecuencia.</li>
<li>Los datos reales de LIGO son públicos. Busca «GWOSC» y escucha el audio de GW150914: es este chirp, una décima de segundo.</li>
</ol>`,
          notas: [{ id: "chirp", label: "Frecuencias inicial y final, y qué has encontrado en los datos públicos" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La acreción convierte en energía</strong> una fracción $r_s/2R$ de la masa que cae: hasta quince veces más que la fusión.`,
          R`<strong>Los cuásares</strong> son discos de gas alrededor de agujeros negros gigantes. Les bastan unos soles al año.`,
          R`<strong>Las ondas gravitacionales</strong> son deformaciones del espacio que viajan a $c$. Su amplitud es $h = \Delta L/L$.`,
          R`<strong>La primera detección, en 2015,</strong> midió $h \approx 10^{-21}$ de dos agujeros negros que radiaron tres masas solares.`,
          R`<strong>En 2017</strong> se observó una fusión con ondas gravitacionales y con luz a la vez.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 36 ───────────────────────── */
    {
      id: "leccion-36", n: 36, fase: 4, codigo: "B5.3",
      titulo: "La Vía Láctea",
      sub: "La forma, el tamaño y el movimiento de nuestra galaxia, vistos desde dentro.",
      horas: "5 horas",
      contexto: "Estructura de la Vía Láctea: disco de unos 30 kpc de diámetro, bulbo y barra, halo con cúmulos globulares; el Sol a 8,2 kpc del centro con velocidad orbital 230 km/s y periodo de unos 220 millones de años; masa interior M = v^2 r / G, unos 1e11 masas solares; polvo y extinción; cartografía con la línea de 21 cm y Doppler; brazos espirales; poblaciones estelares; curva de rotación plana; Grupo Local y Andrómeda a 780 kpc.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Desde un lugar oscuro, en una noche de verano, se ve una banda de luz difusa que cruza el cielo. Es nuestra galaxia vista de canto, desde dentro. Averiguar su forma real ha sido como dibujar el plano de un bosque sin poder salir de él y con niebla.</p>
<p>La niebla es literal. El espacio entre las estrellas contiene polvo, que absorbe la luz visible. En el plano de la galaxia apenas se ve más allá de unos miles de años luz. Durante siglos se creyó que el Sol estaba en el centro, porque en todas direcciones se contaban más o menos las mismas estrellas. Era el efecto de la niebla.</p>
<div class="nota"><strong>La radio atravesó la niebla.</strong> Las ondas de 21 cm del hidrógeno no se ven afectadas por el polvo. En los años cincuenta, midiendo el desplazamiento Doppler de esa línea en cada dirección, se trazó el primer mapa de los brazos espirales. Es el tipo de medida que puede repetirse hoy con una antena casera y un receptor de bajo coste.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Una unidad nueva</h3>
<p>A escala de galaxias, el pársec se queda corto. Se usan el <em>kilopársec</em>, kpc, que son mil pársecs o 3262 años luz, y el <em>megapársec</em>, Mpc, un millón de pársecs.</p>

<h3>2. Las partes de la galaxia</h3>
<ul>
<li><strong>Disco.</strong> Unos 30 kpc de diámetro y menos de 1 kpc de espesor. Contiene casi todo el gas, el polvo y las estrellas jóvenes, ordenados en brazos espirales. Todo gira en el mismo sentido en órbitas casi circulares.</li>
<li><strong>Bulbo y barra.</strong> La región central, más gruesa, con estrellas viejas. Tiene forma alargada: la Vía Láctea es una espiral barrada.</li>
<li><strong>Halo.</strong> Un volumen aproximadamente esférico y muy poco poblado, con estrellas viejas y unos 160 cúmulos globulares, en órbitas inclinadas en todas direcciones.</li>
<li><strong>Centro.</strong> El agujero negro Sagitario A*, de 4,3 millones de masas solares.</li>
</ul>
<p>En total, entre cien mil y cuatrocientos mil millones de estrellas. El número es incierto porque la mayoría son enanas rojas muy débiles.</p>

<h3>3. Dónde estamos</h3>
<p>Hacia 1918, Harlow Shapley midió las distancias a los cúmulos globulares con estrellas variables y vio que no se reparten alrededor del Sol, sino alrededor de un punto lejano en la dirección de Sagitario. Supuso que ese punto era el centro de la galaxia, y acertó.</p>
<p>El Sol está a 8,2 kpc del centro, en el disco, algo más de la mitad del camino hacia el borde. La distancia se conoce hoy con una precisión del 1 %, por las órbitas de las estrellas alrededor de Sagitario A*.</p>

<h3>4. El año galáctico</h3>
<p>El Sol gira alrededor del centro a unos 230 km/s. La circunferencia de su órbita dividida entre la velocidad da el periodo, unos 220 millones de años. Desde que se formó, ha dado unas veinte vueltas.</p>

<h3>5. Pesar la galaxia</h3>
<p>Para una órbita circular, la Lección 8 daba $v^{2} = GM/r$. Si la masa está repartida con simetría esférica, solo cuenta la que queda dentro de la órbita. Despejando:</p>
$$M(r) = \frac{v^{2}\,r}{G}$$
<p>Con la velocidad y la distancia del Sol sale la masa de la galaxia interior a nuestra órbita: unos cien mil millones de masas solares.</p>

<h3>6. Polvo y gas</h3>
<p>El medio interestelar es un 99 % gas, sobre todo hidrógeno, y un 1 % polvo: granos de silicatos y carbono de menos de una micra. El polvo absorbe y dispersa más la luz azul que la roja, así que las estrellas lejanas se ven más débiles y más rojas. Los dos efectos, la <em>extinción</em> y el <em>enrojecimiento</em>, hay que corregirlos en cualquier medida de distancia.</p>
<p>En el infrarrojo y en radio el polvo es casi transparente. Por eso el centro de la galaxia, oculto en el visible tras treinta magnitudes de extinción, se estudia en esas bandas.</p>

<h3>7. El mapa de 21 cm</h3>
<p>Al apuntar un radiotelescopio a una dirección del plano galáctico, la línea de 21 cm no aparece en una sola frecuencia. Aparece repartida en varios picos, cada uno desplazado por efecto Doppler según la velocidad de la nube que lo emite respecto a nosotros. Como la galaxia gira, cada velocidad corresponde a una distancia. Repitiendo la medida en todas las direcciones se reconstruye la distribución del gas, y con ella los brazos.</p>

<h3>8. Los brazos espirales</h3>
<p>Los brazos no son estructuras rígidas. Si lo fueran, la rotación los habría enrollado hace mucho. Son zonas de mayor densidad por las que las estrellas y el gas entran y salen, como los coches en un atasco: el atasco permanece aunque los coches cambien. Al entrar, el gas se comprime y forma estrellas, y las más masivas, azules y de vida corta, mueren antes de salir. Por eso los brazos destacan tanto.</p>

<h3>9. La curva de rotación</h3>
<p>Si casi toda la masa estuviera concentrada en el centro, como en el sistema solar, la velocidad orbital caería con la distancia como $v \propto 1/\sqrt{r}$. Lo que se mide es otra cosa: la velocidad se mantiene cerca de 230 km/s hasta mucho más allá del borde visible. Es una <em>curva de rotación plana</em>.</p>
<p>Por la fórmula de la sección 5, si $v$ es constante, la masa interior crece en proporción a $r$. Hay masa donde no se ve nada. Es el problema de la materia oscura, y será el tema central de la próxima lección.</p>

<h3>10. El vecindario</h3>
<p>La Vía Láctea forma parte del <em>Grupo Local</em>, con más de ochenta galaxias. Solo tres son grandes: la nuestra, Andrómeda y la del Triángulo. Andrómeda está a 780 kpc y se acerca a 110 km/s. Durante años se dio por seguro que chocará con la Vía Láctea dentro de unos 4500 millones de años. Análisis recientes, con mejores medidas de su movimiento lateral, rebajan esa certeza y dan una probabilidad cercana a la mitad en los próximos diez mil millones de años. Es una cuestión abierta.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La órbita del Sol en la galaxia</h3>
<p>Datos: $r = 8{,}2$ kpc y $v = 230$ km/s.</p>
<p><strong>Radio en metros:</strong></p>
$$r = 8{,}2 \times 10^{3} \times 3{,}086 \times 10^{16} = 2{,}53 \times 10^{20}\ \text{m}$$
<p><strong>Periodo:</strong></p>
$$T = \frac{2\pi r}{v} = \frac{2\pi \times 2{,}53 \times 10^{20}}{2{,}3 \times 10^{5}} = 6{,}91 \times 10^{15}\ \text{s} = 2{,}2 \times 10^{8}\ \text{años}$$
<p>La última vez que el Sol estuvo en este punto de su órbita empezaban a aparecer los dinosaurios.</p>
<p><strong>Masa interior a la órbita:</strong></p>
$$M = \frac{v^{2}\,r}{G} = \frac{(2{,}3 \times 10^{5})^{2} \times 2{,}53 \times 10^{20}}{6{,}674 \times 10^{-11}} = 2{,}0 \times 10^{41}\ \text{kg} = 1{,}0 \times 10^{11}\ M_\odot$$
<p><strong>¿Y más lejos?</strong> A 16 kpc, el doble de distancia, se mide la misma velocidad. La masa interior es entonces el doble, $2 \times 10^{11}$ masas solares. Entre 8 y 16 kpc hay otros cien mil millones de masas solares, y las estrellas y el gas que se ven en esa zona suman bastante menos.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "El año galáctico",
            enunciado: R`<p>El periodo orbital del Sol en la galaxia es de $2{,}2 \times 10^{8}$ años.</p>`,
            partes: [
              { id: "a", pregunta: "¿Cuántas vueltas ha dado el Sol en sus 4600 millones de años?", tipo: "num", unidad: "vueltas", respuesta: 21, tol: 0.03,
                pistas: ["Divide la edad entre el periodo."],
                solucion: R`$\dfrac{4{,}6 \times 10^{9}}{2{,}2 \times 10^{8}} = 21$.` },
              { id: "b", pregunta: "Tiempo que tarda la luz en cruzar el disco, de 30 kpc de diámetro", tipo: "sci", unidad: "años", respuesta: 9.78e4, tol: 0.02,
                pistas: ["Un kilopársec son 3262 años luz."],
                solucion: R`$30 \times 3262 = 97\,800$ años luz, así que la luz tarda casi cien mil años.` },
              { id: "c", pregunta: "El centro de la galaxia no se ve en luz visible porque:", tipo: "opcion", respuesta: 1,
                opciones: ["Está demasiado lejos", "El polvo del disco absorbe su luz", "El agujero negro central se la traga", "No hay estrellas en esa zona"],
                pistas: ["¿Por qué sí se ve en infrarrojo y en radio?"],
                solucion: R`Por el polvo. En el centro hay más estrellas que en ningún otro sitio de la galaxia.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Masas y velocidades",
            enunciado: R`<p>Usa $M = v^{2}r/G$. Datos: $1\ \text{kpc} = 3{,}086 \times 10^{19}$ m, $G = 6{,}674 \times 10^{-11}$, $M_\odot = 1{,}989 \times 10^{30}$ kg.</p>`,
            partes: [
              { id: "a", pregunta: "Masa interior a 20 kpc, donde la velocidad de rotación es 220 km/s, en masas solares", tipo: "sci", unidad: "M☉", respuesta: 2.25e11, tol: 0.04,
                pistas: ["r = 6,172 × 10²⁰ m y v² = 4,84 × 10¹⁰.", "Divide entre G y después entre la masa del Sol."],
                solucion: R`$\dfrac{4{,}84 \times 10^{10} \times 6{,}172 \times 10^{20}}{6{,}674 \times 10^{-11}} = 4{,}48 \times 10^{41}$ kg $= 2{,}25 \times 10^{11}\ M_\odot$.` },
              { id: "b", pregunta: "Si toda la masa de la galaxia fueran los 10¹¹ M☉ interiores a la órbita del Sol, ¿qué velocidad orbital habría a 16,4 kpc, el doble de distancia?", tipo: "num", unidad: "km/s", respuesta: 163, tol: 0.02,
                errores: [{ v: 115, msg: "La velocidad cae con la raíz de la distancia, no con la distancia." }],
                pistas: ["Con la masa fija, v ∝ 1/√r."],
                solucion: R`$230/\sqrt{2} = 163$ km/s. Se miden unos 230. La diferencia es la señal de la masa que no se ve.` },
              { id: "c", pregunta: "Una nube de hidrógeno muestra su línea de 1420,406 MHz desplazada +0,5 MHz. ¿A qué velocidad se acerca?", tipo: "num", unidad: "km/s", respuesta: 106, tol: 0.02,
                pistas: ["v = c Δf / f."],
                solucion: R`$2{,}998 \times 10^{5} \times \dfrac{0{,}5}{1420{,}4} = 106$ km/s. Una frecuencia mayor indica acercamiento.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Andrómeda",
            enunciado: R`<p>Andrómeda está a 780 kpc y se acerca a 110 km/s.</p>`,
            partes: [
              { id: "a", pregunta: "Si mantuviera esa velocidad y viniera de frente, ¿cuánto tardaría en llegar?", tipo: "sci", unidad: "años", respuesta: 6.9e9, tol: 0.04,
                pistas: ["Distancia: 780 × 3,086 × 10¹⁹ m.", "Divide entre 1,1 × 10⁵ m/s y pasa a años."],
                solucion: R`$\dfrac{2{,}41 \times 10^{22}}{1{,}1 \times 10^{5}} = 2{,}19 \times 10^{17}$ s $= 6{,}9 \times 10^{9}$ años. La atracción mutua la acelera, y por eso las estimaciones de un choque directo dan menos tiempo.` },
              { id: "b", pregunta: "El disco de Andrómeda mide unos 46 kpc de diámetro. ¿Qué tamaño angular tiene, en grados?", tipo: "num", unidad: "°", respuesta: 3.38, tol: 0.03,
                pistas: ["θ = D / d en radianes, y pasa a grados multiplicando por 57,3."],
                solucion: R`$\dfrac{46}{780} = 0{,}059$ rad $= 3{,}4^\circ$, casi siete veces la Luna llena. A simple vista solo se ve su núcleo, como una mancha alargada.` },
              { id: "c", pregunta: "La predicción de que Andrómeda chocará con la Vía Láctea es hoy:", tipo: "opcion", respuesta: 2,
                opciones: ["Un hecho seguro, con fecha conocida", "Una hipótesis descartada", "Una posibilidad cuya probabilidad se sigue discutiendo", "Imposible, porque el universo se expande"],
                pistas: ["La velocidad que se mide por Doppler es solo la radial."],
                solucion: R`Sigue en discusión. La velocidad radial se conoce bien, pero la lateral es difícil de medir, y de ella depende que el encuentro sea un choque o un paso de largo.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Dos curvas de rotación</h3>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

G = 6.674e-11
kpc = 3.086e19
M_sol = 1.989e30

r = np.linspace(2, 30, 200)                         # en kpc
M_visible = 1e11 * M_sol

v_kepler = np.sqrt(G * M_visible / (r * kpc)) / 1000
v_medida = np.full_like(r, 230.0)

plt.plot(r, v_kepler, label="solo masa central")
plt.plot(r, v_medida, label="observada, aproximada")
plt.xlabel("distancia al centro (kpc)")
plt.ylabel("velocidad (km/s)")
plt.legend()
plt.show()

for radio in [8.2, 15, 30]:
    M = (230e3)**2 * radio * kpc / G / M_sol
    print(radio, "kpc:", f"{M:.2e}", "masas solares en el interior")</pre></div>
<ol>
<li>Las dos curvas se cruzan cerca de la posición del Sol y se separan hacia fuera.</li>
<li>La tabla muestra cuánto crece la masa interior si la curva sigue plana.</li>
</ol>
<h3>La Vía Láctea a simple vista</h3>
<p>Hace falta un cielo oscuro y una noche sin Luna. En verano, mira hacia el sur al anochecer: la parte más brillante y ancha de la banda, entre Sagitario y Escorpio, es la dirección del centro. Fíjate en la franja oscura que la divide a lo largo. No es ausencia de estrellas, sino polvo que las tapa. En invierno la banda es más débil, porque miras hacia fuera del disco.</p>`,
          notas: [{ id: "vialactea", label: "Qué has visto de la Vía Láctea, desde dónde y en qué fecha" }],
          tareasTitulo: "Lista de observación",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Ver la banda de la Vía Láctea desde un sitio oscuro." },
            { id: "t2", texto: "Localizar la dirección del centro galáctico, en Sagitario." },
            { id: "t3", texto: "Distinguir la franja oscura de polvo en el Cisne o en Sagitario." },
            { id: "t4", texto: "Buscar la galaxia de Andrómeda a simple vista o con prismáticos, en otoño." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La Vía Láctea es una espiral barrada</strong> con disco, bulbo y halo, y un agujero negro de 4,3 millones de masas solares en el centro.`,
          R`<strong>El Sol está a 8,2 kpc del centro</strong> y tarda 220 millones de años en dar una vuelta, a 230 km/s.`,
          R`<strong>Masa interior a una órbita:</strong> $M = v^{2}r/G$. Dentro de la del Sol hay $10^{11}$ masas solares.`,
          R`<strong>El polvo oculta el disco en el visible.</strong> El mapa de la galaxia se hizo con la línea de 21 cm.`,
          R`<strong>La curva de rotación es plana:</strong> la masa sigue creciendo donde ya no se ven estrellas.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 37 ───────────────────────── */
    {
      id: "leccion-37", n: 37, fase: 4, codigo: "B5.4",
      titulo: "Galaxias y materia oscura",
      sub: "Los tipos de galaxias, los cúmulos y la masa que se nota por su gravedad pero no se ve.",
      horas: "5 horas",
      contexto: "Clasificación de Hubble (elípticas, espirales, irregulares); Hubble y las cefeidas de Andrómeda (1923); cúmulos de galaxias; masa del virial M = 5 sigma^2 R / G (Coma: sigma 1000 km/s, R 1,5 Mpc, 1,7e15 masas solares); cociente masa-luminosidad; evidencias de materia oscura: curvas de rotación (Rubin), cúmulos (Zwicky), lentes gravitatorias con desviación 4GM/(c^2 b), Cúmulo Bala, fondo cósmico; candidatos: WIMP, axiones, agujeros negros primordiales; alternativa MOND; densidad local de materia oscura 0,4 GeV/cm^3; su naturaleza es una cuestión abierta.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Imagina que auditas una red eléctrica. Sumas el consumo de todos los abonados que tienes en la lista y te sale la quinta parte de lo que marcan los contadores de la subestación. No sabes quién gasta el resto, pero sabes cuánto es y más o menos dónde está. Eso mismo ocurre con la masa de las galaxias.</p>
<p>En la lección anterior viste que la Vía Láctea gira demasiado rápido en su parte exterior para la masa que se ve. Ahora verás que no es una rareza de nuestra galaxia. Pasa en todas las espirales, en los cúmulos de galaxias y en las medidas que no dependen de ninguna órbita.</p>
<div class="nota"><strong>Qué está establecido y qué no.</strong> Que hay más gravedad de la que explica la materia visible está medido por métodos independientes y casi nadie lo discute. De qué está hecha esa masa adicional no se sabe. Conviene mantener separadas las dos afirmaciones durante toda la lección.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El universo de las galaxias</h3>
<p>Hasta 1923 no estaba claro si las «nebulosas espirales» eran nubes de nuestra galaxia u otras galaxias. Edwin Hubble encontró cefeidas en la de Andrómeda y aplicó la relación entre periodo y luminosidad de la Lección 30. La distancia que obtuvo la colocaba muy fuera de la Vía Láctea. El universo se hizo de golpe mucho mayor.</p>
<p>Hoy se estima que el universo observable contiene del orden de cientos de miles de millones de galaxias.</p>

<h3>2. Tipos de galaxias</h3>
<div class="tabla"><table>
<thead><tr><th>Tipo</th><th>Forma</th><th>Estrellas</th><th>Gas frío</th></tr></thead>
<tbody>
<tr><td>Espiral</td><td>Disco con brazos y bulbo, a veces con barra</td><td>Jóvenes en el disco, viejas en el bulbo</td><td>Abundante</td></tr>
<tr><td>Elíptica</td><td>Esferoide sin disco</td><td>Viejas y rojas</td><td>Muy poco</td></tr>
<tr><td>Lenticular</td><td>Disco sin brazos</td><td>Viejas</td><td>Poco</td></tr>
<tr><td>Irregular</td><td>Sin forma definida</td><td>Jóvenes</td><td>Abundante</td></tr>
</tbody></table></div>
<p>Las espirales giran de forma ordenada. En las elípticas, las estrellas se mueven en todas direcciones, como las abejas de un enjambre, y lo que se mide es la <em>dispersión de velocidades</em>, $\sigma$: lo que se apartan, en promedio, de la velocidad media. Las elípticas gigantes se forman en buena parte por la fusión de galaxias menores.</p>

<h3>3. Cúmulos de galaxias</h3>
<p>Las galaxias se agrupan. Un cúmulo rico, como el de Coma, reúne más de mil galaxias en unos pocos megapársecs. Entre ellas hay gas a decenas de millones de grados, que brilla en rayos X y pesa varias veces más que todas las estrellas del cúmulo.</p>

<h3>4. Pesar un cúmulo con el teorema del virial</h3>
<p>En la Lección 25 viste que en un sistema ligado y en equilibrio se cumple $2K + U = 0$: el doble de la energía cinética es igual a la energía potencial cambiada de signo. Para un cúmulo de masa $M$ y radio $R$:</p>
<ul>
<li>La energía cinética es $K = \tfrac{1}{2}M\langle v^{2}\rangle$. Solo medimos la velocidad a lo largo de la línea de visión, con dispersión $\sigma$. Como hay tres direcciones equivalentes, $\langle v^{2}\rangle = 3\sigma^{2}$, y $K = \tfrac{3}{2}M\sigma^{2}$.</li>
<li>La energía potencial de una esfera uniforme es $U = -\tfrac{3}{5}\,GM^{2}/R$.</li>
</ul>
<p>Sustituyendo en $2K = -U$:</p>
$$3M\sigma^{2} = \frac{3}{5}\,\frac{GM^{2}}{R}$$
<p>Se divide entre $3M$ en los dos lados y se despeja $M$:</p>
$$M = \frac{5\,\sigma^{2}R}{G}$$
<p>El factor 5 depende de cómo esté repartida la masa. La fórmula da el orden de magnitud, no tres cifras.</p>
<p>Fritz Zwicky hizo esta cuenta en 1933 con el cúmulo de Coma y obtuvo cientos de veces más masa de la que sumaban las galaxias. La llamó <em>materia oscura</em>. Nadie le hizo mucho caso durante cuarenta años.</p>

<h3>5. El cociente entre masa y luz</h3>
<p>Para comparar, se divide la masa de un sistema, en masas solares, entre su luminosidad, en luminosidades solares. Para el Sol el cociente es 1 por definición. Para una población normal de estrellas sale entre 1 y 5, porque abundan las enanas poco luminosas. En las galaxias completas sale del orden de decenas, y en los cúmulos, de centenares.</p>

<h3>6. Cuatro pruebas independientes</h3>
<ul>
<li><strong>Curvas de rotación.</strong> En los años setenta, Vera Rubin y Kent Ford midieron decenas de espirales. Todas tenían curvas planas, como la de la Vía Láctea.</li>
<li><strong>Cúmulos.</strong> La velocidad de las galaxias y la temperatura del gas exigen la misma masa, mucho mayor que la visible.</li>
<li><strong>Lentes gravitatorias.</strong> La masa desvía la luz, como viste en la Lección 34, con un ángulo $\alpha = 4GM/(c^{2}b)$ para un rayo que pasa a distancia $b$. Un cúmulo deforma en arcos las galaxias que tiene detrás. Midiendo los arcos se pesa el cúmulo sin suponer nada sobre órbitas ni equilibrio. El resultado coincide con el del virial.</li>
<li><strong>El fondo cósmico de microondas.</strong> El patrón de sus irregularidades, que verás en la Lección 39, solo se reproduce si hay unas cinco veces más materia oscura que materia ordinaria.</li>
</ul>

<h3>7. El Cúmulo Bala</h3>
<p>Son dos cúmulos que se atravesaron hace unos cien millones de años. El gas caliente de uno chocó con el del otro y quedó frenado en el centro. Las galaxias, muy separadas entre sí, pasaron de largo. Las lentes gravitatorias muestran que la mayor parte de la masa está con las galaxias, y no con el gas, que es donde está casi toda la materia ordinaria. Es difícil de explicar sin una componente que tenga masa y apenas choque con nada.</p>

<h3>8. Qué puede ser</h3>
<p>Se sabe lo que no es. No son estrellas débiles, planetas sueltos ni gas: la cantidad total de materia ordinaria está limitada por la abundancia de los elementos ligeros, como verás en la Lección 39. Tampoco son los neutrinos conocidos, demasiado ligeros y rápidos para formar las galaxias que se ven.</p>
<p>Los candidatos principales son hipótesis:</p>
<ul>
<li><strong>WIMP,</strong> partículas masivas que solo sienten la gravedad y la fuerza débil. Se buscan desde hace décadas en detectores subterráneos, sin detección confirmada.</li>
<li><strong>Axiones,</strong> partículas muy ligeras propuestas por otra razón en física de partículas. Se buscan con cavidades resonantes de microondas, un experimento muy parecido a un receptor de radio sintonizable.</li>
<li><strong>Agujeros negros primordiales,</strong> formados en el universo temprano. Las observaciones dejan poco margen, pero no los descartan del todo.</li>
</ul>

<h3>9. La alternativa: cambiar la gravedad</h3>
<p>Otra posibilidad es que no falte masa, sino que la ley de la gravedad cambie cuando las aceleraciones son muy pequeñas. La propuesta más conocida, MOND, reproduce muy bien las curvas de rotación de las galaxias con un solo parámetro. Tiene dificultades con los cúmulos, con el Cúmulo Bala y con el fondo cósmico. La mayoría de la comunidad trabaja con materia oscura, pero mientras no se detecte la partícula el debate sigue abierto.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La cuenta de Zwicky, con datos actuales</h3>
<p>Cúmulo de Coma: dispersión de velocidades $\sigma = 1000$ km/s y radio $R = 1{,}5$ Mpc.</p>
<p><strong>Radio en metros:</strong></p>
$$R = 1{,}5 \times 3{,}086 \times 10^{22} = 4{,}63 \times 10^{22}\ \text{m}$$
<p><strong>Masa del virial:</strong></p>
$$M = \frac{5\,\sigma^{2}R}{G} = \frac{5 \times (10^{6})^{2} \times 4{,}63 \times 10^{22}}{6{,}674 \times 10^{-11}} = 3{,}47 \times 10^{45}\ \text{kg}$$
<p><strong>En masas solares:</strong></p>
$$\frac{3{,}47 \times 10^{45}}{1{,}989 \times 10^{30}} = 1{,}7 \times 10^{15}\ M_\odot$$
<p><strong>Comparación con la luz.</strong> Las galaxias de Coma suman unas $5 \times 10^{12}$ luminosidades solares. El cociente entre masa y luz es</p>
$$\frac{1{,}7 \times 10^{15}}{5 \times 10^{12}} \approx 350$$
<p>Unas cien veces más que el de una población de estrellas. El gas caliente explica una parte, cerca del 15 % de la masa total. Las estrellas, un 2 %. El resto es lo que llamamos materia oscura.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Luz y masa",
            enunciado: R`<p>Una galaxia espiral tiene $2 \times 10^{11}$ masas solares dentro del radio medido y una luminosidad de $2 \times 10^{10}$ luminosidades solares.</p>`,
            partes: [
              { id: "a", pregunta: "Cociente entre masa y luz, en unidades solares", tipo: "num", unidad: "", respuesta: 10, tol: 0.02,
                pistas: ["Divide la masa entre la luminosidad."],
                solucion: R`$\dfrac{2 \times 10^{11}}{2 \times 10^{10}} = 10$.` },
              { id: "b", pregunta: "Si sus estrellas tienen un cociente de 2, ¿qué porcentaje de la masa no está en estrellas?", tipo: "num", unidad: "%", respuesta: 80, tol: 0.02,
                errores: [{ v: 20, msg: "Ese es el porcentaje que sí está en estrellas." }],
                pistas: ["Masa en estrellas: 2 × 2 × 10¹⁰ masas solares.", "Resta de la masa total y divide entre la total."],
                solucion: R`Las estrellas suman $4 \times 10^{10}\ M_\odot$, el 20 % del total. El 80 % restante es gas y, sobre todo, materia oscura.` },
              { id: "c", pregunta: "¿Cuál de estas observaciones NO es una prueba de la materia oscura?", tipo: "opcion", respuesta: 3,
                opciones: ["Las curvas de rotación planas", "La velocidad de las galaxias dentro de los cúmulos", "Los arcos de las lentes gravitatorias", "El color rojo de las galaxias elípticas"],
                pistas: ["Tres de ellas miden gravedad. La otra depende de la edad de las estrellas."],
                solucion: R`El color de las elípticas se debe a que sus estrellas son viejas. Las otras tres miden masa por su efecto gravitatorio.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Pesar un cúmulo",
            enunciado: R`<p>Usa $M = 5\sigma^{2}R/G$ y $\alpha = 4GM/(c^{2}b)$. Datos: $1\ \text{Mpc} = 3{,}086 \times 10^{22}$ m, $G = 6{,}674 \times 10^{-11}$, $M_\odot = 1{,}989 \times 10^{30}$ kg, $c = 2{,}998 \times 10^{8}$ m/s.</p>`,
            partes: [
              { id: "a", pregunta: "Masa del cúmulo de Virgo, con σ = 700 km/s y R = 2,2 Mpc, en masas solares", tipo: "sci", unidad: "M☉", respuesta: 1.25e15, tol: 0.04,
                errores: [{ v: 1.25e9, msg: "La velocidad tiene que ir en m/s: 700 km/s son 7 × 10⁵ m/s." }],
                pistas: ["σ² = 4,9 × 10¹¹ y R = 6,79 × 10²² m.", "Multiplica por 5, divide entre G y después entre la masa del Sol."],
                solucion: R`$\dfrac{5 \times 4{,}9 \times 10^{11} \times 6{,}79 \times 10^{22}}{6{,}674 \times 10^{-11}} = 2{,}49 \times 10^{45}$ kg $= 1{,}25 \times 10^{15}\ M_\odot$.` },
              { id: "b", pregunta: "Ángulo que se desvía un rayo de luz que pasa a 1 Mpc del centro de un cúmulo de 10¹⁵ M☉, en segundos de arco", tipo: "num", unidad: "″", respuesta: 39.5, tol: 0.04,
                pistas: ["M = 1,989 × 10⁴⁵ kg y b = 3,086 × 10²² m.", "El resultado sale en radianes. Multiplica por 206 265."],
                solucion: R`$\alpha = \dfrac{4 \times 6{,}674 \times 10^{-11} \times 1{,}989 \times 10^{45}}{(2{,}998 \times 10^{8})^{2} \times 3{,}086 \times 10^{22}} = 1{,}91 \times 10^{-4}$ rad $= 39{,}5''$. El Sol desvía $1{,}75''$. Con ángulos de medio minuto de arco, las galaxias del fondo se estiran en arcos visibles.` },
              { id: "c", pregunta: "El Cúmulo Bala se considera una prueba fuerte porque:", tipo: "opcion", respuesta: 1,
                opciones: ["Es el cúmulo más masivo que se conoce", "La masa medida con lentes está separada del gas, que es casi toda la materia ordinaria", "Sus galaxias giran más rápido de lo esperado", "Se ha detectado en él la partícula de materia oscura"],
                pistas: ["Piensa en qué quedó frenado en el choque y qué pasó de largo."],
                solucion: R`La masa está donde las galaxias y no donde el gas. Una gravedad modificada tendería a poner la masa donde está la materia ordinaria.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Materia oscura en tu habitación",
            enunciado: R`<p>Los modelos de la Vía Láctea dan una densidad de materia oscura cerca del Sol de unos 0,4 GeV por centímetro cúbico, expresada como energía en reposo. Datos: $1\ \text{GeV} = 1{,}602 \times 10^{-10}$ J y $c^{2} = 8{,}988 \times 10^{16}\ \text{m}^{2}/\text{s}^{2}$.</p>`,
            partes: [
              { id: "a", pregunta: "Esa densidad en kg/m³", tipo: "sci", unidad: "kg/m³", respuesta: 7.13e-22, tol: 0.03,
                errores: [{ v: 7.13e-28, msg: "Un metro cúbico tiene un millón de centímetros cúbicos." }],
                pistas: ["Pasa a julios por metro cúbico: 0,4 × 1,602 × 10⁻¹⁰ × 10⁶.", "Divide entre c² para tener masa."],
                solucion: R`$0{,}4 \times 1{,}602 \times 10^{-10} \times 10^{6} = 6{,}41 \times 10^{-5}\ \text{J/m}^{3}$. Entre $c^{2}$: $7{,}13 \times 10^{-22}\ \text{kg/m}^{3}$. Es menos de un protón por centímetro cúbico.` },
              { id: "b", pregunta: "Si fuera una partícula de 100 GeV, ¿cuántas habría en un litro?", tipo: "num", unidad: "partículas", respuesta: 4, tol: 0.03,
                pistas: ["Un litro son 1000 cm³, con 400 GeV en total."],
                solucion: R`$1000 \times 0{,}4 = 400$ GeV por litro, es decir, 4 partículas de 100 GeV.` },
              { id: "c", pregunta: "Con esas partículas moviéndose a 230 km/s, ¿cuántas cruzan cada segundo un centímetro cuadrado?", tipo: "sci", unidad: "por cm² y s", respuesta: 9.2e4, tol: 0.03,
                pistas: ["Flujo = densidad en número × velocidad.", "Densidad: 0,004 por cm³. Velocidad: 2,3 × 10⁷ cm/s."],
                solucion: R`$0{,}004 \times 2{,}3 \times 10^{7} = 9{,}2 \times 10^{4}$ por centímetro cuadrado y segundo. Te atravesarían miles de millones cada segundo sin efecto alguno, y por eso los detectores necesitan toneladas de material y años de espera.` },
              { id: "d", pregunta: "¿Cuál es el estado actual de la cuestión?", tipo: "opcion", respuesta: 2,
                opciones: ["La partícula se detectó en 2012 en el LHC", "La materia oscura está descartada desde que existe MOND", "El exceso de gravedad está medido por varios métodos, y su naturaleza sigue sin conocerse", "Se sabe que son agujeros negros"],
                pistas: ["Separa lo que se ha medido de lo que se propone para explicarlo."],
                solucion: R`El efecto está establecido. La explicación no. En 2012 el LHC detectó el bosón de Higgs, que no tiene relación con esto.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Una curva de rotación por piezas</h3>
<p>El programa suma la contribución de la materia visible y la de un halo oscuro. Las velocidades no se suman directamente. Se suman sus cuadrados, porque lo que se suma es la masa.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

G = 6.674e-11
kpc = 3.086e19
M_sol = 1.989e30

r = np.linspace(0.5, 40, 300)                     # en kpc

# materia visible: 7e10 masas solares, concentrada hacia el centro
x = r / 3.0
M_vis = 7e10 * (1 - np.exp(-x) * (1 + x))
v_vis = np.sqrt(G * M_vis * M_sol / (r * kpc)) / 1000

# halo oscuro: velocidad que tiende a 220 km/s, con un núcleo de 4 kpc
v_halo = 220 * np.sqrt(1 - (4 / r) * np.arctan(r / 4))

v_total = np.sqrt(v_vis**2 + v_halo**2)

plt.plot(r, v_vis, label="visible")
plt.plot(r, v_halo, label="halo oscuro")
plt.plot(r, v_total, label="total")
plt.xlabel("distancia al centro (kpc)")
plt.ylabel("velocidad (km/s)")
plt.legend()
plt.show()

for radio in [2, 8.2, 20, 40]:
    i = np.argmin(abs(r - radio))
    print(radio, "kpc: visible", round(v_vis[i]), " halo", round(v_halo[i]), " total", round(v_total[i]))</pre></div>
<ol>
<li>Cerca del centro manda la materia visible. A la distancia del Sol, las dos pesan parecido.</li>
<li>A 40 kpc la parte visible ha caído a menos de la mitad y la curva total sigue casi plana.</li>
<li>Cambia el 220 del halo por 0 y vuelve a dibujar. Esa es la curva que se esperaba medir antes de Rubin.</li>
</ol>
<h3>Clasifica galaxias reales</h3>
<p>En el proyecto de ciencia ciudadana Galaxy Zoo, en la plataforma Zooniverse, cualquiera puede clasificar imágenes de galaxias de cartografiados profesionales. No requiere instalar nada. Clasifica veinte y anota cuántas eran espirales, cuántas elípticas y en cuántas dudaste.</p>`,
          notas: [{ id: "curva", label: "Qué pasa con la curva total al quitar el halo, y tu recuento de Galaxy Zoo" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Hay galaxias espirales, elípticas, lenticulares e irregulares,</strong> y se agrupan en cúmulos con gas muy caliente.`,
          R`<strong>Masa de un cúmulo por el virial:</strong> $M = 5\sigma^{2}R/G$. En Coma salen $1{,}7 \times 10^{15}$ masas solares.`,
          R`<strong>Cuatro medidas independientes</strong> piden más masa que la visible: rotación, cúmulos, lentes gravitatorias y fondo cósmico.`,
          R`<strong>Está establecido que hay un exceso de gravedad.</strong> De qué está hecho es una de las grandes preguntas abiertas.`,
          R`<strong>Candidatos:</strong> WIMP, axiones y agujeros negros primordiales. La alternativa es modificar la gravedad.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 38 ───────────────────────── */
    {
      id: "leccion-38", n: 38, fase: 4, codigo: "B6.1",
      titulo: "El universo en expansión",
      sub: "El corrimiento al rojo de las galaxias, la ley de Hubble y lo que significa que el espacio se estire.",
      horas: "5 horas",
      contexto: "Corrimiento al rojo z = (lambda_obs - lambda_em)/lambda_em; ley de Hubble-Lemaître v = H0 d con H0 cerca de 70 km/s/Mpc; expansión del espacio, sin centro; factor de escala a y 1 + z = 1/a; corrimiento cosmológico frente a Doppler; tiempo de Hubble 1/H0 = 13,97 mil millones de años para H0 = 70; distancia de Hubble c/H0 = 4283 Mpc; escalera de distancias (paralaje, cefeidas, supernovas Ia); tensión de Hubble: 67,4 (fondo cósmico, Planck) frente a 73,0 (cefeidas y supernovas, SH0ES), cuestión abierta; paradoja de Olbers.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Mete en el horno una masa de pan con pasas. Al crecer, todas las pasas se alejan unas de otras. Desde cualquier pasa se ve lo mismo: las vecinas se alejan despacio y las lejanas, deprisa, porque hay más masa creciendo en medio. Ninguna pasa es el centro.</p>
<p>Eso es lo que se observa en el universo. Las galaxias lejanas se alejan de nosotros, y lo hacen tanto más rápido cuanto más lejos están. La explicación no es que estemos en el centro de una explosión. Es que el espacio entre las galaxias crece.</p>
<div class="nota"><strong>Para un ingeniero de telecomunicaciones.</strong> Piensa en una señal grabada en una cinta elástica. Si estiras la cinta al doble mientras la señal viaja, la longitud de onda se duplica y la frecuencia cae a la mitad. La luz de las galaxias lejanas llega con la longitud de onda estirada en la misma proporción en que se ha estirado el universo durante el viaje.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El corrimiento al rojo</h3>
<p>Las líneas espectrales de las galaxias lejanas aparecen desplazadas hacia longitudes de onda mayores. El desplazamiento se mide con el número $z$:</p>
$$z = \frac{\lambda_\text{obs} - \lambda_\text{em}}{\lambda_\text{em}}$$
<p>Si una línea que se emite a 500 nm se observa a 550 nm, $z = 50/500 = 0{,}1$. Una forma equivalente de escribirlo es $1 + z = \lambda_\text{obs}/\lambda_\text{em}$.</p>
<p>Para valores pequeños de $z$ se puede leer como una velocidad de alejamiento con el efecto Doppler de la Lección 18, $v = cz$.</p>

<h3>2. La ley de Hubble</h3>
<p>Hacia 1912, Vesto Slipher midió que casi todas las galaxias tienen sus líneas corridas al rojo. En 1927, Georges Lemaître dedujo de la relatividad general que el universo podía estar en expansión y estimó el ritmo. En 1929, Hubble comparó las velocidades con las distancias que había medido con cefeidas y encontró una proporcionalidad:</p>
$$v = H_0\,d$$
<p>$H_0$ es la <em>constante de Hubble</em>. Su valor actual ronda los 70 km/s por megapársec. Una galaxia a 100 Mpc se aleja a unos 7000 km/s, y una a 200 Mpc, a 14 000.</p>
<p>La ley se cumple en promedio. Cada galaxia tiene además un movimiento propio de unos cientos de km/s por la atracción de sus vecinas. Por eso Andrómeda, que está muy cerca, se acerca.</p>

<h3>3. No hay centro</h3>
<p>Una ley en la que la velocidad es proporcional a la distancia tiene una propiedad especial: se ve igual desde cualquier punto. Compruébalo con tres galaxias en línea, A, B y C, separadas 100 Mpc. Desde A, B se aleja a 7000 km/s y C a 14 000. Visto desde B, A se aleja a 7000 hacia un lado y C a $14\,000 - 7000 = 7000$ hacia el otro. B también se ve en el centro. Todas lo hacen.</p>

<h3>4. El factor de escala</h3>
<p>Para describir la expansión se usa un número, el <em>factor de escala</em> $a$, que vale 1 hoy y era menor en el pasado. Si $a = 0{,}5$, todas las distancias entre galaxias eran la mitad de las actuales.</p>
<p>La longitud de onda de la luz se estira con el espacio. Si la luz salió cuando el factor era $a$ y llega hoy, con $a = 1$:</p>
$$\frac{\lambda_\text{obs}}{\lambda_\text{em}} = \frac{1}{a} \quad\Longrightarrow\quad 1 + z = \frac{1}{a}$$
<p>El corrimiento al rojo dice directamente cuánto ha crecido el universo desde que salió la luz. Con $z = 1$, el doble. Con $z = 9$, diez veces.</p>
<p>Este corrimiento <em>cosmológico</em> no es un Doppler en sentido estricto. La galaxia no se mueve a través del espacio. Es el espacio el que crece. A $z$ pequeño las dos descripciones dan el mismo número, y a $z$ grande solo vale la del factor de escala.</p>

<h3>5. El tiempo de Hubble</h3>
<p>Si una galaxia a distancia $d$ se ha alejado siempre a la misma velocidad $v$, el tiempo transcurrido desde que estaba aquí es</p>
$$t = \frac{d}{v} = \frac{d}{H_0\,d} = \frac{1}{H_0}$$
<p>La distancia se cancela: da el mismo tiempo para todas las galaxias. Es el <em>tiempo de Hubble</em>, y da el orden de magnitud de la edad del universo. Para calcularlo hay que pasar $H_0$ a unidades del SI, como hace el ejemplo resuelto. Sale cerca de 14 000 millones de años.</p>
<p>La edad real depende de cómo haya cambiado el ritmo de expansión. La verás en la Lección 40, y resulta ser muy parecida.</p>

<h3>6. La escalera de distancias</h3>
<p>Medir $H_0$ exige distancias fiables a galaxias lejanas, y ningún método llega solo. Se encadenan:</p>
<ol>
<li><strong>Paralaje</strong> (Lección 2) para las cefeidas cercanas de la Vía Láctea. Es geometría pura.</li>
<li><strong>Cefeidas</strong> (Lección 30), calibradas con el paso anterior, hasta galaxias a unos 40 Mpc.</li>
<li><strong>Supernovas de tipo Ia</strong> (Lección 31), calibradas en galaxias con cefeidas, hasta miles de megapársecs.</li>
</ol>
<p>Cada peldaño hereda los errores del anterior.</p>

<h3>7. La tensión de Hubble</h3>
<p>Hay dos formas de obtener $H_0$, y no coinciden.</p>
<div class="tabla"><table>
<thead><tr><th>Método</th><th>Qué mide</th><th>$H_0$ (km/s/Mpc)</th></tr></thead>
<tbody>
<tr><td>Escalera de distancias (cefeidas y supernovas)</td><td>El universo cercano, de forma directa</td><td>$73{,}0 \pm 1{,}0$</td></tr>
<tr><td>Fondo cósmico de microondas (satélite Planck)</td><td>El universo joven, extrapolado a hoy con el modelo estándar</td><td>$67{,}4 \pm 0{,}5$</td></tr>
</tbody></table></div>
<p>La diferencia es de un 8 %, varias veces mayor que los errores declarados. Puede deberse a un error sistemático no identificado en alguna de las medidas o a que al modelo le falte algún ingrediente. Otros métodos, como las estrellas de la punta de la rama de gigantes rojas, dan valores intermedios. Es una cuestión abierta y muy activa.</p>

<h3>8. Por qué la noche es oscura</h3>
<p>Si el universo fuera infinito, eterno y estático, cualquier línea de visión acabaría en la superficie de una estrella y el cielo entero brillaría como el Sol. Es la <em>paradoja de Olbers</em>. La noche es oscura porque el universo tiene una edad finita, y solo nos ha llegado la luz de una región limitada, y porque la expansión enrojece y debilita la luz más lejana.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>Distancia a una galaxia por su espectro</h3>
<p>La línea H$\alpha$ del hidrógeno, que en el laboratorio está en 6562,8 Å, se observa en una galaxia a 6695,0 Å.</p>
<p><strong>Corrimiento al rojo:</strong></p>
$$z = \frac{6695{,}0 - 6562{,}8}{6562{,}8} = \frac{132{,}2}{6562{,}8} = 0{,}0201$$
<p><strong>Velocidad de alejamiento:</strong></p>
$$v = cz = 2{,}998 \times 10^{5} \times 0{,}0201 = 6040\ \text{km/s}$$
<p><strong>Distancia, con $H_0 = 70$:</strong></p>
$$d = \frac{v}{H_0} = \frac{6040}{70} = 86\ \text{Mpc}$$
<p>Son 280 millones de años luz. Con $H_0 = 73$ saldrían 83 Mpc y con 67,4 saldrían 90. La incertidumbre de $H_0$ se traslada entera a todas las distancias medidas así.</p>
<h3>El tiempo de Hubble</h3>
<p><strong>Primero, $H_0$ en unidades del SI.</strong> Un megapársec son $3{,}086 \times 10^{19}$ km:</p>
$$H_0 = \frac{70\ \text{km/s}}{3{,}086 \times 10^{19}\ \text{km}} = 2{,}268 \times 10^{-18}\ \text{s}^{-1}$$
<p>Los kilómetros se cancelan y queda una frecuencia. La constante de Hubble es un ritmo: el universo crece una fracción $2{,}3 \times 10^{-18}$ de su tamaño cada segundo.</p>
<p><strong>Su inverso:</strong></p>
$$\frac{1}{H_0} = 4{,}41 \times 10^{17}\ \text{s} = \frac{4{,}41 \times 10^{17}}{3{,}156 \times 10^{7}}\ \text{años} = 1{,}40 \times 10^{10}\ \text{años}$$
<p>Catorce mil millones de años. Las estrellas más viejas que se conocen tienen unos trece mil millones, así que las dos cifras son compatibles.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "De la línea a la distancia",
            enunciado: R`<p>En el espectro de una galaxia, la línea H$\alpha$ (6562,8 Å en reposo) aparece en 6890,0 Å. Usa $c = 2{,}998 \times 10^{5}$ km/s y $H_0 = 70$ km/s/Mpc.</p>`,
            partes: [
              { id: "a", pregunta: "Corrimiento al rojo z", tipo: "num", unidad: "", respuesta: 0.0499, tol: 0.02,
                errores: [{ v: 0.0475, msg: "Se divide entre la longitud de onda emitida, no entre la observada." }],
                pistas: ["Resta las dos longitudes de onda y divide entre la de reposo."],
                solucion: R`$z = \dfrac{6890{,}0 - 6562{,}8}{6562{,}8} = \dfrac{327{,}2}{6562{,}8} = 0{,}0499$.` },
              { id: "b", pregunta: "Velocidad de alejamiento", tipo: "num", unidad: "km/s", respuesta: 14950, tol: 0.02,
                pistas: ["v = c z."],
                solucion: R`$2{,}998 \times 10^{5} \times 0{,}0499 = 14\,950$ km/s.` },
              { id: "c", pregunta: "Distancia", tipo: "num", unidad: "Mpc", respuesta: 214, tol: 0.02,
                pistas: ["d = v / H₀."],
                solucion: R`$14\,950 / 70 = 214$ Mpc, unos 700 millones de años luz.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Edades y tamaños",
            enunciado: R`<p>Para $H_0 = 70$, el tiempo de Hubble es $1{,}397 \times 10^{10}$ años. Como es inversamente proporcional a $H_0$, puedes escalar desde ese valor.</p>`,
            partes: [
              { id: "a", pregunta: "Tiempo de Hubble con H₀ = 67,4, en miles de millones de años", tipo: "num", unidad: "× 10⁹ años", respuesta: 14.5, tol: 0.02,
                errores: [{ v: 13.45, msg: "Con una expansión más lenta hace falta más tiempo, no menos. Multiplica por 70/67,4." }],
                pistas: ["13,97 × 70 / 67,4."],
                solucion: R`$13{,}97 \times \dfrac{70}{67{,}4} = 14{,}5$ miles de millones de años.` },
              { id: "b", pregunta: "Y con H₀ = 73,0", tipo: "num", unidad: "× 10⁹ años", respuesta: 13.4, tol: 0.02,
                pistas: ["13,97 × 70 / 73."],
                solucion: R`$13{,}97 \times \dfrac{70}{73} = 13{,}4$ miles de millones de años.` },
              { id: "c", pregunta: "La luz de un cuásar llega con z = 3. ¿Cuántas veces han crecido las distancias desde que salió?", tipo: "num", unidad: "veces", respuesta: 4, tol: 0.02,
                errores: [{ v: 3, msg: "El factor es 1 + z, no z." }],
                pistas: ["1 + z = 1 / a."],
                solucion: R`$1 + z = 4$. El universo era cuatro veces más pequeño en cada dirección, y el factor de escala valía 0,25.` },
              { id: "d", pregunta: "Una línea emitida en ultravioleta, a 121,6 nm, por ese cuásar, ¿a qué longitud de onda se observa?", tipo: "num", unidad: "nm", respuesta: 486, tol: 0.02,
                pistas: ["Multiplica por 1 + z."],
                solucion: R`$121{,}6 \times 4 = 486$ nm, en pleno visible, de color azul verdoso. Por eso los cuásares lejanos se estudian en el visible con líneas que se emitieron en el ultravioleta.` }
            ] },
          { id: "e3", nivel: 3, titulo: "La distancia de Hubble y la tensión",
            enunciado: R`<p>Usa $c = 2{,}998 \times 10^{5}$ km/s.</p>`,
            partes: [
              { id: "a", pregunta: "¿A qué distancia da la ley de Hubble una velocidad igual a c, con H₀ = 70?", tipo: "num", unidad: "Mpc", respuesta: 4283, tol: 0.02,
                pistas: ["d = c / H₀."],
                solucion: R`$\dfrac{2{,}998 \times 10^{5}}{70} = 4283$ Mpc, unos 14 000 millones de años luz. Se llama distancia de Hubble.` },
              { id: "b", pregunta: "Más allá de esa distancia, las galaxias se alejan a más de c. ¿Contradice eso la relatividad especial?", tipo: "opcion", respuesta: 2,
                opciones: ["Sí, y es un problema sin resolver", "No, porque la ley de Hubble deja de valer justo ahí", "No, porque el límite se aplica al movimiento a través del espacio, y aquí es el espacio el que crece", "Sí, pero solo para la luz"],
                pistas: ["Recuerda la diferencia entre corrimiento cosmológico y Doppler."],
                solucion: R`No la contradice. Ninguna galaxia adelanta a un rayo de luz en su propio entorno. Lo que crece es la distancia entre puntos muy alejados.` },
              { id: "c", pregunta: "Diferencia entre los dos valores de H₀, 73,0 y 67,4, en porcentaje del menor", tipo: "num", unidad: "%", respuesta: 8.3, tol: 0.03,
                pistas: ["(73,0 − 67,4) / 67,4."],
                solucion: R`$\dfrac{5{,}6}{67{,}4} = 8{,}3\,\%$. Con errores declarados del 1 % en cada medida, la discrepancia no se explica por azar.` },
              { id: "d", pregunta: "La tensión de Hubble es hoy:", tipo: "opcion", respuesta: 1,
                opciones: ["Un error ya corregido de la escalera de distancias", "Una discrepancia real entre medidas, de origen todavía desconocido", "La prueba de que el universo no se expande", "Una diferencia que entra dentro de los errores"],
                pistas: ["Compara el 8 % con el 1 %."],
                solucion: R`Es una discrepancia sin explicación aceptada. Puede ser un sistemático oculto o física nueva. Decir hoy cuál de las dos es sería ir más allá de los datos.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Tu propia constante de Hubble</h3>
<p>La tabla recoge distancias y velocidades aproximadas de ocho cúmulos de galaxias cercanos. El programa ajusta una recta que pasa por el origen.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

nombres = ["Virgo", "Fornax", "Hidra", "Centauro", "Perseo", "Leo", "Coma", "Hércules"]
d = np.array([16.5, 19, 50, 52, 73, 95, 100, 150.0])               # Mpc
v = np.array([1100, 1400, 3800, 3400, 5400, 6600, 6900, 11000.0])   # km/s

H0 = (d * v).sum() / (d * d).sum()       # mínimos cuadrados de una recta por el origen
print("H0 =", round(H0, 1), "km/s/Mpc")

Mpc_km = 3.086e19
edad = Mpc_km / H0 / 3.156e7
print("tiempo de Hubble:", f"{edad:.2e}", "años")

plt.scatter(d, v)
plt.plot(d, H0 * d)
plt.xlabel("distancia (Mpc)")
plt.ylabel("velocidad (km/s)")
plt.show()

for n, di, vi in zip(nombres, d, v):
    print(n, "se aparta de la recta", round(vi - H0 * di), "km/s")</pre></div>
<ol>
<li>La pendiente sale cerca de 72 km/s por megapársec. No le des valor a la segunda cifra: los datos están redondeados.</li>
<li>Las desviaciones son de cientos de km/s. Son los movimientos propios de cada cúmulo. Pesan mucho en los cercanos y poco en los lejanos, y por eso $H_0$ se mide lejos.</li>
<li>Quita los dos cúmulos más lejanos y repite. Verás cuánto cambia el resultado con solo seis puntos cercanos.</li>
</ol>
<h3>Espectros reales</h3>
<p>El cartografiado SDSS publica millones de espectros de galaxias en su portal SkyServer. Busca cualquier galaxia, abre su espectro y localiza la línea H$\alpha$ o las líneas H y K del calcio. Calcula $z$ a mano y compáralo con el valor que da el catálogo.</p>`,
          notas: [{ id: "hubble", label: "Tu valor de H0, cómo cambia al quitar puntos y el z que has medido en un espectro real" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Corrimiento al rojo:</strong> $z = (\lambda_\text{obs} - \lambda_\text{em})/\lambda_\text{em}$, y $1 + z = 1/a$ dice cuánto ha crecido el universo.`,
          R`<strong>Ley de Hubble:</strong> $v = H_0 d$, con $H_0 \approx 70$ km/s/Mpc. Se ve igual desde cualquier galaxia.`,
          R`<strong>Se expande el espacio.</strong> No hay centro ni borde, y no es una explosión dentro de un espacio previo.`,
          R`<strong>El tiempo de Hubble,</strong> $1/H_0$, es de unos 14 000 millones de años.`,
          R`<strong>La tensión de Hubble,</strong> 67,4 frente a 73,0, es una cuestión abierta.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 39 ───────────────────────── */
    {
      id: "leccion-39", n: 39, fase: 4, codigo: "B6.2",
      titulo: "El Big Bang y el fondo cósmico",
      sub: "Un universo que fue denso y caliente, y las tres pruebas que lo sostienen.",
      horas: "5 horas",
      contexto: "Modelo del Big Bang caliente; temperatura de la radiación T = T0 (1 + z) con T0 = 2,725 K; fondo cósmico de microondas: Penzias y Wilson (1965), cuerpo negro medido por COBE, pico en 1,06 mm y 160 GHz, 411 fotones por cm^3, densidad de energía a T^4 con a = 7,566e-16; recombinación a z = 1100, T = 3000 K, 380 000 años; anisotropías de 1e-5 y picos acústicos, primer pico a 1 grado (geometría plana); nucleosíntesis primordial: n/p = 1/7, fracción de helio Y = 2x/(1+x) = 0,25; tres pilares: expansión, fondo cósmico, abundancias; inflación como hipótesis; problema del litio.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Si el universo se expande, en el pasado todo estaba más junto. Y un gas que se comprime se calienta, como el aire en una bomba de bicicleta. Rebobinando lo suficiente, el universo tuvo que ser denso, caliente y opaco, como el interior de una estrella. Esa idea, y nada más, es el Big Bang.</p>
<p>No es una explosión en un punto del espacio. Es el estado denso y caliente de todo el espacio a la vez. Y dejó una señal que todavía se recibe.</p>
<div class="nota"><strong>Un descubrimiento hecho con una antena de telecomunicaciones.</strong> En 1964, Arno Penzias y Robert Wilson calibraban en los Laboratorios Bell una antena de bocina construida para comunicaciones por satélite. Al hacer el balance de ruido les sobraban unos 3,5 K de temperatura de antena. No dependían de la dirección, de la hora ni de la estación. Revisaron las uniones, limpiaron la bocina de excrementos de paloma y el exceso siguió ahí. Era la radiación del universo joven. Parte de la nieve de los televisores analógicos sin sintonizar, en torno a un 1 %, tenía el mismo origen.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La temperatura del universo</h3>
<p>La radiación que llena el universo tiene un espectro de cuerpo negro. Al expandirse el espacio, todas las longitudes de onda se estiran en el factor $1 + z$. Por la ley de Wien de la Lección 17, la longitud de onda del pico es inversamente proporcional a la temperatura. Si el pico estaba $1 + z$ veces más corto, la temperatura era $1 + z$ veces más alta:</p>
$$T(z) = T_0\,(1 + z)$$
<p>con $T_0 = 2{,}725$ K, la temperatura medida hoy. Un cuerpo negro que se estira sigue siendo un cuerpo negro, solo que más frío.</p>

<h3>2. El momento en que el universo se hizo transparente</h3>
<p>Por encima de unos 3000 K, el hidrógeno está ionizado. Los electrones libres dispersan la luz con mucha eficacia, y los fotones no avanzan en línea recta. El universo era una niebla brillante.</p>
<p>Al bajar de 3000 K, los electrones y los protones se unieron en átomos neutros. Este paso se llama <em>recombinación</em>. La niebla se despejó y la luz quedó libre. Ocurrió cuando</p>
$$1 + z = \frac{3000}{2{,}725} \approx 1100$$
<p>es decir, cuando el universo era 1100 veces más pequeño que hoy y tenía unos 380 000 años.</p>
<p>Esa luz ha viajado desde entonces sin obstáculos y se ha estirado 1100 veces. Salió como luz visible e infrarroja, con el pico cerca de una micra, y llega como microondas. Es el <em>fondo cósmico de microondas</em>.</p>
<p>Quizá esperabas una temperatura mayor para ionizar el hidrógeno, que necesita 13,6 eV. Ocurre lo mismo que en la Lección 26: hay más de mil millones de fotones por cada átomo, y la cola de alta energía de la distribución basta para mantener el gas ionizado hasta los 3000 K.</p>

<h3>3. El cuerpo negro más perfecto que se conoce</h3>
<p>En 1990, el satélite COBE midió el espectro completo. Coincide con la curva de Planck con tanta precisión que las barras de error no se distinguen del grosor de la línea. La temperatura es $2{,}7255 \pm 0{,}0006$ K.</p>
<p>Un espectro así solo se forma cuando la materia y la radiación están en equilibrio térmico, y eso exige un pasado denso y caliente. El modelo rival de los años cincuenta, el del estado estacionario, no tenía forma natural de producirlo y quedó descartado.</p>
<p>Algunos números de esta radiación hoy:</p>
<ul>
<li>Pico en longitud de onda: 1,06 mm.</li>
<li>Pico en frecuencia: 160 GHz. Los dos picos no corresponden a la misma onda, porque la curva por unidad de frecuencia tiene otra forma que la curva por unidad de longitud de onda.</li>
<li>411 fotones por centímetro cúbico, en todas partes.</li>
<li>Densidad de energía $u = aT^{4}$, con $a = 7{,}566 \times 10^{-16}\ \text{J}\,\text{m}^{-3}\,\text{K}^{-4}$.</li>
</ul>

<h3>4. Las pequeñas irregularidades</h3>
<p>El fondo es igual en todas direcciones con una precisión de una parte en cien mil. Las diferencias, de decenas de microkelvin, son la huella de regiones un poco más densas y un poco menos densas. De las más densas salieron después, por gravedad, las galaxias y los cúmulos.</p>
<p>Antes de la recombinación, el gas y la luz formaban un fluido que oscilaba: la gravedad lo comprimía y la presión de la radiación lo hacía rebotar. Eran ondas de sonido. La recombinación las congeló, y quedaron marcadas en el cielo como manchas con un tamaño preferente de alrededor de un grado.</p>
<p>Ese tamaño funciona como una regla de longitud conocida colocada a distancia conocida. El ángulo con que se ve depende de la geometría del espacio, igual que el tamaño aparente de un objeto cambia si lo miras a través de una lente. El valor medido, un grado, es el que corresponde a un espacio plano, en el que los ángulos de un triángulo suman 180°.</p>
<p>De la altura relativa de los picos sucesivos se deduce cuánta materia ordinaria y cuánta materia oscura hay. Es la cuarta prueba que anunciaba la Lección 37.</p>

<h3>5. Los primeros minutos</h3>
<p>Rebobinando más, a unos mil millones de kelvin el universo entero estaba a la temperatura del interior de una estrella. Durante unos minutos hubo fusión nuclear en todas partes. Se llama <em>nucleosíntesis primordial</em>.</p>
<p>En ese momento había un neutrón por cada siete protones. Prácticamente todos los neutrones acabaron dentro de núcleos de helio-4, que tiene dos protones y dos neutrones. Con eso basta para calcular cuánto helio se formó.</p>
<p>Llama $x$ al cociente entre neutrones y protones. Por cada $x$ neutrones hay 1 protón. Cada neutrón se lleva consigo un protón al helio, así que la masa que acaba en helio es $2x$, de un total de $1 + x$. La fracción de masa en helio es</p>
$$Y = \frac{2x}{1 + x}$$
<p>Con $x = 1/7$:</p>
$$Y = \frac{2/7}{8/7} = \frac{2}{8} = 0{,}25$$
<p>Un 25 % de helio y un 75 % de hidrógeno en masa, con trazas de deuterio, helio-3 y litio. Es lo que se mide en las nubes de gas menos alteradas por las estrellas. Las estrellas, en toda la historia del universo, solo han añadido unos pocos puntos más de helio.</p>
<p>La expansión enfrió el gas antes de que pudiera formarse carbono. Todo lo más pesado que el litio se hizo después, en las estrellas.</p>

<h3>6. Los tres pilares</h3>
<ol>
<li>La expansión, medida con la ley de Hubble.</li>
<li>El fondo cósmico de microondas, con su espectro de cuerpo negro.</li>
<li>Las abundancias de los elementos ligeros.</li>
</ol>
<p>Son tres medidas de naturaleza distinta que encajan con un mismo modelo. Por eso el Big Bang caliente se considera ciencia establecida.</p>

<h3>7. Lo que no está establecido</h3>
<ul>
<li><strong>La inflación.</strong> Es la hipótesis de que el universo pasó por una fase brevísima de expansión acelerada en su primera fracción de segundo. Explica por qué el fondo tiene la misma temperatura en regiones que no habrían tenido tiempo de igualarse, y por qué el espacio es plano. Encaja con los datos, pero su huella más directa, un patrón de polarización producido por ondas gravitacionales primordiales, no se ha detectado.</li>
<li><strong>El litio.</strong> El modelo predice unas tres veces más litio-7 del que se mide en las estrellas más viejas. No se sabe si falla la física nuclear, la de las estrellas o algo más profundo.</li>
<li><strong>El instante cero.</strong> El modelo describe la evolución desde un estado caliente y denso. No dice nada de un «antes», ni de por qué empezó. A densidades extremas la relatividad general deja de ser fiable y no hay todavía una teoría que la sustituya.</li>
</ul>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>El fondo cósmico, antes y ahora</h3>
<p><strong>Pico actual, con la ley de Wien</strong> ($\lambda_\text{máx} T = 2{,}898 \times 10^{-3}\ \text{m}\cdot\text{K}$):</p>
$$\lambda_\text{máx} = \frac{2{,}898 \times 10^{-3}}{2{,}725} = 1{,}06 \times 10^{-3}\ \text{m} = 1{,}06\ \text{mm}$$
<p><strong>Temperatura en la recombinación,</strong> $z = 1100$:</p>
$$T = 2{,}725 \times 1101 = 3000\ \text{K}$$
<p><strong>Pico en aquel momento:</strong></p>
$$\lambda_\text{máx} = \frac{2{,}898 \times 10^{-3}}{3000} = 9{,}66 \times 10^{-7}\ \text{m} = 966\ \text{nm}$$
<p>Infrarrojo cercano, con mucha luz visible. El universo entero brillaba con el color anaranjado de una estrella de tipo M.</p>
<p><strong>Comprobación:</strong> $966\ \text{nm} \times 1101 = 1{,}06$ mm. El estiramiento de la onda y el enfriamiento son la misma cosa.</p>
<h3>Cuánto pesa esa luz</h3>
<p><strong>Densidad de energía hoy:</strong></p>
$$u = aT^{4} = 7{,}566 \times 10^{-16} \times (2{,}725)^{4} = 7{,}566 \times 10^{-16} \times 55{,}14 = 4{,}17 \times 10^{-14}\ \text{J/m}^{3}$$
<p><strong>Masa equivalente,</strong> dividiendo entre $c^{2}$:</p>
$$\frac{4{,}17 \times 10^{-14}}{8{,}988 \times 10^{16}} = 4{,}6 \times 10^{-31}\ \text{kg/m}^{3}$$
<p>Es unas veinte mil veces menos que la densidad total del universo, que calcularás en la próxima lección. Hoy la radiación apenas cuenta. Pero su densidad crece hacia el pasado como $(1+z)^{4}$ y la de la materia como $(1+z)^{3}$, así que antes de $z \approx 3400$ dominaba la radiación.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "La temperatura del cielo",
            enunciado: R`<p>Usa $T(z) = 2{,}725\,(1 + z)$ y la ley de Wien, $\lambda_\text{máx}T = 2{,}898 \times 10^{-3}\ \text{m}\cdot\text{K}$.</p>`,
            partes: [
              { id: "a", pregunta: "Temperatura del fondo cósmico cuando salió la luz de una galaxia con z = 9", tipo: "num", unidad: "K", respuesta: 27.25, tol: 0.02,
                errores: [{ v: 24.5, msg: "El factor es 1 + z, que aquí vale 10." }],
                pistas: ["Multiplica 2,725 por 1 + z."],
                solucion: R`$2{,}725 \times 10 = 27{,}25$ K.` },
              { id: "b", pregunta: "Longitud de onda del pico a esa temperatura", tipo: "num", unidad: "mm", respuesta: 0.106, tol: 0.02,
                pistas: ["Ley de Wien, y pasa de metros a milímetros."],
                solucion: R`$\dfrac{2{,}898 \times 10^{-3}}{27{,}25} = 1{,}06 \times 10^{-4}$ m $= 0{,}106$ mm, diez veces menor que hoy.` },
              { id: "c", pregunta: "El universo se volvió transparente cuando:", tipo: "opcion", respuesta: 1,
                opciones: ["Se formaron las primeras estrellas", "Los electrones y los protones formaron átomos neutros", "La radiación se convirtió en microondas", "Terminó la fusión nuclear"],
                pistas: ["¿Qué partículas dispersan la luz con más eficacia?"],
                solucion: R`En la recombinación. Sin electrones libres, los fotones dejaron de dispersarse.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Los primeros minutos",
            enunciado: R`<p>La fracción de masa en helio es $Y = 2x/(1 + x)$, con $x$ el cociente entre neutrones y protones.</p>`,
            partes: [
              { id: "a", pregunta: "Corrimiento al rojo al que la temperatura era de 10⁹ K", tipo: "sci", unidad: "", respuesta: 3.67e8, tol: 0.02,
                pistas: ["1 + z = T / 2,725. El 1 es despreciable."],
                solucion: R`$1 + z = \dfrac{10^{9}}{2{,}725} = 3{,}67 \times 10^{8}$. El universo era cientos de millones de veces más pequeño.` },
              { id: "b", pregunta: "Fracción de helio que habría resultado con un neutrón por cada cinco protones", tipo: "num", unidad: "", respuesta: 0.333, tol: 0.02,
                errores: [{ v: 0.4, msg: "Has calculado 2x. Falta dividir entre 1 + x." }],
                pistas: ["x = 0,2.", "Y = 0,4 / 1,2."],
                solucion: R`$Y = \dfrac{0{,}4}{1{,}2} = 0{,}333$. La fracción medida, 0,25, fija el cociente en 1/7, y ese cociente depende del ritmo de expansión en aquel momento. Por eso el helio es una prueba tan exigente.` },
              { id: "c", pregunta: "¿Cuál de estos elementos NO se formó en el Big Bang?", tipo: "opcion", respuesta: 3,
                opciones: ["Helio-4", "Deuterio", "Litio-7", "Carbono-12"],
                pistas: ["Recuerda la Lección 30: ¿qué hace falta para fabricarlo?"],
                solucion: R`El carbono exige que choquen tres núcleos de helio casi a la vez, y eso necesita mucha densidad durante mucho tiempo. Solo ocurre en las estrellas.` }
            ] },
          { id: "e3", nivel: 3, titulo: "El balance de la antena",
            enunciado: R`<p>Hoy el fondo cósmico tiene una densidad de energía de $4{,}17 \times 10^{-14}\ \text{J/m}^{3}$ y 411 fotones por centímetro cúbico. Datos: $1\ \text{eV} = 1{,}602 \times 10^{-19}$ J.</p>`,
            partes: [
              { id: "a", pregunta: "Energía media de un fotón del fondo, en eV", tipo: "sci", unidad: "eV", respuesta: 6.34e-4, tol: 0.03,
                errores: [{ v: 634, msg: "Hay 4,11 × 10⁸ fotones por metro cúbico, no 411." }],
                pistas: ["Fotones por metro cúbico: 411 × 10⁶.", "Divide la densidad de energía entre ese número y pasa a eV."],
                solucion: R`$\dfrac{4{,}17 \times 10^{-14}}{4{,}11 \times 10^{8}} = 1{,}01 \times 10^{-22}$ J $= 6{,}3 \times 10^{-4}$ eV. Es miles de veces menos que un fotón visible.` },
              { id: "b", pregunta: "Densidad de energía cuando z = 1100, sabiendo que crece como (1 + z)⁴", tipo: "sci", unidad: "J/m³", respuesta: 0.0613, tol: 0.04,
                pistas: ["1101⁴ = 1,469 × 10¹²."],
                solucion: R`$4{,}17 \times 10^{-14} \times 1{,}469 \times 10^{12} = 0{,}061\ \text{J/m}^{3}$. Un factor $(1+z)^{3}$ viene de que había más fotones por unidad de volumen y el otro de que cada fotón tenía más energía.` },
              { id: "c", pregunta: "A Penzias y Wilson les sobraban 3,5 K que no cambiaban con la dirección ni con la hora. ¿Por qué eso descartaba un origen en la Vía Láctea?", tipo: "opcion", respuesta: 0,
                opciones: ["Porque la galaxia es un disco, y su emisión se concentra en una banda del cielo", "Porque la galaxia no emite en microondas", "Porque 3,5 K es demasiado frío para cualquier fuente", "Porque la antena no apuntaba a la galaxia"],
                pistas: ["Piensa en cómo se ve la Vía Láctea en el cielo."],
                solucion: R`Una fuente galáctica se vería más intensa hacia el plano de la galaxia. Una señal igual en todas direcciones tiene que venir de mucho más lejos, o del propio equipo, y eso último lo descartaron pieza a pieza.` },
              { id: "d", pregunta: "¿Cuál de estas afirmaciones es una hipótesis todavía sin confirmar?", tipo: "opcion", respuesta: 2,
                opciones: ["El universo fue denso y caliente", "El fondo cósmico tiene espectro de cuerpo negro", "Hubo una fase de inflación en la primera fracción de segundo", "Una cuarta parte de la masa ordinaria es helio primordial"],
                pistas: ["Tres están medidas. Una explica bien los datos, pero le falta su prueba directa."],
                solucion: R`La inflación. Es la explicación preferida de varias propiedades del universo, pero su predicción más característica no se ha observado.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>El espectro del fondo cósmico</h3>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

h = 6.626e-34
k = 1.381e-23
c = 2.998e8

def planck(nu, T):
    return 2 * h * nu**3 / c**2 / (np.exp(h * nu / (k * T)) - 1)

nu = np.linspace(1e9, 8e11, 4000)            # de 1 a 800 GHz
B = planck(nu, 2.725)

print("pico en", round(nu[B.argmax()] / 1e9), "GHz")

plt.plot(nu / 1e9, B)
for f, nombre in [(4.08, "Penzias y Wilson"), (12, "TV por satélite"), (100, "Planck")]:
    plt.axvline(f, linestyle="--")
    print(nombre, ":", f, "GHz, intensidad relativa al pico", round(float(planck(f * 1e9, 2.725) / B.max()), 4))
plt.xlabel("frecuencia (GHz)")
plt.ylabel("intensidad")
plt.show()

for z in [0, 1, 9, 1100, 3.67e8]:
    print("z =", z, " T =", f"{2.725 * (1 + z):.3g}", "K")</pre></div>
<ol>
<li>El pico sale en 160 GHz.</li>
<li>Penzias y Wilson midieron a 4,08 GHz, muy lejos del pico, en la parte de la curva donde la intensidad crece con el cuadrado de la frecuencia. Con un solo punto no podían saber que era un cuerpo negro. Hicieron falta veinticinco años y un satélite para medir la curva entera.</li>
<li>La atmósfera es opaca en buena parte del intervalo cercano al pico. Por eso las medidas de precisión se hacen desde el espacio, desde globos o desde la Antártida.</li>
</ol>
<h3>El mapa del satélite Planck</h3>
<p>Abre el visor ESASky, de la Agencia Espacial Europea, y entre los mapas de todo el cielo elige los de la misión Planck. En las frecuencias bajas y altas domina la banda de la Vía Láctea. Cerca de 100 y 143 GHz, lejos del plano galáctico, se ve el granulado del fondo cósmico. Las manchas más frecuentes miden alrededor de un grado, el doble de la Luna llena.</p>`,
          notas: [{ id: "cmb", label: "Qué has visto en los mapas de Planck a distintas frecuencias" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>El universo fue denso y caliente.</strong> La temperatura de su radiación es $T = 2{,}725\,(1+z)$ K.`,
          R`<strong>El fondo cósmico de microondas</strong> es la luz liberada a $z = 1100$, cuando se formaron los átomos, a los 380 000 años.`,
          R`<strong>Su espectro es un cuerpo negro casi perfecto</strong> y sus irregularidades, de una parte en cien mil, indican un espacio plano.`,
          R`<strong>En los primeros minutos se formó el helio:</strong> $Y = 2x/(1+x) = 0{,}25$ con un neutrón por cada siete protones.`,
          R`<strong>Expansión, fondo cósmico y abundancias</strong> son los tres pilares. La inflación y el instante inicial siguen siendo hipótesis.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 40 ───────────────────────── */
    {
      id: "leccion-40", n: 40, fase: 4, codigo: "B6.3",
      titulo: "Energía oscura y preguntas abiertas",
      sub: "De qué está hecho el universo, qué edad tiene, hacia dónde va y qué no sabemos todavía.",
      horas: "5 horas",
      contexto: "Ecuación de Friedmann deducida con energía newtoniana; densidad crítica rho_c = 3 H0^2 / (8 pi G) = 9,2e-27 kg/m^3 para H0 = 70 (5,5 átomos de hidrógeno por m^3); parámetros de densidad Omega; modelo Lambda-CDM (Planck 2018): H0 = 67,4, Omega_m = 0,315 (bariones 0,049, materia oscura 0,266), Omega_Lambda = 0,685, edad 13,8 mil millones de años; supernovas Ia y expansión acelerada (1998); edad t0 = 2/(3 H0 raíz(Omega_L)) asinh(raíz(Omega_L/Omega_m)); universo solo de materia: 2/(3 H0); igualdad materia-energía oscura a z = 0,3 e inicio de la aceleración a z = 0,63; destino; cuestiones abiertas: naturaleza de la energía oscura, indicios de DESI de que cambia con el tiempo, tensión de Hubble, problema de la constante cosmológica, galaxias tempranas del James Webb.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Lanza una piedra hacia arriba. Si va más lenta que la velocidad de escape, vuelve. Si va más rápida, se aleja para siempre, cada vez más despacio. En los dos casos la gravedad la frena. Con el universo se esperaba lo mismo: la expansión debía ir frenándose por la atracción de toda la materia, y la única duda era cuánto.</p>
<p>En 1998 se midió el frenado y salió con el signo contrario. La expansión se acelera. Es como lanzar la piedra y ver que, pasada cierta altura, sube cada vez más rápido.</p>
<div class="nota"><strong>El balance final.</strong> La materia de la que estamos hechos es el 5 % del contenido del universo. Otro 26 % es materia oscura. El 69 % restante es lo que causa la aceleración, y se llama <em>energía oscura</em>. El nombre es una etiqueta para algo que se mide bien y no se entiende.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La ecuación de la expansión</h3>
<p>Se puede deducir lo esencial con la mecánica de la Fase 1. Toma una esfera de radio $r$ dentro de un universo de densidad uniforme $\rho$, y una galaxia de masa $m$ en su borde.</p>
<p><strong>Paso 1.</strong> Como en la Lección 36, solo atrae la masa interior a la esfera:</p>
$$M = \frac{4}{3}\pi r^{3}\rho$$
<p><strong>Paso 2.</strong> La galaxia se aleja con la velocidad de la ley de Hubble, $v = Hr$. Su energía total es la cinética más la potencial:</p>
$$E = \frac{1}{2}mv^{2} - \frac{GMm}{r}$$
<p><strong>Paso 3.</strong> Se sustituyen $v$ y $M$:</p>
$$E = \frac{1}{2}mH^{2}r^{2} - \frac{4}{3}\pi G\rho\,m\,r^{2}$$
<p><strong>Paso 4.</strong> El caso límite, el de la piedra lanzada justo a la velocidad de escape, es $E = 0$. Se igualan los dos términos y se cancelan $m$ y $r^{2}$:</p>
$$\frac{1}{2}H^{2} = \frac{4}{3}\pi G\rho$$
<p><strong>Paso 5.</strong> Se despeja la densidad:</p>
$$\rho_c = \frac{3H^{2}}{8\pi G}$$
<p>Es la <em>densidad crítica</em>. La relatividad general da la misma ecuación, que se llama de Friedmann, y le añade un significado geométrico: si la densidad total es igual a la crítica, el espacio es plano. Si es mayor, tiene curvatura positiva, como la superficie de una esfera. Si es menor, negativa, como una silla de montar.</p>

<h3>2. Los parámetros de densidad</h3>
<p>Cada componente del universo se expresa como fracción de la densidad crítica, con la letra $\Omega$:</p>
$$\Omega = \frac{\rho}{\rho_c}$$
<p>El fondo cósmico indica que el espacio es plano, así que la suma de todas las $\Omega$ tiene que ser 1, con una precisión mejor que el 1 %.</p>

<h3>3. El hallazgo de 1998</h3>
<p>Dos equipos independientes midieron supernovas de tipo Ia lejanas, hasta $z \approx 0{,}8$, para ver cuánto se había frenado la expansión. Como todas tienen casi la misma luminosidad, su brillo aparente da la distancia, y su corrimiento al rojo da cuánto ha crecido el universo desde que explotaron.</p>
<p>Las encontraron entre un 10 y un 25 % más débiles de lo previsto en un universo que se frena. Estaban más lejos. La expansión había sido más lenta en el pasado que ahora.</p>
<p>La comunidad lo aceptó deprisa porque el dato encajaba con otros dos. La materia total medida en cúmulos sumaba solo un 30 % de la densidad crítica, y el fondo cósmico pedía un 100 %. Faltaba un 70 % que no se agrupaba en galaxias. Tres medidas distintas señalaban el mismo hueco.</p>

<h3>4. Qué es la energía oscura</h3>
<p>La descripción más sencilla es la <em>constante cosmológica</em>, $\Lambda$, un término que Einstein introdujo en sus ecuaciones en 1917 y luego retiró. Equivale a una densidad de energía propia del espacio vacío, que no se diluye cuando el espacio crece. Cada metro cúbico nuevo trae la suya.</p>
<p>Una energía así tiene presión negativa, y en relatividad general la presión también cuenta como fuente de gravedad. El resultado neto es repulsivo.</p>
<p>La materia se diluye como $(1+z)^{3}$ y la constante cosmológica no cambia. En el pasado dominaba la materia y la expansión se frenaba. Hace unos seis mil millones de años la balanza se invirtió.</p>

<h3>5. El modelo estándar de la cosmología</h3>
<p>Se llama $\Lambda$CDM, por la constante cosmológica y la materia oscura fría, <em>cold dark matter</em>. Con seis parámetros ajusta el fondo cósmico, las supernovas, la distribución de galaxias y las abundancias de elementos ligeros.</p>
<div class="tabla"><table>
<thead><tr><th>Parámetro</th><th>Valor (Planck, 2018)</th></tr></thead>
<tbody>
<tr><td>Constante de Hubble, $H_0$</td><td>67,4 km/s/Mpc</td></tr>
<tr><td>Materia total, $\Omega_m$</td><td>0,315</td></tr>
<tr><td>de ella, materia ordinaria</td><td>0,049</td></tr>
<tr><td>de ella, materia oscura</td><td>0,266</td></tr>
<tr><td>Energía oscura, $\Omega_\Lambda$</td><td>0,685</td></tr>
<tr><td>Edad del universo</td><td>13 800 millones de años</td></tr>
</tbody></table></div>

<h3>6. La edad del universo</h3>
<p>Para saber la edad hay que sumar el tiempo que tardó el universo en pasar por cada tamaño, y eso depende de lo que contiene.</p>
<ul>
<li><strong>Solo materia, con la densidad crítica.</strong> La expansión se frena siempre, así que antes era más rápida y se tardó menos en llegar al tamaño actual. El resultado es $t_0 = \dfrac{2}{3}\,\dfrac{1}{H_0}$.</li>
<li><strong>Materia y constante cosmológica, espacio plano.</strong> La integral tiene solución exacta:</li>
</ul>
$$t_0 = \frac{1}{H_0}\cdot\frac{2}{3\sqrt{\Omega_\Lambda}}\;\text{asinh}\!\left(\sqrt{\frac{\Omega_\Lambda}{\Omega_m}}\right)$$
<p>La función $\text{asinh}$ es el seno hiperbólico inverso. Se calcula con logaritmos: $\text{asinh}(x) = \ln\!\left(x + \sqrt{x^{2} + 1}\right)$. No hace falta saber de dónde sale la fórmula. La práctica hace la misma suma de forma numérica y comprueba que coincide.</p>
<p>Con los valores medidos, el frenado inicial y la aceleración posterior casi se compensan, y la edad resulta muy parecida al tiempo de Hubble. Es una coincidencia de nuestra época.</p>

<h3>7. El destino</h3>
<p>Si la energía oscura es de verdad constante, la expansión seguirá acelerándose. Las galaxias que no estén ligadas a la nuestra por gravedad se alejarán hasta que su luz deje de llegar. Dentro de unos cien mil millones de años, desde aquí solo se vería la galaxia resultante del Grupo Local. Las estrellas se irán apagando a lo largo de billones de años.</p>
<p>Esta predicción depende por completo de cómo se comporte la energía oscura en el futuro, y eso no se sabe.</p>

<h3>8. Lo que no sabemos</h3>
<ul>
<li><strong>Qué es la energía oscura.</strong> La física cuántica predice una energía del vacío, pero las estimaciones directas dan un valor mayor que el medido en decenas de órdenes de magnitud. Es el desacuerdo más grande entre una predicción y una medida en toda la física.</li>
<li><strong>Si es constante.</strong> Entre 2024 y 2025, el cartografiado DESI, combinado con supernovas y con el fondo cósmico, encontró indicios de que la energía oscura podría debilitarse con el tiempo. La significación estadística no alcanza todavía el umbral de un descubrimiento. Si se confirmara, la constante cosmológica quedaría descartada.</li>
<li><strong>La tensión de Hubble,</strong> que ya conoces.</li>
<li><strong>Qué es la materia oscura.</strong></li>
<li><strong>Las galaxias tempranas.</strong> El telescopio James Webb ha encontrado galaxias más brillantes y abundantes de lo esperado en los primeros quinientos millones de años. Se discute si exige cambiar el modelo o solo la forma en que suponemos que se formaban las primeras estrellas.</li>
<li><strong>Los primeros instantes.</strong> La inflación, y cualquier cosa anterior.</li>
</ul>
<p>El satélite Euclid y el Observatorio Vera Rubin, que empezaron a tomar datos entre 2023 y 2025, están diseñados para estas preguntas. Es muy probable que parte de esta sección se quede anticuada mientras sigues el curso.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La densidad del universo</h3>
<p>Con $H_0 = 70$ km/s/Mpc, que en el SI son $2{,}268 \times 10^{-18}\ \text{s}^{-1}$ (Lección 38).</p>
<p><strong>Numerador:</strong></p>
$$3H_0^{2} = 3 \times (2{,}268 \times 10^{-18})^{2} = 3 \times 5{,}144 \times 10^{-36} = 1{,}543 \times 10^{-35}\ \text{s}^{-2}$$
<p><strong>Denominador:</strong></p>
$$8\pi G = 8 \times 3{,}1416 \times 6{,}674 \times 10^{-11} = 1{,}677 \times 10^{-9}$$
<p><strong>Densidad crítica:</strong></p>
$$\rho_c = \frac{1{,}543 \times 10^{-35}}{1{,}677 \times 10^{-9}} = 9{,}20 \times 10^{-27}\ \text{kg/m}^{3}$$
<p><strong>En átomos de hidrógeno,</strong> de masa $1{,}673 \times 10^{-27}$ kg:</p>
$$\frac{9{,}20 \times 10^{-27}}{1{,}673 \times 10^{-27}} = 5{,}5\ \text{átomos por metro cúbico}$$
<p>El mejor vacío de laboratorio tiene miles de millones de veces más. Y de esos 5,5, solo el 5 % son átomos de verdad: uno cada cuatro metros cúbicos.</p>
<h3>La edad</h3>
<p>Con $\Omega_m = 0{,}3$, $\Omega_\Lambda = 0{,}7$ y $1/H_0 = 13{,}97$ miles de millones de años.</p>
<p><strong>Argumento de la función:</strong> $\sqrt{0{,}7/0{,}3} = \sqrt{2{,}333} = 1{,}528$.</p>
<p><strong>Seno hiperbólico inverso:</strong></p>
$$\text{asinh}(1{,}528) = \ln\!\left(1{,}528 + \sqrt{2{,}333 + 1}\right) = \ln(1{,}528 + 1{,}826) = \ln(3{,}354) = 1{,}210$$
<p><strong>Factor:</strong></p>
$$\frac{2}{3\sqrt{0{,}7}} \times 1{,}210 = \frac{2}{3 \times 0{,}8367} \times 1{,}210 = 0{,}964$$
<p><strong>Edad:</strong></p>
$$t_0 = 13{,}97 \times 0{,}964 = 13{,}5\ \text{miles de millones de años}$$
<p>Con solo materia habrían salido $13{,}97 \times 2/3 = 9{,}3$, menos que la edad de las estrellas más viejas. Ese problema de edades era conocido antes de 1998, y la energía oscura lo resolvió de paso.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "El contenido del universo",
            enunciado: R`<p>Usa $\rho_c = 3H_0^{2}/(8\pi G)$ con el valor de Planck, $H_0 = 67{,}4$ km/s/Mpc $= 2{,}184 \times 10^{-18}\ \text{s}^{-1}$, y $8\pi G = 1{,}677 \times 10^{-9}$.</p>`,
            partes: [
              { id: "a", pregunta: "Densidad crítica", tipo: "sci", unidad: "kg/m³", respuesta: 8.53e-27, tol: 0.03,
                errores: [{ v: 3.91e-9, msg: "H₀ va al cuadrado." }],
                pistas: ["H₀² = 4,770 × 10⁻³⁶.", "Multiplica por 3 y divide entre 1,677 × 10⁻⁹."],
                solucion: R`$\dfrac{3 \times 4{,}770 \times 10^{-36}}{1{,}677 \times 10^{-9}} = 8{,}53 \times 10^{-27}\ \text{kg/m}^{3}$.` },
              { id: "b", pregunta: "Átomos de hidrógeno por metro cúbico que corresponden a la materia ordinaria, con Ω = 0,049", tipo: "num", unidad: "átomos/m³", respuesta: 0.25, tol: 0.04,
                errores: [{ v: 5.1, msg: "Ese es el equivalente de la densidad total. Falta multiplicar por 0,049." }],
                pistas: ["Multiplica la densidad crítica por 0,049.", "Divide entre 1,673 × 10⁻²⁷ kg."],
                solucion: R`$0{,}049 \times 8{,}53 \times 10^{-27} = 4{,}18 \times 10^{-28}\ \text{kg/m}^{3}$, que son 0,25 átomos por metro cúbico.` },
              { id: "c", pregunta: "Ordena los componentes del universo de mayor a menor contribución:", tipo: "opcion", respuesta: 2,
                opciones: ["Materia ordinaria, materia oscura, energía oscura", "Materia oscura, energía oscura, materia ordinaria", "Energía oscura, materia oscura, materia ordinaria", "Energía oscura, materia ordinaria, materia oscura"],
                pistas: ["69 %, 26 % y 5 %."],
                solucion: R`Energía oscura (68,5 %), materia oscura (26,6 %) y materia ordinaria (4,9 %).` }
            ] },
          { id: "e2", nivel: 2, titulo: "Un universo solo de materia",
            enunciado: R`<p>Toma $1/H_0 = 13{,}97$ miles de millones de años, que corresponde a $H_0 = 70$.</p>`,
            partes: [
              { id: "a", pregunta: "Edad de un universo plano que solo contiene materia", tipo: "num", unidad: "× 10⁹ años", respuesta: 9.31, tol: 0.02,
                pistas: ["t₀ = (2/3) × 1/H₀."],
                solucion: R`$\dfrac{2}{3} \times 13{,}97 = 9{,}31$ miles de millones de años.` },
              { id: "b", pregunta: "¿Por qué ese resultado era un problema?", tipo: "opcion", respuesta: 0,
                opciones: ["Los cúmulos globulares más viejos tienen unos 13 000 millones de años", "El Sol tiene 4600 millones de años", "La luz no habría tenido tiempo de cruzar la galaxia", "El fondo cósmico sería demasiado frío"],
                pistas: ["Nada puede ser más viejo que el universo que lo contiene."],
                solucion: R`Las edades de las estrellas más viejas, obtenidas con el diagrama H-R, superaban la del universo. La física estelar y la cosmología no podían tener razón a la vez.` },
              { id: "c", pregunta: "La densidad de materia crece hacia el pasado como (1 + z)³ y la de energía oscura no cambia. Con Ωm = 0,31 y ΩΛ = 0,69, ¿a qué z eran iguales?", tipo: "num", unidad: "", respuesta: 0.306, tol: 0.05,
                pistas: ["Plantea 0,31 × (1 + z)³ = 0,69.", "(1 + z)³ = 2,226. Haz la raíz cúbica."],
                solucion: R`$(1+z)^{3} = \dfrac{0{,}69}{0{,}31} = 2{,}226$, así que $1 + z = 1{,}306$ y $z = 0{,}31$. En términos cósmicos, ayer.` }
            ] },
          { id: "e3", nivel: 3, titulo: "La edad, con los datos de Planck",
            enunciado: R`<p>Datos: $\Omega_m = 0{,}315$, $\Omega_\Lambda = 0{,}685$ y $1/H_0 = 14{,}51$ miles de millones de años. Recuerda que $\text{asinh}(x) = \ln(x + \sqrt{x^{2}+1})$.</p>`,
            partes: [
              { id: "a", pregunta: "Edad del universo", tipo: "num", unidad: "× 10⁹ años", respuesta: 13.8, tol: 0.015,
                errores: [{ v: 9.67, msg: "Esa es la edad con solo materia. Usa la fórmula con el asinh." }],
                pistas: ["√(0,685/0,315) = 1,475, y su asinh vale 1,181.", "Factor: 2 × 1,181 / (3 × 0,8276) = 0,951."],
                solucion: R`$\text{asinh}(1{,}475) = \ln(1{,}475 + 1{,}782) = 1{,}181$. Factor: $\dfrac{2 \times 1{,}181}{3 \times 0{,}8276} = 0{,}951$. Edad: $14{,}51 \times 0{,}951 = 13{,}8$ miles de millones de años.` },
              { id: "b", pregunta: "La expansión empezó a acelerarse cuando la densidad de materia bajó al doble de la de energía oscura. ¿A qué z ocurrió?", tipo: "num", unidad: "", respuesta: 0.632, tol: 0.05,
                errores: [{ v: 0.296, msg: "Ese es el z en que las dos densidades son iguales. Aquí la de materia es el doble." }],
                pistas: ["0,315 × (1 + z)³ = 2 × 0,685.", "(1 + z)³ = 4,349."],
                solucion: R`$(1+z)^{3} = \dfrac{1{,}37}{0{,}315} = 4{,}349$, así que $1 + z = 1{,}632$ y $z = 0{,}63$. El factor 2 aparece porque la presión negativa de la energía oscura cuenta dos veces en contra de su propia atracción.` },
              { id: "c", pregunta: "Los indicios de que la energía oscura cambia con el tiempo son hoy:", tipo: "opcion", respuesta: 1,
                opciones: ["Un resultado confirmado que ha sustituido al modelo estándar", "Un indicio serio que todavía no alcanza el umbral de un descubrimiento", "Un error instrumental ya identificado", "Una especulación sin datos detrás"],
                pistas: ["Hay datos, de varios instrumentos. Falta significación."],
                solucion: R`Es un indicio. Hay que esperar a más datos de DESI, Euclid y el Observatorio Rubin antes de darlo por bueno o descartarlo.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>La historia de la expansión</h3>
<p>La primera parte usa el módulo de cosmología de astropy. La segunda hace la suma a mano, para que veas que no hay nada oculto. El módulo necesita tener instalado scipy. Si da error al importar, ejecuta <code>pip install scipy</code>.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt
from astropy.cosmology import Planck18

print("edad hoy:", Planck18.age(0))
for z in [0.3, 0.63, 1, 3, 10, 1100]:
    print("z =", z, " edad entonces:", Planck18.age(z), " hace:", Planck18.lookback_time(z))

# a mano: tiempo = suma de da / (a H), con H en unidades de H0
def historia(Om, OL, N=200000):
    a = (np.arange(N) + 0.5) / N
    H = np.sqrt(Om / a**3 + OL + (1 - Om - OL) / a**2)
    t = np.cumsum(1 / (a * H)) / N
    return t, a

T_H = 14.51                                   # 1/H0 en miles de millones de años, para 67,4
modelos = [(0.315, 0.685, "materia y energía oscura"),
           (1.0, 0.0, "solo materia, densidad crítica"),
           (0.315, 0.0, "solo materia, poca densidad")]

for Om, OL, nombre in modelos:
    t, a = historia(Om, OL)
    print(nombre, ": edad", round(t[-1] * T_H, 2))
    plt.plot((t - t[-1]) * T_H, a, label=nombre)

plt.xlabel("tiempo respecto a hoy (miles de millones de años)")
plt.ylabel("factor de escala")
plt.legend()
plt.show()</pre></div>
<ol>
<li>La edad calculada a mano para el primer modelo coincide con la de astropy y con tu ejercicio 3.</li>
<li>Las tres curvas pasan por el mismo punto hoy, con la misma pendiente, porque comparten $H_0$. Se diferencian en el pasado.</li>
<li>La curva con energía oscura tiene un cambio de curvatura: primero se frena y después se acelera. Localízalo y compáralo con el $z = 0{,}63$ del ejercicio.</li>
</ol>
<h3>Lectura de actualidad</h3>
<p>Busca la última nota de prensa de DESI o de Euclid sobre energía oscura. Identifica qué midieron, con qué nivel de significación y si los autores hablan de indicio o de descubrimiento.</p>`,
          notas: [{ id: "expansion", label: "Las tres edades que te han salido y lo que has leído sobre la energía oscura" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Densidad crítica:</strong> $\rho_c = 3H_0^{2}/(8\pi G)$, unos cinco átomos de hidrógeno por metro cúbico. El universo la tiene, y su espacio es plano.`,
          R`<strong>El contenido:</strong> 5 % de materia ordinaria, 26 % de materia oscura y 69 % de energía oscura.`,
          R`<strong>La expansión se acelera</strong> desde hace unos seis mil millones de años. Se descubrió en 1998 con supernovas de tipo Ia.`,
          R`<strong>La edad del universo es de 13 800 millones de años.</strong>`,
          R`<strong>No se sabe qué son</strong> la energía oscura ni la materia oscura, ni si la primera es constante.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 41 ───────────────────────── */
    {
      id: "leccion-41", n: 41, fase: 4, codigo: "Repaso acumulativo",
      titulo: "Repaso de la Fase 4",
      sub: "La galaxia M87 como hilo conductor: de su agujero negro al cúmulo que la rodea y al universo en expansión.",
      horas: "4 horas",
      contexto: "Repaso de la Fase 4: factor de Lorentz, radio de Schwarzschild 2,95 km por masa solar, sombra de 5,2 r_s, luminosidad de acreción L = eta m_punto c^2, frecuencia de la onda gravitacional igual al doble de la orbital, masa M = v^2 r / G, masa del virial 5 sigma^2 R / G, ley de Hubble v = H0 d, 1 + z = 1/a, T = 2,725 (1 + z), densidad crítica 3 H0^2 / (8 pi G). Datos de M87: distancia 16,8 Mpc, agujero negro de 6,5e9 masas solares, velocidad de alejamiento 1284 km/s.",
      secciones: [
        { id: "mapa", titulo: "Mapa de ideas", html: R`
<p class="lead">En esta fase has pasado de un reloj en un satélite al universo entero. Has usado dos teorías nuevas, la relatividad especial y la general, y has llegado a la frontera de lo que se sabe.</p>
<div class="tabla"><table>
<thead><tr><th>Idea</th><th>Fórmula</th><th>Lección</th></tr></thead>
<tbody>
<tr><td>Factor de Lorentz</td><td>$\gamma = 1/\sqrt{1 - v^{2}/c^{2}}$</td><td>33</td></tr>
<tr><td>Energía relativista</td><td>$E = \gamma mc^{2}$</td><td>33</td></tr>
<tr><td>Radio de Schwarzschild</td><td>$r_s = 2GM/c^{2}$, 2,95 km por masa solar</td><td>34</td></tr>
<tr><td>Desviación de la luz</td><td>$\alpha = 4GM/(c^{2}b)$</td><td>34</td></tr>
<tr><td>Luminosidad de acreción</td><td>$L = \eta\,\dot m\,c^{2}$</td><td>35</td></tr>
<tr><td>Onda gravitacional</td><td>$h = \Delta L/L$, con frecuencia doble de la orbital</td><td>35</td></tr>
<tr><td>Masa interior a una órbita</td><td>$M = v^{2}r/G$</td><td>36</td></tr>
<tr><td>Masa del virial</td><td>$M = 5\sigma^{2}R/G$</td><td>37</td></tr>
<tr><td>Ley de Hubble</td><td>$v = H_0 d$</td><td>38</td></tr>
<tr><td>Factor de escala</td><td>$1 + z = 1/a$</td><td>38</td></tr>
<tr><td>Temperatura de la radiación</td><td>$T = 2{,}725\,(1+z)$ K</td><td>39</td></tr>
<tr><td>Helio primordial</td><td>$Y = 2x/(1+x)$</td><td>39</td></tr>
<tr><td>Densidad crítica</td><td>$\rho_c = 3H_0^{2}/(8\pi G)$</td><td>40</td></tr>
</tbody></table></div>
<p>La fase tiene también una segunda lista, tan importante como la primera: la de lo que no se sabe. La naturaleza de la materia oscura y de la energía oscura, la tensión de Hubble, la inflación y lo que ocurre dentro de un agujero negro. Saber dónde termina el conocimiento firme es parte de entender la materia.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "r1", nivel: 2, titulo: "El agujero negro de M87",
            enunciado: R`<p>M87 es una galaxia elíptica gigante a 16,8 Mpc. Su agujero negro central tiene $6{,}5 \times 10^{9}$ masas solares y fue el primero del que se obtuvo una imagen, en 2019. Datos: $1\ \text{UA} = 1{,}496 \times 10^{8}$ km, $1\ \text{Mpc} = 3{,}086 \times 10^{22}$ m, $M_\odot = 1{,}989 \times 10^{30}$ kg, $1\ \text{año} = 3{,}156 \times 10^{7}$ s.</p>`,
            partes: [
              { id: "a", pregunta: "Radio de Schwarzschild, en unidades astronómicas", tipo: "num", unidad: "UA", respuesta: 128, tol: 0.03,
                pistas: ["2,95 km por cada masa solar.", "Divide los kilómetros entre 1,496 × 10⁸."],
                solucion: R`$2{,}95 \times 6{,}5 \times 10^{9} = 1{,}92 \times 10^{10}$ km $= 128$ UA. Cuatro veces la órbita de Neptuno.` },
              { id: "b", pregunta: "Diámetro angular de la sombra, de 5,2 radios de Schwarzschild, en microsegundos de arco", tipo: "num", unidad: "μas", respuesta: 39.7, tol: 0.04,
                pistas: ["Tamaño: 5,2 × 1,92 × 10¹³ m. Distancia: 16,8 × 3,086 × 10²² m.", "El cociente son radianes. Multiplica por 2,063 × 10¹¹ para pasar a microsegundos de arco."],
                solucion: R`$\dfrac{9{,}97 \times 10^{13}}{5{,}18 \times 10^{23}} = 1{,}92 \times 10^{-10}$ rad $= 39{,}7\ \mu$as. La imagen del Event Horizon Telescope midió $42 \pm 3$.` },
              { id: "c", pregunta: "El chorro de M87 expulsa materia a 0,99 c. ¿Cuánto vale su factor de Lorentz?", tipo: "num", unidad: "", respuesta: 7.09, tol: 0.02,
                pistas: ["1 − 0,99² = 0,0199.", "Raíz cuadrada e inverso."],
                solucion: R`$\gamma = \dfrac{1}{\sqrt{0{,}0199}} = 7{,}09$.` },
              { id: "d", pregunta: "Luminosidad si tragara una milésima de masa solar al año con eficiencia 0,1", tipo: "sci", unidad: "W", respuesta: 5.66e35, tol: 0.04,
                pistas: ["Ritmo: 1,989 × 10²⁷ kg entre 3,156 × 10⁷ s.", "L = 0,1 × ritmo × c²."],
                solucion: R`$\dot m = 6{,}30 \times 10^{19}$ kg/s. $L = 0{,}1 \times 6{,}30 \times 10^{19} \times 8{,}988 \times 10^{16} = 5{,}7 \times 10^{35}$ W, mil millones de veces la luminosidad del Sol.` }
            ] },
          { id: "r2", nivel: 2, titulo: "La galaxia",
            enunciado: R`<p>A 30 kpc del centro de M87, la velocidad orbital que se deduce de sus cúmulos globulares es de unos 500 km/s. La luminosidad de la galaxia es del orden de $10^{11}$ luminosidades solares. Datos: $1\ \text{kpc} = 3{,}086 \times 10^{19}$ m, $G = 6{,}674 \times 10^{-11}$.</p>`,
            partes: [
              { id: "a", pregunta: "Masa interior a 30 kpc, en masas solares", tipo: "sci", unidad: "M☉", respuesta: 1.74e12, tol: 0.04,
                pistas: ["M = v² r / G, con v = 5 × 10⁵ m/s y r = 9,26 × 10²⁰ m."],
                solucion: R`$\dfrac{2{,}5 \times 10^{11} \times 9{,}26 \times 10^{20}}{6{,}674 \times 10^{-11}} = 3{,}47 \times 10^{42}$ kg $= 1{,}74 \times 10^{12}\ M_\odot$.` },
              { id: "b", pregunta: "Cociente entre masa y luz", tipo: "num", unidad: "", respuesta: 17.4, tol: 0.04,
                pistas: ["Divide la masa entre 10¹¹."],
                solucion: R`$17$, varias veces más de lo que dan las estrellas viejas de una elíptica. El resto es materia oscura.` },
              { id: "c", pregunta: "Si en el centro hubiera dos agujeros negros gigantes orbitando con un periodo de 10 años, ¿qué frecuencia tendrían sus ondas gravitacionales?", tipo: "sci", unidad: "Hz", respuesta: 6.34e-9, tol: 0.03,
                errores: [{ v: 3.17e-9, msg: "Esa es la frecuencia orbital. La de la onda es el doble." }],
                pistas: ["Periodo: 3,156 × 10⁸ s.", "La frecuencia de la onda es el doble de la orbital."],
                solucion: R`$f = \dfrac{2}{3{,}156 \times 10^{8}} = 6{,}3 \times 10^{-9}$ Hz.` },
              { id: "d", pregunta: "¿Con qué instrumento se buscan ondas de esa frecuencia?", tipo: "opcion", respuesta: 2,
                opciones: ["LIGO y Virgo", "Un radiotelescopio apuntando a M87", "Redes de púlsares cronometrados durante años", "El Event Horizon Telescope"],
                pistas: ["LIGO es sensible entre decenas y miles de hercios."],
                solucion: R`Con redes de púlsares. Una onda de nanohercios tarda años en completar un ciclo, y se nota como un adelanto y un retraso coordinado en la llegada de los pulsos.` }
            ] },
          { id: "r3", nivel: 3, titulo: "M87 en el universo en expansión",
            enunciado: R`<p>M87 está a 16,8 Mpc, en el centro del cúmulo de Virgo, y su espectro da una velocidad de alejamiento de 1284 km/s.</p>`,
            partes: [
              { id: "a", pregunta: "Velocidad que predice la ley de Hubble con H₀ = 70", tipo: "num", unidad: "km/s", respuesta: 1176, tol: 0.02,
                pistas: ["v = H₀ d."],
                solucion: R`$70 \times 16{,}8 = 1176$ km/s.` },
              { id: "b", pregunta: "La diferencia con los 1284 km/s medidos se debe sobre todo a:", tipo: "opcion", respuesta: 1,
                opciones: ["La tensión de Hubble", "El movimiento propio de la galaxia y de nuestro Grupo Local", "Un error en la medida del espectro", "La energía oscura"],
                pistas: ["¿Qué tamaño tienen los movimientos propios de las galaxias?"],
                solucion: R`Los movimientos propios son de cientos de km/s, comparables a la velocidad de expansión a esta distancia. Por eso una sola galaxia cercana no sirve para medir $H_0$.` },
              { id: "c", pregunta: "Tiempo que ha viajado la luz que recibimos de M87, en millones de años", tipo: "num", unidad: "millones de años", respuesta: 54.8, tol: 0.02,
                pistas: ["Un megapársec son 3,262 millones de años luz."],
                solucion: R`$16{,}8 \times 3{,}262 = 54{,}8$ millones de años. Salió poco después de la extinción de los dinosaurios.` },
              { id: "d", pregunta: "Una galaxia lejana se aleja a 7000 km/s. ¿A qué distancia está si H₀ = 73?", tipo: "num", unidad: "Mpc", respuesta: 95.9, tol: 0.02,
                pistas: ["d = v / H₀."],
                solucion: R`$7000/73 = 95{,}9$ Mpc. Con 67,4 saldrían 103,9. Los ocho megapársecs de diferencia son la tensión de Hubble vista desde el lado práctico.` },
              { id: "e", pregunta: "¿Cuál de estas afirmaciones está establecida, y no en discusión?", tipo: "opcion", respuesta: 3,
                opciones: ["La materia oscura está hecha de WIMP", "La energía oscura es una constante", "Hubo inflación", "El universo fue denso y caliente hace 13 800 millones de años"],
                pistas: ["Tres son hipótesis razonables. Una se apoya en tres pilares independientes."],
                solucion: R`El pasado denso y caliente. Las otras tres son las hipótesis de trabajo más extendidas, y cualquiera de ellas puede cambiar.` }
            ] }
        ] },

        { id: "ritmo", titulo: "Ajuste de ritmo", html: R`
<h3>Cómo interpretar tu resultado</h3>
<div class="tabla"><table>
<thead><tr><th>Lo que ha pasado</th><th>Qué significa</th><th>Qué hacer</th></tr></thead>
<tbody>
<tr><td>Los tres problemas bien, con pocas consultas</td><td>La fase está asentada</td><td>Pasar a la Fase 5</td></tr>
<tr><td>Errores con las unidades, entre kpc, Mpc, km/s y SI</td><td>Es el fallo más común de esta fase</td><td>Hacer una tabla propia de conversiones y repetir los ejercicios de las lecciones 36 y 38</td></tr>
<tr><td>Dudas con $1 + z$</td><td>Se confunde el corrimiento con una velocidad</td><td>Releer las secciones 4 de la Lección 38 y 1 de la Lección 39</td></tr>
<tr><td>No está claro qué es firme y qué es hipótesis</td><td>Falta separar medida de interpretación</td><td>Escribir dos listas, una de hechos medidos y otra de explicaciones propuestas, con las lecciones 37, 39 y 40 delante</td></tr>
</tbody></table></div>
<p>Los fallos más habituales en esta fase: olvidar pasar los km/s a m/s antes de usar $G$, usar $z$ donde va $1 + z$, tratar la expansión como una explosión con centro, y hablar de la materia oscura o de la inflación con la misma seguridad que de la expansión.</p>
<p>La Fase 5 cambia de escala y de método. Vuelve a los planetas, pero alrededor de otras estrellas, y pasa de resolver ejercicios a trabajar con datos reales. Termina con un proyecto propio.</p>`,
          notas: [{ id: "balance", label: "Qué te ha costado más, qué lecciones has consultado y cuántas horas reales has dedicado por semana" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>La relatividad</strong> cambia el tiempo, el espacio y la gravedad, y se comprueba a diario, del GPS a las ondas gravitacionales.`,
          R`<strong>Los agujeros negros existen</strong> y se pesan con órbitas, con imágenes y con ondas gravitacionales.`,
          R`<strong>Las galaxias y los cúmulos</strong> tienen varias veces más masa de la que se ve.`,
          R`<strong>El universo se expande,</strong> fue denso y caliente, y tiene 13 800 millones de años.`,
          R`<strong>El 95 % de su contenido</strong> es de naturaleza desconocida. Lo siguiente es la Fase 5.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 42 ───────────────────────── */
    {
      id: "leccion-42", n: 42, fase: 5, codigo: "B7.1",
      titulo: "Exoplanetas: cómo se detectan",
      sub: "Planetas que casi nunca se ven, encontrados por lo que le hacen a la luz de su estrella.",
      horas: "5 horas",
      contexto: "Métodos de detección de exoplanetas. Tránsito: profundidad (Rp/R*)^2, 84 ppm para la Tierra y 1,06 % para Júpiter (R_J = 71 492 km), probabilidad geométrica R*/a (0,47 % para la Tierra), duración P R*/(pi a) (13 h). Velocidad radial: K = (m sin i / M*) (2 pi G M*/P)^(1/3); Júpiter 12,5 m/s, Tierra 0,09 m/s; 51 Pegasi b (1995, P = 4,2308 d, K = 56 m/s, 0,48 masas de Júpiter). Densidad a partir de masa y radio. Imagen directa, microlentes, astrometría. Sesgos de selección. Más de 6000 planetas confirmados.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Intenta ver una polilla que revolotea junto a un faro desde varios kilómetros. No la verás. Pero si pasa justo por delante de la lámpara, la luz baja un poco durante un instante. Y si la polilla fuera lo bastante pesada, el faro se movería ligeramente cada vez que ella da una vuelta. Así se encuentran casi todos los planetas de otras estrellas: midiendo la estrella.</p>
<p>Júpiter refleja una parte en mil millones de la luz del Sol. La Tierra, diez veces menos. Separar ese punto del resplandor de la estrella es posible solo en casos muy favorables. Las dos técnicas que han dado miles de planetas renuncian a verlos.</p>
<div class="nota"><strong>Un problema de señal periódica en ruido.</strong> La señal de un planeta es débil pero se repite con un periodo exacto. Si conoces el periodo, puedes superponer todas las repeticiones y promediar. El ruido baja con la raíz del número de repeticiones y la señal no. Es el mismo principio que la detección síncrona o el promediado coherente de un radar.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. El primer planeta</h3>
<p>En 1995, Michel Mayor y Didier Queloz anunciaron que la estrella 51 Pegasi, parecida al Sol, se acercaba y se alejaba de nosotros con un periodo de 4,2 días. La causa era un planeta con la mitad de la masa de Júpiter, veinte veces más cerca de su estrella que la Tierra del Sol. Nadie esperaba un planeta gigante ahí. Recibieron el Nobel en 2019.</p>
<p>Hoy hay más de 6000 planetas confirmados. La mayoría de las estrellas tiene al menos uno.</p>

<h3>2. El método del tránsito</h3>
<p>Si la órbita está casi de canto vista desde aquí, el planeta pasa por delante de la estrella en cada vuelta y tapa una parte de su disco. La fracción de luz que falta es el cociente entre las áreas de los dos discos:</p>
$$\delta = \frac{\pi R_p^{2}}{\pi R_\ast^{2}} = \left(\frac{R_p}{R_\ast}\right)^{2}$$
<p>$\delta$ se llama <em>profundidad</em> del tránsito. Midiéndola, y conociendo el radio de la estrella, se obtiene el radio del planeta. Como las profundidades son pequeñas, se dan en tanto por ciento o en partes por millón, ppm.</p>
<p><strong>Probabilidad.</strong> Solo vemos tránsitos si la órbita está bien alineada. Para una órbita circular de radio $a$ orientada al azar, la probabilidad es</p>
$$p = \frac{R_\ast}{a}$$
<p>Cuanto más cerca está el planeta, más fácil es que cruce el disco.</p>
<p><strong>Duración.</strong> El planeta recorre su órbita, de longitud $2\pi a$, en un periodo $P$. Cruzar el diámetro de la estrella, $2R_\ast$, le lleva una fracción $2R_\ast/(2\pi a)$ de ese tiempo:</p>
$$T = \frac{P\,R_\ast}{\pi a}$$
<p>para un tránsito que pasa por el centro del disco.</p>

<h3>3. El método de la velocidad radial</h3>
<p>La estrella y el planeta giran los dos alrededor de su centro de masas. La estrella describe una órbita pequeña, con el mismo periodo, y su velocidad se mide por efecto Doppler en las líneas de su espectro.</p>
<p><strong>Paso 1.</strong> La cantidad de movimiento de los dos es igual y opuesta: $M_\ast v_\ast = m_p v_p$.</p>
<p><strong>Paso 2.</strong> La velocidad del planeta en una órbita circular es la longitud de la órbita entre el periodo, $v_p = 2\pi a/P$.</p>
<p><strong>Paso 3.</strong> La tercera ley de Kepler (Lección 12) da $a^{3} = GM_\ast P^{2}/(4\pi^{2})$. Sustituyendo $a$ en el paso 2:</p>
$$v_p = \left(\frac{2\pi G M_\ast}{P}\right)^{1/3}$$
<p><strong>Paso 4.</strong> Del paso 1, $v_\ast = (m_p/M_\ast)\,v_p$. Solo medimos la parte de esa velocidad que apunta hacia nosotros. Si la órbita está inclinada un ángulo $i$ respecto al plano del cielo, esa parte es $v_\ast \sin i$. Su amplitud se llama $K$:</p>
$$K = \frac{m_p \sin i}{M_\ast}\left(\frac{2\pi G M_\ast}{P}\right)^{1/3}$$
<p>De $K$ y $P$ sale $m_p \sin i$, que es una masa mínima. Si no se conoce la inclinación, la masa real puede ser mayor.</p>
<p>Los mejores espectrógrafos miden velocidades de unos 0,3 m/s, la de una persona paseando, en una estrella a decenas de años luz. A ese nivel, el obstáculo ya no es el instrumento sino la propia superficie de la estrella, que hierve y tiene manchas.</p>

<h3>4. Los dos métodos juntos</h3>
<p>El tránsito da el radio y la velocidad radial da la masa. Además, si hay tránsito, la órbita está de canto y $\sin i \approx 1$, así que la masa deja de ser un mínimo. Con masa y radio se calcula la densidad, y con ella se distingue un planeta de roca de uno de gas.</p>

<h3>5. Otros métodos</h3>
<div class="tabla"><table>
<thead><tr><th>Método</th><th>Qué mide</th><th>Qué encuentra mejor</th></tr></thead>
<tbody>
<tr><td>Imagen directa</td><td>La luz del planeta, tapando la estrella con un coronógrafo</td><td>Gigantes jóvenes y calientes, muy lejos de su estrella</td></tr>
<tr><td>Microlente gravitatoria</td><td>El aumento de brillo de una estrella de fondo</td><td>Planetas lejanos, incluso sin estrella. No se puede repetir la medida</td></tr>
<tr><td>Astrometría</td><td>El vaivén de la posición de la estrella en el cielo</td><td>Gigantes en órbitas amplias. Se esperan miles con los datos de Gaia</td></tr>
<tr><td>Cronometría</td><td>Adelantos y retrasos de un púlsar o de otros tránsitos</td><td>Los primeros planetas conocidos, en 1992, alrededor de un púlsar</td></tr>
</tbody></table></div>

<h3>6. Lo que se ha encontrado</h3>
<ul>
<li><strong>Jupíteres calientes,</strong> gigantes con periodos de pocos días. Son raros, cerca del 1 % de las estrellas, pero fáciles de detectar.</li>
<li><strong>Supertierras y minineptunos,</strong> entre una y cuatro veces el radio de la Tierra. Son el tipo más común y no hay ninguno en el sistema solar.</li>
<li><strong>Un hueco</strong> en la distribución de tamaños, cerca de 1,8 radios terrestres, que separa los planetas rocosos de los que conservan una envoltura de gas.</li>
<li><strong>Sistemas compactos,</strong> como TRAPPIST-1, con siete planetas del tamaño de la Tierra en órbitas más pequeñas que la de Mercurio.</li>
</ul>

<h3>7. El sesgo de selección</h3>
<p>Los dos métodos principales favorecen a los planetas grandes y cercanos a su estrella: dan más señal y la repiten más a menudo. Lo que se encuentra con facilidad no es lo que más abunda. Un sistema como el nuestro, visto desde lejos, sería muy difícil de detectar: Júpiter exige doce años de medidas y la Tierra queda por debajo de la precisión actual en velocidad radial.</p>
<p>Por eso no se sabe todavía si el sistema solar es corriente o raro. Es una pregunta abierta, y los catálogos hay que leerlos corrigiendo ese sesgo.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>51 Pegasi b, el primero</h3>
<p>Datos: periodo $P = 4{,}2308$ días, amplitud $K = 56$ m/s y masa de la estrella $M_\ast = 1{,}11\ M_\odot$.</p>
<p><strong>Unidades del SI:</strong></p>
$$P = 4{,}2308 \times 86\,400 = 3{,}655 \times 10^{5}\ \text{s} \qquad M_\ast = 1{,}11 \times 1{,}989 \times 10^{30} = 2{,}208 \times 10^{30}\ \text{kg}$$
<p><strong>Velocidad orbital del planeta:</strong></p>
$$v_p = \left(\frac{2\pi \times 6{,}674 \times 10^{-11} \times 2{,}208 \times 10^{30}}{3{,}655 \times 10^{5}}\right)^{1/3} = \left(2{,}533 \times 10^{15}\right)^{1/3} = 1{,}363 \times 10^{5}\ \text{m/s}$$
<p>Son 136 km/s, casi cinco veces la velocidad de la Tierra.</p>
<p><strong>Masa mínima,</strong> despejando de $K = (m_p \sin i / M_\ast)\,v_p$:</p>
$$m_p \sin i = \frac{M_\ast K}{v_p} = \frac{2{,}208 \times 10^{30} \times 56}{1{,}363 \times 10^{5}} = 9{,}07 \times 10^{26}\ \text{kg}$$
<p>La masa de Júpiter es $1{,}898 \times 10^{27}$ kg, así que son 0,48 masas de Júpiter.</p>
<p><strong>Radio de la órbita:</strong></p>
$$a = \frac{v_p P}{2\pi} = \frac{1{,}363 \times 10^{5} \times 3{,}655 \times 10^{5}}{2\pi} = 7{,}93 \times 10^{9}\ \text{m} = 0{,}053\ \text{UA}$$
<p>Siete veces más cerca que Mercurio del Sol.</p>
<h3>La Tierra y Júpiter, vistos desde fuera</h3>
<div class="tabla"><table>
<thead><tr><th></th><th>Profundidad del tránsito</th><th>Probabilidad</th><th>Amplitud $K$</th><th>Periodo</th></tr></thead>
<tbody>
<tr><td>Júpiter</td><td>1,06 %</td><td>0,09 %</td><td>12,5 m/s</td><td>11,9 años</td></tr>
<tr><td>Tierra</td><td>84 ppm</td><td>0,47 %</td><td>0,09 m/s</td><td>1 año</td></tr>
</tbody></table></div>
<p>Varias de estas cifras las calcularás en los ejercicios.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "La sombra de un planeta",
            enunciado: R`<p>Radios: Sol 695 700 km, Júpiter 71 492 km, Tierra 6371 km.</p>`,
            partes: [
              { id: "a", pregunta: "Profundidad del tránsito de la Tierra ante el Sol, en partes por millón", tipo: "num", unidad: "ppm", respuesta: 84, tol: 0.03,
                errores: [{ v: 9158, msg: "Falta elevar al cuadrado el cociente de radios." }],
                pistas: ["Cociente de radios: 6371 / 695 700 = 0,00916.", "Elévalo al cuadrado y multiplica por un millón."],
                solucion: R`$\left(\dfrac{6371}{695\,700}\right)^{2} = 8{,}39 \times 10^{-5} = 84$ ppm.` },
              { id: "b", pregunta: "Profundidad del tránsito de Júpiter, en tanto por ciento", tipo: "num", unidad: "%", respuesta: 1.06, tol: 0.03,
                pistas: ["(71 492 / 695 700)², por cien."],
                solucion: R`$(0{,}1028)^{2} = 0{,}0106 = 1{,}06\,\%$. Una caída del 1 % se mide con un telescopio de aficionado. Una de 84 ppm necesita un satélite.` },
              { id: "c", pregunta: "¿Qué propiedad del planeta da directamente la profundidad del tránsito?", tipo: "opcion", respuesta: 1,
                opciones: ["Su masa", "Su radio, en relación con el de la estrella", "Su temperatura", "Su distancia a la estrella"],
                pistas: ["Es un cociente de áreas."],
                solucion: R`El radio relativo. La masa hay que medirla por otro método.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Cuántas estrellas hay que vigilar",
            enunciado: R`<p>Usa $p = R_\ast/a$ y $T = P R_\ast/(\pi a)$, con $R_\odot = 695\,700$ km y $1\ \text{UA} = 1{,}496 \times 10^{8}$ km.</p>`,
            partes: [
              { id: "a", pregunta: "Probabilidad de que una Tierra a 1 UA de un Sol transite, en tanto por ciento", tipo: "num", unidad: "%", respuesta: 0.465, tol: 0.03,
                pistas: ["695 700 / 1,496 × 10⁸, por cien."],
                solucion: R`$\dfrac{695\,700}{1{,}496 \times 10^{8}} = 0{,}00465 = 0{,}47\,\%$. Una de cada 215.` },
              { id: "b", pregunta: "La misma probabilidad para un Júpiter caliente a 0,05 UA", tipo: "num", unidad: "%", respuesta: 9.3, tol: 0.03,
                pistas: ["La probabilidad es inversamente proporcional a la distancia: divide la anterior entre 0,05."],
                solucion: R`$0{,}465 / 0{,}05 = 9{,}3\,\%$. Veinte veces más probable.` },
              { id: "c", pregunta: "Duración del tránsito de la Tierra visto desde fuera, en horas", tipo: "num", unidad: "h", respuesta: 13, tol: 0.03,
                pistas: ["P = 365,25 × 24 horas.", "T = P × 0,00465 / π."],
                solucion: R`$T = \dfrac{8766 \times 0{,}00465}{\pi} = 13{,}0$ horas, una vez al año.` },
              { id: "d", pregunta: "Los primeros exoplanetas descubiertos fueron casi todos Jupíteres calientes porque:", tipo: "opcion", respuesta: 2,
                opciones: ["Son el tipo de planeta más abundante", "Son los únicos que emiten luz propia", "Dan la señal más grande y la repiten cada pocos días", "Solo se buscaba ese tipo de planeta"],
                pistas: ["Compara la profundidad, la probabilidad y el periodo con los de la Tierra."],
                solucion: R`Por sesgo de selección. Son raros, pero su señal es grande, frecuente y probable.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Pesar un planeta que no se ve",
            enunciado: R`<p>Usa $K = (m_p \sin i/M_\ast)\,v_p$ y $v_p = (2\pi G M_\ast/P)^{1/3}$. Datos: $M_\odot = 1{,}989 \times 10^{30}$ kg, $M_\text{J} = 1{,}898 \times 10^{27}$ kg, $M_\oplus = 5{,}972 \times 10^{24}$ kg, $G = 6{,}674 \times 10^{-11}$.</p>`,
            partes: [
              { id: "a", pregunta: "Amplitud K que Júpiter produce en el Sol. Su velocidad orbital es 13,06 km/s", tipo: "num", unidad: "m/s", respuesta: 12.5, tol: 0.03,
                pistas: ["Cociente de masas: 1,898 × 10²⁷ / 1,989 × 10³⁰.", "Multiplícalo por 13 060 m/s."],
                solucion: R`$\dfrac{1{,}898 \times 10^{27}}{1{,}989 \times 10^{30}} \times 13\,060 = 12{,}5$ m/s.` },
              { id: "b", pregunta: "Amplitud K que produce la Tierra, que se mueve a 29,78 km/s", tipo: "num", unidad: "m/s", respuesta: 0.0894, tol: 0.03,
                pistas: ["Cociente de masas: 3,00 × 10⁻⁶."],
                solucion: R`$3{,}00 \times 10^{-6} \times 29\,780 = 0{,}089$ m/s, nueve centímetros por segundo. Está por debajo de lo que se mide hoy de forma fiable.` },
              { id: "c", pregunta: "Próxima Centauri (0,122 M☉) oscila con K = 1,4 m/s y periodo 11,186 días. Masa mínima del planeta, en masas terrestres", tipo: "num", unidad: "M⊕", respuesta: 1.2, tol: 0.05,
                pistas: ["M = 2,427 × 10²⁹ kg y P = 9,665 × 10⁵ s.", "v_p = (1,053 × 10¹⁴)^(1/3) = 4,72 × 10⁴ m/s.", "m sin i = M K / v_p."],
                solucion: R`$v_p = 4{,}72 \times 10^{4}$ m/s. $m_p \sin i = \dfrac{2{,}427 \times 10^{29} \times 1{,}4}{4{,}72 \times 10^{4}} = 7{,}2 \times 10^{24}$ kg $= 1{,}2\ M_\oplus$. Es el exoplaneta más cercano, a 4,2 años luz.` },
              { id: "d", pregunta: "HD 209458 b tiene 0,69 masas de Júpiter y 1,38 radios de Júpiter (71 492 km). Densidad media", tipo: "num", unidad: "kg/m³", respuesta: 326, tol: 0.05,
                pistas: ["Masa: 1,310 × 10²⁷ kg. Radio: 9,866 × 10⁷ m.", "Volumen: (4/3) π R³ = 4,02 × 10²⁴ m³."],
                solucion: R`$\dfrac{1{,}310 \times 10^{27}}{4{,}02 \times 10^{24}} = 326\ \text{kg/m}^{3}$, un tercio de la densidad del agua. Está hinchado por el calor de su estrella.` },
              { id: "e", pregunta: "La velocidad radial da m sin i y no m porque:", tipo: "opcion", respuesta: 0,
                opciones: ["Solo se mide la componente de la velocidad a lo largo de la línea de visión", "La masa de la estrella no se conoce bien", "El planeta pierde masa", "El efecto Doppler solo funciona en órbitas circulares"],
                pistas: ["¿Qué pasaría con una órbita vista de frente?"],
                solucion: R`Una órbita vista de frente no produce ningún Doppler, por grande que sea el planeta. Lo que se mide es la proyección.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Un tránsito escondido en el ruido</h3>
<p>El programa simula 27 días de medidas de un satélite, una cada dos minutos, con un planeta que tapa el 0,2 % de la luz. El ruido de cada medida es del 0,1 %.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(1)

t = np.arange(0, 27, 2 / 1440)            # días, una medida cada 2 minutos
P, t0 = 3.5, 1.3                          # periodo y primer tránsito, en días
duracion = 0.12                           # días
profundidad = 0.002
ruido = 0.001

fase = ((t - t0 + P / 2) % P) - P / 2
en_transito = duracion / 2 > abs(fase)
flujo = 1 - profundidad * en_transito + rng.normal(0, ruido, t.size)

fig, ejes = plt.subplots(2, 1)
ejes[0].plot(t, flujo, ".", markersize=1)
ejes[0].set_xlabel("tiempo (días)")
ejes[1].plot(fase, flujo, ".", markersize=1)
ejes[1].set_xlim(-0.5, 0.5)
ejes[1].set_xlabel("tiempo desde el centro del tránsito (días)")
plt.show()

dentro = flujo[en_transito]
fuera = flujo[~en_transito]
medida = fuera.mean() - dentro.mean()
error = ruido / np.sqrt(dentro.size)
print("tránsitos:", int(27 / P), " puntos dentro:", dentro.size)
print("profundidad medida:", round(medida * 1e6), "ppm, con error", round(error * 1e6), "ppm")
print("señal entre ruido:", round(medida / error, 1))</pre></div>
<ol>
<li>En el panel de arriba cuesta ver los tránsitos. En el de abajo, con todas las vueltas superpuestas, se ve la caída.</li>
<li>La profundidad sale cerca de 2000 ppm con un error de pocas decenas, aunque cada punto tiene un ruido de 1000.</li>
<li>Baja la profundidad a 0,0001, parecida a la de la Tierra, y repite. Mira qué le pasa a la relación entre señal y ruido.</li>
</ol>
<h3>El catálogo real</h3>
<p>Entra en el NASA Exoplanet Archive y abre los gráficos interactivos. Dibuja la masa frente al periodo de todos los planetas confirmados y colorea por método de detección. Busca en qué zona caerían Júpiter y la Tierra, y comprueba que está casi vacía.</p>`,
          notas: [{ id: "transito", label: "Relación entre señal y ruido con cada profundidad, y qué has visto en el gráfico de masa y periodo" }] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Los exoplanetas se detectan midiendo su estrella.</strong> Hay más de 6000 confirmados.`,
          R`<strong>Tránsito:</strong> la profundidad $(R_p/R_\ast)^{2}$ da el radio. La probabilidad de verlo es $R_\ast/a$.`,
          R`<strong>Velocidad radial:</strong> $K = (m_p \sin i/M_\ast)(2\pi GM_\ast/P)^{1/3}$ da la masa mínima.`,
          R`<strong>Con los dos métodos</strong> se obtiene la densidad, y con ella la composición.`,
          R`<strong>Lo fácil de detectar no es lo más abundante.</strong> No se sabe todavía si el sistema solar es corriente.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 43 ───────────────────────── */
    {
      id: "leccion-43", n: 43, fase: 5, codigo: "B7.2",
      titulo: "Atmósferas, habitabilidad y vida",
      sub: "Qué temperatura tiene un planeta, cómo se lee su atmósfera a distancia y qué se sabe de la vida fuera de la Tierra.",
      horas: "5 horas",
      contexto: "Temperatura de equilibrio T_eq = T* raíz(R*/(2a)) (1-A)^(1/4), equivalente a 278 K (1-A)^(1/4) L^(1/4) / raíz(a en UA); Tierra 255 K frente a 288 K reales (efecto invernadero de 33 K); Venus 229 K frente a 737 K. Zona habitable, proporcional a raíz(L). Espectroscopía de transmisión: escala de altura H = kT/(mu m_H g), 8,4 km en la Tierra; señal 2 Rp n H / R*^2. Resultados del James Webb: CO2 en WASP-39 b (establecido); TRAPPIST-1 b sin atmósfera densa; K2-18 b y el sulfuro de dimetilo (en discusión). Biofirmas, ecuación de Drake, paradoja de Fermi; Marte, Europa y Encélado. No hay ninguna detección de vida fuera de la Tierra.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Un satélite en órbita tiene un problema térmico sencillo de plantear: absorbe la luz del Sol por la cara que le da y radia calor por toda su superficie. Su temperatura se ajusta hasta que lo que entra iguala a lo que sale. Un planeta es lo mismo, con una atmósfera que complica la salida.</p>
<p>Esa cuenta de balance, hecha para un planeta de otra estrella, dice si puede tener agua líquida. Y la luz de la estrella que atraviesa el borde de su atmósfera durante un tránsito dice de qué está hecha. Con esas dos herramientas se aborda una pregunta muy vieja: si hay vida en otro sitio.</p>
<div class="nota"><strong>Aviso antes de empezar.</strong> Hoy no hay ninguna detección de vida fuera de la Tierra. Ni microbios en Marte, ni señales, ni biofirmas confirmadas en exoplanetas. Esta es la lección del curso con más preguntas abiertas, y en ella conviene desconfiar de los titulares.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. La temperatura de equilibrio</h3>
<p><strong>Paso 1. Lo que llega.</strong> Una estrella de luminosidad $L$ reparte su potencia sobre una esfera de radio $a$. A la distancia del planeta, el flujo es $L/(4\pi a^{2})$.</p>
<p><strong>Paso 2. Lo que absorbe.</strong> El planeta intercepta la luz con su sección, un disco de área $\pi R_p^{2}$, y refleja una fracción $A$, el <em>albedo</em>. Absorbe:</p>
$$P_\text{abs} = \frac{L}{4\pi a^{2}}\,\pi R_p^{2}\,(1 - A)$$
<p><strong>Paso 3. Lo que emite.</strong> Si gira y reparte bien el calor, radia como un cuerpo negro por toda su superficie, $4\pi R_p^{2}$:</p>
$$P_\text{em} = 4\pi R_p^{2}\,\sigma T^{4}$$
<p><strong>Paso 4. Equilibrio.</strong> Se igualan las dos potencias. El radio del planeta se cancela:</p>
$$\sigma T^{4} = \frac{L\,(1-A)}{16\pi a^{2}}$$
<p><strong>Paso 5.</strong> Se escribe la luminosidad de la estrella como $L = 4\pi R_\ast^{2}\sigma T_\ast^{4}$ (Lección 17) y se simplifica:</p>
$$T^{4} = T_\ast^{4}\,\frac{R_\ast^{2}}{4a^{2}}\,(1-A) \quad\Longrightarrow\quad T_\text{eq} = T_\ast\sqrt{\frac{R_\ast}{2a}}\,(1-A)^{1/4}$$
<p>Para una estrella cualquiera, tomando el Sol como referencia, queda una forma cómoda:</p>
$$T_\text{eq} = 278\ \text{K} \times (1-A)^{1/4} \times \frac{L^{1/4}}{\sqrt{a}}$$
<p>con $L$ en luminosidades solares y $a$ en unidades astronómicas.</p>

<h3>2. El efecto invernadero</h3>
<p>Para la Tierra, con albedo 0,30, salen 255 K, que son 18 grados bajo cero. La temperatura media real de la superficie es 288 K. Los 33 K de diferencia son el efecto invernadero: el vapor de agua y el CO$_2$ dejan pasar la luz visible y absorben parte del infrarrojo que emite el suelo.</p>
<p>La temperatura de equilibrio es la que se ve desde fuera, la de la capa que radia al espacio. La de la superficie depende de la atmósfera. Venus tiene una temperatura de equilibrio menor que la de la Tierra, porque refleja el 76 % de la luz, y una superficie a 737 K.</p>

<h3>3. La zona habitable</h3>
<p>Es el intervalo de distancias en el que un planeta rocoso con una atmósfera adecuada podría tener agua líquida en la superficie. En el sistema solar va, aproximadamente, de 0,95 a 1,7 UA. Para otra estrella se escala con la raíz de la luminosidad, porque el flujo cae con el cuadrado de la distancia:</p>
$$a_\text{ZH} \approx \sqrt{L}\ \ \text{UA}$$
<p>Tres advertencias:</p>
<ul>
<li>Estar en la zona habitable no significa estar habitado, ni siquiera tener agua. Marte está en ella o muy cerca.</li>
<li>Los límites dependen de la atmósfera, que es justo lo que no se conoce.</li>
<li>Deja fuera los océanos bajo el hielo, como los de Europa y Encélado, que se mantienen líquidos por el calor de las mareas.</li>
</ul>

<h3>4. Leer una atmósfera en un tránsito</h3>
<p>Durante el tránsito, una parte de la luz de la estrella roza el planeta y cruza su atmósfera. En las longitudes de onda en que un gas absorbe, la atmósfera es opaca hasta más altura y el planeta parece un poco más grande. Midiendo la profundidad del tránsito color a color se obtiene un espectro de la atmósfera. Es la <em>espectroscopía de transmisión</em>.</p>
<p>El grosor de una atmósfera se mide con su <em>escala de altura</em>, la altura en la que la presión cae en un factor $e$. Sale del equilibrio hidrostático de la Lección 25:</p>
$$H = \frac{kT}{\mu\,m_\text{H}\,g}$$
<p>con $\mu$ la masa media de las moléculas en masas de hidrógeno y $g$ la gravedad. Una atmósfera caliente, ligera y con poca gravedad está muy extendida.</p>
<p>Una línea de absorción intensa hace opaco un anillo de unas $n \approx 5$ escalas de altura. El área de ese anillo, $2\pi R_p \times nH$, dividida entre la del disco de la estrella, es la señal:</p>
$$\Delta\delta \approx \frac{2R_p\,nH}{R_\ast^{2}}$$
<p>Para un Júpiter caliente son cientos de ppm. Para una Tierra ante un Sol, una ppm. Por eso se buscan planetas pequeños alrededor de estrellas pequeñas: con $R_\ast$ en el denominador y al cuadrado, una enana roja diez veces menor que el Sol multiplica la señal por cien.</p>

<h3>5. Lo que ha visto el James Webb</h3>
<ul>
<li><strong>Establecido.</strong> En gigantes calientes se han identificado agua, CO$_2$, monóxido de carbono, metano y dióxido de azufre. La detección de CO$_2$ en WASP-39 b, en 2022, fue la primera inequívoca en un exoplaneta.</li>
<li><strong>Bastante firme.</strong> TRAPPIST-1 b, el más interior de su sistema, no tiene una atmósfera densa. Su cara diurna está tan caliente como una roca desnuda.</li>
<li><strong>En discusión.</strong> En K2-18 b, un planeta de 8,6 masas terrestres en la zona habitable de una enana roja, se han medido metano y CO$_2$. Un equipo sostiene que hay además sulfuro de dimetilo, que en la Tierra producen sobre todo organismos marinos. Otros análisis de los mismos datos no encuentran una señal significativa, y hay vías químicas sin vida que podrían producirlo. No es una detección de vida.</li>
<li><strong>Abierto.</strong> Si los planetas rocosos de las enanas rojas conservan atmósfera frente a las fulguraciones de sus estrellas. De eso depende que los objetivos más accesibles sean también interesantes.</li>
</ul>

<h3>6. Biofirmas</h3>
<p>Una <em>biofirma</em> es una observación que la vida explica mejor que cualquier proceso sin vida. La más citada es la presencia simultánea de oxígeno y metano: reaccionan entre sí, y solo conviven si algo los repone sin parar. En la Tierra ese algo son los seres vivos.</p>
<p>Ninguna molécula sola es una prueba. El oxígeno puede acumularse sin vida, por la rotura de vapor de agua con luz ultravioleta. El criterio que usa la comunidad es exigente: detección robusta, contexto planetario conocido y descarte de las explicaciones sin vida.</p>

<h3>7. El sistema solar</h3>
<ul>
<li><strong>Marte</strong> tuvo ríos y lagos hace más de tres mil millones de años. El rover Perseverance ha recogido muestras de un antiguo delta, entre ellas una roca con texturas que en la Tierra suelen asociarse a actividad microbiana y que también admiten explicación química. Hace falta traerlas a un laboratorio, y la misión de retorno no tiene fecha firme.</li>
<li><strong>Europa,</strong> luna de Júpiter, y <strong>Encélado,</strong> luna de Saturno, tienen océanos de agua líquida bajo el hielo. Encélado expulsa chorros en los que la sonda Cassini encontró sales, compuestos orgánicos e hidrógeno. La sonda Europa Clipper llegará a Júpiter en 2030.</li>
</ul>

<h3>8. Cuántos somos</h3>
<p>En 1961, Frank Drake escribió el número de civilizaciones detectables en la galaxia como un producto de factores: el ritmo de formación de estrellas, la fracción con planetas, cuántos de ellos son habitables, en cuántos surge la vida, en cuántos se vuelve inteligente, en cuántos emite señales y cuánto duran esas señales.</p>
<p>Los tres primeros factores se conocen hoy razonablemente. Los demás, no: solo tenemos un ejemplo de vida. Según los valores que se supongan, el resultado va de mucho menos de uno a millones. La ecuación no da una respuesta. Ordena la ignorancia.</p>
<p>La <em>paradoja de Fermi</em> plantea la otra cara: si las civilizaciones fueran comunes y duraderas, la galaxia, que se cruza en cien mil años a la velocidad de la luz y tiene trece mil millones de años, debería mostrar algún rastro. Hasta hoy no se ha encontrado ninguno. Las búsquedas de señales de radio, muchas de ellas cerca de la línea de 21 cm, han cubierto una fracción diminuta de las frecuencias, direcciones y momentos posibles.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>La temperatura de la Tierra sin atmósfera</h3>
<p>Datos: $T_\odot = 5772$ K, $R_\odot = 6{,}957 \times 10^{8}$ m, $a = 1{,}496 \times 10^{11}$ m y albedo $A = 0{,}30$.</p>
<p><strong>Factor geométrico:</strong></p>
$$\sqrt{\frac{R_\odot}{2a}} = \sqrt{\frac{6{,}957 \times 10^{8}}{2{,}992 \times 10^{11}}} = \sqrt{2{,}325 \times 10^{-3}} = 0{,}04822$$
<p><strong>Factor del albedo:</strong></p>
$$(1 - 0{,}30)^{1/4} = 0{,}70^{0{,}25} = 0{,}9147$$
<p><strong>Temperatura de equilibrio:</strong></p>
$$T_\text{eq} = 5772 \times 0{,}04822 \times 0{,}9147 = 255\ \text{K}$$
<p>El producto de los dos primeros números, $5772 \times 0{,}04822 = 278$ K, es la constante de la fórmula rápida.</p>
<p><strong>Efecto invernadero:</strong> $288 - 255 = 33$ K. Sin él, los océanos estarían helados.</p>
<h3>La atmósfera de un Júpiter caliente</h3>
<p>HD 209458 b: $T = 1400$ K, atmósfera de hidrógeno y helio con $\mu = 2{,}3$, gravedad $g = 9{,}0\ \text{m/s}^{2}$, radio $R_p = 9{,}87 \times 10^{7}$ m. Su estrella mide $R_\ast = 8{,}07 \times 10^{8}$ m.</p>
<p><strong>Escala de altura:</strong></p>
$$H = \frac{1{,}381 \times 10^{-23} \times 1400}{2{,}3 \times 1{,}673 \times 10^{-27} \times 9{,}0} = \frac{1{,}933 \times 10^{-20}}{3{,}463 \times 10^{-26}} = 5{,}58 \times 10^{5}\ \text{m} = 558\ \text{km}$$
<p><strong>Señal de una línea intensa,</strong> con $n = 5$:</p>
$$\Delta\delta = \frac{2 \times 9{,}87 \times 10^{7} \times 5 \times 5{,}58 \times 10^{5}}{(8{,}07 \times 10^{8})^{2}} = \frac{5{,}51 \times 10^{14}}{6{,}51 \times 10^{17}} = 8{,}5 \times 10^{-4}$$
<p>Son 850 ppm sobre un tránsito del 1,5 %. En este planeta se detectó sodio en 2002 con el Hubble. Fue la primera atmósfera medida fuera del sistema solar.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Los vecinos",
            enunciado: R`<p>Usa $T_\text{eq} = 278 \times (1-A)^{1/4}/\sqrt{a}$, con $a$ en UA, para planetas del Sol.</p>`,
            partes: [
              { id: "a", pregunta: "Temperatura de equilibrio de Marte, con a = 1,524 UA y A = 0,25", tipo: "num", unidad: "K", respuesta: 210, tol: 0.02,
                pistas: ["0,75^0,25 = 0,9306 y √1,524 = 1,2345."],
                solucion: R`$278 \times \dfrac{0{,}9306}{1{,}2345} = 210$ K. La media real es muy parecida, porque su atmósfera es muy tenue.` },
              { id: "b", pregunta: "Temperatura de equilibrio de Venus, con a = 0,723 UA y A = 0,76", tipo: "num", unidad: "K", respuesta: 229, tol: 0.02,
                pistas: ["0,24^0,25 = 0,6999 y √0,723 = 0,8503."],
                solucion: R`$278 \times \dfrac{0{,}6999}{0{,}8503} = 229$ K. Menos que la Tierra, a pesar de estar más cerca del Sol, porque sus nubes reflejan tres cuartas partes de la luz.` },
              { id: "c", pregunta: "La superficie de Venus está a 737 K. La diferencia con el resultado anterior se debe a:", tipo: "opcion", respuesta: 1,
                opciones: ["El calor interno del planeta", "El efecto invernadero de una atmósfera muy densa de CO₂", "Que gira muy despacio", "Un error en el albedo"],
                pistas: ["La temperatura de equilibrio es la de la capa que radia al espacio."],
                solucion: R`Una atmósfera de CO$_2$ con noventa veces la presión de la terrestre atrapa el infrarrojo. Desde fuera, Venus radia como un cuerpo a 229 K.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Próxima b",
            enunciado: R`<p>Próxima Centauri tiene una luminosidad de 0,0016 veces la del Sol. Su planeta b orbita a 0,0485 UA.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia a la que un planeta recibiría el mismo flujo que la Tierra", tipo: "num", unidad: "UA", respuesta: 0.04, tol: 0.03,
                pistas: ["a = √L."],
                solucion: R`$\sqrt{0{,}0016} = 0{,}04$ UA, diez veces más cerca que Mercurio.` },
              { id: "b", pregunta: "Flujo que recibe Próxima b, en relación con el que recibe la Tierra", tipo: "num", unidad: "", respuesta: 0.68, tol: 0.03,
                pistas: ["Flujo relativo = L / a², con a en UA."],
                solucion: R`$\dfrac{0{,}0016}{0{,}0485^{2}} = 0{,}68$. Algo más que Marte, que recibe 0,43.` },
              { id: "c", pregunta: "Su temperatura de equilibrio si tuviera el albedo de la Tierra, 0,30", tipo: "num", unidad: "K", respuesta: 231, tol: 0.02,
                pistas: ["278 × 0,9147 = 254,6.", "L^0,25 = 0,2 y √0,0485 = 0,2202."],
                solucion: R`$254{,}6 \times \dfrac{0{,}2}{0{,}2202} = 231$ K.` },
              { id: "d", pregunta: "Próxima b está en la zona habitable de su estrella. Eso significa que:", tipo: "opcion", respuesta: 2,
                opciones: ["Tiene agua líquida", "Tiene vida", "Podría tener agua líquida si conserva una atmósfera adecuada, cosa que no se sabe", "Su superficie está a 15 °C"],
                pistas: ["La definición habla de posibilidad, y supone una atmósfera."],
                solucion: R`Es una condición sobre la energía que recibe, nada más. Próxima es una estrella con fulguraciones intensas, y no se sabe si el planeta ha conservado su atmósfera.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Leer una atmósfera",
            enunciado: R`<p>Usa $H = kT/(\mu m_\text{H} g)$ y $\Delta\delta = 2R_p\,nH/R_\ast^{2}$ con $n = 5$. Datos: $k = 1{,}381 \times 10^{-23}$ J/K, $m_\text{H} = 1{,}673 \times 10^{-27}$ kg, $R_\oplus = 6{,}371 \times 10^{6}$ m, $R_\odot = 6{,}957 \times 10^{8}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "Escala de altura de la atmósfera terrestre, con T = 288 K, μ = 29 y g = 9,81 m/s²", tipo: "num", unidad: "km", respuesta: 8.36, tol: 0.03,
                pistas: ["Numerador: 3,977 × 10⁻²¹. Denominador: 4,759 × 10⁻²⁵."],
                solucion: R`$H = \dfrac{3{,}977 \times 10^{-21}}{4{,}759 \times 10^{-25}} = 8360$ m $= 8{,}4$ km. Es aproximadamente la altura del Everest, donde la presión es un tercio de la del nivel del mar.` },
              { id: "b", pregunta: "Señal de transmisión de una Tierra ante un Sol, en ppm", tipo: "num", unidad: "ppm", respuesta: 1.1, tol: 0.05,
                pistas: ["2 × 6,371 × 10⁶ × 5 × 8360 = 5,33 × 10¹¹.", "Divide entre (6,957 × 10⁸)² = 4,84 × 10¹⁷."],
                solucion: R`$\dfrac{5{,}33 \times 10^{11}}{4{,}84 \times 10^{17}} = 1{,}1 \times 10^{-6}$, una parte por millón. Está fuera del alcance de cualquier instrumento actual.` },
              { id: "c", pregunta: "La misma Tierra ante una enana roja de 0,12 radios solares", tipo: "num", unidad: "ppm", respuesta: 76, tol: 0.06,
                pistas: ["La señal va con 1 / R*². Divide la anterior entre 0,12²."],
                solucion: R`$\dfrac{1{,}1}{0{,}0144} = 76$ ppm. Sigue siendo difícil, pero alcanzable sumando muchos tránsitos. Por eso TRAPPIST-1 es el sistema más observado.` },
              { id: "d", pregunta: "La posible presencia de sulfuro de dimetilo en K2-18 b es hoy:", tipo: "opcion", respuesta: 3,
                opciones: ["La primera detección confirmada de vida", "Un resultado descartado por un error del telescopio", "Una detección firme de la molécula, de origen desconocido", "Una afirmación en discusión, tanto por la señal como por su interpretación"],
                pistas: ["Hay dos preguntas distintas: si la molécula está, y qué significaría."],
                solucion: R`Están en discusión las dos cosas. La significación de la señal depende del análisis, y la molécula puede formarse sin vida.` },
              { id: "e", pregunta: "La ecuación de Drake sirve para:", tipo: "opcion", respuesta: 0,
                opciones: ["Ordenar lo que habría que saber, sin dar un número fiable", "Calcular cuántas civilizaciones hay en la galaxia", "Demostrar que estamos solos", "Estimar la distancia a la civilización más cercana"],
                pistas: ["¿Cuántos de sus factores se han medido?"],
                solucion: R`Varios factores son desconocidos por completo, así que el resultado refleja lo que se suponga. Su utilidad es separar la pregunta en partes que se pueden investigar.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>Temperaturas de equilibrio y zonas habitables</h3>
<div class="tabla"><pre>import numpy as np

def t_eq(L, a, A):
    return 278.3 * (1 - A)**0.25 * L**0.25 / np.sqrt(a)

# nombre, luminosidad (soles), distancia (UA), albedo, temperatura real de la superficie (K)
planetas = [("Mercurio", 1, 0.387, 0.09, 440),
            ("Venus", 1, 0.723, 0.76, 737),
            ("Tierra", 1, 1.0, 0.30, 288),
            ("Marte", 1, 1.524, 0.25, 210),
            ("Próxima b", 0.0016, 0.0485, 0.30, None),
            ("TRAPPIST-1 e", 0.000553, 0.0293, 0.30, None)]

for nombre, L, a, A, real in planetas:
    print(nombre, ": equilibrio", round(t_eq(L, a, A)), "K, real", real)

print()
estrellas = [("enana roja M5", 0.003), ("enana naranja K5", 0.17), ("Sol", 1.0), ("estrella F5", 3.2), ("Sirio", 25.4)]
for nombre, L in estrellas:
    dentro, fuera = 0.95 * np.sqrt(L), 1.7 * np.sqrt(L)
    periodo = 365.25 * np.sqrt(dentro**3)          # días, suponiendo una masa solar
    print(nombre, ": zona habitable de", round(dentro, 3), "a", round(fuera, 3), "UA")</pre></div>
<ol>
<li>Compara la temperatura de equilibrio con la real en los cuatro planetas del sistema solar. La diferencia mide el efecto invernadero. En Mercurio la media no significa mucho: no tiene atmósfera que reparta el calor.</li>
<li>La zona habitable de una enana roja está tan cerca de la estrella que el planeta da una vuelta en pocos días. Eso facilita ver muchos tránsitos.</li>
<li>La última línea del bucle calcula un periodo que no se imprime y que supone una masa solar. Corrígela: usa la tercera ley de Kepler con una masa de 0,15 soles para la enana roja e imprime el resultado.</li>
</ol>
<h3>Observación</h3>
<p>Con unos prismáticos apoyados en algo firme se ven las cuatro lunas grandes de Júpiter como puntos alineados. Una de ellas es Europa. Un programa de planetario, como Stellarium, te dice cuál es cada una esa noche. Marte se distingue a simple vista por su color.</p>`,
          notas: [{ id: "habitable", label: "Periodo que te sale para la zona habitable de la enana roja, y tu observación de Júpiter o Marte" }],
          tareasTitulo: "Lista de observación",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Ver las lunas de Júpiter con prismáticos e identificar Europa." },
            { id: "t2", texto: "Localizar Marte y anotar su color y su brillo." },
            { id: "t3", texto: "Leer una noticia reciente sobre una biofirma y separar lo medido de lo interpretado." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Temperatura de equilibrio:</strong> $T_\text{eq} = 278\,(1-A)^{1/4}L^{1/4}/\sqrt{a}$ K. Para la Tierra, 255 K. La atmósfera añade 33 K.`,
          R`<strong>La zona habitable</strong> escala con $\sqrt{L}$ y solo indica que el agua líquida es posible.`,
          R`<strong>La atmósfera se lee en el tránsito.</strong> La señal crece con la escala de altura $H = kT/(\mu m_\text{H} g)$ y con $1/R_\ast^{2}$.`,
          R`<strong>Se han medido moléculas</strong> en gigantes calientes. En planetas rocosos templados, todavía no hay nada firme.`,
          R`<strong>No se ha detectado vida fuera de la Tierra.</strong> Los anuncios de biofirmas están en discusión.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 44 ───────────────────────── */
    {
      id: "leccion-44", n: 44, fase: 5, codigo: "B7.3",
      titulo: "Datos públicos con Python",
      sub: "Dónde están los datos de los grandes telescopios, cómo se descargan y cómo se saca de ellos una medida con su error.",
      horas: "6 horas",
      contexto: "Archivos públicos: MAST (Kepler, TESS, Hubble, James Webb), archivo de Gaia, NASA Exoplanet Archive, SDSS, SIMBAD y VizieR. Herramientas: astroquery y lightkurve. Flujo de trabajo: pregunta, datos, limpieza, modelo, incertidumbre, comparación. Señal entre ruido de un tránsito: (delta/sigma) raíz(N). Búsqueda de periodo plegando la curva de luz. Propagación de errores: el error relativo del radio es la mitad del de la profundidad, sumado en cuadratura con el de la estrella. Trampas: binarias eclipsantes, sistemáticos, probar muchos periodos. Reproducibilidad.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Imagina que los operadores de todas las redes del mundo publicaran sus trazas en bruto al cabo de un año, con la documentación de los equipos. Cualquier ingeniero podría rehacer sus análisis o buscar en ellas algo que nadie miró. En astronomía eso es lo normal.</p>
<p>Las curvas de luz de los satélites Kepler y TESS, el catálogo de Gaia con casi dos mil millones de estrellas, los espectros del SDSS y las imágenes del Hubble y del James Webb se pueden descargar gratis desde casa. Son los mismos ficheros que usan los profesionales, y hay descubrimientos publicados por aficionados que los revisaron con paciencia.</p>
<div class="nota"><strong>Lo que cambia en esta lección.</strong> Hasta ahora cada ejercicio tenía una respuesta que la web podía comprobar. Con datos reales no hay solucionario. Hay un resultado, una incertidumbre y una comparación con lo publicado. Aprender a fiarte de tu propio número, o a desconfiar de él, es el objetivo.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Dónde están los datos</h3>
<div class="tabla"><table>
<thead><tr><th>Archivo</th><th>Qué contiene</th><th>Para qué sirve</th></tr></thead>
<tbody>
<tr><td>MAST</td><td>Kepler, TESS, Hubble, James Webb</td><td>Curvas de luz, imágenes y espectros desde el espacio</td></tr>
<tr><td>Archivo de Gaia</td><td>Posición, paralaje, movimiento propio y color de 1800 millones de estrellas</td><td>Distancias, cúmulos, diagramas H-R</td></tr>
<tr><td>NASA Exoplanet Archive</td><td>Tabla de todos los exoplanetas confirmados</td><td>Estadística y comparación con tus resultados</td></tr>
<tr><td>SDSS</td><td>Imágenes y espectros de millones de galaxias</td><td>Corrimientos al rojo, clasificación</td></tr>
<tr><td>SIMBAD y VizieR</td><td>Identificadores, bibliografía y catálogos publicados</td><td>Saber qué se conoce ya de un objeto</td></tr>
<tr><td>ESASky</td><td>Visor del cielo en todas las longitudes de onda</td><td>Explorar sin programar</td></tr>
</tbody></table></div>

<h3>2. Las herramientas</h3>
<p>Dos paquetes de Python hacen casi todo el trabajo. Se instalan una vez:</p>
<div class="tabla"><pre>pip install astroquery lightkurve</pre></div>
<ul>
<li><strong>astroquery</strong> consulta los archivos desde un programa y devuelve tablas de astropy, como las de la Lección 13.</li>
<li><strong>lightkurve</strong> descarga y trata curvas de luz de Kepler y TESS.</li>
</ul>
<p>El archivo de Gaia se consulta con ADQL, un lenguaje casi idéntico a SQL. Si has hecho alguna consulta a una base de datos, ya sabes usarlo.</p>

<h3>3. El flujo de trabajo</h3>
<ol>
<li><strong>Una pregunta concreta.</strong> «¿Qué radio tiene este planeta?» sirve. «Estudiar exoplanetas» no.</li>
<li><strong>Los datos.</strong> Qué instrumento, qué objeto, qué fechas. Anótalo.</li>
<li><strong>La limpieza.</strong> Quitar medidas marcadas como defectuosas y tendencias que no vienen del objeto.</li>
<li><strong>El modelo.</strong> La fórmula que relaciona lo que mides con lo que buscas.</li>
<li><strong>La incertidumbre.</strong> Un resultado sin error no se puede comparar con nada.</li>
<li><strong>La comparación.</strong> Con el valor publicado. Si no coincide, hay que entender por qué antes de creer cualquiera de los dos.</li>
</ol>

<h3>4. Señal y ruido</h3>
<p>Si cada medida de brillo tiene un ruido $\sigma$ y dentro de los tránsitos caen $N$ medidas, el promedio de esas $N$ tiene un ruido $\sigma/\sqrt{N}$ (Lección 20). La profundidad $\delta$ se detecta con una relación entre señal y ruido</p>
$$\text{S/R} = \frac{\delta}{\sigma}\sqrt{N}$$
<p>Para dar por buena una detección se suele pedir un valor por encima de 7. Con menos, lo que parece un tránsito puede ser una fluctuación.</p>

<h3>5. Buscar un periodo</h3>
<p>Si no conoces el periodo, lo pruebas. Para cada periodo candidato se <em>pliega</em> la curva de luz: se calcula en qué momento de la vuelta cae cada medida y se superponen todas las vueltas. Con el periodo correcto, los tránsitos se apilan en el mismo sitio y aparece una caída clara. Con uno equivocado, se reparten y se diluyen.</p>
<p>El algoritmo habitual, llamado BLS, hace esto de forma sistemática ajustando un escalón rectangular. La práctica incluye una versión reducida, de quince líneas, para que veas que no tiene misterio.</p>

<h3>6. Propagar los errores</h3>
<p>El radio del planeta se obtiene como $R_p = R_\ast\sqrt{\delta}$. Dos reglas bastan:</p>
<ul>
<li><strong>Una raíz cuadrada reduce a la mitad el error relativo.</strong> Si $\delta$ tiene un 4 % de error, $\sqrt{\delta}$ tiene un 2 %.</li>
<li><strong>Los errores relativos de un producto se suman en cuadratura,</strong> si son independientes: $\sqrt{e_1^{2} + e_2^{2}}$.</li>
</ul>
<p>Con un 2 % por la profundidad y un 5 % por el radio de la estrella, el radio del planeta tiene un $\sqrt{4 + 25} = 5{,}4\,\%$. Casi todo el error viene de la estrella. Es lo habitual: se conoce el planeta tan bien como se conozca su estrella.</p>

<h3>7. Las trampas</h3>
<ul>
<li><strong>Binarias eclipsantes.</strong> Dos estrellas que se eclipsan producen caídas periódicas. Delatan a la binaria una caída muy profunda, con forma de V, o un segundo eclipse más débil a media vuelta.</li>
<li><strong>Sistemáticos.</strong> El satélite se mueve, se calienta y recibe luz dispersa de la Tierra. Eso deja ondulaciones que no son de la estrella.</li>
<li><strong>Limpiar de más.</strong> El filtro que quita las ondulaciones puede llevarse parte del tránsito si su ventana es demasiado corta.</li>
<li><strong>Probar muchas veces.</strong> Si ensayas diez mil periodos, alguno dará una caída aparente por puro azar. El umbral de 7 existe por eso.</li>
<li><strong>Buscar el número que quieres.</strong> Ajustar los parámetros del análisis hasta que el resultado coincida con el publicado no es medir.</li>
</ul>

<h3>8. Que otro pueda repetirlo</h3>
<p>Guarda el programa completo, y no solo el resultado. Anota la versión de los paquetes, el identificador exacto de los datos y la fecha de descarga. Si usas números aleatorios, fija la semilla. Dentro de seis meses, ese otro que quiere repetirlo serás tú.</p>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>De la curva de luz al radio, con su error</h3>
<p>Para HD 209458 b se mide una profundidad $\delta = 1{,}46 \pm 0{,}02\,\%$. El radio de la estrella es $R_\ast = 1{,}16 \pm 0{,}02\ R_\odot$.</p>
<p><strong>Cociente de radios:</strong></p>
$$\frac{R_p}{R_\ast} = \sqrt{0{,}0146} = 0{,}1208$$
<p><strong>Radio del planeta,</strong> en radios solares y luego en radios de Júpiter, sabiendo que $R_\odot/R_\text{J} = 695\,700/71\,492 = 9{,}731$:</p>
$$R_p = 0{,}1208 \times 1{,}16 = 0{,}1402\ R_\odot = 0{,}1402 \times 9{,}731 = 1{,}36\ R_\text{J}$$
<p><strong>Error por la profundidad:</strong> el error relativo de $\delta$ es $0{,}02/1{,}46 = 1{,}4\,\%$. El de su raíz, la mitad: $0{,}7\,\%$.</p>
<p><strong>Error por la estrella:</strong> $0{,}02/1{,}16 = 1{,}7\,\%$.</p>
<p><strong>Total, en cuadratura:</strong></p>
$$\sqrt{0{,}7^{2} + 1{,}7^{2}} = \sqrt{0{,}49 + 2{,}89} = 1{,}8\,\%$$
<p><strong>Resultado:</strong> $1{,}8\,\%$ de 1,36 son 0,03.</p>
$$R_p = 1{,}36 \pm 0{,}03\ R_\text{J}$$
<p>Los valores publicados están entre 1,36 y 1,39. Coincide.</p>
<p><strong>Una salvedad.</strong> La fórmula $(R_p/R_\ast)^{2}$ supone un disco de brillo uniforme. Las estrellas son más brillantes en el centro que en el borde, como se aprecia en cualquier fotografía del Sol, y un tránsito central tapa más luz de la que corresponde a su área. Los análisis profesionales ajustan ese efecto, el <em>oscurecimiento del limbo</em>, junto con el radio. Si en tu proyecto obtienes un radio algo mayor que el publicado, esta es la primera causa que debes sospechar.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Señal y ruido",
            enunciado: R`<p>Un planeta como la Tierra produce un tránsito de 84 ppm. Promediando todas las medidas de un tránsito, el ruido es de 30 ppm.</p>`,
            partes: [
              { id: "a", pregunta: "Relación entre señal y ruido con un solo tránsito", tipo: "num", unidad: "", respuesta: 2.8, tol: 0.02,
                pistas: ["Divide la profundidad entre el ruido."],
                solucion: R`$84/30 = 2{,}8$. No basta para afirmar nada.` },
              { id: "b", pregunta: "Con cuatro tránsitos", tipo: "num", unidad: "", respuesta: 5.6, tol: 0.02,
                errores: [{ v: 11.2, msg: "El ruido baja con la raíz del número de tránsitos, no con el número." }],
                pistas: ["Multiplica por √4."],
                solucion: R`$2{,}8 \times 2 = 5{,}6$.` },
              { id: "c", pregunta: "Número mínimo de tránsitos para superar un valor de 7", tipo: "num", unidad: "tránsitos", respuesta: 7, tol: 0.01,
                errores: [{ v: 6, msg: "Con seis sale 6,9, que no llega." }, { v: 3, msg: "Hay que elevar al cuadrado el cociente 7 / 2,8." }],
                pistas: ["Hace falta √N mayor que 7 / 2,8 = 2,5.", "N mayor que 6,25, y tiene que ser entero."],
                solucion: R`$(7/2{,}8)^{2} = 6{,}25$, así que hacen falta 7 tránsitos. Para un planeta con periodo de un año son siete años de observación continua. La misión Kepler duró cuatro, y por eso quedó a las puertas de encontrar una Tierra en torno a un Sol.` }
            ] },
          { id: "e2", nivel: 2, titulo: "De la curva al planeta",
            enunciado: R`<p>En una curva de luz de TESS de la estrella WASP-18, de 1,26 radios solares y 1,22 masas solares, mides una profundidad del 0,95 %. El primer tránsito está centrado en el día 1354,458 y el décimo en el día 1362,931. Datos: $R_\odot/R_\text{J} = 9{,}731$, $G = 6{,}674 \times 10^{-11}$, $M_\odot = 1{,}989 \times 10^{30}$ kg, $1\ \text{UA} = 1{,}496 \times 10^{11}$ m.</p>`,
            partes: [
              { id: "a", pregunta: "Radio del planeta, en radios de Júpiter", tipo: "num", unidad: "R_J", respuesta: 1.195, tol: 0.03,
                pistas: ["√0,0095 = 0,0975.", "Multiplica por 1,26 y por 9,731."],
                solucion: R`$0{,}0975 \times 1{,}26 \times 9{,}731 = 1{,}20\ R_\text{J}$.` },
              { id: "b", pregunta: "Periodo orbital", tipo: "num", unidad: "días", respuesta: 0.9414, tol: 0.005,
                errores: [{ v: 0.8473, msg: "Entre el primer tránsito y el décimo hay nueve periodos, no diez." }],
                pistas: ["Diferencia de tiempos: 8,473 días.", "Entre el primero y el décimo hay nueve vueltas."],
                solucion: R`$\dfrac{1362{,}931 - 1354{,}458}{9} = 0{,}9414$ días. Su año dura menos de 23 horas.` },
              { id: "c", pregunta: "Radio de la órbita, con la tercera ley de Kepler", tipo: "num", unidad: "UA", respuesta: 0.0201, tol: 0.03,
                pistas: ["a³ = G M P² / (4π²), con M = 2,427 × 10³⁰ kg y P = 81 337 s.", "a³ = 2,714 × 10²⁸ m³."],
                solucion: R`$a = (2{,}714 \times 10^{28})^{1/3} = 3{,}005 \times 10^{9}$ m $= 0{,}020$ UA. Solo 3,4 veces el radio de su estrella.` },
              { id: "d", pregunta: "Si la profundidad tiene un error relativo del 4 % y el radio de la estrella del 5 %, ¿qué error relativo tiene el radio del planeta?", tipo: "num", unidad: "%", respuesta: 5.4, tol: 0.03,
                errores: [{ v: 6.4, msg: "El error de la profundidad se divide entre dos antes de combinarlo, por la raíz cuadrada." }, { v: 7, msg: "Los errores independientes se suman en cuadratura, y el de la profundidad entra a la mitad." }],
                pistas: ["La raíz reduce el 4 % a un 2 %.", "√(2² + 5²)."],
                solucion: R`$\sqrt{4 + 25} = 5{,}4\,\%$.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Una estrella en el catálogo de Gaia",
            enunciado: R`<p>Una estrella tiene en Gaia una paralaje de $20{,}00 \pm 0{,}02$ milisegundos de arco y una magnitud aparente $G = 8{,}50$.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia", tipo: "num", unidad: "pc", respuesta: 50, tol: 0.01,
                pistas: ["d en pársecs = 1000 / paralaje en milisegundos de arco."],
                solucion: R`$1000/20 = 50$ pc.` },
              { id: "b", pregunta: "Error de esa distancia", tipo: "num", unidad: "pc", respuesta: 0.05, tol: 0.05,
                pistas: ["El error relativo de la distancia es el mismo que el de la paralaje: 0,02 / 20."],
                solucion: R`$0{,}1\,\%$ de 50 pc son 0,05 pc. Antes de Gaia, un error del 10 % a esa distancia se consideraba bueno.` },
              { id: "c", pregunta: "Magnitud absoluta", tipo: "num", unidad: "mag", respuesta: 5.0, tol: 0.02,
                errores: [{ v: 12, msg: "El módulo de distancia se resta, porque a 10 pc la estrella se vería más brillante." }],
                pistas: ["M = m − 5 log(d / 10).", "log 5 = 0,699."],
                solucion: R`$M = 8{,}50 - 5 \times 0{,}699 = 5{,}0$. Muy parecida a la del Sol, que tiene 4,7 en esa banda.` },
              { id: "d", pregunta: "Una curva de luz muestra caídas del 20 % cada 2,1 días, en forma de V, y otras del 5 % justo a media vuelta. Lo más probable es que sea:", tipo: "opcion", respuesta: 1,
                opciones: ["Un planeta gigante", "Una binaria eclipsante", "Un fallo del satélite", "Una estrella variable cefeida"],
                pistas: ["Un planeta del tamaño de Júpiter tapa un 1 %.", "¿Qué produce un segundo eclipse a media vuelta?"],
                solucion: R`Dos estrellas. Un 20 % exige un cuerpo de casi la mitad del radio de la estrella, y el segundo eclipse indica que ese cuerpo también brilla.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>1. Un buscador de periodos hecho a mano</h3>
<p>No necesita conexión. Crea una curva de luz con un planeta de periodo «desconocido» y lo busca plegando.</p>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)
t = np.arange(0, 27.0, 2 / 1440)                  # 27 días, una medida cada 2 minutos
P_real = 2.7183
fase = (t - 0.9) % P_real
flujo = 1 + rng.normal(0, 0.002, t.size) - 0.0015 * (0.1 > fase)

periodos = np.arange(1, 5, 0.001)
cajas = 60
caida = np.zeros(periodos.size)

for i, P in enumerate(periodos):
    caja = ((t % P) / P * cajas).astype(int)
    media = np.bincount(caja, flujo, cajas) / np.bincount(caja, minlength=cajas)
    caida[i] = np.median(media) - media.min()

mejor = periodos[caida.argmax()]
print("periodo encontrado:", round(mejor, 3), "días. El real era", P_real)
print("profundidad:", round(caida.max() * 1e6), "ppm. La real era 1500")

fig, ejes = plt.subplots(2, 1)
ejes[0].plot(periodos, caida)
ejes[0].set_xlabel("periodo de prueba (días)")
ejes[1].plot((t % mejor) / mejor, flujo, ".", markersize=1)
ejes[1].set_xlabel("fase")
plt.show()</pre></div>
<ol>
<li>El periodo sale con un error de una milésima de día, aunque la caída es menor que el ruido de cada punto.</li>
<li>En el panel de arriba hay un segundo pico a la mitad del periodo real. Piensa por qué, y por qué es más bajo.</li>
<li>Reduce la profundidad a 0,0003 y repite. El programa seguirá dando un «mejor periodo». Decide si te lo crees.</li>
</ol>
<h3>2. Una curva de luz real de TESS</h3>
<p>Necesita conexión y el paquete lightkurve.</p>
<div class="tabla"><pre>import numpy as np
import lightkurve as lk

busqueda = lk.search_lightcurve("WASP-18", author="SPOC", exptime=120)
print(busqueda)

lc = busqueda[0].download().remove_nans().normalize()
plana = lc.flatten(window_length=901)

pg = plana.to_periodogram(method="bls", period=np.arange(0.5, 5, 0.001))
P = pg.period_at_max_power
t0 = pg.transit_time_at_max_power
print("periodo:", P, " profundidad:", pg.depth_at_max_power)

plana.fold(period=P, epoch_time=t0).scatter()</pre></div>
<p>Compara el periodo y la profundidad con los del ejercicio 2 y con los del NASA Exoplanet Archive.</p>
<h3>3. Un diagrama H-R con Gaia</h3>
<div class="tabla"><pre>import numpy as np
import matplotlib.pyplot as plt
from astroquery.gaia import Gaia

consulta = """
SELECT TOP 20000 parallax, phot_g_mean_mag, bp_rp
FROM gaiadr3.gaia_source
WHERE parallax > 20
  AND parallax_over_error > 50
  AND bp_rp IS NOT NULL
"""
tabla = Gaia.launch_job_async(consulta).get_results()

M_G = tabla["phot_g_mean_mag"] + 5 * np.log10(tabla["parallax"]) - 10

plt.scatter(tabla["bp_rp"], M_G, s=1)
plt.gca().invert_yaxis()
plt.xlabel("color BP - RP")
plt.ylabel("magnitud absoluta G")
plt.show()</pre></div>
<p>Son estrellas a menos de 50 pársecs. Deberías reconocer la secuencia principal, unas pocas gigantes arriba a la derecha y la banda de las enanas blancas abajo a la izquierda: el diagrama de la Lección 29, hecho por ti con datos de un satélite.</p>
<div class="nota"><strong>Sobre estos dos últimos programas.</strong> Usan las funciones documentadas de lightkurve y astroquery, pero dependen de servidores externos y de la versión instalada. Si alguno da error, copia el mensaje en el tutor de la web. Lo más frecuente es un cambio de nombre en una función o un servidor saturado.</div>`,
          notas: [{ id: "datos", label: "Periodo y profundidad que has medido en WASP-18, y qué reconoces en tu diagrama H-R" }],
          tareasTitulo: "Puesta a punto",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Instalar astroquery y lightkurve." },
            { id: "t2", texto: "Ejecutar el buscador de periodos y explicar el pico a mitad de periodo." },
            { id: "t3", texto: "Descargar y plegar la curva de luz de WASP-18." },
            { id: "t4", texto: "Dibujar el diagrama H-R con Gaia." },
            { id: "t5", texto: "Guardar los tres programas en una carpeta con la fecha y las versiones de los paquetes." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Los datos de los grandes telescopios son públicos</strong> y se descargan con astroquery y lightkurve.`,
          R`<strong>Todo análisis sigue seis pasos:</strong> pregunta, datos, limpieza, modelo, incertidumbre y comparación.`,
          R`<strong>Señal entre ruido de un tránsito:</strong> $(\delta/\sigma)\sqrt{N}$. Por debajo de 7, desconfía.`,
          R`<strong>Errores:</strong> una raíz reduce a la mitad el error relativo, y los independientes se suman en cuadratura.`,
          R`<strong>Un resultado vale</strong> si lleva su error y otra persona puede repetirlo.`
        ] }
      ]
    },

    /* ───────────────────────── LECCIÓN 45 ───────────────────────── */
    {
      id: "leccion-45", n: 45, fase: 5, codigo: "Proyecto",
      titulo: "Proyecto final",
      sub: "Una medida propia, de principio a fin, con datos reales y un informe.",
      horas: "100 horas, en unas 20 semanas",
      contexto: "Proyecto final del curso. Tres propuestas: A, caracterizar un exoplaneta en tránsito con datos de TESS (periodo, radio, órbita, temperatura de equilibrio); B, distancia, diagrama H-R y edad de un cúmulo abierto con Gaia (Pléyades: paralaje 7,36 mas, 136 pc, movimiento propio +20 y -45 mas/año); C, detectar la línea de 21 cm del hidrógeno con una bocina casera y un receptor SDR y medir la rotación de la galaxia (haz 70 lambda/D grados, ecuación del radiómetro, 0,211 km/s por kHz, método del punto tangente v = v_max + v0 sen l, R = R0 sen l). Estructura del informe, calendario y cómo seguir después del curso.",
      secciones: [
        { id: "intuicion", titulo: "Intuición", html: R`
<p class="lead">Hay una diferencia entre aprobar la asignatura de radioenlaces y poner uno en servicio. En el segundo caso nadie te da el enunciado, los datos vienen sucios, y al final hay un número que tiene que ser cierto. El proyecto final es eso, con el cielo.</p>
<p>No se trata de descubrir nada. Se trata de medir algo que ya se conoce, por tus propios medios, y obtener un valor compatible con el publicado dentro de un error que tú mismo has estimado. Quien sabe hacer eso sabe cómo se construye el conocimiento que ha estudiado en las otras 44 lecciones.</p>
<div class="nota"><strong>Elige por interés, no por dificultad.</strong> Los tres proyectos propuestos son viables con cinco horas semanales. El tercero está pensado para un ingeniero de telecomunicaciones y es el único que requiere comprar material.</div>` },

        { id: "desarrollo", titulo: "Desarrollo", html: R`
<h3>1. Qué hace bueno un proyecto</h3>
<ul>
<li><strong>Una pregunta que cabe en una frase</strong> y cuya respuesta es un número o una gráfica.</li>
<li><strong>Datos que ya existen</strong> o que puedes tomar tú en unas pocas noches.</li>
<li><strong>Un valor publicado</strong> con el que comparar.</li>
<li><strong>Una incertidumbre estimada</strong> y explicada.</li>
</ul>

<h3>2. Las tres propuestas</h3>
<div class="tabla"><table>
<thead><tr><th></th><th>A. Un exoplaneta con TESS</th><th>B. Un cúmulo con Gaia</th><th>C. La galaxia en 21 cm</th></tr></thead>
<tbody>
<tr><td>Pregunta</td><td>¿Qué periodo, radio y temperatura tiene este planeta?</td><td>¿A qué distancia está este cúmulo y qué edad tiene?</td><td>¿A qué velocidad gira la Vía Láctea?</td></tr>
<tr><td>Datos</td><td>Curvas de luz públicas</td><td>Catálogo público</td><td>Los tomas tú</td></tr>
<tr><td>Material</td><td>Ordenador</td><td>Ordenador</td><td>Bocina casera, amplificador con filtro, receptor SDR</td></tr>
<tr><td>Coste</td><td>0 €</td><td>0 €</td><td>Entre 100 y 200 €</td></tr>
<tr><td>Lecciones que usa</td><td>12, 42, 43, 44</td><td>2, 3, 29, 30, 44</td><td>18, 22, 36</td></tr>
<tr><td>Riesgo</td><td>Bajo</td><td>Bajo</td><td>Medio: depende de las interferencias de tu zona</td></tr>
</tbody></table></div>

<h3>3. Proyecto A: un exoplaneta de principio a fin</h3>
<ol>
<li>Elige en el NASA Exoplanet Archive un Júpiter caliente con tránsito de más del 0,5 %, estrella más brillante que magnitud 11 y datos de TESS. Algunos candidatos: WASP-18 b, WASP-121 b, KELT-9 b, HAT-P-7 b.</li>
<li>Descarga todas las curvas de luz disponibles, no solo una.</li>
<li>Limpia, busca el periodo y pliega, como en la Lección 44.</li>
<li>Mide profundidad y duración. Estima el error de la profundidad con la dispersión de los puntos fuera de tránsito.</li>
<li>Calcula el radio, el radio de la órbita con Kepler y la temperatura de equilibrio, cada uno con su error.</li>
<li>Compara con lo publicado y discute las diferencias. El oscurecimiento del limbo será una de ellas.</li>
</ol>
<p>Ampliación: mide el instante central de cada tránsito por separado y comprueba si el periodo es constante.</p>

<h3>4. Proyecto B: pesar y fechar un cúmulo</h3>
<ol>
<li>Elige un cúmulo abierto cercano: las Pléyades, las Híades, el Pesebre o el de Coma Berenices.</li>
<li>Pide a Gaia todas las estrellas en un círculo de unos grados alrededor de su centro.</li>
<li>Dibuja el movimiento propio en ascensión recta frente al de declinación. Los miembros del cúmulo se mueven juntos y forman un grumo apartado del resto. Selecciónalo. En las Pléyades está cerca de $+20$ y $-45$ milisegundos de arco por año.</li>
<li>Calcula la paralaje media de los miembros y su dispersión. De ahí salen la distancia y su error.</li>
<li>Dibuja el diagrama H-R de los miembros con magnitudes absolutas.</li>
<li>Localiza el punto donde la secuencia principal se dobla hacia las gigantes y estima la edad con la relación entre masa y tiempo de vida de la Lección 28.</li>
</ol>
<p>Ampliación: repite con dos cúmulos de edades distintas y superpón sus diagramas.</p>

<h3>5. Proyecto C: la línea de 21 cm</h3>
<p>El hidrógeno neutro de la galaxia emite a 1420,406 MHz. La señal es débil, pero está en una banda protegida y el montaje es sencillo.</p>
<p><strong>La cadena de recepción:</strong></p>
<ol>
<li><strong>Antena.</strong> Una bocina piramidal de cartón pluma forrado de papel de aluminio, o de chapa, con una boca de unos 75 cm, y una transición a coaxial hecha con una lata y un monopolo de un cuarto de onda. Hay planos publicados por varias universidades y asociaciones.</li>
<li><strong>Amplificador de bajo ruido con filtro</strong> centrado en 1420 MHz, conectado directamente a la antena. Es la pieza que fija la temperatura de sistema.</li>
<li><strong>Receptor SDR</strong> de tipo RTL-SDR, con 2 MHz de ancho de banda o más.</li>
<li><strong>Programa</strong> que promedie espectros durante minutos. Sirve GNU Radio o un programa en Python.</li>
</ol>
<p><strong>El procedimiento:</strong></p>
<ol>
<li>Toma un espectro apuntando al plano de la galaxia y otro apuntando lejos de él. Divide el primero entre el segundo. Así se quita la forma del filtro y queda la línea.</li>
<li>Convierte la frecuencia en velocidad con el Doppler de la Lección 18: 1 kHz equivale a 0,211 km/s.</li>
<li>Corrige el movimiento de la Tierra y del Sol. astropy lo hace con una función.</li>
<li>Repite en varias longitudes galácticas $l$, de 20° a 80°, siguiendo la Vía Láctea.</li>
<li>En cada dirección, anota la velocidad máxima $v_\text{máx}$ a la que hay emisión. Corresponde al gas del <em>punto tangente</em>, donde la línea de visión roza una órbita circular y toda la velocidad del gas apunta hacia fuera. Su distancia al centro y su velocidad de rotación son</li>
</ol>
$$R = R_0 \sin l \qquad v(R) = v_\text{máx} + v_0 \sin l$$
<p>con $R_0 = 8{,}2$ kpc y $v_0 = 230$ km/s, los valores del Sol. Con media docena de direcciones tienes una curva de rotación de la galaxia interior medida desde tu ventana.</p>

<h3>6. Un calendario de veinte semanas</h3>
<div class="tabla"><table>
<thead><tr><th>Semanas</th><th>Qué hacer</th><th>Señal de que vas bien</th></tr></thead>
<tbody>
<tr><td>1 y 2</td><td>Elegir proyecto y objeto. Escribir la pregunta en una frase</td><td>Puedes explicársela a alguien en un minuto</td></tr>
<tr><td>3 a 5</td><td>Conseguir los datos o montar el equipo</td><td>Tienes una primera gráfica, aunque sea fea</td></tr>
<tr><td>6 a 10</td><td>Análisis principal</td><td>Tienes un primer número</td></tr>
<tr><td>11 a 14</td><td>Incertidumbres y comprobaciones</td><td>Sabes qué parte del análisis cambia más el resultado</td></tr>
<tr><td>15 a 17</td><td>Comparación con lo publicado y ampliación</td><td>Entiendes las diferencias, o sabes decir que no las entiendes</td></tr>
<tr><td>18 a 20</td><td>Informe</td><td>Otra persona podría repetirlo leyéndolo</td></tr>
</tbody></table></div>

<h3>7. El informe</h3>
<p>Entre seis y diez páginas, con esta estructura:</p>
<ol>
<li><strong>Resumen,</strong> de cinco líneas, con el resultado y su error.</li>
<li><strong>Pregunta y contexto.</strong></li>
<li><strong>Datos:</strong> origen, fechas, identificadores.</li>
<li><strong>Método,</strong> con las fórmulas y las decisiones que has tomado.</li>
<li><strong>Resultados,</strong> con gráficas rotuladas y unidades.</li>
<li><strong>Discusión:</strong> comparación, fuentes de error, qué harías distinto.</li>
<li><strong>Programa completo,</strong> en un anexo.</li>
</ol>

<h3>8. Y después</h3>
<ul>
<li><strong>Colaboraciones entre aficionados y profesionales.</strong> La AAVSO recoge medidas de estrellas variables desde hace más de un siglo. Exoplanet Watch, de la NASA, pide tránsitos medidos por aficionados para mantener al día las efemérides. Zooniverse tiene decenas de proyectos de clasificación.</li>
<li><strong>Una agrupación astronómica cercana.</strong> Es la forma más rápida de mirar por un telescopio antes de comprar uno y de aprender a elegirlo.</li>
<li><strong>Libros para seguir.</strong> <em>An Introduction to Modern Astrophysics,</em> de Carroll y Ostlie, cubre todo este temario con el nivel de un grado de Física. <em>Fundamental Astronomy,</em> de Karttunen y otros, es más breve.</li>
<li><strong>Las matemáticas que faltan.</strong> Cálculo en varias variables y ecuaciones diferenciales abren la puerta a la estructura estelar completa y a la relatividad general con sus ecuaciones.</li>
</ul>` },

        { id: "ejemplo", titulo: "Ejemplo resuelto", html: R`
<h3>¿Se puede detectar la línea de 21 cm con una bocina de 75 cm?</h3>
<p>Antes de comprar nada conviene hacer el balance, como en cualquier enlace.</p>
<p><strong>Anchura del haz.</strong> Para una apertura de tamaño $D$, la difracción de la Lección 19 da un ángulo de $1{,}22\,\lambda/D$ radianes, que son $70\,\lambda/D$ grados:</p>
$$\theta \approx 70 \times \frac{0{,}211}{0{,}75} = 20^\circ$$
<p>Es un haz muy ancho. No distinguirá detalles, pero la Vía Láctea es una banda que cruza todo el cielo y lo llena de sobra.</p>
<p><strong>Sensibilidad.</strong> Con una temperatura de sistema de 150 K, canales de 10 kHz y un minuto de integración, la ecuación del radiómetro de la Lección 22 da</p>
$$\Delta T = \frac{T_\text{sis}}{\sqrt{B\,t}} = \frac{150}{\sqrt{10^{4} \times 60}} = \frac{150}{775} = 0{,}19\ \text{K}$$
<p><strong>Señal.</strong> En el plano de la galaxia, la línea tiene una temperatura de brillo de varias decenas de kelvin, y el haz está lleno. La relación entre señal y ruido supera 100 en un minuto.</p>
<p><strong>Resolución en velocidad</strong> de un canal de 10 kHz:</p>
$$\Delta v = c\,\frac{\Delta f}{f} = 2{,}998 \times 10^{5} \times \frac{10}{1\,420\,406} = 2{,}1\ \text{km/s}$$
<p>Las velocidades de la galaxia son de decenas a cientos de km/s. Sobra resolución.</p>
<p><strong>Conclusión.</strong> El proyecto es viable. La dificultad real no sale en esta cuenta: son las interferencias y la estabilidad de la ganancia entre el espectro de la fuente y el de referencia.</p>
<h3>Un punto de la curva de rotación</h3>
<p>Apuntando a la longitud galáctica $l = 30^\circ$, la emisión llega hasta $v_\text{máx} = 105$ km/s.</p>
$$R = 8{,}2 \times \sin 30^\circ = 4{,}1\ \text{kpc} \qquad v = 105 + 230 \times \sin 30^\circ = 105 + 115 = 220\ \text{km/s}$$
<p>A mitad de camino hacia el centro, la galaxia gira casi tan rápido como aquí. Es la curva plana de la Lección 36, obtenida ahora con tu antena.</p>` },

        { id: "ejercicios", titulo: "Ejercicios", ejercicios: [
          { id: "e1", nivel: 1, titulo: "Proyecto B: las Pléyades",
            enunciado: R`<p>Los miembros de las Pléyades tienen en Gaia una paralaje media de 7,36 milisegundos de arco.</p>`,
            partes: [
              { id: "a", pregunta: "Distancia al cúmulo", tipo: "num", unidad: "pc", respuesta: 136, tol: 0.02,
                pistas: ["1000 / 7,36."],
                solucion: R`$1000/7{,}36 = 136$ pc, unos 443 años luz.` },
              { id: "b", pregunta: "Módulo de distancia, m − M", tipo: "num", unidad: "mag", respuesta: 5.67, tol: 0.02,
                pistas: ["5 log(d / 10), con d = 135,9 pc."],
                solucion: R`$5 \log(13{,}59) = 5 \times 1{,}133 = 5{,}67$. Es lo que hay que restar a cada magnitud aparente para dibujar el diagrama H-R.` },
              { id: "c", pregunta: "El núcleo del cúmulo ocupa unos 2° en el cielo. ¿Qué tamaño real tiene?", tipo: "num", unidad: "pc", respuesta: 4.74, tol: 0.03,
                pistas: ["Pasa 2° a radianes dividiendo entre 57,3.", "Tamaño = distancia × ángulo."],
                solucion: R`$135{,}9 \times \dfrac{2}{57{,}3} = 4{,}7$ pc.` },
              { id: "d", pregunta: "Los miembros se seleccionan por su movimiento propio porque:", tipo: "opcion", respuesta: 0,
                opciones: ["Nacieron de la misma nube y se mueven juntos por el espacio", "Son las estrellas más brillantes del campo", "Tienen todas el mismo color", "El movimiento propio da la distancia"],
                pistas: ["¿Qué comparten las estrellas de un cúmulo además del lugar?"],
                solucion: R`Comparten velocidad. Las estrellas de fondo y de primer plano que caen en la misma zona del cielo se mueven de otra forma y quedan fuera del grumo.` }
            ] },
          { id: "e2", nivel: 2, titulo: "Proyecto C: el balance del enlace",
            enunciado: R`<p>Usa $\theta \approx 70\,\lambda/D$ grados, $\Delta T = T_\text{sis}/\sqrt{Bt}$, $\lambda = 0{,}211$ m y $f = 1420{,}406$ MHz.</p>`,
            partes: [
              { id: "a", pregunta: "Anchura del haz de una bocina con boca de 1,2 m", tipo: "num", unidad: "°", respuesta: 12.3, tol: 0.03,
                pistas: ["70 × 0,211 / 1,2."],
                solucion: R`$70 \times \dfrac{0{,}211}{1{,}2} = 12{,}3^\circ$.` },
              { id: "b", pregunta: "Ruido con una temperatura de sistema de 100 K, canales de 5 kHz y 5 minutos de integración", tipo: "num", unidad: "K", respuesta: 0.0816, tol: 0.03,
                errores: [{ v: 0.63, msg: "Los 5 minutos son 300 segundos." }],
                pistas: ["B t = 5000 × 300 = 1,5 × 10⁶.", "Su raíz es 1225."],
                solucion: R`$\dfrac{100}{1225} = 0{,}082$ K.` },
              { id: "c", pregunta: "Un pico de la línea aparece 400 kHz por encima de la frecuencia de reposo. Velocidad del gas respecto a ti", tipo: "num", unidad: "km/s", respuesta: -84.4, tol: 0.03,
                errores: [{ v: 84.4, msg: "Una frecuencia mayor indica que el gas se acerca. Con el convenio habitual, la velocidad de acercamiento es negativa." }],
                pistas: ["0,211 km/s por cada kHz.", "Frecuencia más alta: se acerca. Velocidad negativa."],
                solucion: R`$400 \times 0{,}211 = 84{,}4$ km/s, y como la frecuencia es mayor, el gas se acerca: $-84{,}4$ km/s.` },
              { id: "d", pregunta: "Hacia l = 50° mides una velocidad máxima de 55 km/s. Velocidad de rotación en el punto tangente", tipo: "num", unidad: "km/s", respuesta: 231, tol: 0.02,
                pistas: ["sen 50° = 0,766.", "v = 55 + 230 × 0,766."],
                solucion: R`$55 + 176 = 231$ km/s, a $R = 8{,}2 \times 0{,}766 = 6{,}3$ kpc del centro.` }
            ] },
          { id: "e3", nivel: 3, titulo: "Proyecto A: antes de descargar nada",
            enunciado: R`<p>Quieres saber si TESS puede detectar una supertierra con un tránsito de 500 ppm. Cada medida de dos minutos tiene un ruido de 600 ppm. El tránsito dura dos horas y en un sector de 27 días hay 9 tránsitos.</p>`,
            partes: [
              { id: "a", pregunta: "Número total de medidas dentro de tránsito", tipo: "num", unidad: "medidas", respuesta: 540, tol: 0.01,
                pistas: ["Dos horas son 60 medidas de dos minutos.", "Multiplica por 9 tránsitos."],
                solucion: R`$60 \times 9 = 540$.` },
              { id: "b", pregunta: "Relación entre señal y ruido", tipo: "num", unidad: "", respuesta: 19.4, tol: 0.03,
                pistas: ["(500 / 600) × √540."],
                solucion: R`$0{,}833 \times 23{,}2 = 19{,}4$. Por encima de 7 con margen: el proyecto es viable con un solo sector.` },
              { id: "c", pregunta: "Tu radio sale un 6 % mayor que el publicado y tu error es del 2 %. ¿Qué haces?", tipo: "opcion", respuesta: 2,
                opciones: ["Cambiar la ventana del filtro hasta que coincida", "Dar por bueno el valor publicado y poner ese en el informe", "Buscar la causa, empezando por el oscurecimiento del limbo y el radio de la estrella que has usado, y contarlo en el informe", "Concluir que el valor publicado está mal"],
                pistas: ["Una diferencia de tres veces tu error pide una explicación, no un ajuste."],
                solucion: R`Se investiga y se cuenta. Una discrepancia entendida es el mejor apartado de un informe. Una coincidencia forzada no vale nada.` },
              { id: "d", pregunta: "¿Cuál de estas es la mejor pregunta para un proyecto?", tipo: "opcion", respuesta: 1,
                opciones: ["Estudiar los exoplanetas de TESS", "¿Es constante el periodo de WASP-18 b a lo largo de los sectores observados por TESS?", "Demostrar que hay vida en K2-18 b", "Aprender a usar lightkurve"],
                pistas: ["Tiene que caber en una frase y responderse con un número o una gráfica."],
                solucion: R`La segunda es concreta, se responde con datos disponibles y tiene un resultado comparable con la literatura.` }
            ] }
        ] },

        { id: "practica", titulo: "Práctica", html: R`
<h3>El proyecto es la práctica</h3>
<p>Usa esta página como cuaderno. Escribe abajo la pregunta y ve marcando los hitos. El tutor de la web conoce las tres propuestas: puedes pegarle un mensaje de error, una gráfica descrita con palabras o un borrador de la discusión.</p>
<h3>Una plantilla para empezar</h3>
<p>Sirve para los tres proyectos. Rellena los huecos y guárdala junto a los datos.</p>
<div class="tabla"><pre># Proyecto final. Astronomía y astrofísica.
# Pregunta:
# Objeto:
# Datos (archivo, identificador, fecha de descarga):
# Versiones: python, numpy, astropy, lightkurve o astroquery

import numpy as np
import matplotlib.pyplot as plt

def resultado_con_error(valor, error, unidad):
    cifras = int(max(0, -np.floor(np.log10(error)) + 1))
    return f"{valor:.{cifras}f} +/- {error:.{cifras}f} {unidad}"

def error_relativo_cuadratura(*errores):
    return float(np.sqrt(sum(e**2 for e in errores)))

# ejemplo: radio de un planeta a partir de la profundidad y del radio de la estrella
profundidad, e_profundidad = 0.0146, 0.0002
R_estrella, e_R_estrella = 1.16, 0.02            # radios solares

R_p = np.sqrt(profundidad) * R_estrella * 9.731  # radios de Júpiter
e_rel = error_relativo_cuadratura(0.5 * e_profundidad / profundidad, e_R_estrella / R_estrella)
print("radio:", resultado_con_error(R_p, R_p * e_rel, "radios de Júpiter"))
print("error relativo:", round(100 * e_rel, 1), "%")</pre></div>
<p>La salida reproduce el ejemplo resuelto de la Lección 44, con algún decimal más. A partir de ahí, sustituye el ejemplo por tu análisis.</p>
<h3>Para terminar</h3>
<p>Empezaste recordando qué es un logaritmo y terminas midiendo un planeta, un cúmulo o la rotación de la galaxia. Entre un punto y otro están la mecánica, la luz, las estrellas, la relatividad y el universo entero, con sus fórmulas y con sus preguntas sin responder. Lo que hagas a partir de aquí ya no es un curso.</p>`,
          notas: [
            { id: "pregunta", label: "Proyecto elegido y pregunta, en una frase" },
            { id: "resultado", label: "Resultado final con su error, y valor publicado con el que lo comparas" },
            { id: "balance", label: "Qué harías distinto si empezaras de nuevo" }
          ],
          tareasTitulo: "Hitos del proyecto",
          tareasIntro: "",
          tareas: [
            { id: "t1", texto: "Proyecto y objeto elegidos, con la pregunta escrita." },
            { id: "t2", texto: "Datos descargados o equipo montado. Primera gráfica." },
            { id: "t3", texto: "Primer resultado numérico." },
            { id: "t4", texto: "Incertidumbre estimada y explicada." },
            { id: "t5", texto: "Comparación con el valor publicado." },
            { id: "t6", texto: "Informe terminado, con el programa en un anexo." },
            { id: "t7", texto: "Informe enseñado a otra persona." }
          ] },

        { id: "resumen", titulo: "Resumen", puntos: [
          R`<strong>Un proyecto es una pregunta concreta,</strong> unos datos, un resultado con su error y una comparación.`,
          R`<strong>Tres propuestas:</strong> un exoplaneta con TESS, un cúmulo con Gaia o la rotación de la galaxia en 21 cm.`,
          R`<strong>Antes de empezar se hace el balance:</strong> señal, ruido y tiempo necesario.`,
          R`<strong>Una discrepancia se investiga y se cuenta.</strong> No se ajusta hasta que desaparezca.`,
          R`<strong>Después del curso</strong> hay colaboraciones abiertas en las que tus medidas son útiles.`
        ] }
      ]
    }

  ]
};
