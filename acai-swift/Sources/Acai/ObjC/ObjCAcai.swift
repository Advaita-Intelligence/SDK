import Foundation

@objc(Acai)
public class ObjCAcai: NSObject {
    private let amplitude: Acai
    private var plugins: [ObjCPluginWrapper] = []

    @objc(initWithConfiguration:)
    public static func initWithConfiguration(
        configuration: ObjCConfiguration
    ) -> ObjCAcai {
        ObjCAcai(configuration: configuration)
    }

    @objc(initWithConfiguration:)
    public init(
        configuration: ObjCConfiguration
    ) {
        amplitude = Acai(configuration: configuration.configuration)
    }

    @objc
    public var configuration: ObjCConfiguration {
        ObjCConfiguration(configuration: amplitude.configuration)
    }

    @objc
    public var storage: ObjCStorage {
        ObjCStorage(amplitude: amplitude)
    }

    @objc(track:)
    @discardableResult
    public func track(event: ObjCBaseEvent) -> ObjCAcai {
        amplitude.track(event: event.event)
        return self
    }

    @objc(track:callback:)
    @discardableResult
    public func track(event: ObjCBaseEvent, callback: ObjCEventCallback?) -> ObjCAcai {
        amplitude.track(event: event.event, callback: callback == nil ? nil : { (event, code, message) in
            callback!(ObjCBaseEvent(event: event), code, message)
        })
        return self
    }

    @objc(track:options:)
    @discardableResult
    public func track(event: ObjCBaseEvent, options: ObjCEventOptions?) -> ObjCAcai {
        amplitude.track(event: event.event, options: options?.options)
        return self
    }

    @objc(track:options:callback:)
    @discardableResult
    public func track(event: ObjCBaseEvent, options: ObjCEventOptions?, callback: ObjCEventCallback?) -> ObjCAcai {
        amplitude.track(event: event.event, options: options?.options, callback: callback == nil ? nil : { (event, code, message) in
            callback!(ObjCBaseEvent(event: event), code, message)
        })
        return self
    }

    @objc(track:eventProperties:)
    @discardableResult
    public func track(eventType: String, eventProperties: [String: Any]?) -> ObjCAcai {
        amplitude.track(eventType: eventType, eventProperties: eventProperties)
        return self
    }

    @objc(track:eventProperties:options:)
    @discardableResult
    public func track(eventType: String, eventProperties: [String: Any]?, options: ObjCEventOptions?) -> ObjCAcai {
        amplitude.track(eventType: eventType, eventProperties: eventProperties, options: options?.options)
        return self
    }

    @objc(identify:)
    @discardableResult
    public func identify(identify: ObjCIdentify) -> ObjCAcai {
        amplitude.identify(identify: identify.identify)
        return self
    }

    @objc(identify:options:)
    @discardableResult
    public func identify(identify: ObjCIdentify, options: ObjCEventOptions?) -> ObjCAcai {
        amplitude.identify(identify: identify.identify, options: options?.options)
        return self
    }

    @objc(groupIdentify:groupName:identify:)
    @discardableResult
    public func groupIdentify(groupType: String, groupName: String, identify: ObjCIdentify) -> ObjCAcai {
        amplitude.groupIdentify(groupType: groupType, groupName: groupName, identify: identify.identify)
        return self
    }

    @objc(groupIdentify:groupName:identify:options:)
    @discardableResult
    public func groupIdentify(groupType: String, groupName: String, identify: ObjCIdentify, options: ObjCEventOptions?) -> ObjCAcai {
        amplitude.groupIdentify(groupType: groupType, groupName: groupName, identify: identify.identify, options: options?.options)
        return self
    }

    @objc(setGroup:groupName:)
    @discardableResult
    public func setGroup(groupType: String, groupName: String) -> ObjCAcai {
        amplitude.setGroup(groupType: groupType, groupName: groupName)
        return self
    }

