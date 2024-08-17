export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'ツール一覧',
    children: [
      {
        label: 'スピード調整ツール',
        subLabel: 'わくわくの実を用いてモンスターのスピードを調整したいときに利用できます。',
        href: '/speed-tool',
      },
      {
        label: 'ランク & 経験値計算ツール',
        subLabel: '目標までどのくらいの時間と経験値が必要かを計算します。',
        href: '/exp-calculator',
      },
    ],
  },
]
