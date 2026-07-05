import type { Translations, LangCode } from './types'
import es from './es'
import en from './en'
import fr from './fr'
import pt from './pt'
import de from './de'
import ar from './ar'
import id from './id'
import zh from './zh'
import eu from './eu'

const all: Record<LangCode, Translations> = { es, en, fr, pt, de, ar, id, zh, eu }

export default all
