# 🎨 NutriScan Ultimate UI/UX Remaster Masterplan (V2.0.0)

> **경고 (WARNING)**: 본 문서는 일반적인 개요 문서가 아닙니다. Figma/Zeplin/Sympli 등의 디자인 핸드오프(Handoff) 툴을 완벽히 대체하기 위해 **모든 패딩(Padding), 마진(Margin), 텍스트 스타일(Typography), 애니메이션 곡선(Curve), 위젯 트리(Widget Tree) 및 풀소스 코드(Full Source Code)**를 픽셀 단위로 명세한 '소프트웨어 엔지니어링 UI 아키텍처 스펙 시트'입니다. 이 문서의 지침을 1px, 1ms의 오차도 없이 정확히 구현해야 완벽한 글래스모피즘 기반 프리미엄 UI가 완성됩니다. 이 문서는 10페이지 이상의 분량으로 기획되었습니다.

---

## 📑 목차 (Table of Contents)
1. **Executive Summary & Architectural Goal** (개요 및 아키텍처 목표)
2. **Absolute Design Token System** (절대적 디자인 토큰 시스템)
3. **Typography & Text Styles** (타이포그래피 및 텍스트 스타일)
4. **Spacing, Radius & Layout Constraints** (여백, 곡률 및 레이아웃 제약사항)
5. **Animation Physics & Micro-Interactions** (애니메이션 물리법칙 및 마이크로 인터랙션)
6. **Global Master Components** (글로벌 마스터 컴포넌트 전체 소스 코드)
7. **Screen Spec 1: Splash & Onboarding** (스플래시 및 온보딩 상세)
8. **Screen Spec 2: Auth Flow** (로그인/회원가입 상세)
9. **Screen Spec 3: Home Dashboard** (홈 대시보드 상세)
10. **Screen Spec 4: Advanced Camera Scan** (고급 카메라 스캔 상세)
11. **Screen Spec 5: Nutritional Result (Analyze)** (영양 분석 결과 상세)
12. **Implementation Strategy & Theme Binding** (구현 전략 및 테마 바인딩)

---

## 1. Executive Summary & Architectural Goal

기존 NutriScan 앱의 Firebase 및 데이터베이스 연동 등 **"논리적 데이터 플로우(Logical Data Flow)"**는 철저히 배제하고, 사용자 경험(UX)과 시각적 피드백(Visual Feedback)만을 극한으로 끌어올린 "클라이언트 프로토타입(Client Prototype)" 구축이 목표입니다. 

### 핵심 디자인 패러다임 (Core Design Paradigms)
- **Glassmorphism (글래스모피즘)**: Z축 상호작용 극대화. 화면 깊이감을 위해 Background는 어둡고(Dark), Surface는 반투명한 블러(Blur) 처리를 거친 카드를 겹겹이 쌓아 올립니다.
- **Fluid Motion (유체 모션)**: 정지해 있는 화면은 없습니다. 버튼은 호흡하고(Pulse), 화면 전환 시에는 컴포넌트 단위로 Shared Axis Transition을 수행합니다.
- **Information Hierarchy (정보 위계)**: 거대한 수치(Large Numbers)와 명확한 게이지(Gauge)를 사용해, 1초 안에 칼로리 및 영양소 상태를 인지할 수 있게 합니다.

---

## 2. Absolute Design Token System (절대적 디자인 토큰 시스템)

이 토큰(Token)들은 앱 전체에서 절대적으로 지켜져야 하는 Color HEX 값입니다. 

### 2.1 Primary & Secondary Palette
* `Primary 50`: `#E0F8EE` (버튼 호버 밝은 색상)
* `Primary 100`: `#B3ECD5` 
* `Primary 500` (Main): `#00D287` (Neon Emerald Green - 메인 액션, 강조 스위치)
* `Primary 700`: `#00A368` (눌렸을 때 색상)
* `Primary 900`: `#005C3A` (다크모드 스플래시 그라데이션)

* `Secondary 500` (Accent): `#8A2BE2` (Deep Purple - 차트 비교, 스캐너 빔 애니메이션 듀얼 컬러)
* `Secondary 300`: `#A954F5`

### 2.2 Neutral & Surface Palette (다크모드 기준)
* `Background`: `#0A0A0A` (순수 블랙에 가까운 다크 그레이)
* `Surface 0`: `#121212` (기본 카드 배경)
* `Surface 1`: `#1E1E1E` (위로 올라온 팝업 카드)
* `Surface 2`: `#2C2C2C` (가장 위로 올라온 툴팁)
* `Glass Fill`: `rgba(255, 255, 255, 0.05)` (글래스모피즘 전용 반투명 채우기)
* `Glass Border`: `rgba(255, 255, 255, 0.12)` (글래스모피즘 전용 외곽선 1px)

