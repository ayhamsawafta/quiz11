import React, { useMemo, useState } from "react";
import "./index.css";

const rawQuestions = [
  {
    "unit": "المعجم العربي",
    "question": "ما الفرق الأدق بين المعجم والموسوعة؟",
    "options": [
      "المعجم يفسر الأحداث التاريخية، والموسوعة ترتب الكلمات فقط",
      "كلاهما يشرح الكلمات بالطريقة نفسها دون اختلاف",
      "المعجم يعتني بالألفاظ ومعانيها، والموسوعة تعتني بالموضوعات والمعارف",
      "الموسوعة تبحث في الجذور، والمعجم يبحث في الشخصيات"
    ],
    "answer": 2,
    "explain": "المعجم مرجع للألفاظ ومعانيها، أما الموسوعة فمرجع للموضوعات والمعارف."
  },
  {
    "unit": "المعجم العربي",
    "question": "أي عبارة تبيّن وظيفة المعجم بدقة؟",
    "options": [
      "إزالة الغموض عن الألفاظ وبيان معناها واستعمالها",
      "تحويل النصوص الشعرية إلى نثر فقط",
      "ترتيب القصص حسب زمن وقوعها",
      "شرح قواعد النحو دون ذكر معاني الكلمات"
    ],
    "answer": 0,
    "explain": "وظيفة المعجم الأساسية شرح الألفاظ وبيان معانيها واستعمالاتها."
  },
  {
    "unit": "المعجم العربي",
    "question": "لماذا لا يكفي الاعتماد على السياق دائمًا لمعرفة معنى الكلمة؟",
    "options": [
      "لأن السياق يلغي المعنى الأصلي للكلمات دائمًا",
      "لأن المعجم لا يذكر إلا المعاني المجازية",
      "لأن الكلمات العربية لا تتغير معانيها مطلقًا",
      "لأن بعض الكلمات متعددة المعاني وتحتاج إلى ضبط دقيق"
    ],
    "answer": 3,
    "explain": "بعض الألفاظ تحمل أكثر من معنى، فيساعد المعجم على تحديد المعنى الأدق."
  },
  {
    "unit": "المعجم العربي",
    "question": "ما المقصود بالمادة المعجمية غالبًا؟",
    "options": [
      "الصفحة الأولى من المعجم فقط",
      "الأصل الذي تُرتب تحته الكلمات في المعجم",
      "عنوان الكتاب الذي أُخذت منه الكلمة",
      "الحرف الأخير من أي كلمة"
    ],
    "answer": 1,
    "explain": "المادة المعجمية هي الأصل أو الجذر الذي تجمع تحته المشتقات غالبًا."
  },
  {
    "unit": "المعجم العربي",
    "question": "أي مما يأتي يدل على استخدام واعٍ للمعجم؟",
    "options": [
      "فتح المعجم عشوائيًا ثم اختيار أقرب كلمة شكلًا",
      "إرجاع الكلمة إلى أصلها ثم البحث عنها في موضعها المناسب",
      "البحث عن الكلمة دائمًا تحت آخر حرف فيها",
      "ترك الحركات دون اعتبار في كل الحالات"
    ],
    "answer": 1,
    "explain": "الاستخدام الواعي يتطلب معرفة نظام المعجم: هل هو جذري أم ألفبائي."
  },
  {
    "unit": "مدارس المعاجم",
    "question": "ما الأساس الذي تقوم عليه المدرسة الصوتية في ترتيب الحروف؟",
    "options": [
      "آخر حرف من الجذر في كل كلمة",
      "عدد الحروف في اللفظة الواحدة",
      "الترتيب الزمني لظهور الكلمات",
      "مخارج الحروف لا ترتيبها الألفبائي المألوف"
    ],
    "answer": 3,
    "explain": "المدرسة الصوتية تعتمد على مخارج الحروف كما في معجم العين."
  },
  {
    "unit": "مدارس المعاجم",
    "question": "أي معجم يُعد مثالًا بارزًا على المدرسة الصوتية؟",
    "options": [
      "معجم العين للخليل بن أحمد الفراهيدي",
      "لسان العرب لابن منظور",
      "تاج العروس للزبيدي",
      "المعجم الوسيط"
    ],
    "answer": 0,
    "explain": "معجم العين من أشهر أمثلة الترتيب الصوتي."
  },
  {
    "unit": "مدارس المعاجم",
    "question": "ما الذي يجعل مدرسة التقاليب صعبة نسبيًا على الطالب؟",
    "options": [
      "أنها تعتمد على أول حرف من الكلمة كما تنطق",
      "أنها تهمل الجذر وتكتفي بالصيغة النهائية",
      "أنها تنظر في احتمالات ترتيب حروف الجذر كلها",
      "أنها ترتب الكلمات حسب المعنى لا الحروف"
    ],
    "answer": 2,
    "explain": "التقاليب تقوم على تدوير حروف الجذر واستحضار احتمالاتها."
  },
  {
    "unit": "مدارس المعاجم",
    "question": "في جذر ثلاثي حروفه مختلفة، كم تقليبًا ممكنًا له؟",
    "options": [
      "ثلاثة تقاليب",
      "أربعة تقاليب",
      "تسعة تقاليب",
      "ستة تقاليب"
    ],
    "answer": 3,
    "explain": "الجذر الثلاثي المختلف الحروف له 3 × 2 × 1 = 6 تقاليب."
  },
  {
    "unit": "مدارس المعاجم",
    "question": "أي عبارة تصف المدرسة الألفبائية الحديثة بدقة؟",
    "options": [
      "ترتيب الكلمات بحسب مخارج الحروف الحلقية أولًا",
      "ترتيب الكلمات بحسب أوائلها كما ترد غالبًا",
      "ترتيب الكلمات بحسب آخر حرف في الجذر",
      "إلغاء الحروف الزائدة قبل كل بحث دائمًا"
    ],
    "answer": 1,
    "explain": "الترتيب الألفبائي الحديث غالبًا يبحث في الكلمة كما تظهر من بدايتها."
  },
  {
    "unit": "الجذر والبحث المعجمي",
    "question": "ما الجذر الصحيح لكلمة «استغفار»؟",
    "options": [
      "سغفر",
      "استغفر",
      "غفر",
      "غفار"
    ],
    "answer": 2,
    "explain": "استغفار مصدر من الفعل استغفر، وجذره: غفر."
  },
  {
    "unit": "الجذر والبحث المعجمي",
    "question": "ما الجذر الصحيح لكلمة «مكتبة»؟",
    "options": [
      "كتب",
      "مكتب",
      "كتبة",
      "مكب"
    ],
    "answer": 0,
    "explain": "مكتبة مشتقة من الجذر كتب."
  },
  {
    "unit": "الجذر والبحث المعجمي",
    "question": "في معجم جذري، أين تبحث عن كلمة «مستخرج»؟",
    "options": [
      "ستخرج",
      "مستخرج",
      "خرجج",
      "خرج"
    ],
    "answer": 3,
    "explain": "نحذف الزوائد م، س، ت فنصل إلى الجذر خرج."
  },
  {
    "unit": "الجذر والبحث المعجمي",
    "question": "في معجم ألفبائي حديث، أين تبحث غالبًا عن «استخراج»؟",
    "options": [
      "تحت الخاء لأنها أصل الجذر",
      "تحت الراء لأنها وسط الجذر",
      "تحت الألف لأنها تبدأ بها",
      "تحت الجيم لأنها آخر الجذر"
    ],
    "answer": 2,
    "explain": "في الألفبائية نبحث غالبًا حسب صورة الكلمة كما هي."
  },
  {
    "unit": "الجذر والبحث المعجمي",
    "question": "أي خطوة تسبق البحث في معجم يعتمد الجذور؟",
    "options": [
      "تغيير معنى الكلمة قبل البحث عنها",
      "تجريد الكلمة من الزوائد وردّها إلى أصلها",
      "اختيار أول حرف ظاهر دون تفكير",
      "البحث عن الكلمة في باب الضمائر"
    ],
    "answer": 1,
    "explain": "البحث الجذري يتطلب معرفة الأصل المجرد للكلمة."
  },
  {
    "unit": "الجذر والبحث المعجمي",
    "question": "ما الجذر الأقرب لكلمة «دارسون»؟",
    "options": [
      "درس",
      "دار",
      "دوس",
      "رسن"
    ],
    "answer": 0,
    "explain": "دارسون جمع دارس، من الجذر درس."
  },
  {
    "unit": "الأدب: الدنيا والزوال",
    "question": "ما الفكرة المركزية في نصوص الزهد التي تتحدث عن الدنيا؟",
    "options": [
      "الدعوة إلى جمع المال لأنه دائم",
      "تمجيد القوة بوصفها تمنع الفناء",
      "التحذير من الاغترار بزينة الدنيا لأنها زائلة",
      "إنكار تغير أحوال البشر"
    ],
    "answer": 2,
    "explain": "تؤكد نصوص الزهد غالبًا فناء الدنيا وتغير أحوالها."
  },
  {
    "unit": "الأدب: الدنيا والزوال",
    "question": "أي عبارة تعبّر عن معنى «لا تبقى الدنيا على حال»؟",
    "options": [
      "ثبات الملوك والحضارات مهما تغير الزمن",
      "بقاء المال والجاه لصاحبهما إلى الأبد",
      "توقف الزمن عند لحظة واحدة",
      "انتقال الإنسان بين قوة وضعف وغنى وفقر وسرور وحزن"
    ],
    "answer": 3,
    "explain": "المقصود تبدل الأحوال وعدم دوامها."
  },
  {
    "unit": "الأدب: الدنيا والزوال",
    "question": "ما أثر المقابلة بين العز والذل في نص الزوال؟",
    "options": [
      "إخفاء المعنى وجعل الصورة غامضة",
      "إبراز سرعة تبدل الأحوال وتقوية العبرة",
      "تحويل النص إلى تقرير علمي مجرد",
      "إلغاء العاطفة من النص تمامًا"
    ],
    "answer": 1,
    "explain": "المقابلة تقوي المعنى بإظهار التباين بين حالين."
  },
  {
    "unit": "الأدب: الدنيا والزوال",
    "question": "لماذا يستحضر الكاتب صور الممالك الزائلة؟",
    "options": [
      "ليؤكد أن القوة والسلطان لا يمنعان الفناء",
      "ليثبت أن الحضارات لا تسقط أبدًا",
      "ليمدح الترف بوصفه غاية الحياة",
      "ليتجنب الحديث عن العبرة"
    ],
    "answer": 0,
    "explain": "زوال الممالك شاهد على تغير الدنيا وفنائها."
  },
  {
    "unit": "الأندلس",
    "question": "ما الشعور الغالب في نص رثاء الأندلس؟",
    "options": [
      "الفرح بانتهاء الحضارة",
      "اللامبالاة تجاه المصيبة",
      "السخرية من الضعفاء",
      "الحزن والتحسر على ضياع المجد"
    ],
    "answer": 3,
    "explain": "رثاء الأندلس يقوم على الحزن والأسى والتحسر."
  },
  {
    "unit": "الأندلس",
    "question": "ما دلالة تصوير المساجد وكأنها تبكي؟",
    "options": [
      "وصف حقيقي لصوت المساجد",
      "تشخيص يعمّق الإحساس بالمأساة",
      "طباق بين البكاء والضحك فقط",
      "سرد تاريخي خالٍ من العاطفة"
    ],
    "answer": 1,
    "explain": "إسناد البكاء للمساجد تشخيص يبرز هول المصيبة."
  },
  {
    "unit": "الأندلس",
    "question": "ما المعنى الذي توحي به صورة تفريق الأطفال عن الأمهات؟",
    "options": [
      "استقرار الحياة الاجتماعية",
      "قوة الروابط الأسرية دون تهديد",
      "عمق المأساة الإنسانية بعد السقوط",
      "انتهاء الخطر عن الناس"
    ],
    "answer": 2,
    "explain": "الصورة تبرز الجانب الإنساني المؤلم في النكبة."
  },
  {
    "unit": "الأندلس",
    "question": "أي سبب غير مباشر قد يُفهم من نصوص سقوط الأندلس؟",
    "options": [
      "الفرقة والضعف الداخلي قبل السقوط",
      "زيادة الوحدة بين الممالك الإسلامية",
      "الاستغناء عن القوة العسكرية تمامًا",
      "استمرار الازدهار السياسي دون خلل"
    ],
    "answer": 0,
    "explain": "كثير من نصوص الرثاء تلمح إلى الضعف والفرقة باعتبارهما من أسباب السقوط."
  },
  {
    "unit": "الأندلس",
    "question": "ما وظيفة الاستفهام في بعض مراثي الأندلس؟",
    "options": [
      "طلب جواب علمي محدد فقط",
      "إثارة الحسرة والتنبيه إلى فداحة المصيبة",
      "تخفيف الحزن عن السامع دائمًا",
      "إظهار الفرح بانتهاء الحدث"
    ],
    "answer": 1,
    "explain": "الاستفهام البلاغي قد يثير الحسرة ولا ينتظر جوابًا."
  },
  {
    "unit": "بلاغة",
    "question": "ما نوع الصورة في قولنا: «بكت المآذن»؟",
    "options": [
      "تشبيه تام الأركان",
      "جناس تام",
      "سجع فقط",
      "استعارة مكنية/تشخيص"
    ],
    "answer": 3,
    "explain": "جعل المآذن كائنًا يبكي هو تشخيص واستعارة مكنية."
  },
  {
    "unit": "بلاغة",
    "question": "ما وظيفة الطباق في العبارة: «بين عزّ وذلّ»؟",
    "options": [
      "تقوية المعنى بإبراز التضاد",
      "إثبات أن اللفظين مترادفان",
      "إخفاء المعنى وراء الغموض",
      "تحويل الجملة إلى خبر تاريخي"
    ],
    "answer": 0,
    "explain": "الطباق يبرز المعنى عبر التضاد."
  },
  {
    "unit": "بلاغة",
    "question": "أي مثال يتضمن كناية؟",
    "options": [
      "ضحك الورد",
      "العلم نور",
      "فلان طويل النجاد",
      "جاء الطالب مسرعًا"
    ],
    "answer": 2,
    "explain": "طويل النجاد كناية مشهورة عن طول القامة أو الشجاعة بحسب السياق."
  },
  {
    "unit": "بلاغة",
    "question": "ما الفرق الأدق بين التشبيه والاستعارة؟",
    "options": [
      "التشبيه لا علاقة له بالتصوير، والاستعارة إعراب فقط",
      "التشبيه يذكر طرفين غالبًا، والاستعارة يحذف فيها أحد الطرفين",
      "الاستعارة لا تقوم على المشابهة مطلقًا",
      "التشبيه لا يستخدم إلا في النثر"
    ],
    "answer": 1,
    "explain": "الاستعارة مبنية على تشبيه حُذف أحد طرفيه."
  },
  {
    "unit": "بلاغة",
    "question": "في قولنا «العلم نور»، ما الصورة البلاغية؟",
    "options": [
      "طباق سلبي",
      "جناس ناقص",
      "كناية عن الكثرة",
      "تشبيه بليغ"
    ],
    "answer": 3,
    "explain": "حذف وجه الشبه والأداة وبقي الطرفان، فهو تشبيه بليغ."
  },
  {
    "unit": "الإعراب",
    "question": "ما إعراب «مخلصًا» في: كان الطالبُ مخلصًا؟",
    "options": [
      "حال مرفوعة",
      "فاعل منصوب",
      "خبر كان منصوب",
      "نعت مجرور"
    ],
    "answer": 2,
    "explain": "كان ترفع الاسم وتنصب الخبر، ومخلصًا خبر كان منصوب."
  },
  {
    "unit": "الإعراب",
    "question": "أي جملة تحتوي فعلًا مضارعًا منصوبًا؟",
    "options": [
      "لن يهملَ المجتهدُ واجبَه",
      "لم يهملْ المجتهدُ واجبَه",
      "يهملُ الكسولُ واجبَه",
      "لا تهملْ واجبَك"
    ],
    "answer": 0,
    "explain": "لن من أدوات نصب المضارع، وعلامة النصب الفتحة."
  },
  {
    "unit": "الإعراب",
    "question": "أي جملة تحتوي فعلًا مضارعًا مجزومًا؟",
    "options": [
      "لن يقصّرَ الطالب في درسه",
      "يقصّرُ الطالب أحيانًا",
      "كي يقصّرَ الطالب أقل",
      "لم يقصّرْ الطالب في درسه"
    ],
    "answer": 3,
    "explain": "لم تجزم الفعل المضارع، وعلامة الجزم السكون هنا."
  },
  {
    "unit": "الإعراب",
    "question": "ما علامة رفع الفعل المضارع الصحيح الآخر؟",
    "options": [
      "الفتحة الظاهرة",
      "الضمة الظاهرة",
      "السكون الأصلي",
      "الكسرة المقدرة"
    ],
    "answer": 1,
    "explain": "يرفع المضارع الصحيح الآخر بالضمة إذا لم يسبق بناصب أو جازم."
  },
  {
    "unit": "الإعراب",
    "question": "ما عمل إنّ وأخواتها؟",
    "options": [
      "تنصب المبتدأ وترفع الخبر",
      "ترفع المبتدأ وتنصب الخبر",
      "تجزم الفعل المضارع",
      "تجر الاسم بعدها دائمًا"
    ],
    "answer": 0,
    "explain": "إنّ وأخواتها تنصب الاسم وترفع الخبر."
  },
  {
    "unit": "الإعراب",
    "question": "في جملة «إنّ العلمَ نافعٌ»، كلمة «نافعٌ» هي:",
    "options": [
      "اسم إنّ منصوب",
      "فاعل مرفوع",
      "خبر إنّ مرفوع",
      "مفعول به منصوب"
    ],
    "answer": 2,
    "explain": "نافعٌ خبر إنّ مرفوع."
  },
  {
    "unit": "الإعراب",
    "question": "في جملة «ليس النجاحُ سهلًا»، كلمة «سهلًا» تعرب:",
    "options": [
      "اسم ليس مرفوع",
      "خبر ليس منصوب",
      "تمييز منصوب",
      "حال منصوب"
    ],
    "answer": 1,
    "explain": "ليس من أخوات كان، ترفع الاسم وتنصب الخبر."
  },
  {
    "unit": "الإعراب",
    "question": "أي علامة تناسب نصب جمع المؤنث السالم؟",
    "options": [
      "الواو نيابة عن الضمة",
      "الألف نيابة عن الفتحة",
      "الياء نيابة عن الكسرة",
      "الكسرة نيابة عن الفتحة"
    ],
    "answer": 3,
    "explain": "جمع المؤنث السالم ينصب بالكسرة نيابة عن الفتحة."
  },
  {
    "unit": "سورة القصص",
    "question": "ما المحور العام للآيات التي تتناول طفولة موسى عليه السلام؟",
    "options": [
      "لطف الله وتدبيره لحماية موسى وردّه إلى أمه",
      "وصف حياة فرعون الخاصة فقط",
      "بيان أحكام البيع والشراء",
      "سرد رحلة تجارية لبني إسرائيل"
    ],
    "answer": 0,
    "explain": "الآيات تبرز تدبير الله ولطفه بموسى وأمه."
  },
  {
    "unit": "سورة القصص",
    "question": "ما دلالة إلهام أم موسى أن تلقيه في اليم؟",
    "options": [
      "اليأس من رحمة الله",
      "الاعتماد على قوة فرعون",
      "الثقة بوعد الله رغم صعوبة السبب الظاهر",
      "ترك الأسباب كلها دون توجيه"
    ],
    "answer": 2,
    "explain": "القصة تعلم الثقة بوعد الله مع أن السبب الظاهر مخيف."
  },
  {
    "unit": "سورة القصص",
    "question": "لماذا كان خوف أم موسى شديدًا؟",
    "options": [
      "لأن موسى كان يريد السفر وحده",
      "لأن القوم منعوا التجارة",
      "بسبب ضياع المال فقط",
      "بسبب بطش فرعون بأبناء بني إسرائيل"
    ],
    "answer": 3,
    "explain": "السياق مرتبط بقتل فرعون لأبناء بني إسرائيل."
  },
  {
    "unit": "سورة القصص",
    "question": "ما دلالة رجوع موسى إلى أمه؟",
    "options": [
      "تحقق وعد الله وطمأنينة قلبها",
      "انتصار فرعون النهائي",
      "انقطاع الصلة بين الأم وابنها",
      "فشل التدبير الإلهي"
    ],
    "answer": 0,
    "explain": "عودة موسى إلى أمه تثبت تحقق الوعد الإلهي."
  },
  {
    "unit": "سورة القصص",
    "question": "ما القيمة الإيمانية الأبرز في قصة أم موسى؟",
    "options": [
      "ترك العمل لأن القدر يكفي وحده",
      "الخوف من الناس أكثر من الله",
      "حسن التوكل على الله مع الأخذ بالسبب",
      "الاعتماد الكامل على القوة المادية"
    ],
    "answer": 2,
    "explain": "القصة تجمع بين التوكل والأخذ بالأسباب."
  },
  {
    "unit": "سورة القصص",
    "question": "ما دور أخت موسى في القصة؟",
    "options": [
      "واجهت فرعون مباشرة بالسلاح",
      "تتبعت أثره بحذر وساهمت في عودته إلى أمه",
      "تركت متابعة الأمر خوفًا فقط",
      "أخفت خبر موسى عن أمه تمامًا"
    ],
    "answer": 1,
    "explain": "أخت موسى تابعت الأمر بحكمة حتى عاد إلى أمه."
  },
  {
    "unit": "تحدي شامل",
    "question": "أي إجابة أدق عن سبب صعوبة البحث في المعاجم القديمة؟",
    "options": [
      "خلوها من الكلمات العربية الفصيحة",
      "اعتمادها على الصور بدل الألفاظ",
      "أنها لا تحتوي أي شرح للمعاني",
      "اختلاف مناهج الترتيب بين صوتي وتقليبي وجذري"
    ],
    "answer": 3,
    "explain": "تعدد مناهج الترتيب يجعل البحث يحتاج معرفة مسبقة بالطريقة."
  },
  {
    "unit": "تحدي شامل",
    "question": "أي علاقة تجمع بين الجذر والمعنى غالبًا؟",
    "options": [
      "الجذر لا علاقة له بمعاني الكلمات",
      "كل مشتق له جذر مستقل تمامًا",
      "الجذر يحمل معنى عامًا تتفرع منه المشتقات",
      "الجذر هو الحرف الأخير فقط"
    ],
    "answer": 2,
    "explain": "الجذر أصل دلالي تتفرع منه صيغ كثيرة."
  },
  {
    "unit": "تحدي شامل",
    "question": "أي خيار يميز السؤال التحليلي عن السؤال المباشر؟",
    "options": [
      "يطلب استنتاجًا أو تعليلًا لا مجرد تذكر معلومة",
      "يطلب نقل تعريف محفوظ فقط",
      "تكون إجابته دائمًا رقمية",
      "لا يحتاج فهم النص مطلقًا"
    ],
    "answer": 0,
    "explain": "السؤال التحليلي يتطلب فهمًا واستنتاجًا."
  },
  {
    "unit": "تحدي شامل",
    "question": "ما أفضل طريقة للإجابة عن سؤال بلاغي في نص؟",
    "options": [
      "ذكر اسم الشاعر فقط دون تحليل",
      "تحديد الصورة ثم بيان أثرها في المعنى",
      "نسخ البيت كاملًا دون شرح",
      "البحث عن الإعراب فقط"
    ],
    "answer": 1,
    "explain": "الإجابة البلاغية الجيدة تجمع بين تحديد الصورة وشرح أثرها."
  },
  {
    "unit": "تحدي شامل",
    "question": "عند تشابه خيارين في سؤال معجمي، ما المعيار الأفضل للاختيار؟",
    "options": [
      "اختيار الخيار الأقصر دائمًا",
      "اختيار أول خيار لأنه غالبًا صحيح",
      "الرجوع إلى نظام المعجم: جذري أم ألفبائي أم صوتي",
      "ترك السؤال دون قراءة باقي الخيارات"
    ],
    "answer": 2,
    "explain": "تحديد منهج المعجم يساعد على اختيار الإجابة الدقيقة."
  },
  {
    "unit": "تحدي شامل",
    "question": "ما الفرق بين الفهم اللغوي والحفظ في دراسة النصوص؟",
    "options": [
      "الحفظ أعلى دائمًا من التحليل",
      "الفهم يعني تجاهل الألفاظ",
      "لا فرق بينهما في الدراسة",
      "الفهم يفسر العلاقات والمعاني، والحفظ يكرر الألفاظ فقط"
    ],
    "answer": 3,
    "explain": "الفهم أعمق لأنه يكشف المعنى والعلاقات لا يكتفي بترديد النص."
  }
];

