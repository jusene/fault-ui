import httpRequest from "../index";

enum KubeApi {
  ExecCmd = "/pod/exec",
  PodDelete = "/pod/delete",
  DeployDelete = "/deployment/delete",
}

export function RestartPod(podInfo: any) {
  return httpRequest.post({
    baseURL: "http://kube-center.iguming.net/apis",
    url: KubeApi.ExecCmd + "/" + podInfo.name,
    params: {
      namespace: podInfo.namespace,
    },
    data: {
      cmd: "kill 1",
      containerName: podInfo.container,
      secret: "kube-center",
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function OfflinePod(podInfo: any) {
  return httpRequest.post({
    baseURL: "http://kube-center.iguming.net/apis",
    url: KubeApi.ExecCmd + "/" + podInfo.name,
    params: {
      namespace: podInfo.namespace,
    },
    data: {
      cmd: "/bin/curl --connect-timeout 5 -m 20 http://127.0.0.1:8080/actuator/nacosOffline && /bin/curl --connect-timeout 5 -m 20 http://127.0.0.1:8080/actuator/mqOffline",
      containerName: podInfo.container,
      secret: "kube-center",
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function DestroyPod(podInfo: any) {
  return httpRequest.delete({
    baseURL: "http://kube-center.iguming.net/apis",
    url: KubeApi.PodDelete + "/" + podInfo.name,
    params: {
      namespace: podInfo.namespace,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function DestroyDeploy(deployInfo: any) {
  return httpRequest.delete({
    url: KubeApi.DeployDelete + "/" + deployInfo.name,
    params: {
      namespace: deployInfo.namespace,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
