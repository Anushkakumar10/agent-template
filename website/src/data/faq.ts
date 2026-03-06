import type { Lang } from "../i18n/translations";

export interface FaqItem {
  id: string;
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}

export const faqItems: FaqItem[] = [
  {
    id: "what-is",
    question: {
      en: "What is the Full-Stack AI Agent Template?",
      pl: "Czym jest Full-Stack AI Agent Template?",
      de: "Was ist das Full-Stack AI Agent Template?",
      es: "¿Qué es el Full-Stack AI Agent Template?",
    },
    answer: {
      en: "An open-source project generator that creates production-ready AI/LLM applications with a FastAPI backend and Next.js frontend. One CLI command or the web configurator generates a complete project with your choice of AI framework, database, authentication, and 75+ configuration options.",
      pl: "Open-source'owy generator projektów, który tworzy gotowe do produkcji aplikacje AI/LLM z backendem FastAPI i frontendem Next.js. Jedna komenda CLI lub konfigurator webowy generuje kompletny projekt z wybranym frameworkiem AI, bazą danych, uwierzytelnianiem i ponad 75 opcjami konfiguracji.",
      de: "Ein Open-Source-Projektgenerator, der produktionsreife AI/LLM-Anwendungen mit einem FastAPI-Backend und Next.js-Frontend erstellt. Ein CLI-Befehl oder der Web-Konfigurator generiert ein vollständiges Projekt mit Ihrer Wahl des AI-Frameworks, der Datenbank, Authentifizierung und über 75 Konfigurationsoptionen.",
      es: "Un generador de proyectos de código abierto que crea aplicaciones AI/LLM listas para producción con un backend FastAPI y frontend Next.js. Un comando CLI o el configurador web genera un proyecto completo con tu elección de framework de IA, base de datos, autenticación y más de 75 opciones de configuración.",
    },
  },
  {
    id: "which-framework",
    question: {
      en: "Which AI framework should I choose?",
      pl: "Który framework AI powinienem wybrać?",
      de: "Welches AI-Framework sollte ich wählen?",
      es: "¿Qué framework de IA debería elegir?",
    },
    answer: {
      en: "Choose Pydantic AI for type-safe, production-grade agents with Logfire observability. Pick LangChain for the largest ecosystem of integrations. Use LangGraph for complex multi-step workflows with state management. Try CrewAI for multi-agent collaboration. Select DeepAgents for autonomous agents with planning and human-in-the-loop approval.",
      pl: "Wybierz Pydantic AI dla typowo bezpiecznych, produkcyjnych agentów z obserwowalnością Logfire. Wybierz LangChain dla największego ekosystemu integracji. Użyj LangGraph dla złożonych wieloetapowych przepływów pracy ze zarządzaniem stanem. Wypróbuj CrewAI dla współpracy wielu agentów. Wybierz DeepAgents dla autonomicznych agentów z planowaniem i zatwierdzaniem przez człowieka.",
      de: "Wählen Sie Pydantic AI für typsichere, produktionsreife Agenten mit Logfire-Observability. Nehmen Sie LangChain für das größte Ökosystem an Integrationen. Verwenden Sie LangGraph für komplexe mehrstufige Workflows mit State Management. Probieren Sie CrewAI für Multi-Agent-Kollaboration. Wählen Sie DeepAgents für autonome Agenten mit Planung und Human-in-the-Loop-Genehmigung.",
      es: "Elige Pydantic AI para agentes seguros con tipos y listos para producción con observabilidad Logfire. Escoge LangChain para el ecosistema más grande de integraciones. Usa LangGraph para flujos de trabajo complejos de múltiples pasos con gestión de estado. Prueba CrewAI para colaboración multi-agente. Selecciona DeepAgents para agentes autónomos con planificación y aprobación humana.",
    },
  },
  {
    id: "switch-framework",
    question: {
      en: "Can I switch AI frameworks after generating a project?",
      pl: "Czy mogę zmienić framework AI po wygenerowaniu projektu?",
      de: "Kann ich das AI-Framework nach der Projektgenerierung wechseln?",
      es: "¿Puedo cambiar de framework de IA después de generar un proyecto?",
    },
    answer: {
      en: "Yes. Regenerate the project with a different --ai-framework flag. Your custom code outside the generated agent module is preserved if you use version control. The web configurator also lets you export your configuration as JSON and re-import it later.",
      pl: "Tak. Wygeneruj projekt ponownie z inną flagą --ai-framework. Twój niestandardowy kod poza wygenerowanym modułem agenta jest zachowany, jeśli używasz kontroli wersji. Konfigurator webowy pozwala też wyeksportować konfigurację jako JSON i zaimportować ją później.",
      de: "Ja. Generieren Sie das Projekt mit einem anderen --ai-framework-Flag neu. Ihr benutzerdefinierter Code außerhalb des generierten Agentenmoduls bleibt erhalten, wenn Sie Versionskontrolle verwenden. Der Web-Konfigurator ermöglicht auch den Export Ihrer Konfiguration als JSON zum späteren Re-Import.",
      es: "Sí. Regenera el proyecto con una flag --ai-framework diferente. Tu código personalizado fuera del módulo de agente generado se preserva si usas control de versiones. El configurador web también permite exportar tu configuración como JSON y reimportarla después.",
    },
  },
  {
    id: "is-free",
    question: {
      en: "Is the template free to use?",
      pl: "Czy szablon jest darmowy?",
      de: "Ist das Template kostenlos?",
      es: "¿Es gratuita la plantilla?",
    },
    answer: {
      en: "Yes, completely free. The template is MIT licensed — use it for personal and commercial projects without restrictions. No premium tiers, no usage limits, no sign-up required.",
      pl: "Tak, całkowicie za darmo. Szablon jest na licencji MIT — używaj go do projektów osobistych i komercyjnych bez ograniczeń. Brak planów premium, brak limitów użytkowania, nie wymaga rejestracji.",
      de: "Ja, vollständig kostenlos. Das Template ist MIT-lizenziert — verwenden Sie es für persönliche und kommerzielle Projekte ohne Einschränkungen. Keine Premium-Stufen, keine Nutzungslimits, keine Registrierung erforderlich.",
      es: "Sí, completamente gratis. La plantilla tiene licencia MIT — úsala para proyectos personales y comerciales sin restricciones. Sin planes premium, sin límites de uso, sin registro necesario.",
    },
  },
  {
    id: "database-choice",
    question: {
      en: "Which database should I use?",
      pl: "Jakiej bazy danych powinienem użyć?",
      de: "Welche Datenbank sollte ich verwenden?",
      es: "¿Qué base de datos debería usar?",
    },
    answer: {
      en: "PostgreSQL is recommended for production — it supports the admin panel, conversation persistence, and full SQLAlchemy/SQLModel ORM features. Use MongoDB for document-oriented workloads. SQLite is great for development and small deployments with zero configuration. Choose 'None' for stateless API-only services.",
      pl: "PostgreSQL jest zalecany do produkcji — obsługuje panel administracyjny, historię konwersacji i pełne funkcje ORM SQLAlchemy/SQLModel. Użyj MongoDB dla obciążeń zorientowanych na dokumenty. SQLite jest świetny do developmentu i małych wdrożeń bez konfiguracji. Wybierz 'None' dla bezstanowych serwisów tylko z API.",
      de: "PostgreSQL wird für die Produktion empfohlen — es unterstützt das Admin-Panel, Konversationspersistenz und alle SQLAlchemy/SQLModel ORM-Funktionen. Verwenden Sie MongoDB für dokumentenorientierte Workloads. SQLite ist ideal für Entwicklung und kleine Deployments ohne Konfiguration. Wählen Sie 'None' für zustandslose API-only-Dienste.",
      es: "PostgreSQL es recomendado para producción — soporta el panel de administración, persistencia de conversaciones y todas las funciones ORM de SQLAlchemy/SQLModel. Usa MongoDB para cargas de trabajo orientadas a documentos. SQLite es ideal para desarrollo y despliegues pequeños sin configuración. Elige 'None' para servicios API sin estado.",
    },
  },
  {
    id: "websocket-streaming",
    question: {
      en: "How does WebSocket streaming work?",
      pl: "Jak działa strumieniowanie WebSocket?",
      de: "Wie funktioniert WebSocket-Streaming?",
      es: "¿Cómo funciona el streaming por WebSocket?",
    },
    answer: {
      en: "The template includes a pre-built WebSocket endpoint that streams AI agent responses token-by-token to the frontend. It supports authenticated connections, tool call visualization, and automatic conversation persistence. The Next.js frontend includes a chat interface that renders the streamed responses in real-time.",
      pl: "Szablon zawiera gotowy endpoint WebSocket, który strumieniuje odpowiedzi agenta AI token po tokenie do frontendu. Obsługuje uwierzytelnione połączenia, wizualizację wywołań narzędzi i automatyczne zapisywanie historii konwersacji. Frontend Next.js zawiera interfejs czatu renderujący odpowiedzi w czasie rzeczywistym.",
      de: "Das Template enthält einen vorgefertigten WebSocket-Endpunkt, der AI-Agent-Antworten Token für Token an das Frontend streamt. Es unterstützt authentifizierte Verbindungen, Tool-Call-Visualisierung und automatische Konversationspersistenz. Das Next.js-Frontend enthält eine Chat-Oberfläche, die die gestreamten Antworten in Echtzeit rendert.",
      es: "La plantilla incluye un endpoint WebSocket predefinido que transmite las respuestas del agente de IA token por token al frontend. Soporta conexiones autenticadas, visualización de llamadas a herramientas y persistencia automática de conversaciones. El frontend Next.js incluye una interfaz de chat que renderiza las respuestas en tiempo real.",
    },
  },
  {
    id: "configurator-how",
    question: {
      en: "How does the web configurator work?",
      pl: "Jak działa konfigurator webowy?",
      de: "Wie funktioniert der Web-Konfigurator?",
      es: "¿Cómo funciona el configurador web?",
    },
    answer: {
      en: "The configurator is a 9-step wizard that runs entirely in your browser — no server required. It uses Nunjucks (a Jinja2-compatible JavaScript engine) to render 246 project templates client-side, then packages them into a ZIP with JSZip. The entire process takes 1-2 seconds. You can also export your configuration as a CLI command or JSON file.",
      pl: "Konfigurator to 9-etapowy kreator działający całkowicie w przeglądarce — nie wymaga serwera. Używa Nunjucks (silnika JavaScript kompatybilnego z Jinja2) do renderowania 246 szablonów projektów po stronie klienta, a następnie pakuje je do ZIP za pomocą JSZip. Cały proces trwa 1-2 sekundy. Możesz też wyeksportować konfigurację jako komendę CLI lub plik JSON.",
      de: "Der Konfigurator ist ein 9-Schritte-Assistent, der vollständig in Ihrem Browser läuft — kein Server erforderlich. Er verwendet Nunjucks (eine Jinja2-kompatible JavaScript-Engine), um 246 Projektvorlagen clientseitig zu rendern, und verpackt sie dann mit JSZip in eine ZIP-Datei. Der gesamte Prozess dauert 1-2 Sekunden. Sie können Ihre Konfiguration auch als CLI-Befehl oder JSON-Datei exportieren.",
      es: "El configurador es un asistente de 9 pasos que se ejecuta completamente en tu navegador — no requiere servidor. Usa Nunjucks (un motor JavaScript compatible con Jinja2) para renderizar 246 plantillas de proyecto del lado del cliente, y luego las empaqueta en un ZIP con JSZip. Todo el proceso toma 1-2 segundos. También puedes exportar tu configuración como comando CLI o archivo JSON.",
    },
  },
  {
    id: "deploy-production",
    question: {
      en: "How do I deploy to production?",
      pl: "Jak wdrożyć na produkcję?",
      de: "Wie deploye ich in die Produktion?",
      es: "¿Cómo despliego a producción?",
    },
    answer: {
      en: "The template includes production Docker Compose files with health checks and restart policies. Copy .env.example to .env.prod, configure your credentials and database URL, then run: docker compose -f docker-compose.prod.yml up -d --build. Optional Traefik or Nginx reverse proxy handles automatic TLS certificates.",
      pl: "Szablon zawiera produkcyjne pliki Docker Compose z health checkami i politykami restartu. Skopiuj .env.example do .env.prod, skonfiguruj dane uwierzytelniające i URL bazy danych, a następnie uruchom: docker compose -f docker-compose.prod.yml up -d --build. Opcjonalny reverse proxy Traefik lub Nginx obsługuje automatyczne certyfikaty TLS.",
      de: "Das Template enthält produktionsreife Docker-Compose-Dateien mit Health Checks und Restart-Policies. Kopieren Sie .env.example nach .env.prod, konfigurieren Sie Ihre Anmeldedaten und Datenbank-URL, dann führen Sie aus: docker compose -f docker-compose.prod.yml up -d --build. Der optionale Traefik- oder Nginx-Reverse-Proxy handhabt automatische TLS-Zertifikate.",
      es: "La plantilla incluye archivos Docker Compose de producción con health checks y políticas de reinicio. Copia .env.example a .env.prod, configura tus credenciales y URL de base de datos, luego ejecuta: docker compose -f docker-compose.prod.yml up -d --build. El proxy inverso opcional Traefik o Nginx maneja certificados TLS automáticos.",
    },
  },
  {
    id: "python-versions",
    question: {
      en: "What Python versions are supported?",
      pl: "Jakie wersje Pythona są obsługiwane?",
      de: "Welche Python-Versionen werden unterstützt?",
      es: "¿Qué versiones de Python son compatibles?",
    },
    answer: {
      en: "Python 3.11, 3.12, and 3.13. You select the version during project generation. All AI frameworks and dependencies are tested against each supported version.",
      pl: "Python 3.11, 3.12 i 3.13. Wersję wybierasz podczas generowania projektu. Wszystkie frameworki AI i zależności są testowane dla każdej obsługiwanej wersji.",
      de: "Python 3.11, 3.12 und 3.13. Sie wählen die Version während der Projektgenerierung. Alle AI-Frameworks und Abhängigkeiten werden für jede unterstützte Version getestet.",
      es: "Python 3.11, 3.12 y 3.13. Seleccionas la versión durante la generación del proyecto. Todos los frameworks de IA y dependencias están probados para cada versión soportada.",
    },
  },
  {
    id: "modify-generated",
    question: {
      en: "Can I modify the generated project?",
      pl: "Czy mogę modyfikować wygenerowany projekt?",
      de: "Kann ich das generierte Projekt modifizieren?",
      es: "¿Puedo modificar el proyecto generado?",
    },
    answer: {
      en: "Absolutely. The generated project is regular Python and TypeScript code — no lock-in, no proprietary runtime. It includes CLAUDE.md and AGENTS.md files so AI coding assistants like Claude Code, Cursor, or Copilot understand the project structure from day one.",
      pl: "Oczywiście. Wygenerowany projekt to zwykły kod Python i TypeScript — bez vendor lock-in, bez własnościowego runtime'u. Zawiera pliki CLAUDE.md i AGENTS.md, dzięki czemu asystenci programistyczni AI jak Claude Code, Cursor czy Copilot rozumieją strukturę projektu od pierwszego dnia.",
      de: "Absolut. Das generierte Projekt ist regulärer Python- und TypeScript-Code — kein Lock-in, keine proprietäre Laufzeitumgebung. Es enthält CLAUDE.md- und AGENTS.md-Dateien, damit AI-Coding-Assistenten wie Claude Code, Cursor oder Copilot die Projektstruktur vom ersten Tag an verstehen.",
      es: "Por supuesto. El proyecto generado es código Python y TypeScript regular — sin lock-in, sin runtime propietario. Incluye archivos CLAUDE.md y AGENTS.md para que asistentes de codificación IA como Claude Code, Cursor o Copilot entiendan la estructura del proyecto desde el primer día.",
    },
  },
  {
    id: "observability",
    question: {
      en: "What observability tools are included?",
      pl: "Jakie narzędzia obserwacji są dołączone?",
      de: "Welche Observability-Tools sind enthalten?",
      es: "¿Qué herramientas de observabilidad están incluidas?",
    },
    answer: {
      en: "Three options: Logfire (by Pydantic) auto-instruments FastAPI, database queries, Redis, Celery, and HTTPX calls — ideal for Pydantic AI agents. Sentry provides error tracking and performance monitoring. Prometheus collects metrics for Grafana dashboards. Enable any combination during generation.",
      pl: "Trzy opcje: Logfire (od Pydantic) automatycznie instrumentuje FastAPI, zapytania do bazy danych, Redis, Celery i wywołania HTTPX — idealne dla agentów Pydantic AI. Sentry zapewnia śledzenie błędów i monitorowanie wydajności. Prometheus zbiera metryki dla dashboardów Grafana. Włącz dowolną kombinację podczas generowania.",
      de: "Drei Optionen: Logfire (von Pydantic) instrumentiert automatisch FastAPI, Datenbankabfragen, Redis, Celery und HTTPX-Aufrufe — ideal für Pydantic AI-Agenten. Sentry bietet Fehlertracking und Performance-Monitoring. Prometheus sammelt Metriken für Grafana-Dashboards. Aktivieren Sie jede Kombination während der Generierung.",
      es: "Tres opciones: Logfire (de Pydantic) auto-instrumenta FastAPI, consultas de base de datos, Redis, Celery y llamadas HTTPX — ideal para agentes Pydantic AI. Sentry proporciona seguimiento de errores y monitoreo de rendimiento. Prometheus recopila métricas para dashboards de Grafana. Activa cualquier combinación durante la generación.",
    },
  },
  {
    id: "llm-providers",
    question: {
      en: "Can I use multiple LLM providers?",
      pl: "Czy mogę używać wielu dostawców LLM?",
      de: "Kann ich mehrere LLM-Anbieter verwenden?",
      es: "¿Puedo usar múltiples proveedores de LLM?",
    },
    answer: {
      en: "The template configures one primary provider (OpenAI, Anthropic, or OpenRouter). With OpenRouter you get access to 200+ models from multiple providers through a single API key. You can also add additional providers manually after generation — the generated code is standard Python with no vendor lock-in.",
      pl: "Szablon konfiguruje jednego głównego dostawcę (OpenAI, Anthropic lub OpenRouter). Z OpenRouter masz dostęp do 200+ modeli od wielu dostawców przez jeden klucz API. Możesz też ręcznie dodać dodatkowych dostawców po wygenerowaniu — wygenerowany kod to standardowy Python bez vendor lock-in.",
      de: "Das Template konfiguriert einen primären Anbieter (OpenAI, Anthropic oder OpenRouter). Mit OpenRouter erhalten Sie Zugang zu über 200 Modellen von mehreren Anbietern über einen einzigen API-Schlüssel. Sie können auch nach der Generierung manuell weitere Anbieter hinzufügen — der generierte Code ist Standard-Python ohne Vendor-Lock-in.",
      es: "La plantilla configura un proveedor principal (OpenAI, Anthropic u OpenRouter). Con OpenRouter obtienes acceso a más de 200 modelos de múltiples proveedores a través de una sola clave API. También puedes agregar proveedores adicionales manualmente después de la generación — el código generado es Python estándar sin lock-in de proveedor.",
    },
  },
];