function shuffleQuestion(q) {
  const arr = q.options.map((opt, i) => ({
    text: opt,
    correct: i === q.answer,
  }));

  // Fisher-Yates shuffle: خلط حقيقي بدون نمط A B C D
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return {
    ...q,
    options: arr.map((o) => o.text),
    answer: arr.findIndex((o) => o.correct),
  };
}

// يتم خلط الخيارات مرة واحدة عند تحميل الصفحة.
// كل Refresh يعطي ترتيبًا جديدًا، بدون نمط ثابت.
const questions = rawQuestions.map((q) => shuffleQuestion(q));


const uniqueUnits = ["الكل", ...Array.from(new Set(questions.map((q) => q.unit)))];

function Icon({ label, className = "" }) {
  return (
    <span aria-hidden="true" className={`inline-flex select-none items-center justify-center ${className}`}>
      {label}
    </span>
  );
}

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState("الكل");
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const unitOk = selectedUnit === "الكل" || q.unit === selectedUnit;
      const searchOk = !query.trim() || `${q.question} ${q.unit}`.includes(query.trim());
      return unitOk && searchOk;
    });
  }, [selectedUnit, query]);

  const q = filtered[current] || filtered[0];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((item, index) => answers[index] === item.answer).length;
  const percentage = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;

  const originalIndex = q ? questions.indexOf(q) : -1;
  const selected = originalIndex >= 0 ? answers[originalIndex] : undefined;

  function chooseAnswer(optionIndex) {
    if (originalIndex < 0 || selected !== undefined) return;
    setAnswers((prev) => ({ ...prev, [originalIndex]: optionIndex }));
  }

  function resetQuiz() {
    setAnswers({});
    setCurrent(0);
    setSelectedUnit("الكل");
    setQuery("");
  }

  function nextQuestion() {
    setCurrent((prev) => Math.min(prev + 1, filtered.length - 1));
  }

  function previousQuestion() {
    setCurrent((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] items-stretch">
          <div className="border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-2xl bg-white/15 p-3 text-3xl">
                  <Icon label="📘" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-black tracking-tight">كويز اللغة العربية</h1>
                  <p className="text-white/70 mt-2">50 سؤالًا أصعب مع خيارات متقاربة وإجابات موزعة بدون نمط.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {uniqueUnits.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => {
                      setSelectedUnit(unit);
                      setCurrent(0);
                    }}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      selectedUnit === unit
                        ? "bg-white text-slate-950 font-bold"
                        : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl">
            <div className="p-6 h-full flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Icon label="🏆" className="text-4xl" />
                <div>
                  <p className="text-white/70">نتيجتك الحالية</p>
                  <h2 className="text-4xl font-black">{percentage}%</h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">{answeredCount}</p>
                  <p className="text-xs text-white/60">أجبت</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/20 p-3">
                  <p className="text-2xl font-bold">{correctCount}</p>
                  <p className="text-xs text-white/60">صحيح</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-bold">{questions.length}</p>
                  <p className="text-xs text-white/60">كل الأسئلة</p>
                </div>
              </div>

              <button onClick={resetQuiz} className="mt-5 rounded-2xl bg-white text-slate-950 hover:bg-white/90 px-4 py-3 font-bold">
                <span className="ml-2">↻</span> إعادة الاختبار
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45">🔎</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrent(0);
            }}
            placeholder="ابحث عن سؤال أو وحدة..."
            className="w-full rounded-3xl border border-white/10 bg-white/10 px-12 py-4 outline-none placeholder:text-white/40 focus:border-white/30"
          />
        </div>

        {q ? (
          <div className="border border-white/10 bg-white/95 text-slate-950 shadow-2xl rounded-[2rem] overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-bold">{q.unit}</span>
                <span className="text-slate-500 font-medium">
                  سؤال {current + 1} من {filtered.length}
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black leading-relaxed mb-6">{q.question}</h2>

              <div className="grid gap-3">
                {q.options.map((option, index) => {
                  const isChosen = selected === index;
                  const isCorrect = q.answer === index;
                  const showCorrect = selected !== undefined && isCorrect;
                  const showWrong = selected !== undefined && isChosen && !isCorrect;

                  return (
                    <button
                      key={option}
                      onClick={() => chooseAnswer(index)}
                      className={`group flex items-center justify-between rounded-3xl border-2 p-4 md:p-5 text-right transition shadow-sm ${
                        showCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : showWrong
                          ? "border-red-500 bg-red-50 text-red-900"
                          : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50"
                      }`}
                    >
                      <span className="text-lg font-bold leading-relaxed">{option}</span>
                      <span className="mr-3 shrink-0 text-2xl">
                        {showCorrect && "✅"}
                        {showWrong && "❌"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selected !== undefined && (
                <div className={`mt-6 rounded-3xl p-5 ${selected === q.answer ? "bg-emerald-50" : "bg-red-50"}`}>
                  <p className={`font-black text-xl ${selected === q.answer ? "text-emerald-700" : "text-red-700"}`}>
                    {selected === q.answer ? "إجابة صحيحة ✅" : "إجابة خاطئة ❌"}
                  </p>
                  <p className="mt-2 text-slate-700 leading-relaxed">{q.explain}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3 justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={current === 0}
                  className="rounded-2xl border border-slate-300 px-5 py-3 font-bold disabled:opacity-40"
                >
                  السابق
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={current >= filtered.length - 1}
                  className="rounded-2xl bg-slate-950 hover:bg-slate-800 text-white px-5 py-3 font-bold disabled:opacity-40"
                >
                  السؤال التالي
                  <span className="mr-2">←</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-white/10 bg-white/10 text-white rounded-3xl">
            <div className="p-8 text-center">
              <p className="text-xl font-bold">لا توجد أسئلة مطابقة للبحث.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
