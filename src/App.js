import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, CheckCircle2, Search, Menu, Tag, Layout, Volume2, Globe, X, Clock, Sun, Moon, Calendar, AlertCircle
} from 'lucide-react';

const STORAGE_KEY = 'tasklyDailyData';
const LANG_KEY = 'tasklyDailyLang';
const DARK_MODE_KEY = 'tasklyDailyDarkMode';

// --- Configuration & Translations ---
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
];

const TRANSLATIONS = {
  en: {
    app_name: 'Taskly Daily', overview: 'My Overview', protip: 'Pro Tip 💡', protip_desc: 'Categorize your tasks!',
    dashboard: 'Dashboard', search: 'Search...', status_all: 'All Status', cats_all: 'All Cats',
    add: 'Add Task', notasks: 'No tasks found', notasks_sub: 'Create a new task!',
    progress: 'In Progress', done: 'Done', delete: 'Delete',
    create_title: 'Create Task', title: 'Title', title_ph: 'e.g. Gym',
    cat: 'Category', prio: 'Priority', due: 'Date', time: 'Time',
    notes: 'Notes', notes_ph: 'Details...', cancel: 'Cancel', create_btn: 'Create',
    cat_personal: 'Personal', cat_work: 'Work', cat_urgent: 'Urgent', cat_health: 'Health',
    cat_shopping: 'Shopping', cat_learning: 'Learning', cat_finance: 'Finance', cat_social: 'Social', cat_family: 'Family',
    prio_low: 'Low', prio_medium: 'Normal', prio_high: 'Urgent',
    copy: '© 2026 Developed by Marwan.M', hour: 'Hour', minute: 'Minute'
  },
  ar: {
    app_name: 'تاسكلي ديلي', overview: 'نظرة عامة', protip: 'نصيحة 💡', protip_desc: 'رتب مهامك بذكاء!',
    dashboard: 'لوحة التحكم', search: 'بحث...', status_all: 'الكل', cats_all: 'كل الفئات',
    add: 'مهمة جديدة', notasks: 'لا توجد مهام', notasks_sub: 'أضف مهمة جديدة!',
    progress: 'جاري', done: 'مكتمل', delete: 'حذف',
    create_title: 'إنشاء مهمة', title: 'العنوان', title_ph: 'مثال: رياضة',
    cat: 'التصنيف', prio: 'الأولوية', due: 'التاريخ', time: 'الوقت',
    notes: 'ملاحظات', notes_ph: 'تفاصيل...', cancel: 'إلغاء', create_btn: 'إنشاء',
    cat_personal: 'شخصي', cat_work: 'عمل', cat_urgent: 'عاجل', cat_health: 'صحة',
    cat_shopping: 'تسوق', cat_learning: 'تعلم', cat_finance: 'مالية', cat_social: 'اجتماعي', cat_family: 'عائلة',
    prio_low: 'منخفض', prio_medium: 'عادي', prio_high: 'عاجل',
    copy: '© 2026 تطوير Marwan.M', hour: 'ساعة', minute: 'دقيقة'
  },
  fr: { app_name: 'Taskly Daily', overview: 'Aperçu', protip: 'Astuce 💡', protip_desc: 'Organisez vos tâches !', dashboard: 'Tableau de bord', search: 'Recherche...', status_all: 'Tous', cats_all: 'Toutes', add: 'Ajouter', notasks: 'Aucune tâche', notasks_sub: 'Créez-en une !', progress: 'En cours', done: 'Fini', delete: 'Supprimer', create_title: 'Nouvelle Tâche', title: 'Titre', title_ph: 'ex. Sport', cat: 'Catégorie', prio: 'Priorité', due: 'Date', time: 'Heure', notes: 'Notes', notes_ph: 'Détails...', cancel: 'Annuler', create_btn: 'Créer', cat_personal: 'Perso', cat_work: 'Travail', cat_urgent: 'Urgent', cat_health: 'Santé', cat_shopping: 'Achats', cat_learning: 'Apprentissage', cat_finance: 'Finance', cat_social: 'Social', cat_family: 'Famille', prio_low: 'Bas', prio_medium: 'Normal', prio_high: 'Urgent', copy: '© 2026 Marwan.M', hour: 'Heure', minute: 'Minute' },
  nl: { app_name: 'Taskly Daily', overview: 'Overzicht', protip: 'Tip 💡', protip_desc: 'Categoriseer taken!', dashboard: 'Dashboard', search: 'Zoeken...', status_all: 'Alles', cats_all: 'Alle', add: 'Taak', notasks: 'Geen taken', notasks_sub: 'Maak er een!', progress: 'Bezig', done: 'Klaar', delete: 'Wissen', create_title: 'Nieuwe Taak', title: 'Titel', title_ph: 'bv. Sport', cat: 'Categorie', prio: 'Prioriteit', due: 'Datum', time: 'Tijd', notes: 'Notities', notes_ph: 'Details...', cancel: 'Annuleren', create_btn: 'Maken', cat_personal: 'Privé', cat_work: 'Werk', cat_urgent: 'Dringend', cat_health: 'Gezondheid', cat_shopping: 'Winkelen', cat_learning: 'Leren', cat_finance: 'Financiën', cat_social: 'Sociaal', cat_family: 'Familie', prio_low: 'Laag', prio_medium: 'Normaal', prio_high: 'Dringend', copy: '© 2026 Marwan.M', hour: 'Uur', minute: 'Minuut' },
  it: { app_name: 'Taskly Daily', overview: 'Panoramica', protip: 'Consiglio 💡', protip_desc: 'Categorizza le attività!', dashboard: 'Cruscotto', search: 'Cerca...', status_all: 'Tutti', cats_all: 'Tutte', add: 'Nuova', notasks: 'Nessuna attività', notasks_sub: 'Creane una!', progress: 'In corso', done: 'Fatto', delete: 'Elimina', create_title: 'Crea Attività', title: 'Titolo', title_ph: 'es. Palestra', cat: 'Categoria', prio: 'Priorità', due: 'Scadenza', time: 'Ora', notes: 'Note', notes_ph: 'Dettagli...', cancel: 'Annulla', create_btn: 'Crea', cat_personal: 'Personale', cat_work: 'Lavoro', cat_urgent: 'Urgente', cat_health: 'Salute', cat_shopping: 'Spesa', cat_learning: 'Studio', cat_finance: 'Finanza', cat_social: 'Sociale', cat_family: 'Famiglia', prio_low: 'Bassa', prio_medium: 'Normale', prio_high: 'Urgente', copy: '© 2026 Sviluppato da Marwan.M', hour: 'Ora', minute: 'Minuto' },
  tr: { app_name: 'Taskly Daily', overview: 'Genel Bakış', protip: 'İpucu 💡', protip_desc: 'Görevlerini kategorize et!', dashboard: 'Panel', search: 'Ara...', status_all: 'Hepsi', cats_all: 'Tümü', add: 'Yeni Görev', notasks: 'Görev yok', notasks_sub: 'Yeni bir tane oluştur!', progress: 'Sürüyor', done: 'Tamamlandı', delete: 'Sil', create_title: 'Görev Oluştur', title: 'Başlık', title_ph: 'örn. Spor', cat: 'Kategori', prio: 'Öncelik', due: 'Tarih', time: 'Saat', notes: 'Notlar', notes_ph: 'Detaylar...', cancel: 'İptal', create_btn: 'Oluştur', cat_personal: 'Kişisel', cat_work: 'İş', cat_urgent: 'Acil', cat_health: 'Sağlık', cat_shopping: 'Alışveriş', cat_learning: 'Öğrenme', cat_finance: 'Finans', cat_social: 'Sosyal', cat_family: 'Aile', prio_low: 'Düşük', prio_medium: 'Normal', prio_high: 'Acil', copy: '© 2026 Marwan.M tarafından geliştirildi', hour: 'Saat', minute: 'Dakika' },
  es: { app_name: 'Taskly Daily', overview: 'Resumen', protip: 'Consejo 💡', protip_desc: '¡Organiza tus tareas!', dashboard: 'Tablero', search: 'Buscar...', status_all: 'Todos', cats_all: 'Todas', add: 'Nueva Tarea', notasks: 'Sin tareas', notasks_sub: '¡Crea una!', progress: 'En curso', done: 'Hecho', delete: 'Borrar', create_title: 'Crear Tarea', title: 'Título', title_ph: 'ej. Gimnasio', cat: 'Categoría', prio: 'Prioridad', due: 'Fecha', time: 'Hora', notes: 'Notas', notes_ph: 'Detalles...', cancel: 'Cancelar', create_btn: 'Crear', cat_personal: 'Personal', cat_work: 'Trabajo', cat_urgent: 'Urgente', cat_health: 'Salud', cat_shopping: 'Compras', cat_learning: 'Estudio', cat_finance: 'Finanzas', cat_social: 'Social', cat_family: 'Familia', prio_low: 'Baja', prio_medium: 'Normal', prio_high: 'Urgente', copy: '© 2026 Desarrollado por Marwan.M', hour: 'Hora', minute: 'Minuto' },
  de: { app_name: 'Taskly Daily', overview: 'Übersicht', protip: 'Tipp 💡', protip_desc: 'Kategorisiere Aufgaben!', dashboard: 'Dashboard', search: 'Suchen...', status_all: 'Alle', cats_all: 'Alle', add: 'Neue Aufgabe', notasks: 'Keine Aufgaben', notasks_sub: 'Erstelle eine!', progress: 'In Arbeit', done: 'Fertig', delete: 'Löschen', create_title: 'Erstellen', title: 'Titel', title_ph: 'z.B. Sport', cat: 'Kategorie', prio: 'Priorität', due: 'Datum', time: 'Uhrzeit', notes: 'Notizen', notes_ph: 'Details...', cancel: 'Abbrechen', create_btn: 'Erstellen', cat_personal: 'Privat', cat_work: 'Arbeit', cat_urgent: 'Dringend', cat_health: 'Gesundheit', cat_shopping: 'Einkaufen', cat_learning: 'Lernen', cat_finance: 'Finanzen', cat_social: 'Sozial', cat_family: 'Familie', prio_low: 'Niedrig', prio_medium: 'Normal', prio_high: 'Dringend', copy: '© 2026 Entwickelt von Marwan.M', hour: 'Stunde', minute: 'Minute' },
  zh: { app_name: 'Taskly Daily', overview: '概览', protip: '提示 💡', protip_desc: '分类您的任务！', dashboard: '仪表板', search: '搜索...', status_all: '全部', cats_all: '全部', add: '新任务', notasks: '无任务', notasks_sub: '创建一个！', progress: '进行中', done: '完成', delete: '删除', create_title: '创建任务', title: '标题', title_ph: '例如：健身', cat: '类别', prio: '优先级', due: '日期', time: '时间', notes: '备注', notes_ph: '详情...', cancel: '取消', create_btn: '创建', cat_personal: '个人', cat_work: '工作', cat_urgent: '紧急', cat_health: '健康', cat_shopping: '购物', cat_learning: '学习', cat_finance: '财务', cat_social: '社交', cat_family: '家庭', prio_low: '低', prio_medium: '正常', prio_high: '紧急', copy: '© 2026 由 Marwan.M 开发', hour: '小时', minute: '分钟' },
  ru: { app_name: 'Taskly Daily', overview: 'Обзор', protip: 'Совет 💡', protip_desc: 'Категоризируй!', dashboard: 'Доска', search: 'Поиск...', status_all: 'Все', cats_all: 'Все', add: 'Задача', notasks: 'Нет задач', notasks_sub: 'Создай новую!', progress: 'В процессе', done: 'Готово', delete: 'Удалить', create_title: 'Создать', title: 'Название', title_ph: 'напр. Спорт', cat: 'Категория', prio: 'Приоритет', due: 'Дата', time: 'Время', notes: 'Заметки', notes_ph: 'Детали...', cancel: 'Отмена', create_btn: 'Создать', cat_personal: 'Личное', cat_work: 'Работа', cat_urgent: 'Срочно', cat_health: 'Здоровье', cat_shopping: 'Покупки', cat_learning: 'Обучение', cat_finance: 'Финансы', cat_social: 'Социальное', cat_family: 'Семья', prio_low: 'Низкий', prio_medium: 'Норм', prio_high: 'Срочно', copy: '© 2026 Разработано Marwan.M', hour: 'Час', minute: 'Минута' },
  pt: { app_name: 'Taskly Daily', overview: 'Visão Geral', protip: 'Dica 💡', protip_desc: 'Categorize!', dashboard: 'Painel', search: 'Buscar...', status_all: 'Todos', cats_all: 'Todas', add: 'Nova Tarefa', notasks: 'Sem tarefas', notasks_sub: 'Crie uma!', progress: 'Em andamento', done: 'Feito', delete: 'Excluir', create_title: 'Criar', title: 'Título', title_ph: 'ex. Treino', cat: 'Categoria', prio: 'Prioridade', due: 'Data', time: 'Hora', notes: 'Notas', notes_ph: 'Detalhes...', cancel: 'Cancelar', create_btn: 'Criar', cat_personal: 'Pessoal', cat_work: 'Trabalho', cat_urgent: 'Urgente', cat_health: 'Saúde', cat_shopping: 'Compras', cat_learning: 'Aprendizado', cat_finance: 'Finanças', cat_social: 'Social', cat_family: 'Família', prio_low: 'Baixa', prio_medium: 'Normal', prio_high: 'Urgente', copy: '© 2026 Desenvolvido por Marwan.M', hour: 'Hora', minute: 'Minuto' },
  ur: { app_name: 'ٹاسکلی ڈیلی', overview: 'جائزہ', protip: 'ٹپ 💡', protip_desc: 'کاموں کی درجہ بندی کریں!', dashboard: 'ڈیش بورڈ', search: 'تلاش...', status_all: 'سب', cats_all: 'سب', add: 'نیا کام', notasks: 'کوئی کام نہیں', notasks_sub: 'نیا بنائیں!', progress: 'جاری', done: 'مکمل', delete: 'حذف', create_title: 'نیا کام', title: 'عنوان', title_ph: 'مثال: ورزش', cat: 'زمرہ', prio: 'ترجیح', due: 'تاریخ', time: 'وقت', notes: 'نوٹس', notes_ph: 'تفصیلات...', cancel: 'منسوخ', create_btn: 'بنائیں', cat_personal: 'ذاتی', cat_work: 'کام', cat_urgent: 'فوری', cat_health: 'صحت', cat_shopping: 'خریداری', cat_learning: 'سیکھنا', cat_finance: 'مالیات', cat_social: 'سماجی', cat_family: 'خاندان', prio_low: 'کم', prio_medium: 'درمیانی', prio_high: 'فوری', copy: '© 2026 تیار کردہ از Marwan.M', hour: 'گھنٹہ', minute: 'منٹ' },
};

const playSuccessSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
  audio.volume = 0.5;
  audio.play().catch(() => { });
};

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: 'Personal', dueDate: '', dueTime: '', priority: 'Normal' });
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('en');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) setTasks(JSON.parse(storedTasks));
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang) setLang(storedLang);
    const storedDark = localStorage.getItem(DARK_MODE_KEY);
    if (storedDark === 'true') setDarkMode(true);

    if (window.innerWidth >= 1024) setSidebarOpen(true);
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
    const dir = LANGUAGES.find(l => l.code === lang)?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
  const currentLangObj = LANGUAGES.find(l => l.code === lang);

  const createTask = () => {
    if (!newTask.title.trim()) return;
    playSuccessSound();
    setTasks([...tasks, {
      id: Date.now().toString(),
      ...newTask,
      status: 'In Progress',
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    }]);
    setNewTask({ title: '', description: '', category: 'Personal', dueDate: '', dueTime: '', priority: 'Normal' });
    setShowModal(false);
  };

  const updateTaskStatus = (id, newStatus) => {
    if (newStatus === 'Completed') playSuccessSound();
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' ? true : task.status === filter;
    const categoryMatch = categoryFilter === 'all' ? true : task.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case 'Urgent': return 'bg-red-500 text-white shadow-red-200';
      case 'Normal': return 'bg-blue-500 text-white shadow-blue-200';
      default: return 'bg-gray-400 text-white shadow-gray-200';
    }
  };

  const getCategoryColor = (t) => {
    const defaultStyle = 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    switch (t?.toLowerCase()) {
      case 'personal': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300';
      case 'work': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
      case 'urgent': return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
      case 'health': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'shopping': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300';
      case 'learning': return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
      case 'finance': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300';
      case 'social': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300';
      case 'family': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300';
      default: return defaultStyle;
    }
  };

  const categories = ['Personal', 'Work', 'Urgent', 'Health', 'Shopping', 'Learning', 'Finance', 'Social', 'Family'];

  // Helper for generating Time string from selects
  const handleTimeChange = (type, value) => {
    let [h, m] = (newTask.dueTime || '00:00').split(':');
    if (!h) h = '00';
    if (!m) m = '00';

    if (type === 'hour') h = value;
    if (type === 'minute') m = value;

    setNewTask({ ...newTask, dueTime: `${h}:${m}` });
  };

  const currentHour = newTask.dueTime ? newTask.dueTime.split(':')[0] : '';
  const currentMinute = newTask.dueTime ? newTask.dueTime.split(':')[1] : '';

  return (
    <div className="min-h-screen bg-[#F3F4F6] dark:bg-gray-900 flex font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 overflow-hidden relative">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative flex flex-col z-40 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'}
        ${document.dir === 'rtl' ? (sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0') : ''}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700 gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shrink-0 text-white">
            <CheckCircle2 size={20} />
          </div>
          {(sidebarOpen || window.innerWidth >= 768) && (
            <span className={`font-bold text-xl text-indigo-900 dark:text-white whitespace-nowrap transition-opacity duration-200 ${!sidebarOpen && 'md:hidden'}`}>
              {t('app_name')}
            </span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-medium">
            <Layout size={20} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>{t('overview')}</span>
          </button>
        </nav>

        <div className={`p-4 m-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl ${!sidebarOpen && 'md:hidden'}`}>
          <div className="text-xs text-indigo-700 dark:text-indigo-300">
            <p className="font-bold mb-1">{t('protip')}</p>
            <p>{t('protip_desc')}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-300 md:hidden">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white truncate">{t('dashboard')}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-600 transition-all text-gray-700 dark:text-gray-200">
                <span className="text-lg">{currentLangObj?.flag}</span>
                <span className="text-sm font-medium hidden md:block">{currentLangObj?.name}</span>
              </button>
              {langMenuOpen && (
                <div className={`absolute top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-64 overflow-y-auto ${document.dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangMenuOpen(false); }} className={`w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-gray-700 flex items-center gap-3 ${lang === l.code ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      <span className="text-lg">{l.flag}</span><span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-700 shrink-0">ME</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.98] flex flex-col">
          <div className="max-w-6xl mx-auto space-y-6 w-full flex-1">
            <div className="flex flex-col xl:flex-row justify-between gap-4">
              <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                <div className="flex gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto max-w-full">
                  {['all', 'In Progress', 'Completed'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      {f === 'all' ? t('status_all') : f === 'In Progress' ? t('progress') : t('done')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
                <div className="flex gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 min-w-max">
                  <button onClick={() => setCategoryFilter('all')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${categoryFilter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>{t('cats_all')}</button>
                  {categories.map(c => (
                    <button key={c} onClick={() => setCategoryFilter(c)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${categoryFilter === c ? 'bg-purple-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      {t(`cat_${c.toLowerCase()}`)}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setShowModal(true)} className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95 w-full md:w-auto shrink-0">
                <Plus size={18} className="group-hover:rotate-90 transition-transform" /><span className="font-medium">{t('add')}</span>
              </button>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 overflow-hidden min-h-[400px]">
              {filteredTasks.length === 0 ? (
                <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center h-full">
                  <Layout className="text-gray-300 dark:text-gray-600 mb-4" size={64} /><p className="text-lg font-medium">{t('notasks')}</p><p className="text-sm">{t('notasks_sub')}</p>
                </div>
              ) : (
                <div className="w-full">
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gray-50/50 dark:bg-gray-700/30">
                        <tr className="text-start text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          <th className="px-6 py-4 text-start">{t('title')}</th>
                          <th className="px-6 py-4 text-start">{t('progress')}</th>
                          <th className="px-6 py-4 text-start">{t('cat')}</th>
                          <th className="px-6 py-4 text-start">{t('prio')}</th>
                          <th className="px-6 py-4 text-start">{t('due')}</th>
                          <th className="px-6 py-4 text-end">{t('delete')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filteredTasks.map(task => (
                          <tr key={task.id} className="group hover:bg-white/80 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button onClick={() => updateTaskStatus(task.id, task.status === 'Completed' ? 'In Progress' : 'Completed')} className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'Completed' ? 'bg-green-500 border-green-500 scale-110' : 'border-gray-300 dark:border-gray-500 hover:border-indigo-500'}`}>
                                  {task.status === 'Completed' && <CheckCircle2 size={12} className="text-white" />}
                                </button>
                                <div>
                                  <p className={`font-medium ${task.status === 'Completed' ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>{task.title}</p>
                                  {task.description && <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">{task.description}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'}`}>{task.status === 'Completed' ? t('done') : t('progress')}</span></td>
                            <td className="px-6 py-4"><div className="flex items-center gap-2"><Tag size={14} className="text-gray-400" /><span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(task.category)}`}>{t(`cat_${task.category?.toLowerCase()}`) || task.category}</span></div></td>
                            <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm ${getPriorityColor(task.priority)}`}>{t(`prio_${task.priority?.toLowerCase()}`) || task.priority}</span></td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                              <div className="flex flex-col">
                                <span>{task.dueDate}</span>
                                {task.dueTime && <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1"><Clock size={10} />{task.dueTime}</span>}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-end">
                              <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100 opacity-100">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden flex flex-col p-4 gap-4">
                    {filteredTasks.map(task => (
                      <div key={task.id} className="bg-white/50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 flex flex-col gap-3 shadow-none">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateTaskStatus(task.id, task.status === 'Completed' ? 'In Progress' : 'Completed')} className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.status === 'Completed' ? 'bg-green-500 border-green-500 scale-110' : 'border-gray-300 dark:border-gray-500'}`}>
                              {task.status === 'Completed' && <CheckCircle2 size={14} className="text-white" />}
                            </button>
                            <h3 className={`text-lg font-bold ${task.status === 'Completed' ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>{task.title}</h3>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${getPriorityColor(task.priority)}`}>
                            {t(`prio_${task.priority?.toLowerCase()}`) || task.priority}
                          </span>
                        </div>

                        {task.description && <p className="text-sm text-gray-500 dark:text-gray-400 pl-9">{task.description}</p>}

                        <div className="flex flex-wrap gap-2 pl-9 mt-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(task.category)}`}>
                            {t(`cat_${task.category?.toLowerCase()}`) || task.category}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                            <Calendar size={12} /> {task.dueDate}
                          </div>
                          {task.dueTime && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                              <Clock size={12} /> {task.dueTime}
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                          <button onClick={() => deleteTask(task.id)} className="flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors">
                            <Trash2 size={16} /> {t('delete')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <footer className="mt-8 py-6 text-center text-gray-400 text-sm font-medium border-t border-gray-200/50 dark:border-gray-700/50 shrink-0">
            {t('copy')}
          </footer>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-lg w-full scale-100 animate-in zoom-in-95 duration-200 border border-white/20 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2"><span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg"><Plus size={24} /></span>{t('create_title')}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={24} /></button>
            </div>

            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('title')}</label><input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-gray-800 dark:text-white placeholder-gray-400" placeholder={t('title_ph')} autoFocus /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('cat')}</label><select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-gray-800 dark:text-white">{categories.map(c => <option key={c} value={c}>{t(`cat_${c.toLowerCase()}`)}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('prio')}</label><select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-gray-800 dark:text-white"><option value="Low">{t('prio_low')}</option><option value="Normal">{t('prio_medium')}</option><option value="Urgent">{t('prio_high')}</option></select></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('due')}</label><input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-gray-800 dark:text-white" /></div>

                {/* Styled Time Picker with Hour/Minute Labels */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('time')}</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-0.5">{t('hour')}</label>
                      <select
                        value={currentHour}
                        onChange={(e) => handleTimeChange('hour', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-gray-800 dark:text-white appearance-none text-center font-mono"
                      >
                        <option value="">--</option>
                        {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(h => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end pb-3 text-gray-400 font-bold">:</div>
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 mb-0.5">{t('minute')}</label>
                      <select
                        value={currentMinute}
                        onChange={(e) => handleTimeChange('minute', e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-gray-800 dark:text-white appearance-none text-center font-mono"
                      >
                        <option value="">--</option>
                        {Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')).map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('notes')}</label><textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none resize-none text-gray-800 dark:text-white placeholder-gray-400" rows="2" placeholder={t('notes_ph')} /></div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">{t('cancel')}</button>
              <button onClick={createTask} disabled={!newTask.title.trim()} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-all shadow-lg hover:translate-y-[-1px]">{t('create_btn')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TaskManager;