### 2.3 Semantic Palette
* `Success`: `#4CAF50` (분석 완료)
* `Warning`: `#FFC107` (1일 섭취량 초과 직전)
* `Error`: `#FF4B4B` (초과, 스캔 실패)

---

## 3. Typography & Text Styles

**Font Family**: `Pretendard` (대체제: `Inter`)
플러터의 `TextTheme`에 매핑할 완벽한 스펙입니다.

| Style Name | Font Weight | Font Size | Letter Spacing | Line Height (Height) | Color | Usage |
|---|---|---|---|---|---|---|
| **Display Large** | w800 (ExtraBold) | 48px | -1.5px | 1.1 | White | 온보딩 캐치프레이즈 |
| **Headline Large** | w700 (Bold) | 32px | -1.0px | 1.2 | White | 페이지 메인 타이틀 |
| **Title Large** | w600 (SemiBold)| 22px | -0.5px | 1.3 | White | 카드 타이틀, 모달 타이틀 |
| **Title Medium** | w500 (Medium) | 18px | -0.2px | 1.4 | White | 서브 카드, 버튼 텍스트 |
| **Body Large** | w400 (Regular) | 16px | 0.0px | 1.5 | #B3B3B3 | 일반 본문 텍스트 |
| **Body Medium** | w400 (Regular) | 14px | +0.1px | 1.5 | #B3B3B3 | 리스트 아이템 설명 |
| **Label Small** | w600 (SemiBold)| 11px | +0.5px | 1.2 | #808080 | 태그, 칩(Chip), 메타데이터 |

---

## 4. Spacing, Radius & Layout Constraints

하드코딩된 패딩 값을 쓰지 마십시오. 오직 아래 규칙을 적용합니다.

### 4.1 Spacing Scale (패딩 및 마진)
* `Space2`: 2px (미세 조정)
* `Space4`: 4px
* `Space8`: 8px (아이콘과 텍스트 사이)
* `Space12`: 12px (리스트 아이템 간격)
* `Space16`: 16px (화면 기본 좌우 패딩 - Mobile 표준)
* `Space24`: 24px (섹션과 섹션 간 간격)
* `Space32`: 32px (대형 컴포넌트 간 간격)
* `Space48`: 48px (화면 상하단 극단 여백)

### 4.2 Border Radius Scale
* `RadiusS`: 8px (Text Field, Checkbox)
* `RadiusM`: 16px (Standard Card, Dialog)
* `RadiusL`: 24px (Bottom Sheet Top, Hero Image Bottom)
* `RadiusPill`: 999px (Button, Bottom Nav Container)

---

## 5. Animation Physics & Micro-Interactions

### 5.1 Button Tap Physics
* **Event**: OnTapDown
* **Duration**: 100ms
* **Curve**: `Curves.easeOutCubic`
* **Transform**: `Scale(0.96)` (4% 축소)

* **Event**: OnTapUp / OnTapCancel
* **Duration**: 200ms
* **Curve**: `Curves.elasticOut` (가벼운 바운스)
* **Transform**: `Scale(1.0)`

### 5.2 Page Transition (Shared Axis Z)
* **Forward Duration**: 400ms
* **Reverse Duration**: 300ms
* **Effect**: 이전 화면은 Opacity 0이 되며 살짝 작아지고(Scale 0.95), 새 화면은 커지며(Scale 1.05 -> 1.0) Opacity 1이 됨. `animations` 패키지의 `SharedAxisTransition` 사용.

### 5.3 List Staggered Animation
* 리스트 렌더링 시 동시에 나타나지 않음.
* 1번 항목: Delay 0ms, 2번: Delay 50ms, 3번: Delay 100ms...
* **Slide**: Y +30px에서 0px로.
* **Fade**: Opacity 0에서 1.0으로. Duration 350ms, `Curves.easeOutQuart`.

---

## 6. Global Master Components (소스 코드 포함)

이 폴더(`lib/widgets/`)에 구축해야 할 3대 마스터 컴포넌트의 완벽한 플러터 코드입니다.

### 6.1 `PremiumGlassCard.dart`
백그라운드의 뎁스를 파악할 수 있는 프리미엄 카드 위젯입니다.

