export type Pages = 'Home' | 'About' | 'Projects' | 'Blog' | 'Contact'

export type PagesDictionary<T> = {
	[Page in Pages]: T
}