    @objc(setGroup:groupName:options:)
    @discardableResult
    public func setGroup(groupType: String, groupName: String, options: ObjCEventOptions?) -> ObjCAcai {
        amplitude.setGroup(groupType: groupType, groupName: groupName, options: options?.options)
        return self
    }

    @objc(setGroup:groupNames:)
    @discardableResult
    public func setGroup(groupType: String, groupNames: [String]) -> ObjCAcai {
        amplitude.setGroup(groupType: groupType, groupName: groupNames)
        return self
    }

    @objc(setGroup:groupNames:options:)
    @discardableResult
    public func setGroup(groupType: String, groupNames: [String], options: ObjCEventOptions?) -> ObjCAcai {
        amplitude.setGroup(groupType: groupType, groupName: groupNames, options: options?.options)
        return self
    }

    @objc(revenue:)
    @discardableResult
    public func revenue(revenue: ObjCRevenue) -> ObjCAcai {
        amplitude.revenue(revenue: revenue.instance)
        return self
    }

    @objc(revenue:options:)
    @discardableResult
    public func revenue(revenue: ObjCRevenue, options: ObjCEventOptions? = nil) -> ObjCAcai {
        amplitude.revenue(revenue: revenue.instance, options: options?.options)
        return self
    }

    @objc(add:)
    @discardableResult
    public func add(plugin: AnyObject) -> ObjCAcai {
        switch plugin {
        case let swiftPlugin as UniversalPlugin:
            amplitude.add(plugin: swiftPlugin)
        case let objcPlugin as ObjCPlugin:
            let wrapper = ObjCPluginWrapper(amplitude: self, wrapped: objcPlugin)
            plugins.append(wrapper)
            amplitude.add(plugin: wrapper)
        default:
            fatalError("Attempted to add a plugin that is not an instance of Plugin or ObjCPlugin")
        }
        return self
    }

    @objc(remove:)
    @discardableResult
    public func remove(plugin: ObjCPlugin) -> ObjCAcai {
        guard let pluginIndex = plugins.firstIndex(where: { wrapper in wrapper.wrapped == plugin }) else { return self }
        let wrapper = plugins[pluginIndex]
        plugins.remove(at: pluginIndex)
        amplitude.remove(plugin: wrapper)
        return self
    }

    @objc
    @discardableResult
    public func flush() -> ObjCAcai {
        amplitude.flush()
        return self
    }

    @objc(setUserId:)
    @discardableResult
    public func setUserId(userId: String?) -> ObjCAcai {
        amplitude.setUserId(userId: userId)
        return self
    }

    @objc(setDeviceId:)
    @discardableResult
    public func setDeviceId(deviceId: String?) -> ObjCAcai {
        amplitude.setDeviceId(deviceId: deviceId)
        return self
    }

    @objc
    public func getUserId() -> String? {
        amplitude.getUserId()
    }

    @objc
    public func getDeviceId() -> String? {
        amplitude.getDeviceId()
    }

    @objc
    public func getSessionId() -> Int64 {
        amplitude.getSessionId()
    }

    @objc(setSessionIdWithTimestamp:)
    @discardableResult
    public func setSessionId(timestamp: Int64) -> ObjCAcai {
        amplitude.setSessionId(timestamp: timestamp)
        return self
    }

    @objc(setSessionIdWithDate:)
    @discardableResult
    public func setSessionId(date: Date) -> ObjCAcai {
        amplitude.setSessionId(date: date)
        return self
    }

    @objc
    @discardableResult
    public func reset() -> ObjCAcai {
        amplitude.reset()
        return self
    }

    @objc
    var optOut: Bool {
        get {
            return amplitude.optOut
        }
        set {
            amplitude.optOut = newValue
        }
    }
}

extension ObjCAcai: PluginHost {

    public func plugin(name: String) -> (any UniversalPlugin)? {
        return amplitude.plugin(name: name)
    }

    public func plugins<PluginType: UniversalPlugin>(type: PluginType.Type) -> [PluginType] {
        return amplitude.plugins(type: type)
    }
}
