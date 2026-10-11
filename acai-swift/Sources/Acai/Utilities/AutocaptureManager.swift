import Foundation

class AutocaptureManager {
    private let lock = NSLock()
    private var _enabledOptions: AutocaptureOptions = .init(rawValue: 0)
    private var enabledOptions: AutocaptureOptions {
        get { lock.withLock { _enabledOptions } }
        set { lock.withLock { _enabledOptions = newValue } }
    }

    private var _rageClickEnabled: Bool = false
    private var _deadClickEnabled: Bool = false

    var rageClickEnabled: Bool {
        lock.withLock { _rageClickEnabled }
    }

    var deadClickEnabled: Bool {
        lock.withLock { _deadClickEnabled }
    }

    init(autocapture: AutocaptureOptions,
         rageClickEnabled: Bool,
         deadClickEnabled: Bool) {
        self._enabledOptions = autocapture
        self._rageClickEnabled = rageClickEnabled
        self._deadClickEnabled = deadClickEnabled
    }

    func isEnabled(_ option: AutocaptureOptions) -> Bool {
        return enabledOptions.contains(option)
    }
}
