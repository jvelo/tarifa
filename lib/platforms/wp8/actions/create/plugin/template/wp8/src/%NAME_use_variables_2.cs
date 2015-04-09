        public void getCordovaInstallVariables(string args)        {            var installVariables = XElement.Load("Properties/CDVInstallVariables.xml")                .Descendants("CDVInstallVariable")                .ToDictionary(                    e => e.Attribute("name").Value,                    e => e.Attribute("value").Value                );            DispatchCommandResult(new PluginResult(PluginResult.Status.OK, Serialize(installVariables)));        }        private static string Serialize(Dictionary<string, string> obj)        {            StringBuilder sb = new StringBuilder("{");            foreach (var entry in obj)            {                sb.Append('"').Append(entry.Key).Append('"').Append(':').Append('"').Append(entry.Value).Append('"').Append(',');            }            sb.Replace(',', '}', sb.Length - 1, 1);            return sb.ToString();        }