```dart
import 'dart:ui';
import 'package:flutter/material.dart';

class PremiumGlassCard extends StatelessWidget {
  final Widget child;
  final double borderRadius;
  final EdgeInsets padding;
  final double width;
  final double height;

  const PremiumGlassCard({
    Key? key,
    required this.child,
    this.borderRadius = 16.0,
    this.padding = const EdgeInsets.all(16.0),
    this.width = double.infinity,
    this.height = double.infinity,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 20.0, sigmaY: 20.0),
        child: Container(
          width: width,
          height: height,
          padding: padding,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.04), // 극미세한 불투명도
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(
              color: Colors.white.withOpacity(0.08),
              width: 1.0,
            ),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Colors.white.withOpacity(0.08),
                Colors.white.withOpacity(0.01),
              ],
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.2),
                blurRadius: 20,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: child,
        ),
      ),
    );
  }
}
```

### 6.2 `BouncingGradientButton.dart`
눌렀을 때 압력이 느껴지는 버튼입니다.

```dart
import 'package:flutter/material.dart';

class BouncingGradientButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isLoading;

  const BouncingGradientButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isLoading = false,
  }) : super(key: key);

  @override
  _BouncingGradientButtonState createState() => _BouncingGradientButtonState();
}

class _BouncingGradientButtonState extends State<BouncingGradientButton> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 100));
    _scale = Tween<double>(begin: 1.0, end: 0.94).animate(CurvedAnimation(parent: _ctrl, curve: Curves.easeOutCubic));
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _ctrl.forward(),
      onTapUp: (_) { _ctrl.reverse(); widget.onPressed(); },
      onTapCancel: () => _ctrl.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          width: double.infinity,
          height: 56.0,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(999),
            gradient: const LinearGradient(
              colors: [Color(0xFF00D287), Color(0xFF00A368)],
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF00D287).withOpacity(0.4),
                blurRadius: 16,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          alignment: Alignment.center,
          child: widget.isLoading
              ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : Text(widget.text, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.white, letterSpacing: -0.2)),
        ),
      ),
    );
  }
}
```

---

## 7. Screen Spec 1: Splash & Onboarding

### 7.1 스플래시 화면 (Splash Screen)
- **배경**: 중앙에서 시작되는 방사형 그라데이션(`RadialGradient`). 중심부는 `Primary 900(#005C3A)`, 외곽은 `Background(#0A0A0A)`.
- **중앙 컴포넌트**: NutriScan 로고 (Hero 태그 적용).
- **애니메이션**: 
  1. 로고가 Opacity 0 -> 1.0 (Duration: 800ms)
  2. 로고 Scale 0.8 -> 1.0 (Curve: elasticOut, Duration: 1200ms)
  3. 2초 대기 후 Onboarding 화면으로 Fade Transition.

### 7.2 온보딩 화면 (Onboarding Flow)
**위젯 구조 (Widget Tree)**
```text
Scaffold (bg: #0A0A0A)
 └─ Stack
     ├─ Positioned.fill (배경 메쉬 그라데이션 MeshGradient 위젯)
     ├─ SafeArea
     │   └─ Column
     │       ├─ Expanded (PageView)
     │       │   └─ OnboardingPage (이미지, 타이틀, 서브타이틀)
     │       ├─ Padding (bottom: 48)
     │       │   └─ Row (Indicator 점 3개)
     │       └─ Padding (bottom: 32, left: 16, right: 16)
     │           └─ BouncingGradientButton ("시작하기")
```
- **인디케이터**: 활성화된 점은 Width 24px, Color `Primary 500`. 비활성화된 점은 Width 8px, Color `White.opacity(0.3)`. 부드러운 `AnimatedContainer`로 크기 변환.

---

## 8. Screen Spec 2: Auth Flow (로그인/회원가입)

### 레이아웃 및 UX 명세
- 상단 1/3 지점에 타이틀 위치 ("건강한 라이프,\nNutriScan과 함께").
- **입력 필드 (`CustomTextField`)**:
  - `height`: 56px
  - `fillColor`: `Surface 1(#1E1E1E)`
  - `border`: 포커스 시 `Primary 500`의 2px 외곽선 생성.
  - `prefixIcon`: `Icon(Icons.email_outlined, color: textSecondary)`
- **소셜 로그인 버튼**: 
  - `PremiumGlassCard`를 원형으로 사용한 아이콘 버튼 (Apple, Google, Kakao).
  - 로우(Row) 위젯으로 배치, 간격은 16px.

---

## 9. Screen Spec 3: Home Dashboard (가장 중요한 대시보드 화면)

앱의 메인 허브입니다. 데이터를 엄청나게 시각적으로 잘 뽐내야 합니다.

