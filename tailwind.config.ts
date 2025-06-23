import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// ====================================================================
			// INICIO: CONFIGURACIÓN PARA @tailwindcss/typography
			// Esto configura la clase `prose` para que use los colores de tu web.
			// ====================================================================
			typography: ({ theme }) => ({
				DEFAULT: {
				  css: {
					'--tw-prose-body': theme('colors.foreground / 85%'),
					'--tw-prose-headings': theme('colors.primary.DEFAULT'),
					'--tw-prose-lead': theme('colors.foreground / 90%'),
					'--tw-prose-links': theme('colors.primary.DEFAULT'),
					'--tw-prose-bold': theme('colors.foreground'),
					'--tw-prose-counters': theme('colors.muted.foreground'),
					'--tw-prose-bullets': theme('colors.muted.foreground'),
					'--tw-prose-hr': theme('colors.border'),
					'--tw-prose-quotes': theme('colors.foreground'),
					'--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
					'--tw-prose-captions': theme('colors.muted.foreground'),
					'--tw-prose-code': theme('colors.primary.DEFAULT'),
					'--tw-prose-pre-code': theme('colors.muted.foreground'),
					'--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),
					'--tw-prose-th-borders': theme('colors.border'),
					'--tw-prose-td-borders': theme('colors.border'),
					'a': {
						textDecoration: 'none',
						fontWeight: '500',
						'&:hover': {
						  textDecoration: 'underline',
						},
					},
				  },
				},
			}),
			// ====================================================================
			// FIN: CONFIGURACIÓN PARA @tailwindcss/typography
			// ====================================================================

			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-24px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				fadeInRight: {
					'0%': { opacity: '0', transform: 'translateX(24px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				slideInDown: {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-up': { 
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.6s ease-out forwards',
				'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
				'fade-in-left': 'fadeInLeft 0.7s ease-out forwards',
				'fade-in-right': 'fadeInRight 0.7s ease-out forwards',
				'slide-in-down': 'slideInDown 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.6s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')], // <-- Plugin añadido aquí
} satisfies Config;