**위젯 트리의 깊이 (Depth)**
```text
Scaffold (bg: #0A0A0A)
 └─ CustomScrollView (Parallax 효과를 위해 사용)
     ├─ SliverAppBar (Floating, Pinned: false, bg: 투명)
     │   └─ title: Text("안녕하세요, 동욱님!", style: HeadlineLarge)
     │   └─ actions: [CircleAvatar(bg: 투명, img: NetworkImage)]
     ├─ SliverToBoxAdapter (Top Padding 16)
     │   └─ TodayNutritionHeroCard (거대한 PremiumGlassCard)
     │       └─ Row
     │           ├─ Column (칼로리 수치 텍스트)
     │           │   ├─ Text("오늘 섭취량", BodyLarge)
     │           │   ├─ AnimatedCounter(1420, "kcal", DisplayLarge) // 카운트 애니메이션
     │           │   └─ Text("/ 목표 2000 kcal", BodyMedium)
     │           └─ CustomCircularChart (반경 60px, 두께 12px, Cap round, Value: 0.71)
     ├─ SliverToBoxAdapter (간격 32)
     │   └─ Text("매크로 뉴트리션", style: TitleLarge, padding: left 16)
     ├─ SliverToBoxAdapter (간격 16)
     │   └─ Row (탄, 단, 지 요약 미니 카드 3개 렌더링)
     │       ├─ MacroMiniCard (탄수화물, 180g, LinearProgressIndicator)
     │       ├─ MacroMiniCard (단백질, 80g, LinearProgressIndicator)
     │       └─ MacroMiniCard (지방, 40g, LinearProgressIndicator)
     └─ SliverList (최근 스캔 목록)
         └─ RecentScanTile (가로형 리스트뷰, GlassCard 감싸기)
```
- **마이크로 애니메이션**: `CustomCircularChart` 렌더링 시, 0%에서 71%까지 원이 그려지는 데 걸리는 시간: 1500ms, `Curves.easeOutQuint`.

---

## 10. Screen Spec 4: Advanced Camera Scan UI (스캔 화면)

사용자가 사진을 찍어 영양을 분석하는 핵심 기능 화면입니다. 영화의 홀로그램 스캐너 같은 뷰를 연출합니다.

### 뷰파인더(Viewfinder) 디자인 
1. **CameraPreview Base**: 가장 밑바탕에 라이브 카메라 뷰.
2. **Dimmer Overlay**: 그 위에 `Container(color: Colors.black.withOpacity(0.6))`를 덮습니다.
3. **ClipPath Hole**: 정중앙에 280x280 크기의 둥근 사각형(Radius 24px) 렌즈(Hole)를 뚫어 카메라가 밝게 보이게 만듭니다 (`CustomClipper` 활용).
4. **Corner Brackets**: 뚫린 구멍의 4모서리에 하얀색(두께 4px, 길이 30px) 'ㄱ' 모양 브라켓을 얹습니다.
5. **Laser Scan Animation**: 구멍 내부를 위아래로 반복 왕복하는 가로형 레이저 바 위젯 추가.
   - `height`: 2px, `width`: 280px
   - `decoration`: `BoxShadow`로 Y축 위아래 방향 20px 블러 반경의 네온 초록(`Primary 500`) 오라(Aura) 발생.
   - TweenAnimation: Y 좌표 0에서 280으로 이동 후 Reverse 반복 (Duration 1800ms).
6. **Bottom Action Sheet**: 화면 최하단. 반투명한 넓은 Container 위젯 내부에 촬영 셔터 버튼 배치.
   - 셔터 링: 외곽 80x80 흰색 링.
   - 내부 버튼: 60x60 흰색 원형 버튼. 누를 때 50x50으로 줄어드는 Bouncing 애니메이션.

---

## 11. Screen Spec 5: Nutritional Analysis Result (분석 결과 뷰)

카메라 촬영 후 AI가 반환한 결과를 멋지게 렌더링합니다.

### 11.1 Loading State (분석 중 애니메이션)
사진 촬영 직후 즉시 Result 화면으로 넘어가지만, 로딩 상태를 보여줍니다.
- 중앙에 스캔한 음식 이미지가 `PremiumGlassCard` 내에 120x120 크기로 떠오릅니다.
- 이미지 테두리를 따라 빙글빙글 도는 궤도 입자(Orbital Particle) 애니메이션 (`Lottie` 플러그인 또는 커스텀 페인터 사용).
- 하단 텍스트: "AI가 음식의 영양소를 스캔 중입니다..." (투명도 깜빡임 효과 Fade Transition, 800ms 반복).

### 11.2 Result Render State (결과 완료 상태)
- 화면 전체 구조는 하단부터 스크롤로 올라오는 바텀 시트 구조를 본뜬 `DraggableScrollableSheet` 활용.
- **Top Image Header**: 사진 이미지가 상단 화면의 절반 차지. (Parallax 스크롤 적용)
- **Title Block**:
  - 식품명: "치킨마요덮밥" (Headline Large)
  - 총 칼로리: "650 kcal" (Display Large, Primary Color)
- **Radar Chart (육각형 방사형 차트)**: 
  - `fl_chart` 패키지의 `RadarChart` 사용.
  - 축(Axis): 단백질, 탄수화물, 지방, 나트륨, 당류, 콜레스테롤.
  - 폴리곤 색상: `Primary 500.withOpacity(0.4)`. 외곽선 두께 2px.
- **Details Bar Chart**: 
  - 각 영양소별로 수평(Horizontal) 바 게이지 렌더링.
  - 가로 바 게이지 배경색: `Surface 1(#1E1E1E)`.
  - 채워지는 색상: `Secondary 500(#8A2BE2)`.

---

## 12. Implementation Strategy & Theme Binding

위의 모든 스펙을 앱에 즉시 적용하기 위해 `lib/main_test_ui.dart`와 테마 파일 구조를 완전히 새롭게 구축하십시오.

### 최상위 라우팅 및 테마 인젝션

이 파일을 복사하여 실행 진입점(`lib/main_test_ui.dart`)으로 삼으십시오.

```dart
// lib/main_test_ui.dart
import 'package:flutter/material.dart';

// [NOTE] 본 파일은 UI 프로토타이핑을 위한 독립된 테스트 진입점입니다.
void main() {
  runApp(const NutriScanUIPrototypeApp());
}

class NutriScanUIPrototypeApp extends StatelessWidget {
  const NutriScanUIPrototypeApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NutriScan UI Remaster',
      debugShowCheckedModeBanner: false,
      themeMode: ThemeMode.dark, // 100% 다크모드 기반 글래스모피즘
      darkTheme: _buildDarkTheme(),
      home: const DummyHomeDashboard(), // 여기서부터 Screen Spec 3 구현 시작
    );
  }

  ThemeData _buildDarkTheme() {
    const Color primaryColor = Color(0xFF00D287);
    const Color bgColor = Color(0xFF0A0A0A);
    const Color surfaceColor = Color(0xFF1E1E1E);

    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgColor,
      primaryColor: primaryColor,
      colorScheme: const ColorScheme.dark(
        primary: primaryColor,
        secondary: Color(0xFF8A2BE2),
        background: bgColor,
        surface: surfaceColor,
      ),
      fontFamily: 'Pretendard', // 반드시 pubspec.yaml에 폰트 에셋 선언 필요
      textTheme: const TextTheme(
        displayLarge: TextStyle(fontSize: 48, fontWeight: FontWeight.w800, color: Colors.white, letterSpacing: -1.5),
        headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.w700, color: Colors.white, letterSpacing: -1.0),
        titleLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w600, color: Colors.white, letterSpacing: -0.5),
        titleMedium: TextStyle(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.white, letterSpacing: -0.2),
        bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w400, color: Color(0xFFB3B3B3)),
        bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: Color(0xFFB3B3B3)),
        labelSmall: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF808080), letterSpacing: 0.5),
      ),
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: ZoomPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }
}

// ==========================================
// 더미 홈 화면 (구현 시작용 뼈대)
// ==========================================
class DummyHomeDashboard extends StatelessWidget {
  const DummyHomeDashboard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("NutriScan UI Master", style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: 16),
            const Text("Design Spec 100% Loaded.", style: TextStyle(color: Color(0xFF00D287))),
            const SizedBox(height: 48),
            // 이곳에 PremiumGlassCard 나 BouncingGradientButton 위젯을 삽입하십시오.
          ],
        ),
      ),
    );
  }
}
```

## End of Document
> **개발자 지시사항(Dev Note)**: 지금 즉시 위 문서의 `main_test_ui.dart` 뼈대를 복사하여 앱을 실행하고, 챕터 6에 있는 `PremiumGlassCard`와 `BouncingGradientButton`을 구현하여 `DummyHomeDashboard` 화면에 랜더링하십시오. 레이아웃과 픽셀 오차, 색상 헥스값을 철저하게 검수하며 진행해 주시기 바랍니다.
